const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        username: { 
            type: String, 
            required: true, 
            unique: true, 
            minlength: 1
        },
        password: { 
            type: String, 
            required: true, 
            minlength: 1
        },
        email: { 
            type: String, 
            required: true, 
            unique: true, 
            lowercase: true 
        },
        emailVerficationStatus: { 
            type: String,
            enum: ['verified', 'pending'],
            message: `{VALUE} is not supported`
        },
        influencerStatus: { 
            type: String,
            enum: ['verified', 'pending', 'requested'],
            message: `{VALUE} is not supported`
        },
        verificationCode: { 
            type: Number, 
            required: true }
    },
    {
        timestamps: true
    }
    
);

module.exports = mongoose.model('User', UserSchema);