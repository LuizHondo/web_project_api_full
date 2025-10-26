const mongoose = require('mongoose')
const validator = require('validator')
const urlRegex = /^(?:https?:\/\/)(?:www\.)?(?:localhost|(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)+))(?:\:\d{1,5})?(?:\/[A-Za-z0-9._~:\/?%#[\]@!$&'()*+,;=\-]*)?#?$/;


const userSchema = new mongoose.Schema({
  name:{
    type:String,
    minlength:2,
    maxlength:30,
    required:true,
    default: 'Jacques Cousteau'
  },
  about:{
    type:String,
    minlength:2,
    maxlength:30,
    required:true,
    default: 'Explorer'
  },
  avatar:{
    type:String,
    default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',
    validate:{
      validator: (v) => urlRegex.test(v),
      message: "Invalid avatar URL"
    }
  },
  email:{
    type:String,
    required: true,
    unique:true,
    validate:{
      validator: (email) => validator.isEmail(email)
    }
  },
  password:{
    type: String,
    required: true,
    minlength: 8,
    select: false
  }
})

module.exports = mongoose.model('user',userSchema)