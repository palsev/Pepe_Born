/* https://lorwatch.vercel.app/ */

import * as React from "react";

import { useState, useCallback, useEffect } from "react";
import Navbar from "./../components/Navbar";
import Footer from "./../components/Footer";

import Web3 from "web3";
import web3Config from "../constant/config";
import { useWallet } from "../context/WalletContext";
import Select from "react-select";
import { web3Modal } from "../helpers/web3Modal";

import "../css/react-base.css";
import "../css/animations.css";
import "../css/second_section.css";
import "../css/roadmap.css";
import "../css/real_roadmap.css";
import "../css/active-list.css";

const httpProvider = new Web3.providers.HttpProvider(web3Config.RPC_URL);
const web3NoAccount = new Web3(httpProvider);

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#007bff" : "white",
    color: state.isFocused ? "white" : "black",
    padding: 10,
  }),
  control: (provided, state) => ({
    ...provided,
    borderRadius: 10,
    backgroundColor: "black",
    color: "white",
    borderColor: state.isFocused ? "black" : "black",
    boxShadow: state.isFocused
      ? "0 0 0 0.2rem rgba(0, 123, 255, 0.25)"
      : "0 0 0 0.2rem rgba(0, 123, 255, 0.25)",
    "&:hover": { borderColor: state.isFocused ? "black" : "#007bff" },
  }),
};

function StakingNFT() {
  const options = [
    { value: "BNB", label: "BNB" },
    { value: "PBT", label: "PBT" },
  ];
  const [currentTime, setCurrentTime] = useState("");
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItems1, setSelectedItems1] = useState([]);
  const [injectedProvider, setInjectedProvider] = useState();
  const [web3, setWeb3] = useState();
  const [isConnected, setIsConnected] = useState(false);
  const [curAcount, setCurAcount] = useState(null);

  const [nftContract, setNftContract] = useState(null);
  const [tokenPrice, setTokenPrice] = useState(null);
  const [earningInfo, setEarningInfo] = useState(null);

  const [stakeNftContract, setStakeNftContract] = useState(null);
  const [stakedNftList, setStakeNftList] = useState(null);
  const [unStakedNftList, setUnStakeNftList] = useState(null);
  const [baseUri, setBaseUri] = useState(
    "https://ipfs.io/ipfs/bafybeidngmtnoiluqfxodyykvs2inaoybktz3r4pt2onnufbqiubpnyv4i"
  );
  const { wallet, setWallet, setConnection } = useWallet();

  useEffect(() => {
    getRealtime();
  }, []);
  useEffect(() => {
    const intervalId = setInterval(() => {
      getEarningInfo();
      getRealtime();
    }, 20000);
    return () => clearInterval(intervalId);
  }, [stakedNftList]);

  function getRealtime() {
    const dateTime = new Date();
    const temp_dateTime =
      dateTime.toLocaleDateString() +
      " " +
      dateTime.getHours().toString() +
      ":" +
      dateTime.getMinutes().toString();
    setCurrentTime(temp_dateTime);
  }
  const handleItemClick = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };
  const handleItemClick1 = (item) => {
    if (selectedItems1.includes(item)) {
      setSelectedItems1(selectedItems1.filter((i) => i !== item));
    } else {
      setSelectedItems1([...selectedItems1, item]);
    }
  };

  function handleSelectChange(selectedOption) {
    setSelectedOption(selectedOption);
    console.log(`Option selected:`, selectedOption);
  }

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
    setStakeNftContract(
      new web3Provider.eth.Contract(
        web3Config.nftStakeAbi,
        web3Config.nftStakeAddress
      )
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
      nftStakeAbi: web3Config.nftStakeAbi,
      nftStakeAddress: web3Config.nftStakeAddress,
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

  const getEarningInfo = async () => {
    console.log("timer event", stakedNftList);
    if (stakedNftList !== null) {
      stakeNftContract.methods
        .earningInfo(curAcount, stakedNftList)
        .call()
        .then((res) => {
          setEarningInfo(res);
        });
    }
  };

  const fetchDataForUnstake = async () => {
    // var baseUri = await nftContract.methods.baseUri().call();
    // setBaseUri(baseUri);
    setStakeNftList(null);

    const staked_nft_list = await stakeNftContract.methods
      .tokensOfOwner(curAcount)
      .call();
    console.log("staked_nft_list", staked_nft_list);

    setStakeNftList(staked_nft_list);
    setSelectedItems1([]);
  };

  const fetchDataForStake = async () => {
    // var baseUri = await nftContract.methods.baseUri().call();
    // setBaseUri(baseUri);
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

    const tkPrice = await stakeNftContract.methods.tokenPrice().call();
    setTokenPrice(tkPrice / 10 ** 18);

    setUnStakeNftList(nft_list);
    setSelectedItems([]);
  };

  async function stakeAllNft() {
    if (!isConnected) {
      alert("Please Connect Your Wallet!");
      return;
    }

    if (unStakedNftList == null || unStakedNftList.length == 0) {
      alert("No nft in your wallet!");
      return;
    }

    setSelectedItems([...Array(unStakedNftList.length).keys()]);

    var index;
    let temp_array = [];

    for (index = 0; index < unStakedNftList.length; index++) {
      await nftContract.methods
        .approve(web3Config.nftStakeAddress, unStakedNftList[index])
        .send({ from: curAcount });
      temp_array.push(unStakedNftList[index]);
    }

    stakeNftContract.methods
      .stake(temp_array)
      .send({ from: curAcount })
      .then(() => {
        fetchDataForStake();
        fetchDataForUnstake();
      });
  }

  async function stakeNft() {
    if (!isConnected) {
      alert("Please Connect Your Wallet!");
      return;
    }

    if (unStakedNftList == null || unStakedNftList.length == 0) {
      alert("No nft in your wallet!");
      return;
    }

    if (selectedItems.length == 0) {
      alert("No nft is selected");
      return;
    }

    var index;
    let temp_array = [];

    for (index = 0; index < selectedItems.length; index++) {
      await nftContract.methods
        .approve(
          web3Config.nftStakeAddress,
          unStakedNftList[selectedItems[index]]
        )
        .send({ from: curAcount });
      temp_array.push(unStakedNftList[selectedItems[index]]);
    }

    stakeNftContract.methods
      .stake(temp_array)
      .send({ from: curAcount })
      .then(() => {
        fetchDataForStake();
        fetchDataForUnstake();
      });
  }

  async function unStakeAllNft() {
    if (!isConnected) {
      alert("Please Connect Your Wallet!");
      return;
    }

    if (stakedNftList == null || stakedNftList.length == 0) {
      alert("No nft in your wallet!");
      return;
    }

    console.log("==================unstaked", stakedNftList);
    stakeNftContract.methods
      .unstake(stakedNftList)
      .send({ from: curAcount })
      .then(() => {
        fetchDataForStake();
        fetchDataForUnstake();
      });
  }

  async function unStakeNft() {
    if (!isConnected) {
      alert("Please Connect Your Wallet!");
      return;
    }

    if (stakedNftList == null || stakedNftList.length == 0) {
      alert("No nft is staked!");
      return;
    }

    if (selectedItems1.length == 0) {
      alert("No nft is selected");
      return;
    }

    console.log("==================selected items", selectedItems1);

    var index;
    let temp_array = [];

    for (index = 0; index < selectedItems1.length; index++) {
      temp_array.push(stakedNftList[selectedItems1[index]]);
    }

    stakeNftContract.methods
      .unstake(temp_array)
      .send({ from: curAcount })
      .then(() => {
        fetchDataForStake();
        fetchDataForUnstake();
      });
  }

  async function claimRewards() {
    if (!isConnected) {
      alert("Please Connect Your Wallet!");
      return;
    }

    if (stakedNftList == null || stakedNftList.length == 0) {
      alert("No nft in your wallet!");
      return;
    }

    console.log("==================unstaked", stakedNftList);

    stakeNftContract.methods
      .claim(stakedNftList)
      .send({ from: curAcount })
      .then(() => {
        fetchDataForStake();
        fetchDataForUnstake();
      });
  }
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
      setStakeNftContract(
        new t_pro.eth.Contract(
          web3Config.nftStakeAbi,
          web3Config.nftStakeAddress
        )
      );
    } else if (wallet.connection == false) {
      console.log("--------disconnected---------");
    }
  }, [wallet]);

  useEffect(() => {
    if (nftContract !== null && stakeNftContract !== null) {
      fetchDataForStake();
      fetchDataForUnstake();
    }
  }, [nftContract, stakeNftContract]);

  return (
    <div className="App">
      <Navbar
        name="NFTstaking"
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
            {/* Staking */}
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
                Stake NFT
              </div>

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
                          <div
                            key={index}
                            className={
                              selectedItems.includes(index)
                                ? "grid grid-cols-3 pb-5 selected-item"
                                : "grid grid-cols-3 pb-5"
                            }
                            onClick={() => handleItemClick(index)}
                          >
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
                <div className="flex flex-row gap-2 py-3 justify-between">
                  <button
                    className="nft_button w-full py-3 rounded-md text-white lorswap_vote text-center font-bold"
                    onClick={() => {
                      stakeNft(); // for selected
                    }}
                  >
                    Stake
                  </button>

                  <button
                    className="nft_button w-full py-3 rounded-md text-white lorswap_vote text-center font-bold"
                    onClick={() => {
                      stakeAllNft(); // for all
                    }}
                  >
                    Stake All
                  </button>
                </div>
              </div>
            </div>

            {/* {Info Box} */}

            <div
              className="roadmap_card rgb pt-8 px-4 flex flex-col"
              style={{
                width: "300px",
                height: "520px",
                backgroundColor: "rgba(0,0,0,0.9)",
              }}
            >
              {/* <div className='text-white text-xl font-bold my-5' style={{height: "30px"}}>Pepe Police</div> */}
              <div className="text-orange-400 text-2xl font-bold">Info Box</div>

              <div className="my-5 tabcontent " style={{ height: "450px" }}>
                <div
                  className="border border-gray-700 py-4 px-2 rounded-xl"
                  style={{
                    backgroundColor: "rgba(133, 100, 28, 0.3)",
                    height: "350px",
                    overflowY: "auto",
                  }}
                >
                  <div className="flex flex-row gap-2 justify-between">
                    <span>Current : </span>
                    <span className="ml-3">{currentTime}</span>
                  </div>
                  <div className="flex flex-row gap-2 justify-between">
                    <span>Minted Amount : </span>
                    {stakedNftList && unStakedNftList && (
                      <span className="ml-3">
                        {stakedNftList.length + unStakedNftList.length}/10000
                      </span>
                    )}
                  </div>
                  <div className="flex flex-row gap-2 justify-between">
                    <span>Staked Amount : </span>
                    {stakedNftList && (
                      <span className="ml-3">{stakedNftList.length}/10000</span>
                    )}
                  </div>

                  <div className="flex flex-row gap-2 justify-between">
                    <span>APR : </span>
                    {selectedOption.value == "BNB" ? (
                      <span className="ml-3">
                        {(365 * tokenPrice).toFixed(5)} {selectedOption.value}
                      </span>
                    ) : (
                      <span className="ml-3">365 {selectedOption.value}</span>
                    )}
                  </div>
                  <div className="flex flex-row gap-2 justify-between">
                    <span>Daily Reward : </span>
                    {selectedOption.value == "BNB" ? (
                      <span className="ml-3">
                        {tokenPrice} {selectedOption.value}
                      </span>
                    ) : (
                      <span className="ml-3">1 {selectedOption.value}</span>
                    )}
                  </div>
                  <div className="flex flex-row gap-2 justify-between">
                    <span>Token Price : </span>
                    <span className="ml-3">{tokenPrice}BNB</span>
                  </div>
                  <div className="flex flex-row gap-2 justify-between">
                    <span>Earning Info : </span>
                    {selectedOption.value == "BNB" ? (
                      <span className="ml-3">
                        {" "}
                        {((earningInfo * tokenPrice) / 10 ** 18).toFixed(8)} BNB
                      </span>
                    ) : (
                      <span className="ml-3">
                        {" "}
                        {(earningInfo / 10 ** 18).toFixed(5)} PBT
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* {Unstaking} */}
            <div
              className="roadmap_card rgb pt-8 px-4 flex flex-col"
              style={{
                width: "370px",
                height: "520px",
                backgroundColor: "rgba(0,0,0,0.9)",
              }}
            >
              {/* <div className='text-white text-xl font-bold my-5' style={{height: "30px"}}>Pepe Police</div> */}
              <div className="flex flex-row justify-between">
                <div className="text-orange-400 text-2xl font-bold">
                  UnStake NFT
                </div>
                <Select
                  options={options}
                  styles={customStyles}
                  value={selectedOption}
                  onChange={handleSelectChange}
                />
              </div>
              <div className="my-5 tabcontent " style={{ height: "450px" }}>
                <div
                  className="border border-gray-700 p-4 rounded-xl "
                  style={{
                    backgroundColor: "rgba(133, 100, 28, 0.3)",
                    height: "350px",
                    overflowY: "auto",
                  }}
                >
                  {stakedNftList != null
                    ? stakedNftList.map((v, index) => {
                        return (
                          <div
                            key={index}
                            className={
                              selectedItems1.includes(index)
                                ? "grid grid-cols-3 pb-5 selected-item"
                                : "grid grid-cols-3 pb-5"
                            }
                            onClick={() => handleItemClick1(index)}
                          >
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
                <div className="py-3 flex flex-row gap-2">
                  <button
                    className="nft_button w-full py-3 rounded-md text-white lorswap_vote text-center font-bold"
                    onClick={() => {
                      claimRewards();
                    }}
                  >
                    Claim
                  </button>
                  <button
                    className="nft_button w-full py-3 rounded-md text-white lorswap_vote text-center font-bold"
                    onClick={() => {
                      unStakeNft();
                    }}
                  >
                    UnStake
                  </button>
                  <button
                    className="nft_button w-full py-3 rounded-md text-white lorswap_vote text-center font-bold"
                    onClick={() => {
                      unStakeAllNft();
                    }}
                  >
                    UnStake All
                  </button>
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

export default StakingNFT;
