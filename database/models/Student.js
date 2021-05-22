const Sequelize = require('sequelize');
const db = require('../db');

const Student = db.define("student", {

// added email - not empty or null; must be a valid email
  // - [ ] imageUrl - with a default value
  // - [ ] gpa - decimal between 0.0 and 4.0

  firstname: {
    type: Sequelize.STRING,
    allowNull: false
  },

  lastname: {
    type: Sequelize.STRING,
    allowNull: false
  },

  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },

  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "https://rimatour.com/wp-content/uploads/2017/09/No-image-found.jpg"
  },

  gpa: {
    type: Sequelize.DOUBLE(1,1),
    allowNull: false,
    validate: {
      min: 0,
      max: 4
    }
  }

});

module.exports = Student;
