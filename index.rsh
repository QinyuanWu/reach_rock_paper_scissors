//backend
//define actors
"reach 0.1"; //start with version to compile with

const Player = {
  getHand: Fun([], UInt), //inside [] are params, then return type
  seeOutcome: Fun([UInt], Null),
};

export const main = Reach.App(() => {
  const Alice = Participant("Alice", {
    //interact interface
    ...Player,
  });
  const Bob = Participant("Bob", {
    //interact interface, inherit methods from Player
    ...Player,
  });
  init(); //move to step

  //Alice into local step(offchain)
  Alice.only(() => {
    const handAlice = declassify(interact.getHand()); //interaction
  });
  Alice.publish(handAlice); //send info to blockchain(consensus step, immutable)
  commit(); //return to step

  Bob.only(() => {
    const handBob = declassify(interact.getHand());
  });
  Bob.publish(handBob);

  //!!why not publish the outcome?
  const outcome = (handAlice + (4 - handBob)) % 3;
  commit();

  //move from consensus step to local step and return
  each([Alice, Bob], () => {
    interact.seeOutcome(outcome);
  });
});

//./reach compile - build backend
