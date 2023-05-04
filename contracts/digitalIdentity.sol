// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract DigitalIdentityVerification {

    struct Identity {
        string firstName;
        string lastName;
        uint256 governmentID;
        bool verified;
    }

    mapping(address => Identity) public identity;

    event IdentityVerified(address indexed user, string firstName, string lastName, uint256 governmentID);

    function getIdentity() public view returns (string memory, string memory, uint256, bool) {
        Identity storage user = identity[msg.sender];
        return (user.firstName, user.lastName, user.governmentID, user.verified);
    }

    function verifyIdentity(string memory _firstName, string memory _lastName, uint256 _governmentID) public {
        require(identity[msg.sender].verified == false, "Identity already verified.");
        identity[msg.sender] = Identity(_firstName, _lastName, _governmentID, true);
        emit IdentityVerified(msg.sender, _firstName, _lastName, _governmentID);
    }
}