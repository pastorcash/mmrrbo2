// --- Create the "user" model
const mongoose = require('mongoose');
const validator = require('validator');
const mongooseUniqueValidator = require('mongoose-unique-validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, 'Username is required.'],
    unique: true,
    trim: true,
    minlength: 6,
  },
  firstName: {
    type: String,
    required: [true, 'First name is required.'],
    trim: true,
    minlength: 1,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required.'],
    trim: true,
    minlength: 1,
  },
  email: {
    type: String,
    required: [true, 'User email is required'],
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      isAsync: true,
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email',
    },
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
  },
  roles: {
    type: Array,
    default: ['teacher'],
  },
  employmentType: {
    type: String,
    required: false,
    // validate: {
    //   isAsync: true,
    //   validator: validator.isIn(['W-2', '1099']),
    //   message: `{VALUE} is not a valid option.`,
    // },
  },
  status: {
    type: String,
    required: true,
    trim: true,
    default: 'active',
    // validate: {
    //   isAsync: true,
    //   validator: validator.isIn(['active', 'hold', 'archive']),
    //   message: `{VALUE} is not a valid option.`,
    // },
  },
  tokens: [{
    access: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  }],
  createdAt: {
    type: Date,
    required: false,
    default: new Date().getTime(),
  },
  updatedAt: {
    type: Date,
    required: false,
    default: null,
  },
});

// --------------- INSTANCE Methods --------------- //
UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  // add employment type (?)
  return _.pick(userObject, ['_id', 'userName', 'firstName', 'lastName', 'email', 'roles', 'status']);
};

UserSchema.methods.generateAuthToken = function () {
  const user = this;
  const access = 'auth';
  const token = jwt.sign({ _id: user._id.toHexString(), access }, process.env.JWT_SECRET).toString();

  user.tokens.push({ access, token });

  return user.save().then(() => {
    return token;
  });
};

UserSchema.methods.removeToken = function (token) {
  const user = this;

  return user.update({
    $pull: {
      tokens: { token },
    },
  });
};


// ---------------- MODEL Methods ---------------- //
// one of the two versions of the function listed below ... maybe re-added at a later date.
// UserSchema.statics.findByRole = function (role, status) {
//   console.log('fBR: Starting ...')
//   var User = this;

//   return User.find({ roles: { $in: [role] } }).then((users) => {
//     if (!users) { return Promise.reject(); }
//   });

// };


// UserSchema.statics.findByRole = function (role, status) {
//   const User = this;
//   if (status === 'all') {
//     return new Promise((resolve, reject) => {
//       console.log('findByRole: Inside if block of all statuses');
//       // *** This uses a promise
//       const users = User.find({ roles: { $in: [role] } } ).then((users) => {
//         console.log('findByRole: After request to find users-teachers');
//         if (!users) return Promise.reject();
//         console.log('findByRole: End of if, just before return');
//         return Promise.resolve(users);
//       });
//       // *** This used a callback
//       // const users = User.find({ roles: { $in: [role] } }, function (err, users) {
//       //   console.log('findByRole: After request to find users-teachers');
//       //   if (err) return Promise.reject;
//       //   console.log('findByRole: End of if, just before return');
//       //   return Promise.resolve(users);
//       // });
//     });
//   } else {
//     return new Promise((resolve, reject) => {
//       const users = User.find({ status: status, roles: { $in: [role] } }, function (err, users) {
//         if (err) return Promise.reject;
//         return Promise.resolve(users);
//       });
//     });
//   }
//   console.log('findByRole: End of if');
// };

UserSchema.statics.findByUserName = function (userName, password) {
  const User = this;

  return User.findOne({ userName }).then((user) => {
    if (!user) {
      return Promise.reject();
    }

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          return resolve(user);
        }
        reject();
      });
    });
  });
};


UserSchema.statics.findByToken = function (token) {
  const User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return Promise.reject();
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth',
  });
};

UserSchema.statics.findByCredentials = function (email, password) {
  const User = this;

  return User.findOne({ email }).then((user) => {
    if (!user) {
      return Promise.reject();
    }

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          return resolve(user);
        }
        reject();
      });
    });
  });
};

UserSchema.pre('save', function (next) {
  const user = this;
  //location.updatedAt = new Date().getTime();

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

// --------------- VIRTUAL Methods ---------------- //
UserSchema.virtual('fullName').get(function () {
  return this.firstName + ' ' + this.lastName;
});

UserSchema.virtual('alphaName').get(function () {
  return this.lastName + ', ' + this.firstName;
});


// ------------------ Interface ------------------- //
const User = mongoose.model('User', UserSchema);
UserSchema.plugin(mongooseUniqueValidator);

module.exports = { User };
