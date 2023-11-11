const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("./../Models/userModel");
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
//////////////// Signup //////////////////////////////////////
exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      fullname: req.body.fullname,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    const token = signToken(newUser._id);
    res.cookie("jwt", token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    });
    res.status(201).json({
      status: "success",
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    if (err.code === 11000) {
      // Duplicate key error (unique index violation)
      res.status(400).json({
        status: "fail",
        message:
          "Email address is already in use. Please choose a different email.",
      });
    } else {
      // Handle other errors
      res.status(500).json({
        status: err,
        message: "An error occurred while creating the user.",
      });
    }
  }
};

/////////// Login  /////////////////////////////////////////
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // checking if email and pasword exixt
    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide email and password",
      });
    }
    const user = await User.findOne({ email }).select("+password");
    //checking if user exists and password is correct
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        message: "Incorrect email or password",
      });
    }

    const token = signToken(user._id);
    res.cookie("jwt", token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    });
    res.status(200).json({
      status: "success",
      token,
      user,
    });
  } catch (err) {
    res.status(400).json({
      err: err,
    });
  }
};
//////////// Protect routes /////////////////////////////////
exports.protect = async (req, res, next) => {
  try {
    let token;
    let decoded;
    // getting token and check if it exists
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        message: "You are not logged in",
      });
    }

    // Verify the token
    try {
      decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({
        err: err,
      });
    }

    // check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        message: "user no longer exists",
      });
    }
    req.user = currentUser;
  } catch (err) {
    return res.status(401).json({
      err: err,
    });
  }

  next();
};
