const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const expireTime = '30d';

const randomToken = () => {
    return require('crypto').randomBytes(64).toString('hex')
}

const genJWT = async (payload) => {
    try {
        const token = await jwt.sign(payload, 'secret', { expiresIn: expireTime });
        return token;
    } catch(err) {
        console.log(err);
    }
}

const decodeJWT = async (token) => {
    try {
        return await jwt.verify(token, 'secret');
    } catch(err) {
        console.log(err);
    }
}

const genHashPassword = async (password) => {
    try {
        // Create salt
        const salt = await bcrypt.genSalt(4);

        // Hash password with salt
        const hashPassword = await bcrypt.hash(password, salt);

        // Return hashPassword and salt
        if (hashPassword && salt) {
            return { hashPassword, salt };
        }

        return null;
    } catch (err) {
        return null;
    }
};

const comparePassword = async (inputPass, systemPass) => {
    try {
        return await bcrypt.compare(inputPass, systemPass);
    } catch (err) {
        console.log(err);
        return false;
    }
}

const getTokenFromAuthorization = async(authorization) => {
    if (authorization) {
        const token = await authorization.split(' ')[1];
        return token;
    }
}

module.exports = {
    randomToken,
    comparePassword,
    genHashPassword,
    genJWT,
    decodeJWT,
    getTokenFromAuthorization
}