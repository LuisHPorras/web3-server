// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract Test {

  uint16 currentId = 0;
  struct TestInfo{
    uint16 id;
    address tester;
  }
  mapping(uint16 => TestInfo) public testsById;

  function add() public {
    testsById[currentId++] = TestInfo({
      id: currentId,
      tester: msg.sender
    });
  }
}
