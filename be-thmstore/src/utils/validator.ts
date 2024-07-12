import { check, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

export const runvalidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({
      message: errors.array()[0].msg,
    });
  }

  next();
};

export const validatioRegister = [
  check("fullname", "Name cannot be empty").notEmpty(),
  check("email", "Email cannot be empty")
    .matches(/.+\@.+\..+/)
    .withMessage("email is incorrect, add @"),
    check("password", "Password cannot be empty")
    .notEmpty()
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
    .matches(/^(?=.*[A-Z]).+$/).withMessage("Must start with a capital letter"),
];


export const validationLogin = [
  check("email", "Email cannot be empty")
    .matches(/.+\@.+\..+/)
    .withMessage("email is incorrect, add @"),
  check("password", "Password cannot be empty")
    .notEmpty()
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
    .matches(/^(?=.*[A-Z]).+$/).withMessage("Must start with a capital letter"),
];
