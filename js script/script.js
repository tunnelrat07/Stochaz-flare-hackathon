import dotenv from "dotenv";
dotenv.config();
import { JsonRpcProvider, Wallet, Contract, AbiCoder } from "ethers";
import axios from "axios";

// Load environment variables
const provider = new JsonRpcProvider(
  "https://coston2-api.flare.network/ext/bc/C/rpc"
);
const wallet = new Wallet(
  process.env.PRIVATE_KEY,
  provider
);

// Your contract ABI - focus on the relevant functions and events
const contractAbi = [
  // Events
  "event BetsExpired()",
  "event BetPlaced(address indexed player)",
  "event winnersPicked(bool isFor)",
  "event randomWinnerPicked(address indexed player)",

  // Functions
  "function changeBetStateToObservationPeriodOngoing() external",
  "function changeBetStateToBetBeingResolved() external",
  "function resolveBetWithFDC(uint256 difference) external returns (bool)",

  // View functions
  "function getBetStatus() external view returns (uint8)",
  "function getTimeLeftToPlaceBetInSeconds() external view returns (uint256)",
];

// Connect to your contract
const contract = new Contract(
  "0x837B83ec2A8B857735Ffdf3c182BBF5893dB6d66",
  contractAbi,
  wallet
);

// Status enum mapping for better readability
const BetStatus = {
  YetToBeStarted: 0,
  BettingPeriodOngoing: 1,
  ObservationPeriodOnGoing: 2,
  BetBeingResolved: 3,
  BetEnded: 4,
};

// Main function to monitor and resolve bets
async function monitorAndResolveBets() {
  console.log("🔍 Starting bet monitoring service with FDC attestation...");

  // Listen for BetsExpired event
  contract.on("BetsExpired", async () => {
    console.log("📢 BetsExpired event detected!");
    await checkAndResolveBet();
  });

  // Also check periodically in case we missed events
  setInterval(async () => {
    await checkAndResolveBet();
  }, 5 * 60 * 1000); // Check every 5 minutes

  // Initial check
  await checkAndResolveBet();
}

async function checkAndResolveBet() {
  try {
    const status = await contract.getBetStatus();
    const _status = Number(status);
    console.log("Status:", status);
    console.log("Status:", _status);

    if (status === BetStatus.BettingPeriodOngoing) {
      const timeLeft = await contract.getTimeLeftToPlaceBetInSeconds();

      if (timeLeft <= 0) {
        console.log("⏰ Betting period ended, changing to observation period");
        const tx = await contract.changeBetStateToObservationPeriodOngoing();
        await tx.wait();
        console.log("✅ Changed to observation period");
      } else {
        console.log(
          `⏳ Betting period ongoing, ${timeLeft.toString()} seconds left`
        );
      }
    } else if (_status === 2) {
      console.log(
        "🔍 Observation period ongoing, checking if it's time to resolve"
      );

      // Attempt to change state to BetBeingResolved
      // This will only succeed if the observation period is truly over
      try {
        const tx = await contract.changeBetStateToBetBeingResolved();
        await tx.wait();
        console.log("✅ Changed to bet being resolved");

        // Now resolve the bet with price data
        await fetchPriceDataAndResolveBet();
      } catch (err) {
        console.log("Observation period not yet complete");
      }
    } else if (status === BetStatus.BetBeingResolved) {
      console.log("🎲 Bet is ready to be resolved!");
      await fetchPriceDataAndResolveBet();
    }
  } catch (err) {
    console.error("❌ Error checking bet status:", err);
  }
}

async function fetchPriceDataAndResolveBet() {
  try {
    console.log("📊 Requesting ENS price data directly from CoinGecko...");

    // The main URL for CoinGecko ENS price data
    const coinGeckoUrl =
      "https://api.coingecko.com/api/v3/coins/ethereum-name-service/market_chart?vs_currency=usd&days=1";

    // Make a direct GET request to CoinGecko
    const response = await axios.get(coinGeckoUrl);

    // Extract the prices array from the response
    const prices = response.data.prices.map((pricePoint) => pricePoint[1]);

    // Calculate max and min prices (similar to the JQ logic)
    const maxPrice = Math.floor(Math.max(...prices) * 1000000);
    const minPrice = Math.floor(Math.min(...prices) * 1000000);
    const diff = Math.floor((maxPrice - minPrice) / 1000000);

    console.log(`Maximum price: ${maxPrice} (scaled by 1M)`);
    console.log(`Minimum price: ${minPrice} (scaled by 1M)`);
    console.log(`difference ${diff}`);

    // Call the contract's resolveBetWithFDC function with the calculated prices
    console.log("🎮 Resolving bet with price data...");
    const tx = await contract.resolveBetWithFDC(diff);
    const receipt = await tx.wait();

    // Log the winner side
    const winnerSide = await getWinnerSide(receipt);
    console.log(`🏆 Bet resolved! Winner: ${winnerSide}`);

    return receipt;
  } catch (err) {
    console.error("❌ Error resolving bet with price data:", err);
    console.error(err.message);
    if (err.response && err.response.data) {
      console.error("Error response data:", err.response.data);
    }
  }
}

// Keep your getWinnerSide function as is
async function getWinnerSide(receipt) {
  // Parse transaction receipt to find the winnersPicked event
  const winnerEvent = receipt.logs
    .map((log) => {
      try {
        return contract.interface.parseLog(log);
      } catch (e) {
        return null;
      }
    })
    .filter((parsedLog) => parsedLog && parsedLog.name === "winnersPicked")[0];

  if (winnerEvent) {
    return winnerEvent.args[0] ? "FOR side" : "AGAINST side";
  }
  return "Unknown";
}

// To run just this function for testing
fetchPriceDataAndResolveBet();

// Or keep your original monitoring function that calls this
/* monitorAndResolveBets(); */
