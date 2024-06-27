import { updateBalance } from "../services/balanceService.js";
import { validateUpdateBalance } from "../validators/balanceValidator.js";

export const updateUserBalance = async (req, res) => {
  try {
    const validatedData = validateUpdateBalance(req.body);
    const { userId, amount } = validatedData;

    const updatedUser = await updateBalance(userId, amount);
    res.json({ success: true, balance: updatedUser.balance });
  } catch (error) {
    if (error.message.startsWith("[")) {
      const validationErrors = JSON.parse(error.message);
      res.status(400).json({ success: false, errors: validationErrors });
    } else if (
      error.message === "Insufficient funds" ||
      error.message === "User not found"
    ) {
      res.status(400).json({ success: false, message: error.message });
    } else {
      console.error("Error updating balance:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
};
