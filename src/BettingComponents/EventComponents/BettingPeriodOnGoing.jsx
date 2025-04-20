import React, { useState } from "react";
import {
  useActiveAccount,
  useReadContract,
  TransactionButton,
} from "thirdweb/react";
import { parseEther } from "ethers";
import { prepareContractCall } from "thirdweb";
import { Clock, Activity, Info } from "lucide-react";
import { useSendTransaction } from "thirdweb/react";

export default function BettingPeriodOngoing({ contract, event, betState }) {
  const [betSide, setBetSide] = useState(null);
  const account = useActiveAccount();
  const accountAddress = account?.address;
  const { mutate: sendTransaction } = useSendTransaction();
  const { data: usdToFLRinWei, isPending: isPendingUSDtoFLRinWei } =
    useReadContract({
      contract,
      method:
        "function convertUSDtoFLRinWei(uint256 amountUSD) view returns (uint256)",
      params: [2],
    });
  const _usdToFLRinWei = usdToFLRinWei ? Number(usdToFLRinWei) : 0;
  const {
    data: amountBettedAgainstByUser,
    isPending: isPendingAmountBettedAgainstByUser,
  } = useReadContract({
    contract,
    method:
      "function getAmountBettedAgainstByAddress(address Address) view returns (uint256)",
    params: [accountAddress],
  });
  const _amountBettedAgainstByUser = amountBettedAgainstByUser
    ? Number(amountBettedAgainstByUser)
    : 0;
  const {
    data: amountBettedForByUser,
    isPending: isPendingAmountBettedForByUser,
  } = useReadContract({
    contract,
    method:
      "function getAmountBettedForByAddress(address Address) view returns (uint256)",
    params: [accountAddress],
  });
  const _amountBettedForByUser = amountBettedForByUser
    ? Number(amountBettedForByUser)
    : 0;
  const { data: betStatus, isPending: isPendingBetStatus } = useReadContract({
    contract,
    method: "function getBetStatus() view returns (uint8)",
    params: [],
  });
  const _betStatus = betStatus ? Number(betStatus) : 0;
  const { data: bettingFeesInUSD, isPending: isPendingBettingFeesInUSD } =
    useReadContract({
      contract,
      method: "function getBettingFeesInUSD() view returns (uint256)",
      params: [],
    });
  const _bettingFeesInUSD = bettingFeesInUSD ? Number(bettingFeesInUSD) : 0;
  const { data: valueOfFLRinUSD, isPending: isPendingValueOfFLRinUSD } =
    useReadContract({
      contract,
      method:
        "function getFtsoV2CurrentFeedValues() view returns (uint256 _feedValues, uint64 _timestamp)",
      params: [],
    });
  const _valueOfFLRinUSD = valueOfFLRinUSD ? Number(valueOfFLRinUSD) : 0;
  const {
    data: ifBetPlacingIntervalIsOver,
    isPending: isPendingIfBetPlacingIntervalIsOver,
  } = useReadContract({
    contract,
    method: "function getIfBetPlacingIntervalIsOver() view returns (bool)",
    params: [],
  });
  const _ifBetPlacingIntervalIsOver = ifBetPlacingIntervalIsOver
    ? Boolean(ifBetPlacingIntervalIsOver)
    : false;
  const { data: maximumSpreadInUSD, isPending: isPendingMaximumSpreadInUSD } =
    useReadContract({
      contract,
      method: "function getMaximumSpreadInUSD() view returns (uint256)",
      params: [],
    });
  const _maximumSpreadInUSD = maximumSpreadInUSD
    ? Number(maximumSpreadInUSD)
    : 0;
  const {
    data: numberOfAgainstBetters,
    isPending: isPendingNumberOfAgaisntBetters,
  } = useReadContract({
    contract,
    method: "function getNumberOfAgainstBetters() view returns (uint256)",
    params: [],
  });
  const _numberOfAgainstBetters = numberOfAgainstBetters
    ? Number(numberOfAgainstBetters)
    : 0;
  const { data: numberOfForBetters, isPending: isPendingNumberOfForBetters } =
    useReadContract({
      contract,
      method: "function getNumberOfForBetters() view returns (uint256)",
      params: [],
    });
  const _numberOfForBetters = numberOfForBetters
    ? Number(numberOfForBetters)
    : 0;
  const { data: randomRewardInUSD, isPending: isPendingRandomRewardInUSd } =
    useReadContract({
      contract,
      method: "function getRandomRewardInUSd() view returns (uint256)",
      params: [],
    });
  const _randomRewardInUSD = randomRewardInUSD ? Number(randomRewardInUSD) : 0;
  /*   const { data: secureRandomNumber, isPending: isPendingSecureRandomNumber } =
    useReadContract({
      contract,
      method:
        "function getSecureRandomNumber() view returns (uint256 randomNumber, bool isSecure, uint256 timestamp)",
      params: [],
    }); */
  const { data: timeLeftToPlaceBets, isPending: isPendingTimeLeftToPlaceBet } =
    useReadContract({
      contract,
      method:
        "function getTimeLeftToPlaceBetInSeconds() view returns (uint256)",
      params: [],
    });
  const _timeLeftToPlaceBets = timeLeftToPlaceBets
    ? Number(timeLeftToPlaceBets)
    : 0;

  const {
    data: totalAgainstBettedAmountInUSD,
    isPending: isPendingTotalAgainstBettedAmountInUSD,
  } = useReadContract({
    contract,
    method:
      "function getTotalAgainstBettedAmountInUSD() view returns (uint256)",
    params: [],
  });
  const _totalAgainstBettedAmountInUSD = totalAgainstBettedAmountInUSD
    ? Number(totalAgainstBettedAmountInUSD)
    : 0;
  const {
    data: totalForBettedAmountInUSD,
    isPending: isPendingTotalForBettedAmountInUSD,
  } = useReadContract({
    contract,
    method: "function getTotalForBettedAmountInUSD() view returns (uint256)",
    params: [],
  });
  const _totalForBettedAmountInUSD = totalForBettedAmountInUSD
    ? Number(totalForBettedAmountInUSD)
    : 0;
  const { data: totalPoolInUSD, isPending: isPendingTotalPoolInUSD } =
    useReadContract({
      contract,
      method: "function getTotalPool() view returns (uint256)",
      params: [],
    });
  const _totalPoolInUSD = totalPoolInUSD ? Number(totalPoolInUSD) : 0;
  const {
    data: maximumBetFromEitherTeamInUSD,
    isPending: isPendingMaximumBetFromEitherTeamInUSD,
  } = useReadContract({
    contract,
    method:
      "function getmaximumBetFromEitherTeamInUSD() view returns (uint256)",
    params: [],
  });
  const _maximumBetFromEitherTeamInUSD = maximumBetFromEitherTeamInUSD
    ? Number(maximumBetFromEitherTeamInUSD)
    : 0;
  const {
    data: timeRemainingInSecondsTillResult,
    isPending: isPendingTimeRemainingInSecondsTillResult,
  } = useReadContract({
    contract,
    method:
      "function timeRemainingInSecondsTillResult() view returns (uint256)",
    params: [],
  });
  const _timeRemainingInSecondsTillResult = timeRemainingInSecondsTillResult
    ? Number(timeRemainingInSecondsTillResult)
    : 0;

  // Format time remaining
  const formatTimeRemaining = (seconds) => {
    if (!seconds) return "Betting Period is over";
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    return `${days}d ${hours}h ${minutes}m ${secs}s`;
  };

  // Format amounts for display
  const formatAmount = (amount) => {
    if (!amount) return "0";
    return ethers.utils.formatEther(amount);
  };

  const handleBetSubmit = (side) => {
    // Logic to be implemented
    console.log(`Placing bet on ${side}`);
  };

  const fixedBetAmount = 2;
  const potentialWinnings = (fixedBetAmount * 1.5).toFixed(2);

  return (
    <div className="px-4 py-3 bg-slate-950 border-t border-gray-800">
      <p className="text-gray-300 mb-4">{event.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-sm font-medium text-gray-400 mb-1">
            Total Pool
          </div>
          <div className="text-xl font-bold text-white">${_totalPoolInUSD}</div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-sm font-medium text-gray-400 mb-1">
            Time Remaining
          </div>
          <div className="text-xl font-bold text-white flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            {formatTimeRemaining(_timeLeftToPlaceBets)}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-sm font-medium text-gray-400 mb-1">
            Total "For" Bets
          </div>
          <div className="text-xl font-bold text-blue-400">
            ${_totalForBettedAmountInUSD}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-sm font-medium text-gray-400 mb-1">
            Total "Against" Bets
          </div>
          <div className="text-xl font-bold text-red-400">
            ${_totalAgainstBettedAmountInUSD}
          </div>
        </div>
      </div>

      {account && (
        <div className="bg-gray-900 rounded-lg p-4 mb-6">
          <h4 className="text-white text-lg mb-2">Your Bets</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="text-sm font-medium text-gray-400 mb-1">
                Your "For" Bet
              </div>
              <div className="text-xl font-bold text-blue-400">
                ${_amountBettedForByUser}
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-4">
              <div className="text-sm font-medium text-gray-400 mb-1">
                Your "Against" Bet
              </div>
              <div className="text-xl font-bold text-red-400">
                ${_amountBettedAgainstByUser}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 mb-6">
        <button
          className={`flex-1 px-4 py-3 rounded-md flex justify-between items-center ${
            betSide === "for"
              ? "bg-blue-500 text-white border-2 border-blue-500"
              : "bg-gray-800 text-gray-200 hover:bg-gray-700"
          }`}
          onClick={() => setBetSide(betSide === "for" ? null : "for")}
        >
          <div className="text-left">
            <div className="font-medium">
              Bet For <b className="text-2xl font-bold text-white">$2</b>
            </div>
            <div className="text-sm text-gray-300">Yes, it will happen</div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-fuchsia-400">
              Win ${potentialWinnings}
            </div>
          </div>
        </button>

        <button
          className={`flex-1 px-4 py-3 rounded-md flex justify-between items-center ${
            betSide === "against"
              ? "bg-blue-500 text-white border-2 border-blue-500"
              : "bg-gray-800 text-gray-200 hover:bg-gray-700"
          }`}
          onClick={() => setBetSide(betSide === "against" ? null : "against")}
        >
          <div className="text-left">
            <div className="font-medium">
              Bet Against <b className="text-2xl font-bold text-white">$2</b>
            </div>
            <div className="text-sm text-gray-300">No, it won't happen</div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-fuchsia-400">
              Win ${potentialWinnings}
            </div>
          </div>
        </button>
      </div>

      {betSide && (
        <div className="bg-gray-800 rounded-lg p-4 mb-4">
          <div className="flex flex-col md:flex-row md:items-center mb-4">
            <div className="flex-1 mb-2 md:mb-0">
              <div className="text-sm font-medium text-gray-400 mb-1">
                Your Bet
              </div>
              <div className="text-xl font-bold text-white">
                ${fixedBetAmount} on {betSide === "for" ? "For" : "Against"}
              </div>
            </div>
            <div className="md:ml-4">
              <div className="text-sm font-medium text-gray-400 mb-1">
                Potential Winnings
              </div>
              <div className="text-xl font-bold text-fuchsia-400">
                ${potentialWinnings}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center text-xs text-gray-400">
              <Info className="h-3 w-3 mr-1" />
              Oracle verification via {event.oracle}
            </div>
            <TransactionButton
              transaction={() => {
                // Create a transaction object and return it
                const tx = prepareContractCall({
                  contract,
                  method:
                    betSide === "for"
                      ? "function betFor(uint256 amountToBetInUSD) payable"
                      : "function betAgainst(uint256 amountToBetInUSD) payable",
                  params: [2],
                  value: _usdToFLRinWei.toString(),
                });
                return tx;
              }}
              onTransactionSent={(result) => {
                console.log("Transaction submitted", result.transactionHash);
              }}
              onTransactionConfirmed={(receipt) => {
                console.log("Transaction confirmed", receipt.transactionHash);
                setBetSide(null); // Reset selection after confirmed
              }}
              onError={(error) => {
                console.error("Transaction error", error);
              }}
              className="px-4 py-2 rounded-md text-white font-medium bg-fuchsia-600 hover:bg-fuchsia-500"
            >
              Confirm Bet
            </TransactionButton>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-gray-400">
        <div className="flex items-center">
          <Activity className="h-3 w-3 mr-1" />
          <span className="text-gray-400">Status: Betting Period Active</span>
        </div>
        <a
          href={`https://coston2-explorer.flare.network/address/${contract.address}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-fuchsia-400 hover:text-fuchsia-300"
        >
          View contract on Flare Testnet Coston2 explorer
          <span className="ml-1">↗</span>
        </a>
      </div>
    </div>
  );
}
