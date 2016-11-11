var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://localhost:5432/wikistack');

var Page = sequelize.define('page', {
  title: {type: Sequelize.STRING, allowNull: false},
  urlTitle: {type: Sequelize.STRING, allowNull: false},
  content: {type: Sequelize.TEXT, allowNull: false},
  status: {type: Sequelize.ENUM("open", "closed")
})

var User = sequelize.define('user', {
  name: {type: Sequelize.STRING, allowNull: false},
  email: {type: Sequelize.STRING, unique: true, allowNull: false}
});

module.exports = {
	Page: Page,
	User: User
};