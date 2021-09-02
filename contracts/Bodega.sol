//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Bodega is ERC20, Ownable {

    event Claim(address claimer,uint256 amount);
    event Burn(address burner,uint256 amount);

    constructor(uint256 initialSupply) ERC20("BODEGA-TEST", "BDG21-TEST") {
        _mint(_msgSender(), initialSupply);
    }

    function mint(uint256 supply) onlyOwner() public {
        _mint(_msgSender(), supply);
    }

    function mintTo(uint256 supply, address to) onlyOwner() public {
        _mint(to, supply);
    }

    function claim(uint256 amount) public {
        _burn(_msgSender(), amount);
        emit Claim(_msgSender(), amount);
    }

    function burn(uint256 amount) onlyOwner() public {
         _burn(_msgSender(), amount);
        emit Burn(_msgSender(), amount);
    }
}

