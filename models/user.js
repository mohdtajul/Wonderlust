const mongoose = require("mongoose");

// universal import (ESM + CommonJS safe)
const passportLocalMongoosePkg = require("passport-local-mongoose");
const passportLocalMongoose =
  passportLocalMongoosePkg.default || passportLocalMongoosePkg;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
