const { ethers } = require("hardhat");
require('dotenv').config()
async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());
  
    const nftAddress = '0x01f5E30fc74B75ff40d739fdB4fE1d8B432db68C'; // Replace with the address of your deployed ERC721Enumerable contract
    const pepeBornAddress = '0x34eB306ef852831Fb9Da695d152A6D650ecb5c9D'; // Replace with the address of your deployed PepeBorn contract
    const nft = await ethers.getContractAt("ERC721Enumerable", nftAddress);
    const pepeBorn = await ethers.getContractAt("PepeBorn", pepeBornAddress);

    const Token = await ethers.getContractFactory("NFTStaking");
    const token = await Token.deploy(nftAddress, pepeBornAddress);

    await hre.run("verify:verify", {
      address: token.address,
      constructorArguments: [
        nftAddress,
        pepeBornAddress
      ],
    });

    console.log("Account balance:", (await deployer.getBalance()).toString());
    console.log("Token address:", token.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
    