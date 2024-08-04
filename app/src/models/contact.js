const mongoose = require('mongoose');
const validator = require('validator');
const uniqueValidation = require('mongoose-beautiful-unique-validation');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 2,
        maxlength: 50,
        required: [true, "can't be blank"],
        trim: true,
        index: true,
        validate(value) {
            if(!validator.isAlpha(value)) {
                throw new Error('Firstname is invalid')
            }
        }
    },
    phone: {
        type: String,
        trim: true,
        index: {
            unique: true,
            partialFilterExpression: {phone: {$type: "string"}}
        },
        maxlength: 20,
        validate(value) {
            if(!validator.isNumeric(value)) {
                throw new Error('Phone number is invalid')
            }
        }
    },
    email: {
        type: String,
        trim: true,
        index: {
            unique: true,
            partialFilterExpression: {email: {$type: "string"}}
        },
        maxlength: 30,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },

}, {
    timestamps: true
});

contactSchema.plugin(uniqueValidation, {
    defaultMessage: 'Error, expected {PATH} to be unique.'
});

// contactSchema.statics is for methods on the actual uppercase C contact model
contactSchema.statics.isUniqueEmail = async (email) => {
    const contact = await Contact.findOne({ email });

    if(contact) {
      return false;
    } else {
      return true;
    }
};

contactSchema.statics.isUniquePhone = async (phone) => {
    const contact = await Contact.findOne({ phone });

    if(contact) {
      return false;
    } else {
      return true;
    }
};


const Contact = mongoose.model('Contact', contactSchema)
module.exports = Contact