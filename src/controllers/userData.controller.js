import UserData from "../models/userData";

const userData = async (req, res) => {
  const { email, name } = req.body;
  if (!email || !name) {
    return res
      .status(401)
      .json({ message: "Email and name is required", success: false });
  }
  const findUser = await UserData.findOne({
    email: email.toLowerCase().trim(),
  });
  if (!findUser) {
    await UserData.create({
      email: email.toLowerCase().trim(),
      name: name,
    });
  }
  findUser.name = name;
  await findUser.save({ validateBeforeSave: false });
  return res
    .status(200)
    .json({ message: "User data updated successfully", success: true });
};

export { userData };
