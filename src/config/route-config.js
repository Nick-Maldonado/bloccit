module.exports = {
  init(app){
    const staticRoutes = require("../routes/static");
    const marcoRoute = require("../routes/marco");
    const aboutRoute = require("../routes/about");
    const topicRoutes = require("../routes/topics");

    app.use(marcoRoute);
    app.use(staticRoutes);
    app.use(aboutRoute);
    app.use(topicRoutes);
  }
}