const { ethers } = require("hardhat");
require('dotenv').config()
async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());

    const distrib = '0x4DB2DEFa288FD75Cfd6Ef3d4274e27D02EDc3a53'; // Replace with the address of your deployed ERC721Enumerable contract
    const tokenaddr = '0x34eB306ef852831Fb9Da695d152A6D650ecb5c9D'; // Replace with the address of your deployed PepeBorn contract
    const rewardtokenaddr = '0x34eB306ef852831Fb9Da695d152A6D650ecb5c9D';

    const Token = await ethers.getContractFactory("TokenStaking");
    const token = await Token.deploy(distrib,tokenaddr,rewardtokenaddr, 7776000,0);
    await token.deployed();

    await hre.run("verify:verify", {
       address: token.address,
       constructorArguments: [
        distrib,
        tokenaddr,
        rewardtokenaddr,
        7776000,
        0
      ],
    });

    // const contractInstance = await Token.attach(token.address);
    // await contractInstance.initialize('0x02EECa8EDAdacCF83c23Ed14604915a23199Ba66','0xBD85c3F31bc20aE79eCc710fF9CbC03bCB1CFA8C','0xBD85c3F31bc20aE79eCc710fF9CbC03bCB1CFA8C', 8640000000,864000000);

    console.log("Account balance:", (await deployer.getBalance()).toString());
    console.log("Token address:", token.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
    