class AuthRepository {
    constructor(accountModel, passwordModel, tokenModel) {
        this.accountModel = accountModel;
        this.passwordModel = passwordModel;
        this.tokenModel = tokenModel;
    }

    addAccount(id, firstname, lastname, studentCode, email, userId, passwordId) {
        return this.accountModel.create({ id, firstname, lastname, studentCode, email, userId, passwordId });
    }

    addPassword(id, hashPassword, salt) {
        return this.passwordModel.create({ id, hashPassword, salt });
    }

    addToken(id, token, refreshToken) {
        return this.tokenModel.create({ id, token, refreshToken });
    }

    findAccountByEmail(email) {
        return this.accountModel.findOne({ email:  email });
    }

    findAccountByStudentCode(studentCode) {
        return this.accountModel.findOne({ studentCode: studentCode });
    }

    findPasswordById(id) {
        return this.passwordModel.findOne({ id: id });
    }

    findToken(token) {
        return this.tokenModel.findOne({ token: token })
    }

    deleteTokenById(id) {
        return this.tokenModel.deleteOne({ id: id });
    }
}

module.exports = AuthRepository;
