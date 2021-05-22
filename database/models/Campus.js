const Sequelize = require('sequelize');
const db = require('../db');

// add 2 new items: imageUrl - with a default value,
// address - not empty or null

const Campus = db.define("campus", {

  name: {
    type: Sequelize.STRING,
    allowNull: false
  },

  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: "https://rimatour.com/wp-content/uploads/2017/09/No-image-found.jpg"
  },

  address: {
    type: Sequelize.STRING,
    allowNull: false
  },


  description: {
    type: Sequelize.STRING,
  }

});

module.exports = Campus;
