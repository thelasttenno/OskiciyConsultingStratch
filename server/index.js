const express = require('express');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const PostsRoutes = require("./routes/Posts");
const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 5000;
const basicAuth = require('express-basic-auth');
const auth =(basicAuth({ authorizer: myAuthorizer, unauthorizedResponse: getUnauthorizedResponse } ))
const cookieParser = require('cookie-parser');
const UIDGenerator = require('uid-generator');
const fs = require("fs");
user = {
  _id: "19234",
  Name:"admin",
  PasswordHashed:"",
  isAdmin:"true"
}

// const Users = fs.readFileSync('models/userModel.json');
// let loadedUsers = JSON.parse(Users);

// console.log(loadedUsers);
// let user = null;
// ///find user function///
// async function findOne(username){
//   let user = loadedUsers.filter((User) => User.id === username);
//   console.log(user);
//   return user;
// }

///Auth Function//
async function myAuthorizer(username, password) {
    // console.log(username);
    // console.log(password);
    // await findOne(username)
    // console.log(user);

    const userMatches = basicAuth.safeCompare(username, 'customuser' || 'admin')
    const passwordMatches = basicAuth.safeCompare(password, 'custompassword' || 'adminpassword')
    return userMatches & passwordMatches 
    // const hashedPassword = await hashIt(password);
    // const hashedCheck = await compareIt(password, hashedPassword);

    // & hashedCheck
}

///Password Hashing/////
const bcrypt = require('bcrypt');
const { TIMEOUT } = require('dns');
async function hashIt(password){
  const salt = await bcrypt.genSalt(6);
  const hashed = await bcrypt.hash(password, salt);
}
// compare the password user entered with hashed pass.
async function compareIt(password, hashedPassword){
  console.log(password);
  console.log(hashedPassword);
  const validPassword = await bcrypt.compare(password, hashedPassword);
}

///Autherizer options/////
function getUnauthorizedResponse(req) {
  return req.auth
      ? ('Credentials ' + req.auth.user + ':' + req.auth.password + ' rejected')
      : 'No credentials provided'
}

// Multi-process to utilize all CPU cores.
if (!isDev && cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  });

} else {
  const app = express();

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, '../react-ui/build')));
  app.use(cookieParser('TennoGen'));

  // Answer API requests.
  app.use('/posts', PostsRoutes.getPostsHandeler);
  app.get('/postsTest', PostsRoutes.getPostsHandeler1);
  app.get('/singlepost/:postID', PostsRoutes.getSinglePostHandeler)
  app.post('/post/:postID', PostsRoutes.postPostHandeler);
  app.put('/post/:postID', PostsRoutes.putPostHandeler);
  app.delete('/post/:postID', PostsRoutes.deletePostHandeler);
  app.use('/authenticate', auth, (req, res) => {
    const options = {
      httpOnly: true,
      signed: true,
      maxAge: 7200000, // 2 hours
    };
    let token = new UIDGenerator(user._id)
    res.cookie('token', token, options)
    .send({
      _id: user._id,
      name: user.Name,
      isAdmin: user.isAdmin,
      token: token
    })
  });
  app.get('/read-cookie', (req, res) => {
    console.log(req.signedCookies.token);
    let token = new UIDGenerator(user._id)
    console.log(token);
    if (req.signedCookies.token !== undefined) {
      res.send({ token: token });
    } else {
      res.send({ token: undefined });
    }
  });
  
  app.get('/clear-cookie', (req, res) => {
    res.clearCookie('token').end();
  });

  // All remaining requests return the React app, so it can handle routing.
  app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
  });

  app.listen(PORT, function () {
    console.error(`Node ${isDev ? 'dev server' : 'cluster worker '+process.pid}: listening on port ${PORT}`);
  });
}
