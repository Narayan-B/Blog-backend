const commentValidationSchema={
    content:{
        in:['body'],
        exists:{errorMessage:"content is required"},
        notEmpty:{errorMessage:"content should not be empty"},
        trim:true

    }
    // post:{
    //     custom:{
    //         options:function(value,{req}){
    //             if(!req.post){
    //                 throw new Error('post id is required')
    //             }
    //             return true
    //         }
    //     }
    // },
    // author:{
    //     custom:{
    //         options:function(value,{req}){
    //             if(!req.author){
    //                 throw new Error('author id is required')
    //             }
    //             return true
    //         }
    //     }
    // }
}
module.exports=commentValidationSchema