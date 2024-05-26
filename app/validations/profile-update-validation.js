const profileUpdateValidationSchema={
    profile:{
        in:['form-data'],
        exists:{errorMessage:'profile is required'},
        notEmpty:{errorMessage:'profile should not be empty'}
    }
}
module.exports=profileUpdateValidationSchema