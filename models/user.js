const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, " email is required"]
    },
    password: {
        type: String,
        required: [true, "  password is required"]
    },
    dob: {
        type: Date,
        required: [true, "Date is required"]
    },
    
    
},
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = mongoose.model("user", UserSchema);


