const hre = require("hardhat");

async function main() {
  //ERC20 Luna TOKEN
  const LunaToken = await hre.ethers.getContractFactory("LunaToken");
  const lunaToken = await LunaToken.deploy();
  await lunaToken.deployed();
  console.log(`Luna deployed to ${lunaToken.address}`);

  //ERC20 Solo TOKEN
  
  const SoloToken = await hre.ethers.getContractFactory("SoloToken");
  const soloToken = await SoloToken.deploy();
  await soloToken.deployed();
  console.log(`Solo deployed to ${soloToken.address}`);

  //SingleSwapToken
  const SingleSwapToken = await hre.ethers.getContractFactory(
    "SingleSwapToken"
  );
  const singleSwapToken = await SingleSwapToken.deploy();
  await singleSwapToken.deployed();
  console.log(`SingleSwapToken deployed to ${singleSwapToken.address}`);

  //SwapMultiHop
  const SwapMultiHop = await hre.ethers.getContractFactory("SwapMultiHop");
  const swapMultiHop = await SwapMultiHop.deploy();
  await swapMultiHop.deployed();
  console.log(`swapMultiHop deployed to ${swapMultiHop.address}`);

  //USER DATA CONTRACT
  // const UserStorageData = await hre.ethers.getContractFactory(
  //   "UserStorageData"
  // );
  // const userStorageData = await UserStorageData.deploy();
  // await userStorageData.deployed();
  // console.log(`UserStorageData deployed to ${userStorageData.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});