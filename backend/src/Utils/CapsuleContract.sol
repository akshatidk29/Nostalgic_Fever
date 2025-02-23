// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CapsuleContract {
    // Using string as key for the mapping
    mapping(string => string) private capsuleHashes;
    
    event CapsuleHashStored(string indexed capsuleId, string hash);

    function storeCapsuleHash(string calldata capsuleId, string calldata hash) public {
        require(bytes(capsuleId).length > 0, "CapsuleId cannot be empty");
        require(bytes(hash).length > 0, "Hash cannot be empty");
        
        capsuleHashes[capsuleId] = hash;
        emit CapsuleHashStored(capsuleId, hash);
    }

    function getCapsuleHash(string calldata capsuleId) public view returns (string memory) {
        require(bytes(capsuleId).length > 0, "CapsuleId cannot be empty");
        
        string memory hash = capsuleHashes[capsuleId];
        require(bytes(hash).length > 0, "Hash not found for capsuleId");
        
        return hash;
    }
}