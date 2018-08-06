module.exports = {
  init(app){
    const staticRoutes = require("../routes/static");
    app.use(staticRoutes);
    const marcoRoute = require("../routes/marco");
    app.use(marcoRoute);
  }
}