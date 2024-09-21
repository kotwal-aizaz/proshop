import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

/**
 * @description Auth user & get token
 * @route POST /api/users/login
 * @acess Public
 */

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for the existing user
  const user = await User.findOne({ email });
  // Check: Valid user password
  if (user && (await user.matchPassword(password))) {
    // Generate: JWT Token using util method
    generateToken(res, user._id);
    // Generate: User object
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

/**
 * @description Register User
 * @route POST /api/Users
 * @access Public
 */

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  } else {
    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }
});

/**
 * @description Logout user / clear cookie
 * @route POST /api/users/logout
 * @access Private
 */

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logout successful..." });
});

/**
 * @description Get user profile
 * @route  GET /api/users/profile
 * @access Private
 */

const getUserProfile = asyncHandler(async (req, res) => {
  // Get the user
  const user = await User.findById(req.user._id); // we have access to the user id as the user will be logged in.
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/**
 * @description Update user profile
 * @route PUT /api/users/profile
 * @access Private
 */

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

/**
 * @description Get users
 * @route  GET /api/users
 * @access Private / Admin
 */

const getUsers = asyncHandler(async (req, res) => {
  res.send("get users");
});

/**
 * @description Get user by id
 * @route GET /api/users/:id
 * @access Private / Admin
 */

const getUserById = asyncHandler(async (req, res) => {
  res.send("get user by id");
});
/**
 * @description Delete user
 * @route DELETE /api/users/:id
 * @access Private / Admin
 */

const deleteUserById = asyncHandler(async (req, res) => {
  res.send("delete user by id ");
});

/**
 * @description Update user
 * @route PUT /api/users/:id
 * @access Private / Admin
 */

const updateUserById = asyncHandler(async (req, res) => {
  res.send("update user by id");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUserById,
  getUserById,
  updateUserById,
};

/**
 * @description
 * @route
 * @access
 */
