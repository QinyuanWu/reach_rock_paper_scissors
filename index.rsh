//backend
//define actors
"reach 0.1"; //start with version to compile with

const Player = {
  getHand: Fun([], UInt),
  seeOutcome: Fun([], UInt),
};

export const main = Reach.app(() => {
  const Alice = Participant("Alice", {
    //interact interface
    ...Player,
  });
  const Bob = Participant("Bob", {
    //interact interface, inherit methods from Player
    ...Player,
  });
  init(); //move to step

  //Alice into local step
  Alice.only(() => {
    const handAlice = declassify(interact.getHand());
  });
  //send info to blockchain
  Alice.publish(handAlice);
});
