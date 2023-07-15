/* https://lorwatch.vercel.app/ */

import * as React from "react";
import "../css/react-base.css";
import "../css/animations.css";
import "../css/second_section.css";
import "../css/roadmap.css";
import "../css/real_roadmap.css";
import { useState, useEffect, useCallback } from "react";
import Navbar from "./../components/Navbar";
import Footer from "./../components/Footer";
import Pagination from "./../components/Pagination";
import { useWallet } from "../context/WalletContext";

import Web3 from "web3";
import web3Config from "../constant/config";

import { web3Modal } from "../helpers/web3Modal";
const httpProvider = new Web3.providers.HttpProvider(web3Config.RPC_URL);
const web3NoAccount = new Web3(httpProvider);

function MintingNFT() {
  const [nftCount, setNftCount] = useState(0);
  const [injectedProvider, setInjectedProvider] = useState();
  const [web3, setWeb3] = useState();
  const [isConnected, setIsConnected] = useState(false);
  const [curAcount, setCurAcount] = useState(null);
  const [nftContract, setNftContract] = useState(null);
  const [nftCnt, setNftCnt] = useState(0);
  const [unStakedNftList, setUnStakeNftList] = useState(null);
  const [baseUri, setBaseUri] = useState(
    "https://ipfs.io/ipfs/bafybeidngmtnoiluqfxodyykvs2inaoybktz3r4pt2onnufbqiubpnyv4i"
  );

  const { wallet, setWallet, setConnection } = useWallet();

  const logoutOfWeb3Modal = async () => {
    // alert("logoutOfWeb3Modal");
    web3Modal.clearCachedProvider();
    if (
      injectedProvider &&
      injectedProvider.provider &&
      typeof injectedProvider.provider.disconnect === "function"
    ) {
      await injectedProvider.provider.disconnect();
    }
    setIsConnected(false);
    setConnection(false);
    window.location.reload();
  };

  const loadWeb3Modal = useCallback(async () => {
    const provider = await web3Modal.connect();
    // alert("loadWeb3Modal1");
    const web3Provider = new Web3(provider);
    // alert("loadWeb3Modal2");
    setInjectedProvider(web3Provider);
    // alert(JSON.stringify(provider));
    var acc = null;
    try {
      acc = provider.selectedAddress
        ? provider.selectedAddress
        : provider.accounts[0];
    } catch (error) {
      acc = provider.address;
    }

    setWeb3(web3Provider);
    setCurAcount(acc);
    setIsConnected(true);
    setNftContract(
      new web3Provider.eth.Contract(web3Config.nftAbi, web3Config.nftAddress)
    );

    setWallet({
      account: acc,
      connection: true,
      tokenStakeAbi: null,
      tokenStakeAddress: null,
      tokenAbi: null,
      tokenAddress: null,
      nftAbi: web3Config.nftAbi,
      nftAddress: web3Config.nftAddress,
      nftStakeAbi: null,
      nftStakeAddress: null,
    });

    provider.on("chainChanged", (chainId) => {
      // alert("loadWeb3Modal chainChanged");
      setInjectedProvider(web3Provider);
      logoutOfWeb3Modal();
    });

    provider.on("accountsChanged", () => {
      // alert("loadWeb3Modal accountsChanged");
      setInjectedProvider(web3Provider);
      logoutOfWeb3Modal();
    });

    // Subscribe to session disconnection
    provider.on("disconnect", (code, reason) => {
      // alert("loadWeb3Modal accountsChanged");
      logoutOfWeb3Modal();
    });

    // eslint-disable-next-line
  }, [setInjectedProvider]);

  const fetchDataForStake = async () => {
    console.log("start");
    const nft_totalSupply = await nftContract.methods.totalSupply().call();
    setNftCnt(nft_totalSupply, "totalSupply");

    setUnStakeNftList(null);

    const nft_balance = await nftContract.methods.balanceOf(curAcount).call();
    console.log("nft_balance", nft_balance);

    var index,
      nft_list = [];

    for (index = 0; index < nft_balance; index++) {
      var nft_id = await nftContract.methods
        .tokenOfOwnerByIndex(curAcount, index)
        .call();
      console.log("nft_id", nft_id);
      nft_list.push(nft_id);
    }

    setUnStakeNftList(nft_list);
  };

  useEffect(() => {
    if (!isConnected) {
      console.log("error!");
      return;
    }

    if (nftContract !== null) {
      fetchDataForStake();
    }

    console.log("getting for stake!");
  }, [nftContract]);

  useEffect(() => {
    if (
      wallet.connection == true &&
      curAcount == null &&
      web3Config.nftAbi != null
    ) {
      const t_pro = window.ethereum ? new Web3(window.ethereum) : null;
      console.log(t_pro);
      setWeb3(t_pro);
      setCurAcount(wallet.account);
      setIsConnected(true);
      setNftContract(
        new t_pro.eth.Contract(web3Config.nftAbi, web3Config.nftAddress)
      );
    }
  }, [wallet]);

  async function nftMint() {
    if (!isConnected) {
      alert("Please Connect Your Wallet!");
      return;
    }

    var eth_value = 0.01 * nftCount;

    console.log(nftContract);

    nftContract.methods
      .mint(curAcount, nftCount)
      .send({
        from: curAcount,
        value: web3.utils.toWei(eth_value.toString(), "ether"),
      })
      .then(() => {
        fetchDataForStake();
      });
  }

  const handleNftCount = (event) => {
    if (nftCount == 0) {
      document.getElementById("nftCount").innerHTML = "";
    }
    setNftCount(event.target.value);
  };
  return (
    <div className="App">
      <Navbar
        name="NFTmint"
        loadWeb3Modal={loadWeb3Modal}
        isConnected={isConnected}
        curAcount={curAcount}
        logoutOfWeb3Modal={logoutOfWeb3Modal}
      />

      <div
        className="relative h-full pt-6"
        style={{ backgroundColor: "#1F2633" }}
      >
        <div className="mt-6 flex h-full flex-col items-center relative">
          <div className="mt-10 relative px-4 sm:px-6 flex flex-col justify-center items-center w-full gap-10 md:flex-row">
            {/* Minting */}
            <div
              className="minting_nft_card roadmap_card rgb pt-8 px-4 flex flex-col"
              style={{
                width: "400px",
                height: "520px",
                backgroundColor: "rgba(0,0,0,0.9)",
              }}
            >
              <div className="text-orange-400 text-2xl font-bold">
                Minting NFT
              </div>

              <div
                id="devote"
                className="my-5 tabcontent"
                style={{ height: "350px" }}
              >
                <div
                  className="border border-gray-700 p-4 rounded-xl"
                  style={{ backgroundColor: "rgba(133, 100, 28, 0.3)" }}
                >
                  <div className="flex flex-row justify-between">
                    <div className="text-gray-400 flex flex-row items-center text-2xl py-2">
                      <p className="pr-1 text-orange-400 font-bold">
                        {nftCnt} / 10000
                      </p>
                    </div>
                  </div>

                  {isConnected ? (
                    <button
                      className="nft_button w-full my-2 py-3 rounded-md text-white lorswap_vote text-center font-bold"
                      onClick={() => {
                        logoutOfWeb3Modal();
                      }}
                    >
                      {curAcount.slice(0, 8) + "..." + curAcount.slice(34)}
                    </button>
                  ) : (
                    <button
                      className="nft_button w-full my-2 py-3 rounded-md text-white lorswap_vote text-center font-bold"
                      onClick={() => {
                        loadWeb3Modal();
                      }}
                    >
                      Connect Wallet
                    </button>
                  )}

                  <div className="flex flex-row justify-between">
                    <div className="text-gray-400 flex flex-row items-center text-sm py-7">
                      <p className="pr-1 text-orange-400 font-bold">
                        Select The Amount
                      </p>
                    </div>
                  </div>
                  <input
                    type="text"
                    id="nftCount"
                    value={nftCount == 0 ? "" : nftCount}
                    onChange={handleNftCount}
                    placeholder="0"
                    class="w-full text-right border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-4 focus:border-blue-500 focus:outline-none focus:shadow-outline-blue focus:ring ring-blue-200 disabled:opacity-50 transition ease-in-out duration-150"
                  />
                  <div className="text-center text-orange-300 text-sm py-4">
                    Mint an NFT Charges 0.01BNB
                  </div>
                  <button
                    className="nft_button w-full my-2 py-3 rounded-md text-white lorswap_vote text-center font-bold"
                    onClick={() => {
                      nftMint();
                    }}
                  >
                    {/* {isLoading ? "Minting..." : "Minting NFTs PPN"}*/}
                    Minting NFTs PBN
                  </button>
                </div>
              </div>
            </div>

            {/* Minted */}
            <div
              className="roadmap_card rgb pt-8 px-4 flex flex-col"
              style={{
                width: "370px",
                height: "520px",
                backgroundColor: "rgba(0,0,0,0.9)",
              }}
            >
              {/* <div className='text-white text-xl font-bold my-5' style={{height: "30px"}}>Pepe Police</div> */}
              <div className="text-orange-400 text-2xl font-bold">
                Minted NFT
              </div>

              {unStakedNftList != null ? (
                <div className="text-orange-400 text-1xl font-bold">
                  {" "}
                  {unStakedNftList.length} NFT minted{" "}
                </div>
              ) : (
                "0"
              )}

              <div className="my-5 tabcontent " style={{ height: "450px" }}>
                <div
                  className="border border-gray-700 p-4 rounded-xl "
                  style={{
                    backgroundColor: "rgba(133, 100, 28, 0.3)",
                    height: "350px",
                    overflowY: "auto",
                  }}
                >
                  {unStakedNftList != null
                    ? unStakedNftList.map((v, index) => {
                        return (
                          <div className={"grid grid-cols-3 pb-5"}>
                            <div className="text-gray-400 flex flex-row items-center text-sm">
                              <p
                                style={{ fontSize: "25px" }}
                                className="pr-1 text-orange-400 font-bold"
                              >
                                {v}
                              </p>
                            </div>
                            <div className="py- col-span-2 pos-relative">
                              <img
                                className="rounded-xl blur-effect"
                                src={baseUri + "/" + v + ".png"}
                              ></img>
                            </div>
                          </div>
                        );
                      })
                    : "NFT Lists"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default MintingNFT;
