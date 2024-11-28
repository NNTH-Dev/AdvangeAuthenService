const customResourceResponse = require('../utils/constants');
const { randomToken, genHashPassword, comparePassword, genJWT, getTokenFromAuthorization, decodeJWT } = require('../utils/authUtils');
const { generateUUID, isEmail } = require('../utils/baseUtils');

class AuthService {
    constructor(userRepo, authRepo) {
        this.userRepo = userRepo;
        this.authRepo = authRepo;
    }

    async login(req) {
        const { username, password } = req.body;
        if (!username || !password) {
            return {
                message: customResourceResponse.reqValidationError.message,
                statusCode: customResourceResponse.reqValidationError.statusCode,
            };
        }

        try {
            const account = isEmail(username) 
                ? await this.authRepo.findAccountByUsername(username) 
                : await this.authRepo.findAccountByStudentCode(username);
            if (!account) {
                return {
                    message: customResourceResponse.userNotFound.message,
                    statusCode: customResourceResponse.userNotFound.statusCode,
                };
            }

            const accPassword = await this.authRepo.findPasswordById(account.passwordId);
            if (!accPassword) {
                return {
                    message: customResourceResponse.serverError.message,
                    statusCode: customResourceResponse.serverError.statusCode,
                };
            }

            const isPasswordMatch = await comparePassword(password, accPassword.hashPassword);
            if (!isPasswordMatch) {
                return {
                    message: customResourceResponse.authError.message,
                    statusCode: customResourceResponse.authError.statusCode,
                };
            }

            const jwtoken = await genJWT({
                accountId: account.id,
            });

            if (!jwtoken) {
                return {
                    message: customResourceResponse.serverError.message,
                    statusCode: customResourceResponse.serverError.statusCode,
                };
            }

            const token = await this.authRepo.addToken(generateUUID(), jwtoken, randomToken());
            if (!token) {
                return {
                    message: customResourceResponse.serverError.message,
                    statusCode: customResourceResponse.serverError.statusCode,
                };
            }

            return {
                message: customResourceResponse.loginSuccess.message,
                statusCode: customResourceResponse.loginSuccess.statusCode,
                data: { 
                    action: "complete",
                    role: account.role,
                    accessToken: token.token,
                    refreshToken: token.refreshToken,
                    expiredTime: token.expiredAt,
                }
            };

        } catch(error) {
            return {
                message: customResourceResponse.serverError.message,
                statusCode: customResourceResponse.serverError.statusCode,
            };
        }
    }

    async register(req) {
        const { firstname, lastname, studentCode, email, password, confirmPassword } = req.body;
        if(!email || !password || !confirmPassword || !studentCode) {
          return {
            message: customResourceResponse.reqValidationError.message,
            statusCode: customResourceResponse.reqValidationError.statusCode,
          };
        }

        try {
            const isExistAccount = await this.authRepo.findAccountByEmail(email);
            if (!isExistAccount) {
                if(password !== confirmPassword) {
                    return {
                        message: customResourceResponse.passwordNotMatch.message,
                        statusCode: customResourceResponse.passwordNotMatch.statusCode,
                    }
                }

                const hashPassword = await genHashPassword(password);
                if (!hashPassword) {
                    return {
                        message: customResourceResponse.serverError.message,
                        statusCode: customResourceResponse.serverError.statusCode,
                    };
                }

                const newPassword = await this.authRepo.addPassword(generateUUID(), hashPassword.hashPassword, hashPassword.salt);
                if (!newPassword) {
                    return {
                        message: customResourceResponse.serverError.message,
                        statusCode: customResourceResponse.serverError.statusCode,
                    }
                }

                const user = await this.userRepo.addUser(generateUUID(), firstname, lastname, studentCode, email);
                if (!user) {
                    return {
                        message: customResourceResponse.serverError.message,
                        statusCode: customResourceResponse.serverError.statusCode,
                    };
                }

                const account = await this.authRepo.addAccount(generateUUID(), firstname, lastname, studentCode, email, user.id, newPassword.id);
                if (!account) {
                    return {
                        message: customResourceResponse.serverError.message,
                        statusCode: customResourceResponse.serverError.statusCode,
                    };
                }

                return {
                    message: customResourceResponse.reqCreated.message,
                    statusCode: customResourceResponse.reqCreated.statusCode,
                    data: { action: "complete" }
                };
            }

            return {
                message: customResourceResponse.userExists.message,
                statusCode: customResourceResponse.userExists.statusCode,
            };
        } catch(error) {
            return {
                message: customResourceResponse.serverError.message,
                statusCode: customResourceResponse.serverError.statusCode,
            };
        }
    }

    async logout(req) {
        const { authorization } = req.headers;
        const token = await getTokenFromAuthorization(authorization);
        if (!token) {
            return {
                message: customResourceResponse.tokenRequired.message,
                statusCode: customResourceResponse.tokenRequired.statusCode,
            };
        }

        try {
            const tk = await this.authRepo.findToken(token);
            if (tk) {
                await this.authRepo.deleteTokenById(tk.id);
            }
            
            return {
                message: customResourceResponse.logoutSuccess.message,
                statusCode: customResourceResponse.logoutSuccess.statusCode,
                data: {
                    action: "complete",
                }
            }
        } catch(err) {
            return {
                message: customResourceResponse.serverError.message,
                statusCode: customResourceResponse.serverError.statusCode,
            };
        }
    }
}

module.exports = {
    AuthService,
};
