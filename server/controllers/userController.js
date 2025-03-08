const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// Register User
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = new User({ name, email, password, role });
    await user.save();

    res.status(201).json({
      message: "User registered successfully",
      token: generateToken(user._id),
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Login User
const loginUser = async (req, res) => {
const { email, password, role } = req.body;

try {
    const user = await User.findOne({ email, role });
    
    if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
    }
    
    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
    }
    
    res.json({
    token: generateToken(user._id),
    user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
} catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
}
};
//Get All Users
const getUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  const updateUser = async (req, res) => {
    try {
      const { id } = req.params; 
      const { name, email } = req.body; 
  
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { name, email },
        { new: true, runValidators: true } 
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };
  

  const deleteUser = async (req, res) => {
    try {
      const { id } = req.params; 
  
      const deletedUser = await User.findByIdAndDelete(id);
  
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };

module.exports = { registerUser, loginUser, getUsers ,updateUser,deleteUser};
