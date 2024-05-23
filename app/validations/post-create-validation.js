const postCreateValidationSchema = {
    title: {
        in: ['body'],
        exists: { errorMessage: 'Title is required' },
        notEmpty: { errorMessage: "Title should not be empty" },
        trim: true
    },
    content: {
        in: ['body'],
        exists: { errorMessage: 'Content is required' },
        notEmpty: { errorMessage: "Content should not be empty" },
        trim: true
    },
   
    pic: {
        in: ['body'],
        exists: { errorMessage: 'image is required' },
        notEmpty: { errorMessage: "image should not be empty" },
        trim: true,
        isURL:{errorMessage:'should be valid url'}
        
    }
};

module.exports = postCreateValidationSchema;
