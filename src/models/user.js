import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

class User extends Model {}

User.init(
  {
    balance: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 10000,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
  },
);

export default User;
