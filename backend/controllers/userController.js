import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
/**
 * @description Auth user & get token
 * @route POST /api/users/login
 * @acess Public
 */

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(typeof password)

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
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
  res.send("register user");
});

/**
 * @description Logout user / clear cookie
 * @route POST /api/users/logout
 * @access Private
 */

const logoutUser = asyncHandler(async (req, res) => {
  res.send("logout user");
});

/**
 * @description Get user profile
 * @route  GET /api/users/profile
 * @access Public
 */

const getUserProfile = asyncHandler(async (req, res) => {
  res.send("get user profile");
});

/**
 * @description Update user profile
 * @route PUT /api/users/profile
 * @access Private
 */

const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("update user");
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
