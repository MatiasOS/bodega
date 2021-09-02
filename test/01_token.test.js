const { expect } = require("chai");
const { BN, constants, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');


const INITIAL_SUPPLY = ethers.BigNumber.from(1000).pow(18);

describe("Token - Supply", function () {
  let owner, other, accounts;
  let bodega;
  before(async function() {
    [owner, otherUser, ...accounts] = await ethers.getSigners();
    const Bodega = await ethers.getContractFactory("Bodega");
    bodega = await Bodega.deploy(INITIAL_SUPPLY);
    await bodega.deployed();
  });

  it("Supply should be INITIAL_SUPPLY and belong to owner", async function () {
    await bodega.deployed();
    const supply = await bodega.totalSupply();
    expect(supply).to.equal(ethers.BigNumber.from(INITIAL_SUPPLY));

    const ownerBalance = await bodega.balanceOf(owner.address);
    expect(ownerBalance).to.equal(ethers.BigNumber.from(INITIAL_SUPPLY));
  });

  it("Adds 200 new tokens to supply, and the 100 more", async function () {
    const secondMint = ethers.BigNumber.from(200).pow(18);
    const thirdMint = ethers.BigNumber.from(100).pow(18);
    
    await bodega.mint(secondMint);
    let supply = await bodega.totalSupply();
    expect(supply).to.equal(INITIAL_SUPPLY.add(secondMint));
    let ownerBalance = await bodega.balanceOf(owner.address);
    expect(ownerBalance).to.equal(ethers.BigNumber.from(INITIAL_SUPPLY.add(secondMint)));

    await bodega.mintTo(thirdMint, otherUser.address);
    supply = await bodega.totalSupply();
    expect(supply).to.equal(ethers.BigNumber.from(INITIAL_SUPPLY.add(secondMint).add(thirdMint)));
    ownerBalance = await bodega.balanceOf(owner.address);
    const otherUserBalance = await bodega.balanceOf(otherUser.address);
    expect(ownerBalance).to.equal(INITIAL_SUPPLY.add(secondMint));
    expect(otherUserBalance).to.equal(ethers.BigNumber.from(thirdMint));

  });

  it("Only owner is able to mint", async function () {
    await expectRevert(
      bodega.connect(otherUser).mint(ethers.BigNumber.from(1).pow(18)),
      "Ownable: caller is not the owner"
    )
    await expectRevert(
      bodega.connect(otherUser).mintTo(ethers.BigNumber.from(1).pow(18), owner.address),
      "Ownable: caller is not the owner"
    )
  });

});
