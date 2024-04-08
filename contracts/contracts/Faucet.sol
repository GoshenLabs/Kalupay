// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Faucet {
    address public owner;
    uint256 public balance;

    uint256 constant public AMOUNT_TO_DISPERSE = 50 ether; // 50 Ether

    constructor() {
        owner = msg.sender;
    }

    // Fallback function to receive Ether
    receive() external payable {
        balance += msg.value;
    }

    // Function to withdraw Ether from the faucet without paying gas fees
    function withdraw() external {
        require(balance >= AMOUNT_TO_DISPERSE, "Insufficient funds in the faucet");
        balance -= AMOUNT_TO_DISPERSE;
        (bool success, ) = msg.sender.call{value: AMOUNT_TO_DISPERSE}("");
        require(success, "Transfer failed");
    }

    // Function to add funds to the faucet
    function addFunds() external payable {
        require(msg.sender == owner, "Only the owner can add funds");
        balance += msg.value;
    }
}
