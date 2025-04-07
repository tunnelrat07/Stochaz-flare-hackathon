require("dotenv").config();
const { ethers } = require("ethers");
const axios = require("axios");

// Load env vars
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Replace with your contract ABI
const contractAbi = [
  "event RequestBetResolution(uint256 betId)",
  "function resolveBetWithFDC(uint256 betId, bytes abi_encoded_data) external",
];

// Connect to your contract
const contract = new ethers.Contract(
  process.env.CONTRACT_ADDRESS,
  contractAbi,
  wallet
);

// 🧠 Listen for the event
contract.on("RequestBetResolution", async (betId) => {
  console.log(`🪙 Bet ${betId.toString()} needs to be resolved`);

  try {
    // 🧠 Call FDC with CoinGecko API
    const response = await axios.post(
      "https://attestation-provider-testnet.flare.network/attestations/json-api/request",
      {
        url: "https://api.coingecko.com/api/v3/coins/ethereum-name-service/market_chart?vs_currency=usd&days=7",
        postprocessJq: ".prices | map(.[1]) | max",
        abi_signature: "value(uint256)",
      },
      { headers: { "Content-Type": "application/json" } }
    );

    const abiData = response.data.abi_encoded_data;

    // 💥 Call the smart contract with this data
    const tx = await contract.resolveBetWithFDC(betId, abiData);
    await tx.wait();
    console.log(`✅ Bet ${betId.toString()} resolved with FDC data.`);
  } catch (err) {
    console.error("❌ Error resolving bet:", err);
  }
});
