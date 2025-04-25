import React, { useEffect } from "react";
import { ethers } from "ethers";
import { useReadContract, useActiveAccount } from "thirdweb/react";
import { TransactionButton, useSendTransaction } from "thirdweb/react";
import { AlertCircle, ExternalLink } from "lucide-react";
import bettingEvents from "./bettingEvents";
import {
  createThirdwebClient,
  getContract,
  resolveMethod,
  prepareContractCall,
} from "thirdweb";
import { privateKeyToAccount } from "thirdweb/wallets";
// Import our bet status components
import BetNotStarted from "./EventComponents/YetToBeStarted";
import BettingPeriodOngoing from "./EventComponents/BettingPeriodOnGoing";
import ObservationPeriodOngoing from "./EventComponents/ObservationPeriodOngoing";
import BetBeingResolved from "./EventComponents/BetBeingResolved";
import BetEnded from "./EventComponents/BetEnded";
import { client } from "../client";
import { defineChain } from "thirdweb/chains";
// connect to your contract
const contract = getContract({
  client,
  chain: defineChain(114),
  address: "0x837B83ec2A8B857735Ffdf3c182BBF5893dB6d66",
});
console.log(contract);

export default function Events({ activeTab, setActiveTab }) {
  const account = useActiveAccount();
  const { mutate: sendTransaction } = useSendTransaction();
  // Get the bet status
  const { data: betStatus, isLoading: isLoadingBetStatus } = useReadContract({
    contract,
    method: "function getBetStatus() view returns (uint8)",
    params: [],
  });

  const PRIVATE_KEY =
    "ea138133200c16a3383eae23bc3d782e32df101953082e2999f7c3e191253c22"; // Replace with the actual private key
  const ownerAccount = privateKeyToAccount({
    client,
    privateKey: PRIVATE_KEY,
  });

  // Function to send the transaction
  async function changeBetStateToObservationOnGoing() {
    try {
      // Prepare the transaction
      const transaction = prepareContractCall({
        contract,
        method: "function changeBetStateToObservationPeriodOngoing()",
        params: [],
      });

      // Send the transaction using the owner account
      const result = await sendTransaction({
        transaction,
        ownerAccount,
      });

      console.log("Transaction sent successfully!");
      console.log("Transaction hash:", result.transactionHash);

      return result;
    } catch (error) {
      console.error("Failed to send transaction:", error);
      throw error;
    }
  }
  async function changeBetStateToBetResolving() {
    try {
      // Prepare the transaction
      const transaction = prepareContractCall({
        contract,
        method: "function changeBetStateToBetBeingResolved()",
        params: [],
      });

      // Send the transaction using the owner account
      const result = await sendTransaction({
        transaction,
        ownerAccount,
      });

      console.log("Transaction sent successfully!");
      console.log("Transaction hash:", result.transactionHash);

      return result;
    } catch (error) {
      console.error("Failed to send transaction:", error);
      throw error;
    }
  }
  const triggerChangeBetStateToObservationOnGoing = async () => {
    await changeBetStateToObservationOnGoing();
  };
  const triggerChangeBetStateToBetResolving = async () => {
    await changeBetStateToBetResolving();
  };

  useEffect(() => {
    setInterval(() => {
      triggerChangeBetStateToObservationOnGoing();
    }, 5000);
    setInterval(() => {
      triggerChangeBetStateToBetResolving();
    }, 5000);
  }, []);

  // Render the event card with the appropriate component based on betStatus
  function renderEventCard(event) {
    // Common header for all statuses
    const eventHeader = (
      <div className="px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <img
              src={event.imageUrl}
              alt={event.chain}
              className="h-10 w-10 rounded-md"
            />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-white">{event.title}</h3>
            <div className="flex items-center mt-1 text-sm">
              <span className="text-gray-400">Chain: {event.chain}</span>
              <span className="mx-2 text-gray-600">•</span>
              {/* <span className="flex items-center text-gray-400">
                {event.endsIn
                  ? `Ends in: ${event.endsIn}`
                  : event.startsIn
                  ? `Starts in: ${event.startsIn}`
                  : `Completed: ${event.completedDate}`}
              </span> */}
              {/* <span className="mx-2 text-gray-600">•</span> */}
              {/*               <span className="flex items-center text-gray-400">
                {event.activity}
              </span> */}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-fuchsia-400 font-medium">
            Oracle: {event.oracle}
          </div>
        </div>
      </div>
    );

    // Check the bet status and render the appropriate component
    let betStatusComponent;
    if (isLoadingBetStatus) {
      betStatusComponent = (
        <div className="px-4 py-6 bg-slate-950 border-t border-gray-800 text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-fuchsia-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-400">Loading bet status...</p>
        </div>
      );
    } else {
      // Enum values from smart contract:
      // 0: YetToBeStarted
      // 1: BettingPeriodOnGoing
      // 2: ObservationPeriodOngoing
      // 3: BetBeingResolved
      // 4: BetEnded
      const status = Number(betStatus);
      /* const status = 4; */

      switch (status) {
        case 0:
          betStatusComponent = (
            <BetNotStarted contract={contract} event={event} />
          );
          break;
        case 1:
          betStatusComponent = (
            <BettingPeriodOngoing contract={contract} event={event} />
          );
          break;
        case 2:
          betStatusComponent = (
            <ObservationPeriodOngoing contract={contract} event={event} />
          );
          break;
        case 3:
          betStatusComponent = (
            <BetBeingResolved contract={contract} event={event} />
          );
          break;
        case 4:
          betStatusComponent = <BetEnded contract={contract} event={event} />;
          break;
        default:
          betStatusComponent = (
            <div className="px-4 py-3 bg-slate-950 border-t border-gray-800">
              <p className="text-gray-300 mb-4">{event.description}</p>
              <div className="text-center py-6">
                <AlertCircle className="h-10 w-10 text-gray-600 mx-auto mb-2" />
                <p className="text-gray-400">Unknown bet status</p>
              </div>
            </div>
          );
      }
    }

    return (
      <div
        key={event.id}
        className="bg-gray-900 rounded-lg overflow-hidden mb-4 border border-gray-800"
      >
        {eventHeader}
        {betStatusComponent}
      </div>
    );
  }

  return (
    <>
      <div className="space-y-1">
        {activeTab === "my-bets" ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gray-900 mb-4">
              <AlertCircle className="h-8 w-8 text-gray-600" />
            </div>
            <h3 className="text-lg font-medium">No active bets</h3>
            <p className="text-gray-400 mt-2">
              Place a bet to see it appear here
            </p>
            <button
              className="mt-4 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-500 text-white font-medium"
              onClick={() => setActiveTab("live")}
            >
              Browse Events
            </button>
          </div>
        ) : (
          bettingEvents[activeTab].map((event) => renderEventCard(event))
        )}
      </div>
    </>
  );
}
