const { expect } = require("chai");

describe("Badge contract", function () {

  let owner;
  let issuer;
  let recipient;
  let badgeInfo;

  let Badge;
  let badge;

  before( async function () {

    // Save account addresses once to use in each test 
    const accounts = await ethers.getSigners();
    owner = accounts[0];
    issuer = accounts[1];
    recipient = accounts[2];

    // Badge info to use
    badgeInfo = {
      id: 0,
      issuer: issuer.address,
      issuerName: "Ivan Illich",
      recipient: recipient.address,
      recipientName: "Gustavo Esteva"
    };

  });

  beforeEach( async function () {
    
    // Deploy fresh contract before each test
    Badge = await ethers.getContractFactory("Badge");
    badge = await Badge.deploy();
    await badge.deployed();

  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {

      expect(await badge.owner()).to.equal(owner.address);
        
    });    
  });


  describe("Issuing", function () {
    it("Should emit a badge issued event", async function () {

      await expect(badge.issue(badgeInfo.issuerName, badgeInfo.recipient, badgeInfo.recipientName))
        .to.emit(badge, "BadgeIssued")
        .withArgs(badgeInfo.id, badgeInfo.issuerName, badgeInfo.recipientName);

    });

    it("Should return a badge", async function () {

      await badge.issue(badgeInfo.issuerName, badgeInfo.recipient, badgeInfo.recipientName);

      const badgeResult = await badge.badgesById(badgeInfo.id);
      // const recipientResult = await badge.recipientById(badgeInfo.id);
      console.log(badgeResult);

      expect(badgeResult).to.deep.equal(badgeInfo);

    });
  });
});
