import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Clock,
  Activity,
  Info,
  RefreshCw,
  Award,
  ExternalLink,
  Pyramid,
  Dices,
  Wallet,
} from "lucide-react";
import { ThirdwebProvider, ConnectButton, darkTheme } from "thirdweb/react";
import { client } from "./client";

export function BettingPage() {
  const [activeTab, setActiveTab] = useState("live");
  const [expandedEvent, setExpandedEvent] = useState(null);

  // Sample data for betting events
  const bettingEvents = {
    live: [
      {
        id: 1,
        title: "ENS Token Crosses $20 on Ethereum",
        description:
          "Will the ENS token price exceed $20 before the end of the week?",
        chain: "Ethereum",
        endsIn: "3d 8h",
        oracle: "Chainlink Price Feed",
        poolSize: "4,328 FLR",
        odds: { for: 1.85, against: 2.15 },
        activity: "High",
        imageUrl:
          "https://thegivingblock.com/wp-content/uploads/2021/12/Ethereum-Name-Service-ENS.png",
      },
    ],
  };

  // Handle bet amount input for expanded event
  const [betAmount, setBetAmount] = useState();
  const [betSide, setBetSide] = useState(null);

  const toggleEventExpand = (id) => {
    setExpandedEvent(expandedEvent === id ? null : id);
    setBetAmount("");
    setBetSide(null);
  };

  const handleBetSideSelect = (side) => {
    setBetSide(side);
  };

  const handleBetSubmit = (eventId) => {
    // Here you would integrate with your smart contract
    console.log(
      `Placing bet on event ${eventId}, ${betSide} with ${betAmount} FLR`
    );
    // Reset form after submission
    setBetAmount(0);
    setBetSide(null);
    // Optionally close the expanded view
    setExpandedEvent(null);
    // In a real implementation, you would show a loading state and success/error message
  };

  // Calculate potential winnings based on odds and bet amount
  const calculateWinnings = (odds) => {
    if (!betAmount || isNaN(betAmount) || betAmount <= 0) return "0.00";
    return (parseFloat(betAmount) * odds).toFixed(2);
  };

  const renderEventCard = (event, isExpanded) => {
    return (
      <div
        key={event.id}
        className="bg-gray-900 rounded-lg overflow-hidden mb-4 border border-gray-800"
      >
        {/* Event Header - Always visible */}
        <div
          className="px-4 py-4 flex items-center justify-between cursor-pointer"
          onClick={() => toggleEventExpand(event.id)}
        >
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
          <div className="flex items-center">
            {activeTab === "completed" ? (
              <div
                className={`px-2 py-1 rounded text-xs font-medium ${
                  event.result === "For"
                    ? "bg-green-900 text-green-300"
                    : "bg-red-900 text-red-300"
                }`}
              >
                {event.result}
              </div>
            ) : (
              <div className="text-right mr-3">
                <div className="text-fuchsia-400 font-medium">
                  Pool: {event.poolSize}
                </div>
                <div className="text-xs text-gray-400">
                  Oracle: {event.oracle}
                </div>
              </div>
            )}
            {isExpanded ? (
              <ChevronUp className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            )}
          </div>
        </div>

        {/* Expanded View - Only visible when expanded */}
        {isExpanded && (
          <div className="px-4 py-3 bg-slate-950 border-t border-gray-800">
            <p className="text-gray-300 mb-4">{event.description}</p>

            {activeTab !== "completed" && (
              <>
                <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 mb-6">
                  <button
                    className={`flex-1 px-4 py-3 rounded-md flex justify-between items-center ${
                      betSide === "for"
                        ? "bg-blue-700 text-white border-2 border-blue-500"
                        : "bg-gray-800 text-gray-200 hover:bg-gray-700"
                    }`}
                    onClick={() => handleBetSideSelect("for")}
                  >
                    <div className="text-left">
                      <div className="font-medium">For</div>
                      <div className="text-sm text-gray-300">
                        Yes, it will happen
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-fuchsia-400">
                        {event.odds.for}x
                      </div>
                    </div>
                  </button>

                  <button
                    className={`flex-1 px-4 py-3 rounded-md flex justify-between items-center ${
                      betSide === "against"
                        ? "bg-blue-700 text-white border-2 border-blue-500"
                        : "bg-gray-800 text-gray-200 hover:bg-gray-700"
                    }`}
                    onClick={() => handleBetSideSelect("against")}
                  >
                    <div className="text-left">
                      <div className="font-medium">Against</div>
                      <div className="text-sm text-gray-300">
                        No, it won't happen
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-fuchsia-400">
                        {event.odds.against}x
                      </div>
                    </div>
                  </button>
                </div>

                {betSide && (
                  <div className="bg-gray-800 rounded-lg p-4 mb-4">
                    <div className="flex flex-col md:flex-row md:items-center mb-4">
                      <div className="flex-1 mb-2 md:mb-0">
                        <label className="block text-sm font-medium text-gray-400 mb-1">
                          Bet Amount (FLR)
                        </label>
                        <input
                          type="number"
                          value={betAmount}
                          onChange={(e) => setBetAmount(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-950 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500 text-white"
                          placeholder="Enter amount"
                        />
                      </div>
                      <div className="md:ml-4">
                        <div className="text-sm font-medium text-gray-400 mb-1">
                          Potential Winnings
                        </div>
                        <div className="text-xl font-bold text-fuchsia-400">
                          {calculateWinnings(
                            betSide === "for"
                              ? event.odds.for
                              : event.odds.against
                          )}{" "}
                          FLR
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-xs text-gray-400">
                        <Info className="h-3 w-3 mr-1" />
                        Oracle verification via {event.oracle}
                      </div>
                      <button
                        className={`px-4 py-2 rounded-md text-white font-medium ${
                          betAmount && !isNaN(betAmount) && betAmount > 0
                            ? "bg-fuchsia-600 hover:bg-fuchsia-500"
                            : "bg-gray-700 cursor-not-allowed"
                        }`}
                        disabled={
                          !betAmount || isNaN(betAmount) || betAmount <= 0
                        }
                        onClick={() => handleBetSubmit(event.id)}
                      >
                        Place Bet
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
                    View on block explorer
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </div>
              </>
            )}

            {activeTab === "completed" && (
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-gray-300">Outcome:</div>
                  <div
                    className={`px-2 py-1 rounded font-medium ${
                      event.result === "For"
                        ? "bg-green-900 text-green-300"
                        : "bg-red-900 text-red-300"
                    }`}
                  >
                    {event.result}
                  </div>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-gray-300">Pool Size:</div>
                  <div className="text-white font-medium">{event.poolSize}</div>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-gray-300">Winner Payout:</div>
                  <div className="text-fuchsia-400 font-bold">
                    {event.payout}
                  </div>
                </div>
                <div className="flex items-center justify-center mt-4">
                  <a
                    href="#"
                    className="flex items-center text-fuchsia-400 hover:text-fuchsia-300 text-sm"
                  >
                    <Award className="h-4 w-4 mr-1" />
                    View detailed results
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white animate-fadeIn opacity-1">
      {/* Header */}
      <header className="bg-slate-950 border-b border-gray-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <a href="/">
                <div className="flex-shrink-0 flex items-center">
                  <Dices className="h-10 w-10" />
                  <span className="ml-2 text-xl font-bold">Stochaz</span>
                </div>
              </a>
            </div>

            <div className="flex items-center space-x-4 ">
              <ConnectButton
                theme={{
                  colors: {
                    primaryButtonBg: "oklch(54.6% 0.245 262.881)",
                    modalBg: "oklch(21% 0.034 264.665)",
                    secondaryText: "asdasda",
                  },
                }}
                connectButton={{
                  label: "Connect Wallet",
                }}
                client={client}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Cross-Chain Betting</h1>
            <p className="text-gray-400 mt-1">
              Bet on events happening across multiple blockchains
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-800 mb-6">
          <div className="flex space-x-8">
            <button
              className={`py-4 px-1 ${
                activeTab === "live"
                  ? "border-b-2 border-fuchsia-500 text-fuchsia-400"
                  : "text-gray-400 hover:text-gray-300"
              } font-medium text-sm`}
              onClick={() => setActiveTab("live")}
            >
              Live Events
            </button>
            <button
              className={`py-4 px-1 ${
                activeTab === "my-bets"
                  ? "border-b-2 border-fuchsia-500 text-fuchsia-400"
                  : "text-gray-400 hover:text-gray-300"
              } font-medium text-sm`}
              onClick={() => setActiveTab("my-bets")}
            >
              My Bets
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <div className="bg-gray-900 rounded-md px-3 py-1.5 text-sm flex items-center">
            Chain:
            <select className="ml-2 bg-transparent text-fuchsia-400 focus:outline-none">
              <option>All Chains</option>
              <option>Ethereum</option>
              <option>Bitcoin</option>
              <option>Solana</option>
              <option>Polygon</option>
            </select>
          </div>
          <div className="bg-gray-900 rounded-md px-3 py-1.5 text-sm flex items-center">
            Category:
            <select className="ml-2 bg-transparent text-fuchsia-400 focus:outline-none">
              <option>All Categories</option>
              <option>Price Action</option>
              <option>NFT</option>
              <option>Protocol</option>
              <option>Other</option>
            </select>
          </div>
          <div className="bg-gray-900 rounded-md px-3 py-1.5 text-sm flex items-center">
            Sort By:
            <select className="ml-2 bg-transparent text-fuchsia-400 focus:outline-none">
              <option>Ending Soon</option>
              <option>Pool Size</option>
              <option>Recently Added</option>
              <option>Activity</option>
            </select>
          </div>
        </div>

        {/* Events List */}
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
            bettingEvents[activeTab].map((event) =>
              renderEventCard(event, event.id === expandedEvent)
            )
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between text-gray-400 text-sm">
            <div className="flex space-x-4 mb-4 md:mb-0">
              <a href="#" className="hover:text-fuchsia-400">
                About
              </a>
              <a href="#" className="hover:text-fuchsia-400">
                Terms
              </a>
              <a href="#" className="hover:text-fuchsia-400">
                Privacy
              </a>
              <a href="#" className="hover:text-fuchsia-400">
                FAQ
              </a>
            </div>
            <div>Oracle powered by Chainlink & Flare Data Contract</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
