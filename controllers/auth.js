const { AuthService } = require('../services/authService')
const UserModel = require('../models/User');
const AccountModel = require('../models/Account');
const PasswordModel = require('../models/Password');
const TokenModel = require('../models/Token');
const { 
  UserRepository
} = require('../repo/userRepo');

const AuthRepository = require('../repo/authRepo');

const userRepo = new UserRepository(UserModel);
const authRepo = new AuthRepository(AccountModel, PasswordModel, TokenModel);

const authService = new AuthService(userRepo, authRepo);


exports.register = async (req, res, next) => {
    try {
      const response = await authService.register(req);
      
      res.statusCode = response.statusCode;
      return res.json({ message: response.message, data: response.data });
    } catch(error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
  try {
    const response = await authService.login(req);

    res.statusCode = response.statusCode;
    return res.json({ message: response.message, data: response.data });
  } catch(error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    const response = await authService.logout(req);

    res.statusCode = response.statusCode;
    return res.json({ message: response.message, data: response.data });
  } catch(err) {
    next(err)
  }
}
