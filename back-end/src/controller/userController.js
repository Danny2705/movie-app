const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const { password: userPassword, ...others } = user._doc;
    res.status(200).json({ data: others, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name && !email) {
      return res.status(400).json({ message: "Username or email is required" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    let existingUser;
    if (email) {
      existingUser = await User.findOne({ email });
    } else {
      existingUser = await User.findOne({ name });
    }

    if (!existingUser) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const { password: userPassword, ...others } = existingUser._doc;

    const token = jwt.sign(
      {
        id: existingUser._id,
        name: existingUser.name,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ data: others, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.find({});
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    let updatedData = req.body;
    if (updatedData.password) {
      updatedData.password = await bcrypt.hash(updatedData.password, 10);
    }
    const user = await User.findByIdAndUpdate(id, updatedData, { new: true });

    if (!user) {
      return res.status(404).json({ error: "There is no such user" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ error: "There is no such user" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { registerUser, loginUser, getUser, updateUser, deleteUser };
