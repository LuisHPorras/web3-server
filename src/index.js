const { ethers } = require("ethers");
import TestArtifact from "./artifacts/build-info/54a0853002c0b73a06d84c9324c3dc66.json"

const address = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';
const abi = TestArtifact.abi;
// Automatically connects to https://localhost:8545
const provider = new ethers.providers.JsonRpcProvider();

async function main() {
    const Test = new ethers.Contract(address, abi, provider);
    const test = await Test.deploy();

    await test.deployed();

    console.log("Test.sol deployed to:", test.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });