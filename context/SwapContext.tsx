import { Provider } from '@ethersproject/providers';
import React,{useState,useEffect,FC, ReactElement,createContext} from 'react';
import { ethers, BigNumber } from "ethers";
import Web3Modal from "web3modal";
import { Token, CurrencyAmount, TradeType, Percent } from "@uniswap/sdk-core";
import axios from "axios";
import ERC20 from "./ERC20.json";
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
import { token } from '../typechain-types/@openzeppelin/contracts';
  
  export const SwapTokenContext = createContext({});
  export const SwapTokenContextProvider:  FC<Props> = ({children}):ReactElement<any, any> | null=>{
    const swap ="Uniswap"
     //USSTATE
    const [account, setAccount] = useState("");
    const [ether, setEther] = useState("");
    const [networkConnect, setNetworkConnect] = useState("");
    const [weth9, setWeth9] = useState("");
    const [dai, setDai] = useState("");
    const [tokenData, setTokenData] = useState<{name:string;symbol:string;tokenBalance:string}[]>([]);
    const addToken = [
      '0x9C85258d9A00C01d00ded98065ea3840dF06f09c',
      '0xFCFE742e19790Dd67a627875ef8b45F17DB1DaC6'
    ]


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
      addToken.map(async (el, i) => {
        //GETTING CONTRACT
        const contract = new ethers.Contract(el, ERC20, provider);
        //GETTING BALANCE OF TOKEN
        const userBalance = await contract.balanceOf(userAccount);
        const tokenLeft = BigNumber.from(userBalance).toString();
        const convertTokenBal = ethers.utils.formatEther(tokenLeft);
        console.log(convertTokenBal);
        
        //GET NAME AND SYMBOL

        const symbol = await contract.symbol();
        const name = await contract.name();

        tokenData.push({
          name: name,
          symbol: symbol,
          tokenBalance: convertTokenBal,
        });
      });

        
        
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