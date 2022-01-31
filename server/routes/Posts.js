const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();
  ////////Test Bed///////////
  function LoadPosts1() {
    const fileContent1 = fs.readFileSync("server/Data/postsTest.json");
    console.log("posts loaded to memory!");
    return JSON.parse(fileContent1);
  }
  
  let loadedPosts1 = LoadPosts1();
  console.log(loadedPosts1);
  
  function WritePosts1(Posts) {
    fs.writeFileSync("server/Data/postsTest.json", JSON.stringify(Posts));
  
    //also update loaded posts
    loadedPosts1 = LoadPosts1();
  }
  exports.getPostsHandeler1 = (req, res) => {
    res.json(loadedPosts1);
  };
  exports.postPostsHandeler1 = (req, res) => {
    console.log(req);
    console.log(req.query);
    console.log(req.content);
    console.log(req.params);
    const newPost1 = {
      id: req.query.id,
    };
    // loadedPosts1.unshift(newPost1);
  
    // fs.writeFileSync("server/Data/postsTest.json", JSON.stringify(loadedPosts1));
  
    res.send(loadedPosts1);
  };
  //////////////////////////

  function LoadPosts() {
    const fileContent = fs.readFileSync("server/Data/posts.json");
    console.log("posts loaded to memory!");
    return JSON.parse(fileContent);
  }
  //Read once, reference multiple. Happy memory :)
  let loadedPosts = LoadPosts();
  console.log(loadedPosts);
  
  function WritePosts(Posts) {
    fs.writeFileSync("server/Data/posts.json", JSON.stringify(Posts));
  
    //also update loaded posts
    loadedPosts = LoadPosts();
  }

  function GetPostById(postId) {
    const postById = loadedPosts.filter(
      (post) => post.id === postId
    );
    return postById[0];
  }
  exports.getPostsHandeler = (req, res) => {
    res.json(loadedPosts);
  };
 
  exports.getSinglePostHandeler = (req, res) => {
    res.json(GetPostById(req.params.PostId));
  };

  exports.postPostHandeler = (req, res) => {
    if (req.signedCookies.name === 'admin') {
      res.send('This is admin panel');
    } else if (req.signedCookies.name === 'user') {
      res.send('This is user data');
    } else {
      res.end();
    }
    console.log(req.query);
    console.log(req.body);
    console.log(req.params);
    const newPost = {
      id: req.query.id,
      itemName: req.query.name,
      description: req.query.description,
      category: req.query.category,
      status: req.query.status,
      quantity: req.query.quantity,
      price: req.query.price,
      collab: req.query.collab,
    };
    loadedPosts.unshift(newPost);
  
    fs.writeFileSync("server/Data/Posts.json", JSON.stringify(loadedPosts));
  
    res.send(loadedPosts);
  };

// posts put req handler:

exports.putPostHandeler = (req, res) => {
  if (req.signedCookies.name === 'admin') {
    res.send('This is admin panel');
  } else if (req.signedCookies.name === 'user') {
    res.send('This is user data');
  } else {
    res.end();
  }
    const Posts = loadedPosts;
    const PostsId = req.params.PostsId;
    const Post = GetPostById(PostsId);
    let updatedpost = {
      id: Posts.id,
      price: req.body.data.price || post.price,
      itemName: req.body.data.itemName || post.itemName,
      description: req.body.data.description || post.description,
      category: req.body.data.category || post.category,
      status: req.body.data.status || post.status,
      quantity:
        req.body.data.status === "Out of Stock"
          ? 0
          : req.body.data.quantity || post.quantity,
    };
    let updatedInventoriesData = Posts.map((post) =>
      post.id === postId ? updatedpost : post
    );
    fs.writeFileSync(
      "server/Data/inventories.json",
      JSON.stringify(updatedInventoriesData)
    );
    LoadPosts();
    res.send(updatedInventoriesData);
  };
  
  exports.deletePostHandeler = (req, res) => {
    if (req.signedCookies.name === 'admin') {
      res.send('This is admin panel');
    } else if (req.signedCookies.name === 'user') {
      res.send('This is user data');
    } else {
      res.end();
    }
    let postItems = loadedposts;
    let postId = req.params.postId;
    console.log(postId);
    const newposts = postItems.filter(
      (post) => post.id !== postId
    );
  
    WritePosts(newposts);
  
    res.send(updatedFullPostsData);
  };