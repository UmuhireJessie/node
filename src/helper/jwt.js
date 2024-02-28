import jwt from "jsonwebtoken";

export class JWT {
    static generateJwt (data, exp='1d') {
        return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: exp})
    }
}