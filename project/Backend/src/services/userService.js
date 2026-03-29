const userModel = require('../models/userModel');

exports.getAllUsers = async () => {
  return await userModel.getUsers();
};

exports.createUser = async (data) => {
  return await userModel.createUser(data);
};