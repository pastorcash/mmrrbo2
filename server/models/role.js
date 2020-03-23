// -- Create the "role" Model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseUniqueValidator = require('mongoose-unique-validator');
const _ = require('lodash');

const RoleSchema = new mongoose.Schema({
    roleName: {
      type: String,
      unique: true,     // not a validator, used for optimization in Mongoose/Mongodb
      required: [true, 'Role name is required.'],
      trim: true,
      minlength: 3
    },
    roleDescription: {
        type: String,
        unique: false,     // not a validator, used for optimization in Mongoose/Mongodb
        required: false,
        default: null,
        trim: true
      },
    toolBarDisplay: {
        type: String,
        required: [true, 'Toolbar option is required.'],
        /*validate: validators.isIn(
            'Admin',
            'Multi',
            'Location',
            'Teacher',
            'Parent'), */
        default: 'Teacher',
    },
    dashboardDisplay: {
        type: String,
        required: [true, 'Dashboard Display option is required.'],
/*        validate: validators.isIn(
            'Admin',
            'Grantor',
            'District',
            'Location',
            'Teacher',
            'Parent'), */
        trim: true,
        default: 'Teacher'
    },
    restrictedRole: {
        type: Boolean,
        default: true
    }
})

// --------------- INSTANCE Methods --------------- //

// ---------------- MODEL Methods ----------------- //


// --------------- VIRTUAL Methods ---------------- //

// ------------------ Interface ------------------- //
const Role = mongoose.model('Role', RoleSchema);
RoleSchema.plugin(mongooseUniqueValidator);

module.exports = {Role};
