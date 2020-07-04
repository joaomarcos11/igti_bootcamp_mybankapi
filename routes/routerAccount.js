import express from 'express';
import {
  deposit,
  withdraw,
  consult,
  exclude,
  transfer,
} from '../controllers/accountController.js';

const routerAccount = express.Router();

routerAccount.get('/', async (req, res) => {
  res.send({ result: 'Ok' });
});

routerAccount.patch('/deposit/', async (req, res) => {
  try {
    res.status(200).send(await deposit(req.body));
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

routerAccount.patch('/withdraw/', async (req, res) => {
  try {
    res.status(200).send(await withdraw(req.body));
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

routerAccount.get('/balance/', async (req, res) => {
  try {
    res.status(200).send(await consult(req.body));
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

routerAccount.delete('/delete/', async (req, res) => {
  try {
    res.status(200).send(await exclude(req.body));
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

routerAccount.post('/transfer/:agency/:account/', async (req, res) => {
  try {
    res.status(200).send(await transfer(req.body, req.params));
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default routerAccount;
