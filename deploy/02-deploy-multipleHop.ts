import {DeployFunction} from "hardhat-deploy/types"
import {HardhatRuntimeEnvironment} from "hardhat/types"

const deploySwapMultiHop: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
    const { deployments, getNamedAccounts, network, ethers } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    const args: any[] = []

    log("-----------------Deploying SwapMultiHop------------------")
    const swapMultiHop = await deploy("SwapMultiHop", {
      from: deployer,
      args: args,
      log: true,
  })
    log("contract deployed at: ",swapMultiHop.address)
    log("----------------------------------------------------")
}
export default deploySwapMultiHop   
deploySwapMultiHop.tags = ["all", "swapMultiHop"]