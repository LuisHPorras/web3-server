const { expect } = require("chai");

describe("Badge contract", function () {

  let owner;
  let issuer;
  let recipient;
  let badgeInfo;

  let Badge;
  let badge;
  let badgeIssuerInstance;

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

    // Conect to issuer account
    badgeIssuerInstance = await badge.connect(issuer);

  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {

      expect(await badgeIssuerInstance.owner()).to.equal(owner.address);
        
    });    
  });


  describe("Issuing", function () {
    it("Should emit a badge issued event", async function () {

      await expect(badgeIssuerInstance.issue(badgeInfo.issuerName, badgeInfo.recipient, badgeInfo.recipientName))
        .to.emit(badgeIssuerInstance, "BadgeIssued")
        .withArgs(badgeInfo.id, badgeInfo.issuerName, badgeInfo.recipientName);

    });

    it("Should return a badge", async function () {

      await badgeIssuerInstance.issue(badgeInfo.issuerName, badgeInfo.recipient, badgeInfo.recipientName);

      const badgeResult = await badgeIssuerInstance.badgesById(badgeInfo.id);
      
      expect(badgeResult.id).to.equal(badgeInfo.id);
      expect(badgeResult.issuer).to.equal(badgeInfo.issuer);
      expect(badgeResult.issuerName).to.equal(badgeInfo.issuerName);
      expect(badgeResult.recipient).to.equal(badgeInfo.recipient);
      expect(badgeResult.recipientName).to.equal(badgeInfo.recipientName);

    });
  });
});
