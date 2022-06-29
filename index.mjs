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

const HAND = ["Rock", "Paper", "Scissors"];
const OUTCOME = ["Bob wins", "Draw", "Alice wins"];
//interact interface which mirrors the interact object
const Player = (Who) => ({
  getHand: () => {
    const hand = Math.floor(Math.random() * 3);
    console.log(`${Who} played ${HAND[hand]}`);
    return hand;
  },
  seeOutcome: (outcome) => {
    console.log(`${Who} saw outcome ${OUTCOME[outcome]}`);
  },
});

//call interact objects from backend
await Promise.all([
  ctcAlice.p.Alice({
    //interact object
    ...Player("Alice"),
  }),
  ctcBob.p.Bob({
    //interact object
    ...Player("Bob"),
  }),
]);
