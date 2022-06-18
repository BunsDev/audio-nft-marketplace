import { ethers } from "hardhat";

async function main() {
  const NFTMarketPlace = await ethers.getContractFactory("NFTMarketPlace");
  const nftMarketPlace = await NFTMarketPlace.deploy(0);
  await nftMarketPlace.deployed();

  console.log("NFT MarketPlace deployed to:", nftMarketPlace.address);

  const NFT = await ethers.getContractFactory("NFT");
  const nft = await NFT.deploy();

  console.log("NFT deployed to:", nft.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
