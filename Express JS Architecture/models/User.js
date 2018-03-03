const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const encryption = require('./../util/encryption');

const userSchema = new Schema({
    username: { type: Schema.Types.String, required: '{PATH} is required', unique: true },
    hashedPass: { type: Schema.Types.String, required: '{PATH} is required' },
    firstName:  { type: Schema.Types.String },
    lastName: { type: Schema.Types.String },
    salt: { type: Schema.Types.String },
    roles: [{type: Schema.Types.String }]
});

userSchema.method({
   authenticate: function (password) {
       return encryption.generateHashedPassword(this.salt, password) === this.hashedPass;
   }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
module.exports.seedAdminUser = async () => {
    try {
        let users = await User.find({});
        if (users.length > 0) {
            return
        }

        const salt = encryption.generateSalt();
        const hashedPass = encryption.generateHashedPassword(salt, 'admin');
        return User.create({
            username: 'Admin',
            salt,
            hashedPass,
            roles: ['Admin']
        })
    } catch (err) {
        console.log(err);
    }
};