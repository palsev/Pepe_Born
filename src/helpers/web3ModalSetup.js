import dotenv from "dotenv";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";

dotenv.config();

/**
  Web3 modal helps us "connect" external wallets:
**/
const web3ModalSetup = () =>
  new Web3Modal({
    network: "mainnet",
    cacheProvider: true,
    providerOptions: {
      metamask:{
        display:{
          name: "Injected",
          description: "Connect with the provider in your Browser"
        },
        package:null
      },
     
      walletconnect:{
        package:WalletConnectProvider,
        options:{
          infuraId:"INFURA_ID"
        }
      },

    },
  });

export default web3ModalSetup;
