module.exports = async ({
    getNamedAccounts,
    deployments
  }) => {

    const {deploy} = deployments;
    const {deployer} = await getNamedAccounts();

    // Deploy Badge from deployer in Rinkeby, saved to deployments->rinkeby
    await deploy('Badge', {
      from: deployer,
      gasLimit: 4000000,
      args: [],
    });
  };
  