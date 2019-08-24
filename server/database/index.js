//import models here
const db = require('./db');
const User = require('./models/User');
const Group = require('./models/Group');
const Chore = require('./models/Chore');
const Trade = require('./models/Trade');
const Vote = require('./models/Vote');
const EthereumWallet = require('./models/EthereumWallet')
const UserGroup = require('./models/UserGroup')
const AssignedChore = require('./models/AssignedChore')
const SellChore = require('./models/SellChore')
const SwapChore = require('./models/SwapChore')

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
// Vote.belongsTo(AssignedChores)
// AssignedChore.hasMany(Vote);

/*----- Trade Associations -----*/
Trade.belongsTo(User, { foreignKey: 'originalOwnerId' });
Trade.belongsTo(User, { foreignKey: 'newOwnerId' });
User.hasMany(Trade, { foreignKey: 'originalOwnerId' });
User.hasMany(Trade, { foreignKey: 'newOwnerId' });
// Trade.belongsTo(AssignedChore)
// AssignedChore.hasOne(Trade)

/*-----EtheriumWallet Associations-----*/
EthereumWallet.belongsTo(User)
User.hasOne(EthereumWallet)

/*----AssignedChore Associations----*/
AssignedChore.belongsTo(User)
User.hasMany(AssignedChore)

AssignedChore.belongsTo(Chore)
Chore.hasMany(AssignedChore)

/*-------SellChore Associations----*/
SellChore.belongsTo(User, {as: 'originalOwner'})
SellChore.belongsTo(User, {as: 'newOwner'})
SellChore.belongsTo(Chore, {as: 'assignedChore'})

//User.hasMany(SellChore)
// SellChore.belongsTo(Chore)
// Chore.hasMany(SellChore)

/*-------SwapChore Associations------*/
SwapChore.belongsTo(User, {as: 'user1'})
SwapChore.belongsTo(User, {as: 'user2'})
SwapChore.belongsTo(AssignedChore, {as: 'assignedChore1'})
SwapChore.belongsTo(AssignedChore, {as: 'assignedChore2'})
// User.hasMany(SwapChore)
// AssignedChore.hasMany(SwapChore)


// export models here
module.exports = {
  db,
  User,
  Group,
  Chore,
  Trade,
  Vote,
  EthereumWallet,
  UserGroup,
  AssignedChore,
  SellChore,
  SwapChore,
};
