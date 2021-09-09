// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

// import "hardhat/console.sol";

contract Badge {

  address public owner = msg.sender;
  uint256 currentId = 0;
  struct BadgeInfo{
    uint256 id;
    address issuer;
    string issuerName;
    address recipient;
    string recipientName;
  }
  mapping(uint256 => BadgeInfo) public badgesById;
  event BadgeIssued(uint256 id, string issuerName, string recipientName);

  function issue(string memory _issuerName, address _recipient, string memory _recipientName) public {
    badgesById[currentId] = BadgeInfo({
      id: currentId,
      issuer: msg.sender,
      issuerName: _issuerName,
      recipient: _recipient,
      recipientName: _recipientName
    });

    emit BadgeIssued(badgesById[currentId].id, badgesById[currentId].issuerName, badgesById[currentId].recipientName);

    currentId++;
  }
}
