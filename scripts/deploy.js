
const { ethers } = require('hardhat');

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log('Deploying contracts with the account:', deployer.address);
  console.log('Account balance:', (await deployer.getBalance()).toString());

  const Token = await ethers.getContractFactory('GuessNumberGame');
  const token = await Token.deploy('0x7368616e67686169000000000000000000000000000000000000000000000000',888,{value:10});

  console.log('Token address:', token.address);

  console.log('Account balance:', (await deployer.getBalance()).toString());

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
