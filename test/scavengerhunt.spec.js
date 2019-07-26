const ScavengerHunt = artifacts.require("ScavengerHunt");

contract('ScavengerHunt', function([account1]) {
  it("should assert true", async function() {
    const NUM_CLUES = 5;
    const clueAccounts = [...Array(NUM_CLUES).keys()].map(() => web3.eth.accounts.create());

    const game = await ScavengerHunt.new(clueAccounts.map(acc => acc.address));
    
    for (const i in clueAccounts) {
      const clue = clueAccounts[i];
      const signed = clue.sign(web3.utils.keccak256(account1));
      const { receipt } = await game.findClue(signed.signature);
      assert.equal(receipt.logs[0].event, (i < NUM_CLUES - 1) ? 'NextStage' : 'Complete');
    }
  });
});
