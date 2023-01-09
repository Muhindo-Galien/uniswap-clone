import { Provider } from '@ethersproject/providers';
import React,{useState,useEffect,FC, ReactElement,createContext} from 'react';
import { ethers, BigNumber } from "ethers";
import Web3Modal from "web3modal";
import { Token, CurrencyAmount, TradeType, Percent } from "@uniswap/sdk-core";
import axios from "axios";

import { IWETHABI } from "./contant";

//INTERNAL IMPORT
import {
  checkIfWalletConnected,
  connectWallet,
  connectingWithSoloToken,
  connectingWithLunaToken,
  connectingWithSingleSwapToken,
  connectingWithIWTHToken,

  connectingWithMultiHopContract} from "../Blockchain/services"

import { Props } from "next/script";
  
  export const SwapTokenContext = createContext({});
  export const SwapTokenContextProvider:  FC<Props> = ({children}):ReactElement<any, any> | null=>{
    const swap ="Uniswap"
     //USSTATE
    const [account, setAccount] = useState("");
    const [ether, setEther] = useState("");
    const [networkConnect, setNetworkConnect] = useState("");
    const [weth9, setWeth9] = useState("");
    const [dai, setDai] = useState("");
    const [tokenData, setTokenData] = useState([]);


//FETCH DATA
const fetchingData = async () => {
  try {
          //GET USER ACCOUNT
        const userAccount = await checkIfWalletConnected();
        setAccount(userAccount);
        //CREATE PROVIDER
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        //CHECK Balance
        const balance = await provider.getBalance(userAccount);
        const convertBal = BigNumber.from(balance).toString();
        const ethValue = ethers.utils.formatEther(convertBal);
        
        setEther(ethValue);
        console.log(ethValue);
         //GET NETWORK
        const newtork = await provider.getNetwork();
        setNetworkConnect(newtork.name);
          //ALL TOKEN BALANCE AND DATA
   
        
        
  } catch (error) {
    console.log(error);
    
  }
}
useEffect(()=>{
  fetchingData()
},[])

    return (
      <SwapTokenContext.Provider value={{swap}}> {children}</SwapTokenContext.Provider>
    )
  }