module.exports = {
  init(app){
    const staticRoutes = require("../routes/static");
    const marcoRoute = require("../routes/marco");
    const aboutRoute = require("../routes/about");
    const topicRoutes = require("../routes/topics");
    const postRoutes = require("../routes/posts");
    const userRoutes = require("../routes/users");

    app.use(marcoRoute);
    app.use(staticRoutes);
    app.use(aboutRoute);
    app.use(topicRoutes);
    app.use(postRoutes);
    app.use(userRoutes);
  }
}