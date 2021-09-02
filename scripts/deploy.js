async function main() {
  const TokenBodega = await ethers.getContractFactory("Bodega");
  const initialSupply = ethers.BigNumber.from(200);
  const initialSupplyWithDecimals = initialSupply.mul(ethers.BigNumber.from(10).pow(18))
  const tokenBodega = await TokenBodega.deploy(initialSupplyWithDecimals);

  console.log("Token deployed to: ", tokenBodega.address);
  console.log("Inital supply: ", initialSupply.toString());

  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

  262144000000000000000000