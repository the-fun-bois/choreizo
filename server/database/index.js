//import models here
const db = require('./db');
const User = require('./models/User');
const Group = require('./models/Group');
const Chore = require('./models/Chore');
const TradeChore = require('./models/TradeChore');
const Vote = require('./models/Vote');
const EthereumWallet = require('./models/EthereumWallet');
const UserGroup = require('./models/UserGroup');
const AssignedChore = require('./models/AssignedChore');
const TransferChore = require('./models/TransferChore');
const SwapChore = require('./models/SwapChore');

// add model associations here

/*----- User and Group Associations -----*/
User.belongsToMany(Group, { through: 'userGroup' });
Group.belongsToMany(User, { through: 'userGroup' });

/*----- Chore Associations -----*/
Chore.belongsTo(Group);
Group.hasMany(Chore);

/*----- Vote Associations -----*/
User.hasMany(Vote, { foreignKey: 'voterId', sourceKey: 'id' });
Vote.belongsTo(User, { foreignKey: 'voterId', targetKey: 'id' });

/*-----EthereumWallet Associations-----*/
EthereumWallet.belongsTo(User);
User.hasOne(EthereumWallet);

/*----AssignedChore Associations----*/
AssignedChore.belongsTo(User);
User.hasMany(AssignedChore);

AssignedChore.belongsTo(Chore);
Chore.hasMany(AssignedChore);

/*-------TransferChore Associations----*/
TransferChore.belongsTo(User, { as: 'originalOwner' });
TransferChore.belongsTo(User, { as: 'newOwner' });
TransferChore.belongsTo(AssignedChore);

/*-------SwapChore Associations------*/
SwapChore.belongsTo(User, { as: 'user1' });
SwapChore.belongsTo(User, { as: 'user2' });
SwapChore.belongsTo(AssignedChore, { as: 'assignedChore1' });
SwapChore.belongsTo(AssignedChore, { as: 'assignedChore2' });

/*----- TradeChore Associations -----*/
TradeChore.belongsTo(User, { foreignKey: 'originalOwnerId' });
TradeChore.belongsTo(User, { foreignKey: 'newOwnerId' });
User.hasMany(TradeChore, { foreignKey: 'originalOwnerId' });
User.hasMany(TradeChore, { foreignKey: 'newOwnerId' });

// export models here
module.exports = {
  db,
  User,
  Group,
  Chore,
  Vote,
  EthereumWallet,
  UserGroup,
  AssignedChore,
  TransferChore,
  SwapChore,
  TradeChore,
};
