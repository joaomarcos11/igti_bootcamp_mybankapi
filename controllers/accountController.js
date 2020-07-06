import { accountModel } from '../models/account.js';
import { findAccount, updateAccount } from './detailsController.js';

const deposit = async (data) => {
  const { agencia, conta, valor } = data; // req.body

  const account = await findAccount(agencia, conta);

  if (valor < 0) {
    throw new Error('Valor não permitido');
  }

  if (!account) {
    throw new Error('Conta não encontrada');
  }

  const newAccount = await updateAccount(agencia, conta, {
    $inc: { balance: valor },
  });

  return newAccount;
};

const withdraw = async (data) => {
  const { agencia, conta, valor } = data;

  const account = await findAccount(agencia, conta);

  if (valor < 0) {
    throw new Error('Valor não permitido');
  }

  if (!account) {
    throw new Error('Conta não encontrada');
  }

  if (valor > account.balance) {
    throw new Error('Valor acima do permitido');
  }
  const newAccount = await updateAccount(agencia, conta, {
    $inc: { balance: -(valor + 1) },
  });

  return newAccount;
};

const consult = async (data) => {
  const { agencia, conta } = data;

  const account = await findAccount(agencia, conta);

  return { Saldo: account.balance };
};

const exclude = async (data) => {
  const { agencia, conta } = data;

  const deleteAccount = await accountModel.findOneAndDelete({ agencia, conta });

  if (!deleteAccount) {
    throw new Error('Conta não encontrada');
  }

  return { ContasAtivas: await accountModel.countDocuments({ agencia }) };
};

const transfer = async (source, destination) => {
  const { agencia, conta, valor } = source; // req.body
  const { agency, account } = destination; // req.params

  let accountSource = await findAccount(agencia, conta);
  const accountDestination = await findAccount(
    parseInt(agency),
    parseInt(account)
  );

  if (!accountSource) {
    throw new Error('Conta origem inválida');
  }
  if (!accountDestination) {
    throw new Error('Conta destino inválida');
  }
  if (accountSource.agencia !== accountDestination.agencia) {
    await updateAccount(agencia, conta, {
      $inc: { balance: -(valor + 8) },
    });
    await updateAccount(parseInt(agency), parseInt(account), {
      $inc: { balance: valor },
    });
  } else {
    await updateAccount(agencia, conta, {
      $inc: { balance: -valor },
    });
    await updateAccount(parseInt(agency), parseInt(account), {
      $inc: { balance: valor },
    });
  }

  accountSource = await findAccount(agencia, conta);

  return { SaldoOrigem: accountSource.balance };
};

const agAverage = async (data) => {
  const { agencia } = data; // req.body

  const balanceAvg = await accountModel.aggregate([
    { $match: { agencia } },
    { $group: { _id: null, balanceMedio: { $avg: '$balance' } } },
  ]);

  return balanceAvg;
};

const lowerBalance = async (data) => {
  const { quantidade } = data;

  const lowBalance = await accountModel
    .find({}, { _id: 0, agencia: 1, conta: 1, balance: 1 })
    .sort({ balance: 1 })
    .limit(quantidade);

  return lowBalance;
};

const highestBalance = async (data) => {
  const { quantidade } = data;

  const highBalance = await accountModel
    .find({}, { _id: 0, agencia: 1, conta: 1, name: 1, balance: 1 })
    .sort({ balance: -1, name: 1 })
    .limit(quantidade);
  return highBalance;
};

const changeAgency = async () => {
  const listAgencies = [10, 25, 47, 33];

  for (let i of listAgencies) {
    let account = await accountModel
      .find({ agencia: i })
      .sort({ balance: -1 })
      .limit(1);

    await updateAccount(account[0].agencia, account[0].conta, {
      $set: { agencia: 99 },
    });
  }

  const agency99 = await accountModel.find(
    { agencia: 99 },
    { _id: 0, agencia: 1, conta: 1, name: 1, balance: 1 }
  );

  return agency99;
};
export {
  deposit,
  withdraw,
  consult,
  exclude,
  transfer,
  agAverage,
  lowerBalance,
  highestBalance,
  changeAgency,
};
