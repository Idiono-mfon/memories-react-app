import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// model
import User from "../models/user.js";

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    // Check if user exist
    if (!existingUser)
      return res.status(404).json({ message: "User does'nt exist" });
    // Verify the password of user
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(404).json({ message: "Invalid credential" });

    // Generate token
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
      // N/B add test(the secret key) in a .env file
    );
    return res.status(400).json({ result: existingUser, token });
    //
  } catch (error) {
    return res.status(500).json({ mesage: "Something went wrong" });
  }
};
export const signUp = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords don't match" });
    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    // Generate Token Here
    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });
    // Send token to the frontend
    return res.status(200).json({ token, result });
  } catch (error) {
    res.status(500).json({ mesage: "Something went wrong" });
  }
};
