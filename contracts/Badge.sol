// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Badge {

  address public owner = msg.sender;
  uint16 currentId = 0;
  struct BadgeInfo{
    uint16 id;
    address issuer;
    string issuerName;
    address recipient;
    string recipientName;
  }
  mapping(uint16 => BadgeInfo) private badgesById;
  event badgeIssued(uint16 id, string issuerName, string recipientName);

  constructor() {
    console.log("Deploying the Badge contract with owner:", msg.sender);
  }

  function issue(string memory _issuerName, address _recipient, string memory _recipientName) public returns (BadgeInfo memory) {
    badgesById[currentId] = BadgeInfo({
      id: currentId,
      issuer: msg.sender,
      issuerName: _issuerName,
      recipient: _recipient,
      recipientName: _recipientName
    });
    emit badgeIssued(badgesById[currentId].id, badgesById[currentId].issuerName, badgesById[currentId].recipientName);
    return badgesById[currentId++];
  }

  function getBadge(uint16 _id) public view returns (BadgeInfo memory) {
    return badgesById[_id];
  }
}
