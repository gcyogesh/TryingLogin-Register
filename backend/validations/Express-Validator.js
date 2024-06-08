import {check, validationResult }  from 'express-validator'

export const loginValidator =  ()=>{
    return [
        check('email').isEmail().withMessage("Please enter a valid email for that"),
        check('password').notEmpty().withMessage("password is required")
    ]
};

export const registerValidator = ()=>{
    return[
        check('name').notEmpty().withMessage("Name is required"),
        check('email').isEmail().withMessage("Please enter valid email address"),
        check('password').isLength({min:6}).withMessage("Password must be 8 character long ")
    ]
}


export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
};

