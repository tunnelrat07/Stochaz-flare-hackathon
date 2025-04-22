# ENS Price Oracle Betting System

## Overview

This repository contains a decentralized betting platform deployed on the Flare Network (Coston2 testnet) that allows users to place bets on the price movement of the Ethereum Name Service (ENS) token. The system uses real-world price data from CoinGecko to determine winners, with an automated resolution mechanism that ensures fair and transparent outcomes.

## Table of Contents

- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Technical Details](#technical-details)
- [Bet Lifecycle](#bet-lifecycle)
- [Monitoring Service](#monitoring-service)
- [CoinGecko Integration](#coingecko-integration)
- [Contract Events](#contract-events)
- [Environment Setup](#environment-setup)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Architecture

### Smart Contract

The system is built around a primary smart contract deployed at: `0x4aC6E3F4c83805fa07953B31db844a547d11707c` on the Coston2 testnet. The contract manages the entire betting lifecycle:

1. **Betting Period**: Users place bets on whether the ENS token price will go UP (FOR) or DOWN (AGAINST)
2. **Observation Period**: Betting closes and the system monitors ENS price movements
3. **Resolution Phase**: The contract resolves the bet based on maximum and minimum price data from CoinGecko
4. **Winner Selection & Payout**: Winners are determined and rewards are distributed

### Automated Oracle Service

The repository includes a Node.js service that automates bet monitoring and resolution. This service:

- Monitors the contract state continuously
- Transitions bet states automatically when conditions are met
- Fetches ENS price data from CoinGecko
- Resolves bets by submitting price data to the smart contract
- Logs all activities for transparency and debugging

## Getting Started

### Prerequisites

- Node.js v16+
- npm or yarn
- Flare Network account (Coston2 testnet)
- Some test FLR tokens for gas fees

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/ens-price-oracle-betting.git
   cd ens-price-oracle-betting
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Configure environment variables:

   ```
   cp .env.example .env
   ```

   Edit the `.env` file with your private key and other configuration settings.

4. Run the monitoring service:
   ```
   npm start
   ```

## Technical Details

### Smart Contract Interfaces

The contract exposes the following key functions:

```solidity
// State transition functions
function changeBetStateToObservationPeriodOngoing() external
function changeBetStateToBetBeingResolved() external
function resolveBetWithFDC(uint256 maxPriceInUSD, uint256 minPriceInUSD) external returns (bool)

// View functions
function getBetStatus() external view returns (uint8)
function getTimeLeftToPlaceBetInSeconds() external view returns (uint256)
```

### Contract Events

The contract emits the following events:

```solidity
event BetsExpired()
event BetPlaced(address indexed player)
event winnersPicked(bool isFor)
event randomWinnerPicked(address indexed player)
```

### Bet Status Enum

```solidity
enum BetStatus {
  YetToBeStarted,       // 0
  BettingPeriodOngoing, // 1
  ObservationPeriodOnGoing, // 2
  BetBeingResolved,     // 3
  BetEnded              // 4
}
```

## Bet Lifecycle

The betting system follows a well-defined state machine:

1. **Betting Period (Status 1)**

   - Users can place bets on price movement (FOR or AGAINST)
   - System tracks time remaining via `getTimeLeftToPlaceBetInSeconds()`
   - Once time expires, monitoring service calls `changeBetStateToObservationPeriodOngoing()`

2. **Observation Period (Status 2)**

   - Betting is closed
   - System observes ENS price movements through CoinGecko
   - Once observation period ends, service calls `changeBetStateToBetBeingResolved()`

3. **Resolution Phase (Status 3)**

   - System fetches final price data from CoinGecko
   - Maximum and minimum prices are calculated
   - Service calls `resolveBetWithFDC(maxPrice, minPrice)`
   - Smart contract determines winners based on price movement

4. **Bet Ended (Status 4)**
   - Winners are announced via `winnersPicked` event
   - Rewards are distributed automatically
   - In some cases, a random winner may be selected (`randomWinnerPicked` event)

## Monitoring Service

The repository's main monitoring service (`index.js`) provides:

### Features

- **Event-based Monitoring**: Listens for blockchain events like `BetsExpired`
- **Polling Backup**: Periodically checks bet status in case events are missed
- **Automatic State Transitions**: Handles state changes without manual intervention
- **Price Data Fetching**: Retrieves ENS price data directly from CoinGecko
- **Bet Resolution**: Submits price data to the smart contract for winner determination
- **Detailed Logging**: Provides comprehensive logging for monitoring and debugging

### Core Functions

- `monitorAndResolveBets()`: Main entry point that initiates monitoring
- `checkAndResolveBet()`: Checks current bet status and takes appropriate action
- `fetchPriceDataAndResolveBet()`: Retrieves ENS price data and resolves the bet
- `getWinnerSide()`: Parses transaction receipts to determine winning side

## CoinGecko Integration

The system relies on CoinGecko's public API to obtain reliable ENS token price data:

### Price Data Retrieval

- **Endpoint**: `https://api.coingecko.com/api/v3/coins/ethereum-name-service/market_chart?vs_currency=usd&days=1`
- **Data Processing**:
  - Extracts price points from the response
  - Calculates maximum and minimum prices
  - Scales prices by multiplying by 1,000,000 (for precision in blockchain)
  - Floors the values to eliminate decimal points

### Direct API Integration

The updated implementation fetches price data directly from CoinGecko without using the FDC attestation service:

```javascript
// Make a direct GET request to CoinGecko
const response = await axios.get(coinGeckoUrl);

// Extract the prices array from the response
const prices = response.data.prices.map((pricePoint) => pricePoint[1]);

// Calculate max and min prices
const maxPrice = Math.floor(Math.max(...prices) * 1000000);
const minPrice = Math.floor(Math.min(...prices) * 1000000);
```

## Environment Setup

Create a `.env` file with the following configuration:

```
# Flare Network RPC endpoint
RPC_URL=https://coston2-api.flare.network/ext/bc/C/rpc

# Your private key (without 0x prefix)
PRIVATE_KEY=your_private_key_here

# Smart contract address
CONTRACT_ADDRESS=0x4aC6E3F4c83805fa07953B31db844a547d11707c

# Monitoring interval in milliseconds (default: 5 minutes)
CHECK_INTERVAL=300000
```

⚠️ **SECURITY WARNING**: Never commit your `.env` file or expose your private key. Add `.env` to your `.gitignore` file.

## Deployment

### Running as a Service

For production environments, set up the monitoring service to run continuously:

#### Using PM2

```bash
npm install -g pm2
pm2 start index.js --name "ens-betting-monitor"
pm2 save
pm2 startup
```

#### Using Docker

```bash
docker build -t ens-betting-monitor .
docker run -d --name ens-betting-monitor ens-betting-monitor
```

### Monitoring and Logs

To view logs and monitor the service:

```bash
# If using PM2
pm2 logs ens-betting-monitor

# If using Docker
docker logs -f ens-betting-monitor
```

## Troubleshooting

### Common Issues

1. **Transaction Failures**

   - Ensure your account has sufficient FLR for gas
   - Check that the contract is in the expected state before calling state-transition functions

2. **API Rate Limiting**

   - CoinGecko may impose rate limits on their free API
   - Implement appropriate retry logic with exponential backoff

3. **Event Monitoring Issues**
   - Ensure RPC provider supports WebSocket connections for reliable event monitoring
   - The polling backup mechanism should catch missed events

### Debug Mode

Set `DEBUG=true` in your environment variables to enable verbose logging:

```
DEBUG=true npm start
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## Disclaimer

This system is deployed on the Coston2 testnet and is for demonstration and educational purposes only. Always exercise caution when dealing with financial transactions on blockchain networks.
