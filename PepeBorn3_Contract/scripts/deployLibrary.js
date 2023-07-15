const { ethers } = require("hardhat");
require('dotenv').config()
async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());

    const IterableMapping = await ethers.getContractFactory("IterableMapping");
    const iterableMapping = await IterableMapping.deploy();

    console.log("IterableMapping deployed at: ", iterableMapping.address);
    const MopotsStake = await ethers.getContractFactory("Mopots_Stake", {libraries: {
      'IterableMapping': iterableMapping.address
    }})
    const mopotsStake = await MopotsStake.deploy('0xf2Abb009bbf8b6E0BeF2aa08F8555Cb02Ff573CB', '0x7108ad0825541294362D3d8bb42465C0806A76a0', '0x47892101fBe1373653BA525D17fba342716E3CF2', '0x9D1464a748A19f5B2a089ab8e80Cbc0732970651', '0xA1F9F2d343c058741808cA479B97F29F4CD0CE32')
    
    console.log('Mopots Stake contract deployed at: ', mopotsStake.address);//0x3a25cE28bAeA0D346A4DF67b303c70DC630bEddA

    console.log("Account balance:", (await deployer.getBalance()).toString());
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
    