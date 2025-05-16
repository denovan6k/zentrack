// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DonationContract {
    address public admin;
    mapping(address => Donor) public donors;
    mapping(address => Charity) public charities;
    mapping(address => Subscription[]) public subscriptions;
    
    struct Donor {
        string name;
        uint256 totalDonated;
        uint256 lastDonation;
        address[] supportedCharities;
    }
    
    // Add to the Charity struct
    struct Charity {
        string name;
        string description;
        address wallet;
        uint256 totalReceived;
        uint256 lastWithdrawal;
        bool verified;
    }
    
    struct Subscription {
        address charity;
        uint256 amount;
        uint256 interval; // in seconds
        uint256 nextPayment;
    }
    
    modifier onlyAdmin() {
        require(msg.sender == admin, "Not authorized");
        _;
    }
    
    constructor() {
        admin = msg.sender;
    }
    
    function registerDonor(string memory name) external {
        donors[msg.sender].name = name;
    }
    
    function registerCharity(
        string memory name,
        string memory description,
        address wallet
    ) external onlyAdmin {
        charities[wallet] = Charity(name, description, wallet, 0, true);
    }
    
    function makeDonation(address charity) external payable {
        require(charities[charity].verified, "Charity not verified");
        require(msg.value > 0, "Donation amount must be positive");
        
        donors[msg.sender].totalDonated += msg.value;
        donors[msg.sender].lastDonation = block.timestamp;
        charities[charity].totalReceived += msg.value;
        
        (bool sent, ) = charity.call{value: msg.value}("");
        require(sent, "Failed to send donation");
    }
    
    function createSubscription(
        address charity,
        uint256 amount,
        uint256 interval
    ) external payable {
        require(charities[charity].verified, "Charity not verified");
        require(msg.value >= amount, "Insufficient funds for first payment");
        
        subscriptions[msg.sender].push(Subscription(
            charity,
            amount,
            interval,
            block.timestamp + interval
        ));
        
        (bool sent, ) = charity.call{value: amount}("");
        require(sent, "Failed to send initial subscription payment");
    }
    
    function executeSubscriptions() external {
        Subscription[] storage userSubs = subscriptions[msg.sender];
        for (uint i = 0; i < userSubs.length; i++) {
            if (block.timestamp >= userSubs[i].nextPayment) {
                (bool sent, ) = userSubs[i].charity.call{value: userSubs[i].amount}("");
                if (sent) {
                    userSubs[i].nextPayment += userSubs[i].interval;
                }
            }
        }
    }
    
    function getDonorInfo(address donor) external view returns (Donor memory) {
        return donors[donor];
    }
    
    function getCharityInfo(address charity) external view returns (Charity memory) {
        return charities[charity];
    }
    
    function getSubscriptions(address donor) external view returns (Subscription[] memory) {
        return subscriptions[donor];
    }

    // Add these functions to the contract
    function withdrawFunds(uint256 amount) external {
        require(charities[msg.sender].verified, "Not a verified charity");
        require(address(this).balance >= amount, "Insufficient contract balance");
        
        charities[msg.sender].lastWithdrawal = block.timestamp;
        (bool sent, ) = msg.sender.call{value: amount}("");
        require(sent, "Withdrawal failed");
    }

    function getCharityDonations(address charity) external view returns (uint256) {
        return charities[charity].totalReceived;
    }

    // Update the makeDonation function to emit an event
    event DonationMade(
        address indexed donor,
        address indexed charity,
        uint256 amount,
        bool isSubscription
    );

    // Add this line in makeDonation function before the transfer
    emit DonationMade(msg.sender, charity, msg.value, false);

    // Add this line in createSubscription function before the transfer
    emit DonationMade(msg.sender, charity, amount, true);
}