import { Sequelize } from "sequelize";

export const up = async ({ context: queryInterface }) => {
  await queryInterface.createTable("users", {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER,
    },
    balance: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 10000,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  });

  await queryInterface.bulkInsert("users", [
    {
      balance: 10000,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
};

export const down = async ({ context: queryInterface }) => {
  await queryInterface.dropTable("users");
};
