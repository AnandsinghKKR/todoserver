import { check } from "express-validator";

export const LoginSchema=[
    check("username","username ANANd is required").exists().isAlphanumeric().withMessage("In Proper Format")
    .trim().isLength({min:6,max:10}),

    check("password","password is required").exists().isLength({min:8,max:100}).trim(),

]