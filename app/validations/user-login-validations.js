const userLoginValidationSchema={
    email:{
        in:['body'],
        exists:{errorMessage:"email is required"},
        notEmpty:{errorMessage:'email should not be empty'},
        isEmail:{errorMessage:' email should be in email format '},
        trim:true,
        normalizeEmail:true,
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
    }
}
module.exports=userLoginValidationSchema