// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20Interface {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract TokenTransfer {
    address public owner;
    mapping(address => bool) private verifiedTokens;
    address[] public verifiedTokenList;
    address public feeToken;
    uint256 public feeAmount;
    address public feeReceiver;

    struct Transaction {
        address sender;
        address receiver;
        uint256 amount;
    }

    event TransactionCompleted(
        address indexed sender,
        address indexed receiver,
        uint256 amount
    );

    event FeeUpdated(
        address indexed owner,
        address indexed feeToken,
        uint256 feeAmount,
        address indexed feeReceiver
    );

    constructor() {
        owner = msg.sender;
        feeReceiver = msg.sender; // Default to owner's address
    }

    modifier onlyOwner {
        require(msg.sender == owner, "TokenTransfer: caller is not the owner");
        _;
    }

    modifier onlyVerifiedToken(address _token) {
        require(verifiedTokens[_token] == true, "TokenTransfer: token is not verified");
        _;
    }

    function addVerifiedToken(address _token) public onlyOwner {
        verifiedTokens[_token] = true;
        verifiedTokenList.push(_token);
    }

    function removeVerifiedToken(address _token) public onlyOwner {
        require(verifiedTokens[_token] == true, "TokenTransfer: token is not in the list");
        verifiedTokens[_token] = false;

        // Removing the token from the verifiedTokenList
        for (uint256 i = 0; i < verifiedTokenList.length; i++) {
            if (verifiedTokenList[i] == _token) {
                verifiedTokenList[i] = verifiedTokenList[verifiedTokenList.length - 1];
                verifiedTokenList.pop();
                break;
            }
        }
    }

    function getVerifiedTokens() public view returns (address[] memory) {
        return verifiedTokenList;
    }

    function setFee(address _feeToken, uint256 _feeAmount, address _feeReceiver) public onlyOwner {
        feeToken = _feeToken;
        feeAmount = _feeAmount;
        feeReceiver = _feeReceiver;
        emit FeeUpdated(owner, feeToken, feeAmount, feeReceiver);
    }

    function transfer(IERC20Interface token, address to, uint256 amount) public onlyVerifiedToken(address(token)) returns (bool) {
        uint256 senderBalance = token.balanceOf(msg.sender);
        require(senderBalance >= amount, "TokenTransfer: insufficient balance");

        // Apply fee if set
        if (feeAmount > 0) {
            require(IERC20Interface(feeToken).transferFrom(msg.sender, feeReceiver, feeAmount), "TokenTransfer: fee transfer failed");
        }

        bool success = token.transferFrom(msg.sender, to, amount);
        require(success, "TokenTransfer: transfer failed");

        Transaction memory transaction = Transaction({
            sender: msg.sender,
            receiver: to,
            amount: amount
        });

        emit TransactionCompleted(transaction.sender, transaction.receiver, transaction.amount);

        return true;
    }
}