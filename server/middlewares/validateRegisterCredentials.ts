import { body} from 'express-validator';
import validator from './expressValidatorValidate';
export const validateUser = [
    body('name')
        .trim()
        .isLength({ min: 3, max: 20 })
        .withMessage('name must be between 3 and 20 characters')
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage('name can only contain letters, numbers, and underscores'),

    body('email')
        .trim()
        .isEmail()
        .withMessage('Invalid email format')
        .normalizeEmail(),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
        .matches(/[A-Z]/)
        .withMessage('Password must contain at least one uppercase letter')
        .matches(/[0-9]/)
        .withMessage('Password must contain at least one number'),
    body("role")
        .matches("Admin|Candidate|Employer")
        .withMessage("Rle must be Admin or Candidate or Employee"),
    validator
];