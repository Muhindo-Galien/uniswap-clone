import Web3Modal from 'web3modal';
import { ethers } from "ethers";
import 
{
  LunaTokenABI,
  LunaTokenAddress,
  SoloTokenAddress,
  SoloTokenABI,
  SwapMultiHopAddress,
  SwapMultiHopABI,
  SingleSwapTokenAddress,
  SingleSwapTokenABI,
  IWETHAddress,
  IWETHABI
} from '../context/contant'
import ERC20 from "../context/ERC20.json";



//CHECK IF WALLET IS CONNECT
export const checkIfWalletConnected = async () => {
  try {
    if (!window.ethereum) return console.log("Install MetaMask");
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });
    const firstAccount = accounts[0];
    return firstAccount;
  } catch (error) {
    console.log(error);
  }
};

//CONNECT WALLET
export const connectWallet = async () => {
  try {
    if (!window.ethereum) return console.log("Install MetaMask");
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const firstAccount = accounts[0];
    return firstAccount;
  } catch (error) {
    console.log(error);
  }
};

//FETCHING CONTRACT------------------------
// FETCHING LunaToken
export const fetchLunaTokenContract = (signerOrProvider: ethers.providers.Provider | ethers.Signer | undefined) =>
  new ethers.Contract(LunaTokenAddress, LunaTokenABI, signerOrProvider);
const getAsigner=async()=>{
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    return signer;
  } catch (error) {
    console.log(error);
    
  }
}
// const signer =await getAsigner()

  //CONNECTING With LunaToken CONTRACT
export const connectingWithLunaToken = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchLunaTokenContract(signer);
    return contract;
  } catch (error) {
    console.log(error);
  }
};

// FETCHING SoloToken
export const fetchSoloTokenContract = (signerOrProvider: ethers.providers.Provider | ethers.Signer | undefined) =>
  new ethers.Contract(SoloTokenAddress, SoloTokenABI, signerOrProvider);

  //CONNECTING With LunaToken CONTRACT
export const connectingWithSoloToken = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchSoloTokenContract(signer);
    return contract;
  } catch (error) {
    console.log(error);
  }
};
//FETCHING CONTRACT------------------------

//SingleSwapToken TOKEN FETCHING
export const fetchSingleSwapContract = (signerOrProvider: ethers.providers.Provider | ethers.Signer | undefined) =>
  new ethers.Contract(
    SingleSwapTokenAddress,
    SingleSwapTokenABI,
      signerOrProvider
  );

//CONNECTING With SingleSwapToken TOKEN CONTRACT
export const connectingWithSingleSwapToken = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchSingleSwapContract(signer);
    return contract;
  } catch (error) {
    console.log(error);
  }
};
//FETCHING CONTRACT------------------------

//SwapMultiHop TOKEN FETCHING
export const fetchultMiHopContract = (signerOrProvider: ethers.providers.Provider | ethers.Signer | undefined) =>
new ethers.Contract(
  SwapMultiHopAddress,
  SwapMultiHopABI,
    signerOrProvider
);

//CONNECTING With SwapMultiHop TOKEN CONTRACT
export const connectingWithMultiHopContract = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchultMiHopContract(signer);
    return contract;
  } catch (error) {
    console.log(error);
  }
};


//FETCHING CONTRACT------------------------

//IWTH TOKEN FETCHING
export const fetchIWTHContract = (signerOrProvider: ethers.providers.Provider | ethers.Signer | undefined) =>
  new ethers.Contract(IWETHAddress, IWETHABI, signerOrProvider);

//CONNECTING With SingleSwapToken TOKEN CONTRACT
export const connectingWithIWTHToken = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchIWTHContract(signer);
    return contract;
  } catch (error) {
    console.log(error);
  }
};

export const getTokenBalance=()=>{
  const addToken = [
    "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    "0x0F527785e39B22911946feDf580d87a4E00465f0",
    "0x1D3EDBa836caB11C26A186873abf0fFeB8bbaE63",
   ];
  addToken.map(async (el, i) => {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    //GETTING CONTRACT
    const contract =  new ethers.Contract(el, ERC20, signer);
    console.log(contract);
    

      //GETTING BALANCE OF TOKEN
      const userBalance =  contract.balanceOf(signer)
      console.log("hello we're getting t");
      
      // const tokenLeft = BigNumber.from(userBalance).toString();
      // const convertTokenBal = ethers.utils.formatEther(tokenLeft);
    
  })
}