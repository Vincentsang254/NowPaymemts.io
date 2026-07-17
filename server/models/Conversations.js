const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Conversations = sequelize.define(
    "Conversations",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user1Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      user2Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      lastMessage: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      lastMessageAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      lastMessageUserId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Users",
          key: "id",
        },
      },
    },
    {
      tableName: "Conversations",
      timestamps: true,
      paranoid: false,
      indexes: [
        {
          unique: true,
          fields: ["user1Id", "user2Id"],
          name: "unique_conversation",
        },
      ],
    }
  );

  Conversations.associate = (models) => {
    Conversations.belongsTo(models.Users, {
      foreignKey: "user1Id",
      as: "user1",
      targetKey: "id",
    });
    Conversations.belongsTo(models.Users, {
      foreignKey: "user2Id",
      as: "user2",
      targetKey: "id",
    });
    Conversations.belongsTo(models.Users, {
      foreignKey: "lastMessageUserId",
      as: "lastMessageUser",
      targetKey: "id",
    });
    Conversations.hasMany(models.Messages, {
      foreignKey: "conversationId",
      as: "messages",
    });
  };

  return Conversations;
};
