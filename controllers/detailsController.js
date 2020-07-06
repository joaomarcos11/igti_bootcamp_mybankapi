import { accountModel } from '../models/account.js';

const findAccount = async (agency, account) => {
  return await accountModel.findOne({ agencia: agency, conta: account });
};

const updateAccount = async (agency, account, params) => {
  return await accountModel.findOneAndUpdate(
    { agencia: agency, conta: account },
    params,
    { new: true }
  );
};

export { findAccount, updateAccount };
