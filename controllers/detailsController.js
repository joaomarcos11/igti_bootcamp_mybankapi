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

// const deleteAccount = async (agency, account) => {
//   const account = await accountModel.findOneAndDelete({
//     agencia: agency,
//     conta: account,
//   });

//   if (!account) {
//     throw new Error('Conta não encontrada');
//   }

//   return { ContasAtivas: await accountModel.countDocuments({ agency }) };
// };

export { findAccount, updateAccount };
