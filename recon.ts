import { ethers } from "ethers";

interface ContractConfig {
    address: string;
    ownerRenounced: boolean;
    isPaused: boolean;
}

/**
 * A security script to analyze an EVM contract for dangerous states.
 * Specifically checks if ownership is renounced and if the contract is paused.
 */
async function analyzeContract(
    provider: ethers.JsonRpcProvider, 
    contractAddress: string
): Promise<ContractConfig> {
    // Minimal ABI for Ownable and Pausable
    const abi = [
        "function owner() view returns (address)",
        "function paused() view returns (bool)"
    ];

    const contract = new ethers.Contract(contractAddress, abi, provider);
    const config: ContractConfig = {
        address: contractAddress,
        ownerRenounced: false,
        isPaused: false
    };

    try {
        const owner = await contract.owner();
        // If owner is the zero address, ownership is renounced
        config.ownerRenounced = owner === ethers.ZeroAddress;
    } catch (e) {
        console.log(`[-] Contract ${contractAddress} does not implement 'owner()'`);
    }

    try {
        config.isPaused = await contract.paused();
    } catch (e) {
         console.log(`[-] Contract ${contractAddress} does not implement 'paused()'`);
    }

    return config;
}

async function main() {
    // Connect to mainnet (or any RPC)
    const provider = new ethers.JsonRpcProvider("https://eth.llamarpc.com");
    
    // Example: A random token or protocol
    const target = "0x00000000219ab540356cBB839Cbe05303d7705Fa"; // Beacon Deposit Contract
    
    console.log(`Starting recon on ${target}...`);
    const report = await analyzeContract(provider, target);
    
    console.log("\n--- Security Recon Report ---");
    console.log(`Address: ${report.address}`);
    console.log(`Ownership Renounced: ${report.ownerRenounced ? "✅ YES" : "🚨 NO"}`);
    console.log(`Contract Paused: ${report.isPaused ? "⚠️ YES" : "✅ NO"}`);
}

main().catch(console.error);
