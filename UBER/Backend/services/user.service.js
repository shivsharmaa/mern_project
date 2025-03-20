const userModel =  require('../models/user.model');


module.exports.createUser =  async ({
    firstname, lastname, password, email
}) => {
    if(!firstname || password || email){
        throw new error('All fields are required')
    }

    const user =  userModel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password
    })


    return user;
}