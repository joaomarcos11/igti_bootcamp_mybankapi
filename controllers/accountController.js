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

  // const agencyInt = parseInt(agency);
  // const accountInt = parseInt(account);

  const accountSource = await findAccount(agencia, conta);
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
    await accountModel.updateAccount(agencia, conta, {
      $inc: { balance: -(valor + 8) },
    });
    await accountModel.updateAccount(parseInt(agency), parseInt(account), {
      $inc: { balance: valor },
    });
  } else {
    await accountModel.updateAccount(agencia, conta, {
      $inc: { balance: -valor },
    });
    await accountModel.updateAccount(parseInt(agency), parseInt(account), {
      $inc: { balance: valor },
    });
  }
  return { SaldoOrigem: accountSource.balance };
};

export { deposit, withdraw, consult, exclude, transfer };
