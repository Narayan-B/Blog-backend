const User=require('../models/user-model')
const userRegisterValidationSchema={
    username:{
        in:['body'],
        exists:{errorMessage:"username is required"},
        notEmpty:{errorMessage:'username should not be empty'},
        isString:{errorMessage:'username should contain Alphabets or numbers'},
        trim:true
    },
    email:{
        in:['body'],
        exists:{errorMessage:"email is required"},
        notEmpty:{errorMessage:'email should not be empty'},
        isEmail:{errorMessage:' email should be in email format '},
        trim:true,
        normalizeEmail:true,
        custom:{
            options:async function(value){
                const user=await User.findOne({email:value})
                if(user){
                    throw new Error('Email already exists')
                }
                return true
            }
        }
    },
    password:{
        in:['body'],
        exists:{errorMessage:"password is required"},
        notEmpty:{errorMessage:'password should not be empty'},
        isStrongPassword:{errorMessage:'password should be strong'},
        isLength:{
            options:{min:8,max:128},
            errorMessage:'should be in b/w 8-128 chars'
        },
        trim:true
    },
   
    bio:{
        in:['body'],
        exists:{errorMessage:"bio  is required"},
        notEmpty:{errorMessage:'bio should not be empty'},
        trim:true
    }
}
module.exports=userRegisterValidationSchema