import bettingEvents from "./bettingEvents";
import { useState } from "react";
import {
  AlertCircle,
  Clock,
  Activity,
  Info,
  RefreshCw,
  Award,
  ExternalLink,
  Dices,
} from "lucide-react";
export default function Events({
  activeTab,
  setActiveTab,
  betSide,
  setBetSide,
  handleBetSideSelect,
  handleBetSubmit,
}) {
  function renderEventCard(event) {
    const fixedBetAmount = 5;
    const potentialWinnings = (fixedBetAmount * 1.5).toFixed(2);

    return (
      <div
        key={event.id}
        className="bg-gray-900 rounded-lg overflow-hidden mb-4 border border-gray-800"
      >
        {/* Event Header - Always visible */}
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
                <span className="flex items-center text-gray-400">
                  <Clock className="h-3 w-3 mr-1" />
                  {event.endsIn
                    ? `Ends in: ${event.endsIn}`
                    : event.startsIn
                    ? `Starts in: ${event.startsIn}`
                    : `Completed: ${event.completedDate}`}
                </span>
                <span className="mx-2 text-gray-600">•</span>
                <span className="flex items-center text-gray-400">
                  <Activity className="h-3 w-3 mr-1" />
                  {event.activity}
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-fuchsia-400 font-medium">
              Pool: {event.poolSize}
            </div>
            <div className="text-xs text-gray-400">Oracle: {event.oracle}</div>
          </div>
        </div>

        {/* Event Details - Always visible now (no dropdown) */}
        <div className="px-4 py-3 bg-slate-950 border-t border-gray-800">
          <p className="text-gray-300 mb-4">{event.description}</p>

          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 mb-6">
            <button
              className={`flex-1 px-4 py-3 rounded-md flex justify-between items-center ${
                betSide === "for"
                  ? "bg-blue-500 text-white border-2 border-blue-500"
                  : "bg-gray-800 text-gray-200 hover:bg-gray-700"
              }`}
              onClick={() => {
                if (betSide === "for") {
                  setBetSide(null); // Toggle off if already selected
                } else {
                  handleBetSideSelect("for");
                }
              }}
            >
              <div className="text-left">
                <div className="font-medium">
                  Bet For <b className="text-2xl font-bold text-white">$5</b>
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
              onClick={() => {
                if (betSide === "against") {
                  setBetSide(null); // Toggle off if already selected
                } else {
                  handleBetSideSelect("against");
                }
              }}
            >
              <div className="text-left">
                <div className="font-medium">
                  Bet Against{" "}
                  <b className="text-2xl font-bold text-white">$5</b>
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
                <button
                  className="px-4 py-2 rounded-md text-white font-medium bg-fuchsia-600 hover:bg-fuchsia-500"
                  onClick={() => handleBetSubmit(event.id, betSide)}
                >
                  Confirm Bet
                </button>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center">
              <RefreshCw className="h-3 w-3 mr-1" />
              Last updated 3 min ago
            </div>
            <a
              href="#"
              className="flex items-center text-fuchsia-400 hover:text-fuchsia-300"
            >
              View contract on Flare Testnet Coston2 explorer
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </div>
        </div>
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
