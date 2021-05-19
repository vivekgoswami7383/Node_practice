const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  Name: {
    type: String,
    trim: true,
    required: true,
  },
  Address: {
    type: String,
    trim: true,
    required: true,
  },
  Gender: {
    type: String,
    trim: true,
    required: true,
  },
  Phone: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    minLength: [10, "Phone Number Must Be Contain 10 Number"],
    maxLength: [10, "Phone Number Must Be Contain 10 Number"],
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email Is Not Valid");
      }
    },
  },
  Password: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    minLength: [7, "Paaword Must Contain 8 Charachter"],
  },
  tokens: [
    {
      token: {
        type: String,
        trim: true,
      },
    },
  ],
  avatar: {
    type: Buffer,
  },
  time: {
    type: Number,
    default: new Date().getTime(),
  },
});

// UserSchema.statics.findbyCredentials = async (Email,Password)=>{
// 	let user = await User.findOne({ Email : Email})

// 	if(!user){
// 		throw new Error('Unable To Login')
// 	}

// 	let isMatch = (Password === user.Password)

// 	if(!isMatch){
// 		throw new Error('Unable To Login')
// 	}
// 	return user
// }

UserSchema.methods.generateToken = async function () {
  const user = this;

  const token = await jwt.sign({ _id: user._id }, "MySecretKey");

  user.tokens = user.tokens.concat({ token });

  await user.save();

  return token;
};

const User = mongoose.model("user", UserSchema);

module.exports = User;
