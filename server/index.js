const cookieParser = require("cookie-parser");
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const matchingRoutes = require("./routes/matchingRoutes");
const messagingRoutes = require("./routes/messagingRoutes");

dotenv.config();
const app = express();
const server = http.createServer(app);
const port = 3001;

// Socket.IO initialization with CORS
const io = socketIo(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || "https://dating-rpig.onrender.com",
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  },
});

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "https://dating-rpig.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Make io available to routes
app.set("io", io);

const db = require("./models");

app.get("/health", (req, res) => {
  res.status(200).json({ success: true, message: "Server is healthy.", data: null });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/matching", matchingRoutes);
app.use("/api/messaging", messagingRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: "Internal Server Error", data: null, error: err.message });
});


  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));
  
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
  });
  }

db.sequelize.sync().then(() => {
  // Socket.IO connection handling
  const onlineUsers = new Map(); // Map of userId -> socketId

  io.on("connection", (socket) => {
    console.log("New user connected:", socket.id);

    // User comes online
    socket.on("user_online", (userId) => {
      onlineUsers.set(userId, socket.id);
      socket.userId = userId;
      // Broadcast user online status to all connected users
      io.emit("user_status", { userId, status: "online" });
    });

    // Send message event
    socket.on("message_send", (data) => {
      const { conversationId, recipientId, senderId } = data;
      
      // Emit to recipient if they're online
      const recipientSocketId = onlineUsers.get(recipientId);
      if (recipientSocketId) {
        io.to(recipientSocketId).emit("message_receive", data);
      }
    });

    // Typing indicator
    socket.on("typing", (data) => {
      const { conversationId, recipientId } = data;
      const recipientSocketId = onlineUsers.get(recipientId);
      if (recipientSocketId) {
        io.to(recipientSocketId).emit("user_typing", {
          conversationId,
          senderId: socket.userId,
        });
      }
    });

    // Stop typing indicator
    socket.on("stop_typing", (data) => {
      const { conversationId, recipientId } = data;
      const recipientSocketId = onlineUsers.get(recipientId);
      if (recipientSocketId) {
        io.to(recipientSocketId).emit("user_stop_typing", {
          conversationId,
          senderId: socket.userId,
        });
      }
    });

    // Voice/Video call initiation
    socket.on("call_initiate", (data) => {
      const { recipientId, callType } = data; // callType: 'video' or 'voice'
      const recipientSocketId = onlineUsers.get(recipientId);
      if (recipientSocketId) {
        io.to(recipientSocketId).emit("call_incoming", {
          senderId: socket.userId,
          callType,
          callId: data.callId,
        });
      }
    });

    // Call acceptance
    socket.on("call_accept", (data) => {
      const { senderId, callId } = data;
      const senderSocketId = onlineUsers.get(senderId);
      if (senderSocketId) {
        io.to(senderSocketId).emit("call_accepted", {
          callId,
          recipientId: socket.userId,
        });
      }
    });

    // Call rejection
    socket.on("call_reject", (data) => {
      const { senderId, callId } = data;
      const senderSocketId = onlineUsers.get(senderId);
      if (senderSocketId) {
        io.to(senderSocketId).emit("call_rejected", {
          callId,
          recipientId: socket.userId,
        });
      }
    });

    // Call end
    socket.on("call_end", (data) => {
      const { recipientId, callId } = data;
      const recipientSocketId = onlineUsers.get(recipientId);
      if (recipientSocketId) {
        io.to(recipientSocketId).emit("call_ended", {
          callId,
          senderId: socket.userId,
        });
      }
    });

    // Disconnect
    socket.on("disconnect", () => {
      if (socket.userId) {
        onlineUsers.delete(socket.userId);
        io.emit("user_status", { userId: socket.userId, status: "offline" });
      }
      console.log("User disconnected:", socket.id);
    });
  });

  server.listen(port, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});
