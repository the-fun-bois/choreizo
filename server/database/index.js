//import models here
const db = require('./db');
const User = require('./models/User');
const Group = require('./models/Group');
const Chore = require('./models/Chore');
const Trade = require('./models/Trade');
const Vote = require('./models/Vote');
const EthereumWallet = require('./models/EthereumWallet')
const UserGroup = require('./models/UserGroup')
const AssignedChores = require('./models/AssignedChores')
const SellChore = require('./models/SellChore')

// add model associations here

/*----- User and Group Associations -----*/
User.belongsToMany(Group, { through: 'userGroup' });
Group.hasMany(User);

/*----- Chore Associations -----*/
Chore.belongsTo(Group);
Group.hasMany(Chore);

/*----- Vote Associations -----*/
User.hasMany(Vote, { foreignKey: 'voterId', sourceKey: 'id' });
Vote.belongsTo(User, { foreignKey: 'voterId', targetKey: 'id' });
// Vote.belongsTo(AssignedChore)
// AssignedChore.hasMany(Vote);

/*----- Trade Associations -----*/
Trade.belongsTo(User, { foreignKey: 'originalOwnerId' });
Trade.belongsTo(User, { foreignKey: 'newOwnerId' });
User.hasMany(Trade, { foreignKey: 'originalOwnerId' });
User.hasMany(Trade, { foreignKey: 'newOwnerId' });
// Trade.belongsTo(AssignedChore)
// AssignedChore.hasOne(Trade)

// export models here
module.exports = {
  db,
  User,
  Group,
  Chore,
  Trade,
  Vote,
};
