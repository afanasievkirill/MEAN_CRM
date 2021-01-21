const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const {keys} = require("../configuration/index")
const errorHandler = require('../utils/errorHandler')

async function getCandidate(req) {
    const candidate = await User.findOne({
        email: req.body.email
    })
    return candidate;
}

module.exports.login = async (req, res) => {
    console.log(keys)
    const candidate = await getCandidate(req)

    if (candidate) {
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        if (passwordResult) {
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys, {
                expiresIn: 3600
            })
            res.status(200).json({
                token: `Bearer ${token}`
            })
        } else {
            res.status(401).json({
                message: 'Введен не валидный пароль.'
            })
        }
    } else {
        res.status(404).json({
            message: 'Пользователь с таким емэйлом не найден.'
        })
    }
}

module.exports.register = async (req, res) => {

    const candidate = await getCandidate(req)

    if (candidate) {
        res.status(409).json({
            message: 'Пользователь с данной почтой уже зарегистрирован.'
        })
    } else {
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        })
        try {
            await user.save()
            res.status(201).json(user)
        } catch (e) {
            errorHandler(res, e)
        }
    }
}