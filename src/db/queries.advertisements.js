const Advertisement = require("./models").Advertisement;

module.exports = {
  getAllAdvertisement(callback){
    return Advertisement.all()
    .then((advertisements) => {
      callback(null, advertisements);
    })
    .catch((err) => {
      callback(err);
    })
  },

  getAdvertisement(id, callback){
    return Advertisement.findById(id)
    .then((advertisement) => {
      callback(null, advertisement);
    })
    .catch((err) => {
      callback(err);
    })
  },


  addAdvertisement(newAdvertisement, callback){
    return Advertisement.create({
      title: newAdvertisement.title,
      description: newAdvertisement.description
    })
    .then((advertisement) => {
      callback(null, advertisement);
    })
    .catch((err) => {
      callback(err);
    })
  },

  create(req, res, next){
    let newAdvertisement = {
      title: req.body.title,
      description: req.body.description
    };
    advertisementQueries.addAdvertisement(newAdvertisement, (err, advertisement) => {
      if(err){
        res.redirect(500, "/advertisement/new");
      } else {
        res.redirect(303, `/advertisement/${advertisement.id}`);
      }
    });
  },

  deleteAdvertisement(id, callback){
    return Advertisement.destroy({
      where: {id}
    })
    .then((advertisement) => {
      callback(null, advertisement);
    })
    .catch((err) => {
      callback(err);
    })
  },

  updateAdvertisement(id, updatedAdvertisement, callback){
    return Advertisement.findById(id)
    .then((advertisement) => {
      if(!advertisement){
        return callback("Advertisement not found");
      }
      
      advertisement.update(updatedAdvertisement, {
        fields: Object.keys(updatedAdvertisement)
      })
      .then(() => {
        callback(null, advertisement);
      })
      .catch((err) => {
        callback(err);
      });
    });
  }
}