import config from "../config/config.js";
import userModel from "../models/user.model.js";
import tokenBlacklistModel from "../models/tokenBlacklist.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export async function register(req, res) {

    const { username, email, password } = req.body

    if (!username || !email || !password) {
        return res.status(400).json({
            message: 'all fields are required'
        })
    }
    const hashPassword = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password: hashPassword
    })

    const token = jwt.sign({
        id: user._id
    }, config.JWT_SECRET, {
        expiresIn: '3d'
    })

    res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        maxAge: 24 * 60 * 60 * 1000
    })

    return res.status(201).json({
        message: 'user created successfully',
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
        },
        token
    })
}

export async function login(req, res) {

    try {

        const { email, password } = req.body

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(400).json({
                message: 'user not found'
            })
        }

        const isPasswordMatched = await user.comparePassword(password)

        if (!isPasswordMatched) {
            return res.status(400).json({
                message: 'invalid password'
            })
        }

        const token = jwt.sign({
            id: user._id
        }, config.JWT_SECRET, {
            expiresIn: '3d'
        })

        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            maxAge: 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            message: 'user logged in successfully',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
            token
        })
    } catch (error) {
        return res.status(500).json({
            message: 'internal server error',
            error: error.message
        })
    }
}

export async function getMe(req, res) {

    const userId = req.user

    const user = await userModel.findById(userId.id)

    if (!user) {
        return res.status(400).json({
            message: "user not found"
        })
    }

    return res.status(200).json({
        message: "user found successfully",
        user
    })

}

export async function logout(req, res) {

    const token = req.cookies.token

    if (!token) {
        return res.status(400).json({
            message: 'user is not logged in'
        })
    }

    await tokenBlacklistModel.create({
        token
    })

    res.clearCookie('token', {
        httpOnly: true,
        secure: true,
        sameSite: 'none'
    })

    return res.status(200).json({
        message: 'user logged out successfully'
    })
}



