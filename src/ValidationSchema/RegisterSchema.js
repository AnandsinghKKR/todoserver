import { check } from "express-validator";

export const RegisterSchema=[
    check("name").trim().isAlpha().withMessage("Name Should be in proper format"),

    check("username","username is required").exists().isAlphanumeric().withMessage("In Proper Format")
    .trim().isLength({min:6,max:10}),

    check("password","password is required").exists().isLength({min:8,max:100}).trim(),

    check("email","email is required").exists().isEmail(),
]