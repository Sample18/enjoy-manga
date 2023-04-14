const express = require("express");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const router = express.Router({ mergeParams: true });
const tokenService = require("../services/token.service");

const sendDefaultError = (res) =>
  res
    .status(500)
    .json({ message: "На сервере произошла ошибка. Попробуйте позже." });

const sendError = (res, text, code) =>
  res.status(code).send({
    error: {
      message: text,
      code,
    },
  });

const isTokenInvalid = (data, dbToken) =>
  !data || !dbToken || data._id !== dbToken?.user.toString();

router.post("/signUp", [
  check("email", "Некорректный email").isEmail(),
  check(
    "password",
    "Пароль должен содержать хотя бы 1 заглавную и строчную букву, 1 цифру и иметь длину минимум 8 символов"
  ).isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
  }),
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return sendError(res, "INVALID_DATA", 400);
      }

      const { email, password } = req.body;
      const exitingUser = await User.findOne({ email });

      if (exitingUser) {
        return sendError(res, "EMAIL_EXISTS", 400);
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = await User.create({
        ...req.body,
        password: hashedPassword,
      });

      const tokens = tokenService.generate({ _id: newUser._id });
      await tokenService.save(newUser._id, tokens.refreshToken);

      res.status(201).send({ ...tokens, userId: newUser._id });
    } catch (e) {
      sendDefaultError(res);
    }
  },
]);
router.post("/signInWithPassword", [
  check("email", "Email некорректный").normalizeEmail().isEmail(),
  check("password", "Пароль не может быть пустым").exists(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return sendError(res, "INVALID_DATA", 400);
      }

      const { email, password } = req.body;
      const existingUser = await User.findOne({ email });

      if (!existingUser) {
        return sendError(res, "EMAIL_NOT_FOUND", 400);
      }

      const isEqual = await bcrypt.compare(password, existingUser.password);

      if (!isEqual) {
        return sendError(res, "INVALID_PASSWORD", 400);
      }

      const tokens = tokenService.generate({ _id: existingUser._id });
      await tokenService.save(existingUser._id, tokens.refreshToken);

      res.status(200).send({ ...tokens, userId: existingUser._id });
    } catch (e) {
      sendDefaultError(res);
    }
  },
]);
router.post("/token", async (req, res) => {
  try {
    const { refresh_token: refreshToken } = req.body;
    const data = tokenService.validateRefresh(refreshToken);
    const dbToken = await tokenService.findToken(refreshToken);

    if (isTokenInvalid(data, dbToken)) {
      return res.status(401).json({ message: "Unautorized" });
    }

    const tokens = await tokenService.generate({ _id: data._id });
    await tokenService.save(data._id, tokens.refreshToken);

    res.status(200).send({ ...tokens, userId: data._id });
  } catch (e) {
    sendDefaultError(res);
  }
});

module.exports = router;
