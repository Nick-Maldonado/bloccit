const flairQueries = require("../db/queries.flairs.js")

module.exports = {
  //new() goes here
  
  create(req, res, next){
    let newFlair= {
      title: req.body.name,
      color: req.body.color,
      postId: req.params.postId
    };
    flairQueries.addFlair(newFlair, (err, post) => {
      if(err){
        res.redirect(500, "/posts/new");
      } else {
        res.redirect(303, `/topics/${newPost.topicId}/posts/${post.id}`);
      }
    });
  },
}