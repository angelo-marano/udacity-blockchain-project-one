const BlockChain = require("../src/blockchain.js");

var assert = require("assert");
describe("Blockchain", function () {
  describe("#constructor()", function () {
    it("should create a chain with one (genesis) block", function () {
      const blockchain = new BlockChain.Blockchain();
      blockchain.chain.should.eventually.have.length(1);
    });
  });

  describe("#getChainHeight()", function () {
    it("should return the chain height for new chain", async function () {
      const blockchain = new BlockChain.Blockchain();
      const height = await blockchain.getChainHeight();
      assert.equal(height, 0);
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

      const signature = await blockchain.requestMessageOwnershipVerification(
        "dummy-address"
      );

      console.log("signature: " + signature);

      const star = {
        address: "dummy-address",
        signature,
        star: {
          ra: "1",
          dec: "1",
          story: "1",
        },
      };
      const block = await blockchain.submitStar(star);
      assert.equal(block, "Star registered successfully!");
    });
  });
});
