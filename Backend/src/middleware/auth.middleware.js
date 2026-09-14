import jwt from 'jsonwebtoken'
import config from '../config/config.js';
import tokenBlacklistModel from '../models/tokenBlacklist.model.js';

export async function authMiddleware(req, res, next) {

    const token = req.cookies.token

    if (!token) {
        return res.status(400).json({
            message: 'user is not logged in'
        })
    }

    const isTokenBlacklisted = await tokenBlacklistModel.findOne({ token })

    if (isTokenBlacklisted) {
        return res.status(400).json({
            message: 'Token is not valid'
        })
    }

    try {

        const decoded = jwt.verify(token, config.JWT_SECRET)

        req.user = decoded
        next()

    }
    catch (err) {
        return res.status(400).json({
            message: 'internal server error',
            error: err.message
        })
    }
}

