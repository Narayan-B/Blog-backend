require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const compression = require('compression');
const { checkSchema } = require('express-validator');
const uploads = require('./app/middlewares/uploads');
const configureDB = require('./config/db');
const cors = require('cors');

const app = express();
const port = 4444;

// Middleware
app.use(helmet());
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Logging
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));

// Route-specific middleware
app.use(compression({
    level: 6,
    threshold: 100 * 1000,
    filter: (req, res) => {
        if (req.headers['x-no-compression']) {
            return false;
        }
        return compression.filter(req, res);
    }
}));

// Database configuration
configureDB();

// Routes
const userRegisterValidationSchema = require('./app/validations/user-register-validation');
const userLoginValidationSchema = require('./app/validations/user-login-validations');
const postCreateValidationSchema = require('./app/validations/post-create-validation');
const userCltr = require('./app/controllers/user-cltr');
const postCltr = require('./app/controllers/post-cltr');
const authenticateUser = require('./app/middlewares/authenticate-user');
const authorizeUser = require('./app/middlewares/authorize-user');
const commentValidationSchema = require('./app/validations/comment-validation');
const commentCltr = require('./app/controllers/comment-cltr');
const profileCltr = require('./app/controllers/profile-cltr');
const profileValidationSchema = require('./app/validations/profile-validation');
const profileUpdateValidationSchema = require('./app/validations/profile-update-validation');

// User routes
app.post('/api/users/register', checkSchema(userRegisterValidationSchema), userCltr.Register);
app.post('/api/users/login', checkSchema(userLoginValidationSchema), userCltr.Login);
app.get('/api/users/account', authenticateUser, authorizeUser(['user']), userCltr.account);
app.get('/checkemail', userCltr.checkEmail);
app.post('/api/users/profile',authenticateUser,authorizeUser(['user']),checkSchema(profileValidationSchema),uploads.single('profile'),profileCltr.create)
app.get('/api/users/profile',authenticateUser,authorizeUser(['user']),profileCltr.see)
app.put('/api/users/profile',authenticateUser,authorizeUser(['user']),checkSchema(profileUpdateValidationSchema),uploads.single('profile'),profileCltr.update)
// Post routes
app.post('/api/posts', authenticateUser, authorizeUser(['user']), checkSchema(postCreateValidationSchema), postCltr.create);
app.get('/api/posts', postCltr.allPosts);
app.get('/api/posts/myposts', authenticateUser, authorizeUser(['user']), postCltr.myPosts);
app.get('/api/posts/:id', postCltr.singlePost);
app.put('/api/posts/:id', authenticateUser, authorizeUser(['user']), checkSchema(postCreateValidationSchema), postCltr.updatePost);
app.delete('/api/posts/:id', authenticateUser, authorizeUser(['user']), postCltr.deletePost);


//comment routes
app.post('/api/post/:postId/comment',authenticateUser,authorizeUser(['user']),checkSchema(commentValidationSchema),commentCltr.create)
app.get('/api/post/:postId/comment',commentCltr.list)
app.get('/api/post/:postId/comment/:commentId',commentCltr.listOne)
app.put('/api/post/:postId/comment/:commentId',authenticateUser,authorizeUser(['user']),checkSchema(commentValidationSchema),commentCltr.update)
app.delete('/api/post/:postId/comment/:commentId',authenticateUser,authorizeUser(['user']),checkSchema(commentValidationSchema),commentCltr.delete)
// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
