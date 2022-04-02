const BlockChain = require("../src/blockchain.js");

var assert = require("assert");
describe("Blockchain", function () {
  describe("#constructor()", function () {
    it("should create a chain with one (genesis) block", function () {
      const blockchain = new BlockChain.Blockchain();
      setTimeout(() => {
        assert.equal(blockchain.chain.length, 1);
      }, 1000);
    });
  });

  describe("#getChainHeight()", function () {
    it("should return the chain height for new chain", async function () {
      const blockchain = new BlockChain.Blockchain();
      setTimeout(async () => {
        const height = await blockchain.getChainHeight();
        assert.equal(height, 0);
      }, 1000);
    });
  });

  describe("#requestMessageOwnershipVerification()", async function () {
    it("Should send correct message when requesting verification", async function () {
      const blockchain = new BlockChain.Blockchain();
      const message = await blockchain.requestMessageOwnershipVerification(
        "dummy-address"
      );
      const parts = message.split(":");
      assert.equal(parts[0], "dummy-address");
      assert.equal(parts[2], "starRegistry");
    });
  });

  describe("#submitStar()", async function () {
    it("Should submit a star", async function () {
      const blockchain = new BlockChain.Blockchain();

      const message = await blockchain.requestMessageOwnershipVerification(
        "dummy-address"
      );

      const address = "dummy-address";
      const star = {
        ra: "1",
        dec: "1",
        story: "1",
      };
      const block = await blockchain.submitStar(
        address,
        message,
        message,
        star
      );
      assert.equal(block, "Star registered successfully!");
    });
  });
});
