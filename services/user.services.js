const UserModel = require('../Models/user.model');

module.exports.CreateUser = async ({ firstname, lastname, email, password }) => {
    console.log(firstname, lastname, email, password);

    if (!firstname || !email || !password) {
        throw new Error('All fields are required');
    }

    const user = await UserModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password
    });

    return user;
}