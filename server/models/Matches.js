const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Matches = sequelize.define(
    "Matches",
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
      matchedUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      status: {
        type: DataTypes.ENUM("pending", "accepted", "rejected"),
        allowNull: false,
        defaultValue: "pending",
      },
    },
    {
      tableName: "Matches",
      timestamps: true,
      paranoid: false,
      indexes: [
        {
          unique: true,
          fields: ["userId", "matchedUserId"],
          name: "unique_match_per_user",
        },
      ],
    }
  );

  Matches.associate = (models) => {
    Matches.belongsTo(models.Users, {
      foreignKey: "userId",
      as: "user",
      targetKey: "id",
    });
    Matches.belongsTo(models.Users, {
      foreignKey: "matchedUserId",
      as: "matchedUser",
      targetKey: "id",
    });
  };

  return Matches;
};
