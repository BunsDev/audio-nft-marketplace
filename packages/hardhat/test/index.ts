import { expect } from "chai";
import { ethers } from "hardhat";

describe("NFT", function () {
  it("Should add new NFT", async function () {
    const [_, user1, user2] = await ethers.getSigners();

    const NFT = await ethers.getContractFactory("NFT");
    const nft = await NFT.deploy(ethers.constants.AddressZero);
    await nft.deployed();

    let tx = await nft.connect(user1).mintToken("test1");
    await tx.wait();

    tx = await nft.connect(user1).mintToken("test2");
    await tx.wait();

    tx = await nft.connect(user2).mintToken("test3");
    await tx.wait();

    const user1Tokens = await nft.getOwnerTokens(user1.address);
    expect(user1Tokens.length).to.eq(2);

    const user2Tokens = await nft.getOwnerTokens(user2.address);
    expect(user2Tokens.length).to.eq(1);

    const allTokens = await nft.getAllTokens();
    expect(allTokens.length).to.eq(3);
  });
});
