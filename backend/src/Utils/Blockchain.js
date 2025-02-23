import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();

const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contractAddress = process.env.CONTRACT_ADDRESS;

const contractABI = [
    "function storeCapsuleHash(string calldata capsuleId, string calldata hash) public",
    "function getCapsuleHash(string calldata capsuleId) public view returns (string memory)",
    "event CapsuleHashStored(string indexed capsuleId, string hash)"
];

export const contract = new ethers.Contract(contractAddress, contractABI, wallet);

export const storeCapsuleHash = async (capsuleId, hash) => {
    try {
        // Ensure capsuleId is a string
        const stringCapsuleId = capsuleId.toString();
        
        // Add error checking
        if (!stringCapsuleId || !hash) {
            throw new Error("Invalid capsuleId or hash");
        }

        const tx = await contract.storeCapsuleHash(stringCapsuleId, hash);
        const receipt = await tx.wait();
        console.log("✅ Hash stored on blockchain. Transaction:", receipt.hash);
        return receipt.hash;
    } catch (error) {
        console.error("❌ Error storing hash:", error);
        throw error;
    }
};

export const getStoredHash = async (capsuleId) => {
    try {
        // Ensure capsuleId is a string
        const stringCapsuleId = capsuleId.toString();
        
        if (!stringCapsuleId) {
            throw new Error("Invalid capsuleId");
        }

        const storedHash = await contract.getCapsuleHash(stringCapsuleId);
        return storedHash;
    } catch (error) {
        if (error.code === 'CALL_EXCEPTION') {
            console.error("Hash not found for capsuleId:", capsuleId);
            return null;
        }
        console.error("❌ Error retrieving hash:", error);
        throw error;
    }
};