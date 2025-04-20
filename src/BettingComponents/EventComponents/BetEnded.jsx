import React from "react";
import {
  useActiveAccount,
  useReadContract,
  TransactionButton,
  useSendTransaction,
} from "thirdweb/react";
import { ethers } from "ethers";
import { prepareContractCall } from "thirdweb";
import { Award, Activity } from "lucide-react";

export default function BetEnded({ contract, event }) {
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

  // Format amounts for display
  const formatAmount = (amount) => {
    if (!amount) return "0";
    return ethers.utils.formatEther(amount);
  };

  /*   // Determine if user won based on which side they bet on and which side won
  const didUserWin = () => {
    if (!winner || !userForBet || !userAgainstBet) return false;

    const winnerSide = Number(winner) === 1 ? "for" : "against";
    const userBetFor = Number(userForBet) > 0;
    const userBetAgainst = Number(userAgainstBet) > 0;

    return (
      (winnerSide === "for" && userBetFor) ||
      (winnerSide === "against" && userBetAgainst)
    );
  };

  // Get winner team name
  const getWinnerTeam = () => {
    if (!winner) return "Unknown";
    return Number(winner) === 1 ? "For" : "Against";
  }; */

  const showWithdrawButton = true;

  return (
    <div className="px-4 py-3 bg-slate-950 border-t border-gray-800">
      <p className="text-gray-300 mb-4">{event.description}</p>

      {/* <div
        className={`bg-gray-800 rounded-lg p-6 mb-6 border-l-4 ${
          Number(winner) === 1 ? "border-blue-500" : "border-red-500"
        }`}
      >
        <div className="flex items-center mb-4">
          <Award
            className={`h-8 w-8 mr-3 ${
              Number(winner) === 1 ? "text-blue-500" : "text-red-500"
            }`}
          />
          <h3 className="text-xl font-medium text-white">Bet Ended</h3>
        </div>

        <p className="text-gray-300">
          {Number(winner) === 1
            ? "The event occurred as predicted. The 'For' side has won the bet."
            : "The event did not occur as predicted. The 'Against' side has won the bet."}
        </p>
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-sm font-medium text-gray-400 mb-1">
            Total Pool
          </div>
          <div className="text-xl font-bold text-white">${_totalPoolInUSD}</div>
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
          <h4 className="text-white text-lg mb-2">Your Results</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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

          {
            <div className="bg-gray-800 rounded-lg p-4 border-l-4 border-green-500">
              <div className="flex items-center">
                <Award className="h-6 w-6 mr-2 text-green-500" />
                <div>
                  <div className="text-green-400 font-medium">
                    Congratulations! You won!
                  </div>
                  <div className="text-xl font-bold text-white">Reward:</div>
                </div>
              </div>

              {showWithdrawButton && (
                <div className="mt-4">
                  <TransactionButton
                    transaction={() => {
                      const tx = prepareContractCall({
                        contract,
                        method: "function withdrawAmount(address user) payable",
                        params: [accountAddress],
                      });
                      return tx;
                    }}
                    onTransactionSent={(result) => {
                      console.log(
                        "Transaction submitted",
                        result.transactionHash
                      );
                    }}
                    onTransactionConfirmed={(receipt) => {
                      console.log(
                        "Transaction confirmed",
                        receipt.transactionHash
                      );
                    }}
                    onError={(error) => {
                      console.error("Transaction error", error);
                    }}
                    className="w-full px-4 py-2 rounded-md text-white font-medium bg-green-600 hover:bg-green-500"
                  >
                    Withdraw Reward
                  </TransactionButton>
                </div>
              )}
            </div>
          }

          {/* {(!didUserWin() && Number(userForBet) > 0) ||
            (Number(userAgainstBet) > 0 && (
              <div className="bg-gray-800 rounded-lg p-4 border-l-4 border-gray-600">
                <div className="text-center">
                  <div className="text-gray-400 font-medium">
                    Better luck next time!
                  </div>
                  <div className="text-lg text-white mt-1">
                    Your bet did not win this round.
                  </div>
                </div>
              </div>
            ))} */}
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-gray-400">
        <div className="flex items-center">
          <Activity className="h-3 w-3 mr-1" />
          <span className="text-gray-400">Status: Bet Ended</span>
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
