const { expect } = require("chai");

describe("Badge", function () {
  
  it("Should emit two badge issued events", async function () {

    const accounts = await hre.ethers.getSigners();
  
    const Badge = await ethers.getContractFactory("Badge");
    const badge = await Badge.deploy();
    await badge.deployed();
    
    const badgeInfo = {
      id: 0,
      issuer: accounts[0].address,
      issuerName: "Ivan Illich",
      recipient: accounts[1].address,
      recipientName: "Gustavo Esteva"
    };

    await expect(badge.issue(badgeInfo.issuerName, badgeInfo.recipient, badgeInfo.recipientName))
      .to.emit(badge, "BadgeIssued")
      .withArgs(badgeInfo.id, badgeInfo.issuerName, badgeInfo.recipientName);
  });

  it("Should return a badge", async function () {

    const accounts = await hre.ethers.getSigners();
  
    const Badge = await ethers.getContractFactory("Badge");
    const badge = await Badge.deploy();
    await badge.deployed();
    
    const badgeInfo = {
      id: 0,
      issuer: accounts[0].address,
      issuerName: "Ivan Illich",
      recipient: accounts[1].address,
      recipientName: "Gustavo Esteva"
    };

    await badge.issue(badgeInfo.issuerName, badgeInfo.recipient, badgeInfo.recipientName);
    await badge.issue(badgeInfo.issuerName, badgeInfo.recipient, badgeInfo.recipientName);

    const badgeResult = await badge.badgesById(badgeInfo.id);
    console.log(await badge.badgesById(0));


    expect(badgeResult).to.deep.equal(badgeInfo);

  });
});
