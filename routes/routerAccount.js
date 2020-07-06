import express from 'express';
import {
  deposit,
  withdraw,
  consult,
  exclude,
  transfer,
  agAverage,
  lowerBalance,
  highestBalance,
  changeAgency,
} from '../controllers/accountController.js';

const routerAccount = express.Router();

routerAccount.get('/', async (_, res) => {
  res.send({ result: 'Ok' });
});

routerAccount.patch('/deposit/', async (req, res) => {
  try {
    res.status(200).send(await deposit(req.body));
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
/*
Exemplo de corpo de requisição para /deposit/:
{
	"agencia": 10,
	"conta": 1005,
	"valor": 11
}
*/

routerAccount.patch('/withdraw/', async (req, res) => {
  try {
    res.status(200).send(await withdraw(req.body));
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
/*
Exemplo de corpo de requisição para /withdraw/:
{
	"agencia": 10,
	"conta": 1001,
	"valor": 10
}
*/

routerAccount.get('/balance/', async (req, res) => {
  try {
    res.status(200).send(await consult(req.body));
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
/*
Exemplo de corpo de requisição para /balance/:
{
	"agencia": 25,
	"conta": 3013
}
*/

routerAccount.delete('/delete/', async (req, res) => {
  try {
    res.status(200).send(await exclude(req.body));
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
/*
Exemplo de corpo de requisição para /delete/:
{
	"agencia": 10,
	"conta": 1003
}
*/

routerAccount.post('/transfer/:agency/:account/', async (req, res) => {
  try {
    res.status(200).send(await transfer(req.body, req.params));
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
/*
Exemplo de corpo de requisição para /transfer/25/3033/:
{
	"agencia": 10,
	"conta": 1009,
	"valor": 10
}
*/

routerAccount.get('/avg_balance/', async (req, res) => {
  try {
    res.status(200).send(await agAverage(req.body));
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
/*
Exemplo de corpo de requisição para /avg_balance/:
{
	"agencia": 10
}
*/

routerAccount.get('/lower_balance/', async (req, res) => {
  try {
    res.status(200).send(await lowerBalance(req.body));
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
/*
Exemplo de corpo de requisição para /lower_balance/:
{
	"quantidade": 2
}
*/

routerAccount.get('/highest_balance/', async (req, res) => {
  try {
    res.status(200).send(await highestBalance(req.body));
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
/*
Exemplo de corpo de requisição para /highest_balance/:
{
	"quantidade": 10
}
*/

routerAccount.post('/change_agency/', async (_, res) => {
  try {
    res.status(200).send(await changeAgency());
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default routerAccount;
