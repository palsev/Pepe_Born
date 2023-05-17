/* https://lorwatch.vercel.app/ */

import * as React from 'react'
import '../css/react-base.css'
import '../css/animations.css';
import '../css/second_section.css';
import '../css/roadmap.css';
import '../css/real_roadmap.css';
import { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import Accordion from './Accordion';

function Landing () {
    const navigate = useNavigate();

    function goToDetailed(){
      navigate('/detailed', { replace: true });
    }

    const team_fund = "Team funds (0% on buys, 2% on sells, average 1%) will be untilized for team compensation. Eightly percent will be allocated to the core team (currently four members), while remaining 20% will be used to team development.";
      
    return (
      <div className="App">
        <Navbar name="Landing"/>

        <div className='relative h-full' style={{backgroundColor: "#1F2633"}}>
          <div className='flex h-full flex-col items-center relative'>
              <img className='absolute top-0' src="https://raydium.io/backgroundImages/home-bg-element-1.png"></img>
              {/* FirstSection Content */}
              <div className='first_section relative px-4 sm:px-6 flex flex-col justify-center items-center w-full' style={{height: "1000px"}}>
                <div className="absolute inset-0">
                  <video autoPlay loop muted className="absolute h-full w-full object-cover">
                    {/* <source src="img/hero.webm" type="video/webm"></source> */}
                    <source src="https://belaunch.io/assets/bg.206574b5.mp4" type="video/mp4"></source>
                  </video>
                </div>

                {/* Title */}
                <h1 className='relative rounded-lg bg-ebony-clay-500/70 text-4xl text-left only:font-extrabold tracking-tight text-white sm:text-6xl sm:leading-none xl:text-6xl'>
                  Pepe Born&nbsp;
                  {/* <span className='bg-gradient-to-r from-white via-white to-primary bg-clip-text text-transparent '>|&nbsp;</span> */}
                  {/* <span className='text-primary-400 '>Marketplace NFT&nbsp;</span> */}
                  <div className='flex justify-center bg-gradient-to-r from-primary _sm:text-3xl via-white to-white bg-clip-text text-transparent '>Marketplace NFT & Swap</div>
                </h1>
                {/* SubTitle */}
                <p className='relative text-center mt-6 rounded-lg bg-ebony-clay-500/70 text-2xl text-left text-gray-300 lg:text-3xl _sm:text-lg xl:text-3xl'>The Pioneer of Sustainability meme coin on web3.0</p>
                {/* Buttons */}
                <div className='mt-5 w-full sm:max-w-lg lg:ml-0'>
                  <div className='mt-24 items-center gap-5 flex justify-center text-white'>
                    <a href="#">
                      <div className='focus:ring-4 focus:outline-none focus:ring-spring-green-800 group-hover:from-spring-green-400 group-hover:to-cerulean-600 text-white relative inline-flex items-center justify-center p-0.5 overflow-hidden rounded-lg group bg-gradient-to-br from-primary-500 via-primary-600 to-blue-500  text-white min-w-fit font-bold text-base hover:from-blue-500 hover:via-primary-600 hover:to-primary-500  hover:cursor-pointer '>
                        <span className='bg-opacity-0 hover:bg-opacity-20 relative px-5 py-2.5 transition-all ease-in duration-75 bg-ebony-clay-500 rounded-md flex flex-row font-bold min-w-fit items-center'>
                          Launch App
                        </span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              
              {/* SecondSection Content */}
              <div className='relative flex flex-col justify-center items-center w-full h-full'>
                <img src="https://raydium.io/backgroundImages/home-bg-element-3.png" className='absolute top-0' style={{top: "0%", width: "100%"}}></img>
                <p className='text-white text-4xl font-bold pt-36'>How to participate</p>
                <div className="second_section">
                  <div className="card">
                    <div className="box">
                      <div className="content">
                        <h2>01</h2>
                        <h3>Buy / Mint NFT</h3>
                        <p>You can buy /minting on the market or our website, the cost for minting is only 3$, and hold it on your wallet, because we will distribute the token airdrop based on the nft snapshot holder in the wallet</p>
                        <a href="#">Read More</a>
                      </div>
                    </div>
                  </div>
                
                  <div className="card">
                    <div className="box">
                      <div className="content">
                        <h2>02</h2>
                        <h3>Hold NFT and Get Airdrop</h3>
                        <p>Just hold your NFT in your wallet, and we will do a snapshot at the end of the event, don't let your NFT leave your wallet, otherwise you won't get a snapshot for the airdrop</p>
                        <a href="#">Read More</a>
                      </div>
                    </div>
                  </div>
                
                  <div className="card">
                    <div className="box">
                      <div className="content">
                        <h2>03</h2>
                        <h3>Stake And Earn</h3>
                        <p>You can stake your NFT and your Tokens on our website when we launch staking for NFT and tokens to get a pool prize as your profit</p>
                        <a href="#">Read More</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Title */}
              <div id="Developer" className='relative mb-8 pt-32'>
                <div className='text-4xl text-white font-bold'>Meet the team</div>
              </div>
              <div className='relative flex flex-col justify-center items-center w-full h-full'>
                {/* <img src="https://raydium.io/backgroundImages/home-bg-element-3.png" className='absolute top-0' style={{top: "-60%", width: "100%"}}></img> */}

                <div className="box-container grid grid-cols-4 _lg:grid-cols-1 m-auto">
                  <div className='flex justify-center'>
                  <div className="box-item">
                  <div className="flip-box">
                    <div className="flip-box-front text-center relative">
                      <img src="img/1.jpg" className='absolute top-0 left-0 h-full w-full'></img>
                      <div className="absolute w-full h-1/4 color-white" style={{top:"75%", backgroundColor: "rgba(0, 0, 0, 0.5)"}}>
                        <div className='text-white text-2xl text-left pl-4'>Aero</div>
                        <div className='text-white text-base text-right pr-4 flex flex-row justify-between'>
                          <div className='text-white text-base text-left pl-4'>Project Lead</div>
                        </div>
                      </div>
                    </div>
                    <div className="flip-box-back text-center" style={{backgroundImage: "url('https://s25.postimg.cc/frbd9towf/cta-2.png')"}}>
                      <div className="inner color-white">
                        <button className="flip-box-button">Learn More</button>
                        <div className='flex flex-row justify-center pt-3'>
                          <a href="https://twitter.com/pepebornlabs" target="_blank"><img className='pr-5' src="img/twitter.svg" width="45"></img></a>                  
                          <a href="https://t.me/pepeborn" target="_blank"><img className='pr-5' src="img/telegram.svg" width="45"></img></a>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                  </div>

                  <div className='flex justify-center'>
                  <div className="box-item">
                  <div className="flip-box">
                    <div className="flip-box-front text-center relative">
                      <img src="img/2.jpg" className='absolute top-0 left-0 h-full w-full'></img>
                      <div className="absolute w-full h-1/4 color-white" style={{top:"75%", backgroundColor: "rgba(0, 0, 0, 0.5)"}}>
                        <div className='text-white text-2xl text-left pl-4'>Ace</div>
                        <div className='text-white text-base text-right pr-4 flex flex-row justify-between'>
                          <div className='text-white text-base text-left pl-4'>Community Manager</div>
                        </div>
                      </div>
                    </div>
                    <div className="flip-box-back text-center" style={{backgroundImage: "url('https://s25.postimg.cc/frbd9towf/cta-2.png')"}}>
                      <div className="inner color-white">
                        <button className="flip-box-button">Learn More</button>
                        <div className='flex flex-row justify-center pt-3'>
                          <a href="https://twitter.com/pepebornlabs" target="_blank"><img className='pr-5' src="img/twitter.svg" width="45"></img></a>                  
                          <a href="https://t.me/pepeborn" target="_blank"><img className='pr-5' src="img/telegram.svg" width="45"></img></a>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                  </div>

                  <div className='flex justify-center'>
                  <div className="box-item">
                  <div className="flip-box">
                    <div className="flip-box-front text-center relative">
                      <img src="img/3.jpg" className='absolute top-0 left-0 h-full w-full'></img>
                      <div className="absolute w-full h-1/4 color-white" style={{top:"75%", backgroundColor: "rgba(0, 0, 0, 0.5)"}}>
                        <div className='text-white text-2xl text-left pl-4'>Martin</div>
                        <div className='text-white text-base text-right pr-4 flex flex-row justify-between'>
                          <div className='text-white text-base text-left pl-4'>Developer Project</div>
                        </div>
                      </div>
                    </div>
                    <div className="flip-box-back text-center" style={{backgroundImage: "url('https://s25.postimg.cc/frbd9towf/cta-2.png')"}}>
                      <div className="inner color-white">
                        <button className="flip-box-button">Learn More</button>
                        <div className='flex flex-row justify-center pt-3'>
                          <a href="https://twitter.com/pepebornlabs" target="_blank"><img className='pr-5' src="img/twitter.svg" width="45"></img></a>                  
                          <a href="https://t.me/pepeborn" target="_blank"><img className='pr-5' src="img/telegram.svg" width="45"></img></a>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                  </div>
                  
                  <div className='flex justify-center'>
                  <div className="box-item">
                  <div className="flip-box">
                    <div className="flip-box-front text-center relative">
                      <img src="img/4.jpg" className='absolute top-0 left-0 h-full'></img>
                      <div className="absolute w-full h-1/4 color-white" style={{top:"75%", backgroundColor: "rgba(0, 0, 0, 0.5)"}}>
                        <div className='text-white text-2xl text-left pl-4'>Lucky Cat</div>
                        <div className='text-white text-base text-right pr-4 flex flex-row justify-between'>
                          <div className='text-white text-base text-left pl-4'>Marketing Manager</div>

                        </div>
                      </div>
                    </div>
                    <div className="flip-box-back text-center" style={{backgroundImage: "url('https://s25.postimg.cc/frbd9towf/cta-2.png')"}}>
                      <div className="inner color-white">
                        <button className="flip-box-button">Learn More</button>
                        <div className='flex flex-row justify-center pt-3'>
                          <a href="https://twitter.com/pepebornlabs" target="_blank"><img className='pr-5' src="img/twitter.svg" width="45"></img></a>                  
                          <a href="https://t.me/pepeborn" target="_blank"><img className='pr-5' src="img/telegram.svg" width="45"></img></a>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                  </div>
                  
                  <div className='flex justify-center'>
                  <div className="box-item">
                  <div className="flip-box">
                    <div className="flip-box-front text-center relative">
                      <img src="img/5.jpg" className='absolute top-0 left-0 h-full w-full'></img>
                      <div className="absolute w-full h-1/4 color-white" style={{top:"75%", backgroundColor: "rgba(0, 0, 0, 0.5)"}}>
                        <div className='text-white text-2xl text-left pl-4'>Oxminion</div>
                        <div className='text-white text-base text-right pr-4 flex flex-row justify-between'>
                          <div className='text-white text-base text-left pl-4'>Artist</div>
                        </div>
                      </div>
                    </div>
                    <div className="flip-box-back text-center" style={{backgroundImage: "url('https://s25.postimg.cc/frbd9towf/cta-2.png')"}}>
                      <div className="inner color-white">
                        <button className="flip-box-button">Learn More</button>
                        <div className='flex flex-row justify-center pt-3'>
                          <a href="https://twitter.com/pepebornlabs" target="_blank"><img className='pr-5' src="img/twitter.svg" width="45"></img></a>                  
                          <a href="https://t.me/pepeborn" target="_blank"><img className='pr-5' src="img/telegram.svg" width="45"></img></a>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                  </div>

                  <div className='flex justify-center'>
                  <div className="box-item">
                  <div className="flip-box">
                    <div className="flip-box-front text-center relative">
                      <img src="img/6.jpg" className='absolute top-0 left-0 h-full w-full'></img>
                      <div className="absolute w-full h-1/4 color-white" style={{top:"75%", backgroundColor: "rgba(0, 0, 0, 0.5)"}}>
                        <div className='text-white text-2xl text-left pl-4'>Edestus</div>
                        <div className='text-white text-base text-right pr-4 flex flex-row justify-between'>
                          <div className='text-white text-base text-left pl-4'>Designer</div>
                        </div>
                      </div>
                    </div>
                    <div className="flip-box-back text-center" style={{backgroundImage: "url('https://s25.postimg.cc/frbd9towf/cta-2.png')"}}>
                      <div className="inner color-white">
                        <button className="flip-box-button">Learn More</button>
                        <div className='flex flex-row justify-center pt-3'>
                          <a href="https://twitter.com/pepebornlabs" target="_blank"><img className='pr-5' src="img/twitter.svg" width="45"></img></a>                  
                          <a href="https://t.me/pepeborn" target="_blank"><img className='pr-5' src="img/telegram.svg" width="45"></img></a>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                  </div>

              </div>
              </div>
          </div>
        </div>

        {/* FAQ */}
        <div className='grid grid-cols-2 _md:grid-cols-1 pt-10'>
          <div className='flex flex-col justify-start items-center pt-10'>
            <div className='text-white text-3xl font-bold pb-10'>FAQ</div>
            <Accordion title="How are team funds distributed?" content={team_fund} />
            <Accordion title="How will we use community funds?" content="To effectively use community funds, we need to follow a clear and transparent process that involves the community in decision-making" />
            <Accordion title="How will the reward pool be filled?" content="The reward pool can be filled in different ways depending on the platform or system you are referring to. In many cases, the reward pool is typically made up of a percentage of transaction fees or revenue generated by the platform." />
            <Accordion title="How will we use the pinksale funds?" content="It's not possible for me to know exactly how the pinksale funds will be used in your specific case, as that is a decision that would need to be made by the people or organization in charge of those funds." />
          </div>
          <div className='flex justify-start items-center px-2'>
            <img src="img/large_logo.png"></img>
          </div>
        </div>

        {/* Tokenomics */}
        <div id="Tokenomics" className='flex flex-col justify-center items-center pt-20 pb-32'>
          <div>
            <div className='relative font-bold text-3xl text-white pb-10'>TOKENOMICS</div>

            <div className='tokenomics' style={{width: "1200px"}}>
              <div className='flex flex-row text-left _lg:flex-col w-full _lg:pl-10'>
                <div className='flex flex-col' style={{width: "10%"}}>
                  <div className='text-gray-600 text-lg font-bold'>Team</div>
                  <div className='text-white text-lg font-bold'>10%</div>
                  <div className='h-14 w-full' style={{backgroundColor: "rgba(109, 74, 254, 0.2)"}}></div>
                </div>
                <div className='flex flex-col' style={{width: "27%"}}>
                  <div className='text-gray-600 text-lg font-bold'>Airdrop</div>
                  <div className='text-white text-lg font-bold'>27%</div>
                  <div className='h-14 w-full' style={{backgroundColor: "rgba(109, 74, 254, 0.5)"}}></div>
                </div>
                <div className='flex flex-col' style={{width: "33%"}}>
                  <div className='text-gray-600 text-lg font-bold'>Liquidity</div>
                  <div className='text-white text-lg font-bold'>33%</div>
                  <div className='h-14 w-full' style={{backgroundColor: "rgba(109, 74, 254, 0.4)"}}></div>
                </div>
                <div className='flex flex-col' style={{width: "20%"}}>
                  <div className='text-gray-600 text-lg font-bold'>Marketing</div>
                  <div className='text-white text-lg font-bold'>20%</div>
                  <div className='h-14 w-full' style={{backgroundColor: "rgba(109, 74, 254, 0.5)"}}></div>
                </div>
                <div className='flex flex-col' style={{width: "10%"}}>
                  <div className='text-gray-600 text-lg font-bold'>Reward</div>
                  <div className='text-white text-lg font-bold'>10%</div>
                  <div className='h-14 w-full' style={{backgroundColor: "rgba(109, 74, 254, 0.5)"}}></div>
                </div>
              </div>
            </div>

            <div className='grid grid-cols-4 pt-10 _md:grid-cols-2'>
              <div className='flex flex-col'>
                <p className='text-purple-600 text-2xl font-bold'>386</p>
                <p className='text-white text-lg font-bold'>Funded Projects</p>
              </div>
              <div className='flex flex-col'>
                <p className='text-purple-600 text-2xl font-bold'>486</p>
                <p className='text-white text-lg font-bold'>Unique Participants</p>
              </div>
              <div className='flex flex-col'>
                <p className='text-purple-600 text-2xl font-bold'>$9M+</p>
                <p className='text-white text-lg font-bold'>Raised Capital</p>
              </div>
              <div className='flex flex-col'>
                <p className='text-purple-600 text-2xl font-bold'>$18M+</p>
                <p className='text-white text-lg font-bold'>Inital Mark Cap</p>
              </div>
            </div>
          </div>
        </div>

        {/* Roadmap */}
        {/* Title */}
        <div id="Roadmap" className='relative mb-8 pt-10'>
          <div className='text-4xl text-white font-bold'>Roadmap</div>
        </div>
        <div className='flex flex-row _lg:flex-col justify-center'>
        {/* <div className='flex justify-center'> */}
        <div className="card rgb" style={{width: "20%"}}>
          <div className="card-image" ></div>
          <div className="card-text">
            <h2 className={"text-center mb-4"}>Phase 1</h2>
            <div className='text-gray-500 text-sm md:pl-24 lg:px-2 sm:px-10'>
              <p style={{color: "white"}}>1. NFT Launch<br></br></p>
              2. Presale / Minting NFT<br></br>
              3. Launch Site V1<br></br>
              4. Launch NFT Marketplace<br></br>
              5. Launch Staking Pool NFT<br></br>
              6. Airdrop Snapshot<br></br>
            </div>
          </div>
        {/* </div> */}
        </div>

        {/* <div className='flex justify-center'> */}
        <div className="card">
          <div className="card-image card2"></div>
          <div className="card-text card2">
            <h2 className={"text-center mb-4"}>Phase 2</h2>
            <div className='text-gray-500 text-sm md:pl-24 lg:px-2 sm:px-10'>
              1. Grow 10K Community<br></br>
              2. Listing On PancakeSwap, CMC or CGK<br></br>
              3. Launch Staking Pool Token<br></br>
              4. Marketing Campaign and Partnership<br></br>
            </div>
          </div>
        {/* </div> */}
        </div>

        {/* <div className='flex justify-center'> */}
        <div className="card">
            <div className="card-image card3"></div>
            <div className="card-text card3">
              <h2 className={"text-center mb-4"}>Phase 3</h2>
              <div className='text-gray-500 text-sm md:pl-24 lg:px-2 sm:px-10'>
                 1. Launch Site APP V2<br></br>
                 2. Launch Site for Market Place NFT<br></br>
                 3. Launch Site for Market Swap ( DEX )<br></br>
                 4. Growing more usecase for Token and NFT ( Will be taken from community voting )<br></br>
                 5. Audited<br></br>
                 6. CEX Listing<br></br>
              </div>
            </div>
        </div>
        {/* </div> */}
        </div>

        <Footer />
      </div>
    );
}

export default Landing;
