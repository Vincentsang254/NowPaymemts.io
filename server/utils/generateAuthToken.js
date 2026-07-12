
const jwt = require("jsonwebtoken");
const generateAuthToken = (user) => {
  // const key = process.env.SECRET_KEY;
  


  try {
    // Create JWT token with user details
    const token = jwt.sign(
      {
        id: user.id,
        userType: user.userType,
        
      },
      "sangkiplaimportantkey",
      {
        expiresIn: '21d', 
      }
    );

    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = generateAuthToken;
