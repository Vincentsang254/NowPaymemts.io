const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Likes = sequelize.define(
    "Likes",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      likedUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    },
    {
      tableName: "Likes",
      timestamps: true,
      paranoid: false,
      indexes: [
        {
          unique: true,
          fields: ["userId", "likedUserId"],
          name: "unique_like_per_user",
        },
      ],
    }
  );

  Likes.associate = (models) => {
    Likes.belongsTo(models.Users, {
      foreignKey: "userId",
      as: "liker",
      targetKey: "id",
    });
    Likes.belongsTo(models.Users, {
      foreignKey: "likedUserId",
      as: "liked",
      targetKey: "id",
    });
  };

  return Likes;
};
