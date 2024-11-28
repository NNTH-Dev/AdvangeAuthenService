class UserRepository {
    constructor(userModel) {
        this.userModel = userModel;
    }

    addUser(id, firstname, lastname, studentCode, email, password) {
        return this.userModel.create({ id, firstname, lastname, studentCode, email, password });
    }

    findUserByEmail(email) {
        return this.userModel.findOne({ where: { email } });
    }

    findUserById(id) {
        return this.userModel.findOne({ where: { id } });
    }

    findUserByIdAndUpdate(id, name, email) {
        return this.userModel.findOneAndUpdate({ id }, 
            {$set: { name, email }}, 
            { new: true });
    }

    findUserByIdAndDelete(id) {
        return this.userModel.findOneAndDelete({ id });
    }
}

module.exports = {
    UserRepository,
};
