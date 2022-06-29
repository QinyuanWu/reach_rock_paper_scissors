import { loadStdlib } from "@reach-sh/stdlib";
import * as backend from "./build/index.main.mjs";
const stdlib = loadStdlib();

//initialize accounts
const startingBalance = stdlib.parseCurrency(100); //100 tokens
const accAlice = await stdlib.newTestAccount(startingBalance);
const accBob = await stdlib.newTestAccount(startingBalance);

//deploy contract
//deployer needs to be a participant
const ctcAlice = accAlice.contract(backend); //Alice is the deployer
const ctcBob = accBob.contract(backend, ctcAlice.getInfo()); //let Alice know who is attached to the contract

//call interact objects from backend
await Promise.all([
  ctcAlice.p.Alice({
    //interact object
  }),
  ctcBob.p.Alice({
    //interact object
  }),
]);
