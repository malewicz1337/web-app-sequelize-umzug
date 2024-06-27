import { sequelize } from "../config/database.js";
import User from "../models/user.js";

export const updateBalance = async (userId, amount) => {
  const t = await sequelize.transaction();

  try {
    const user = await User.findByPk(userId, {
      lock: t.LOCK.UPDATE,
      transaction: t,
    });

    if (!user) {
      throw new Error("User not found");
    }

    const newBalance = Number(user.balance) + Number(amount);

    if (newBalance < 0) {
      throw new Error("Insufficient funds");
    }

    user.balance = newBalance;
    await user.save({ transaction: t });

    await t.commit();
    return user;
  } catch (error) {
    await t.rollback();
    throw error;
  }
};
