import { useState, useEffect, useRef } from "react";
import {
  Pyramid,
  Shield,
  Zap,
  Dices,
  Github,
  Twitter,
  Mail,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export function LearnMore() {
  const [contractExpanded, setContractExpanded] = useState(true);
  const [copied, setCopied] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState("");
  const codeContainerRef = useRef(null);

  const smartContractCode = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract DecentralizedBetting is Ownable {
    struct Bet {
        address bettor;
        uint256 amount;
        bool prediction; // true = above target, false = below target
        bool claimed;
    }
    
    struct BettingRound {
        uint256 targetPrice;
        uint256 endTime;
        uint256 totalPoolAbove;
        uint256 totalPoolBelow;
        mapping(address => Bet) bets;
        bool resolved;
        bool targetMet;
    }
    
    AggregatorV3Interface internal priceFeed;
    mapping(uint256 => BettingRound) public bettingRounds;
    uint256 public currentRound;
    uint256 public platformFee = 2; // 2% fee
    
    event BetPlaced(address indexed bettor, uint256 indexed round, uint256 amount, bool prediction);
    event RoundResolved(uint256 indexed round, bool targetMet);
    event WinningsClaimed(address indexed bettor, uint256 indexed round, uint256 amount);
    
    constructor(address _priceFeedAddress) {
        priceFeed = AggregatorV3Interface(_priceFeedAddress);
        currentRound = 1;
    }
    
    function createBettingRound(uint256 _targetPrice, uint256 _durationInHours) external onlyOwner {
        require(bettingRounds[currentRound].endTime == 0 || 
                bettingRounds[currentRound].resolved, 
                "Current round not finished");
                
        uint256 endTime = block.timestamp + (_durationInHours * 1 hours);
        
        bettingRounds[currentRound].targetPrice = _targetPrice;
        bettingRounds[currentRound].endTime = endTime;
        
        currentRound++;
    }
    
    function placeBet(bool _prediction) external payable {
        uint256 round = currentRound - 1;
        require(msg.value > 0, "Bet amount must be greater than 0");
        require(block.timestamp < bettingRounds[round].endTime, "Betting period has ended");
        require(bettingRounds[round].bets[msg.sender].amount == 0, "Already placed a bet this round");
        
        bettingRounds[round].bets[msg.sender] = Bet({
            bettor: msg.sender,
            amount: msg.value,
            prediction: _prediction,
            claimed: false
        });
        
        if (_prediction) {
            bettingRounds[round].totalPoolAbove += msg.value;
        } else {
            bettingRounds[round].totalPoolBelow += msg.value;
        }
        
        emit BetPlaced(msg.sender, round, msg.value, _prediction);
    }
    
    function resolveRound() external {
        uint256 round = currentRound - 1;
        require(block.timestamp >= bettingRounds[round].endTime, "Betting period not ended yet");
        require(!bettingRounds[round].resolved, "Round already resolved");
        
        (, int256 price, , , ) = priceFeed.latestRoundData();
        bool targetMet = uint256(price) >= bettingRounds[round].targetPrice;
        
        bettingRounds[round].resolved = true;
        bettingRounds[round].targetMet = targetMet;
        
        emit RoundResolved(round, targetMet);
    }
    
    function claimWinnings(uint256 _round) external {
        require(bettingRounds[_round].resolved, "Round not resolved yet");
        require(bettingRounds[_round].bets[msg.sender].amount > 0, "No bet placed");
        require(!bettingRounds[_round].bets[msg.sender].claimed, "Winnings already claimed");
        require(bettingRounds[_round].bets[msg.sender].prediction == bettingRounds[_round].targetMet, "Bet lost");
        
        bettingRounds[_round].bets[msg.sender].claimed = true;
        
        uint256 winningPool;
        uint256 losingPool;
        
        if (bettingRounds[_round].targetMet) {
            winningPool = bettingRounds[_round].totalPoolAbove;
            losingPool = bettingRounds[_round].totalPoolBelow;
        } else {
            winningPool = bettingRounds[_round].totalPoolBelow;
            losingPool = bettingRounds[_round].totalPoolAbove;
        }
        
        uint256 betAmount = bettingRounds[_round].bets[msg.sender].amount;
        uint256 winnerShare = (betAmount * losingPool) / winningPool;
        uint256 totalWinnings = betAmount + winnerShare;
        
        // Apply platform fee
        uint256 fee = (totalWinnings * platformFee) / 100;
        uint256 payout = totalWinnings - fee;
        
        emit WinningsClaimed(msg.sender, _round, payout);
        
        payable(msg.sender).transfer(payout);
    }
    
    function withdrawFees() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(smartContractCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleContract = () => {
    setContractExpanded(!contractExpanded);
  };

  // Load Prism.js and highlight the code
  useEffect(() => {
    // Define a function to load Prism.js
    const loadPrism = async () => {
      if (typeof window !== "undefined" && contractExpanded) {
        // Create and append Prism.js script if it doesn't exist
        if (!document.getElementById("prism-script")) {
          const prismScript = document.createElement("script");
          prismScript.id = "prism-script";
          prismScript.src =
            "https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/prism.min.js";
          prismScript.async = true;
          document.body.appendChild(prismScript);

          // Add Solidity language support
          const solidityScript = document.createElement("script");
          solidityScript.src =
            "https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/components/prism-solidity.min.js";
          solidityScript.async = true;
          document.body.appendChild(solidityScript);

          // Add CSS
          if (!document.getElementById("prism-css")) {
            const prismCss = document.createElement("link");
            prismCss.id = "prism-css";
            prismCss.rel = "stylesheet";
            prismCss.href =
              "https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/themes/prism-okaidia.min.css";
            document.head.appendChild(prismCss);
          }

          // Wait for scripts to load
          prismScript.onload = () => {
            if (window.Prism && codeContainerRef.current) {
              window.Prism.highlightElement(codeContainerRef.current);
            }
          };
        } else if (window.Prism && codeContainerRef.current) {
          // If Prism is already loaded, just highlight
          window.Prism.highlightElement(codeContainerRef.current);
        }
      }
    };

    loadPrism();
  }, [contractExpanded]);

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* About the Project */}
        <section className="mb-24">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-extrabold text-white mb-8 flex items-center">
              <Pyramid className="h-8 w-8 text-fuchsia-500 mr-3" />
              About the Project
            </h2>
            <div className="bg-gray-800 rounded-lg shadow-xl p-8">
              <p className="text-lg text-gray-300 mb-6">
                DecBet is a revolutionary decentralized betting platform built
                on the Flare network. Our mission is to create a transparent,
                secure, and fair betting ecosystem that leverages the power of
                blockchain technology.
              </p>
              <p className="text-lg text-gray-300 mb-6">
                Unlike traditional betting platforms that operate as black
                boxes, DecBet provides complete transparency through smart
                contracts deployed on the Flare blockchain. Every bet, result,
                and payout is verifiable on-chain, eliminating the need to trust
                centralized operators.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="bg-gray-900 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-600 p-3 rounded-full">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold ml-3">
                      Secure & Trustless
                    </h3>
                  </div>
                  <p className="text-gray-400">
                    Smart contracts ensure that funds are held in escrow and
                    paid out automatically based on verified outcomes.
                  </p>
                </div>
                <div className="bg-gray-900 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <div className="bg-fuchsia-600 p-3 rounded-full">
                      <Zap className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold ml-3">
                      Real-World Data
                    </h3>
                  </div>
                  <p className="text-gray-400">
                    Flare Data Connector provides reliable real-world data for
                    bet resolutions, ensuring accuracy and fairness.
                  </p>
                </div>
                <div className="bg-gray-900 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <div className="bg-green-600 p-3 rounded-full">
                      <Dices className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold ml-3">
                      Provably Fair
                    </h3>
                  </div>
                  <p className="text-gray-400">
                    All bet outcomes and reward distributions are verifiable
                    on-chain, ensuring complete transparency.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Smart Contract */}
        <section className="mb-24">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-extrabold text-white mb-8 flex items-center">
              <Shield className="h-8 w-8 text-fuchsia-500 mr-3" />
              The Smart Contract
            </h2>
            <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
              <div className="flex items-center justify-between p-4 bg-gray-900">
                <div className="flex items-center">
                  <span className="text-fuchsia-400 font-mono mr-2">
                    DecentralizedBetting.sol
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={toggleContract}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    {contractExpanded ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </button>
                  <button
                    onClick={handleCopy}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                    aria-label="Copy code"
                  >
                    {copied ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <Copy className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              {contractExpanded && (
                <div className="relative overflow-auto p-4 bg-gray-900 max-h-200">
                  <style>{`
                    .code-container {
                      border-radius: 0.5rem;
                      font-family: 'Fira Code', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
                      font-size: 14px;
                      line-height: 1.5;
                      direction: ltr;
                      text-align: left;
                      white-space: pre;
                      word-spacing: normal;
                      word-break: normal;
                      word-wrap: normal;
                      tab-size: 4;
                      hyphens: none;
                      background: #282c34;
                      color: #abb2bf;
                      padding: 1em;
                      margin: 0;
                      overflow: auto;
                    }
                    /* Custom styles to enhance the code display */
                    .token.comment { color: #5c6370; font-style: italic; }
                    .token.keyword { color: #c678dd; }
                    .token.function { color: #61afef; }
                    .token.string { color: #98c379; }
                    .token.number { color: #d19a66; }
                    .token.operator { color: #56b6c2; }
                    .token.class-name { color: #e5c07b; }
                    .token.punctuation { color: #abb2bf; }
                    .token.boolean { color: #d19a66; }
                  `}</style>
                  <pre className="code-container">
                    <code ref={codeContainerRef} className="language-solidity">
                      {smartContractCode}
                    </code>
                  </pre>
                </div>
              )}
            </div>
            <div className="mt-6 text-gray-400 text-sm">
              <p>
                This smart contract showcases the core functionality of our
                decentralized betting platform. The actual implementation may
                vary.
              </p>
            </div>
          </div>
        </section>

        {/* About the Creator */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-extrabold text-white mb-8 flex items-center">
              <Zap className="h-8 w-8 text-fuchsia-500 mr-3" />
              About the Creator
            </h2>
            <div className="bg-gray-800 rounded-lg shadow-xl p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                <div className="w-32 h-32 bg-gray-700 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src="/api/placeholder/128/128"
                    alt="Creator"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Your Name
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Blockchain Developer & DeFi Enthusiast
                  </p>
                  <p className="text-gray-400 mb-6">
                    I'm passionate about creating decentralized solutions that
                    bring transparency and fairness to traditional systems. With
                    a background in both finance and software development, I aim
                    to bridge the gap between these worlds through innovative
                    blockchain applications.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href="https://github.com/yourusername"
                      className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <Github className="h-5 w-5 mr-2" />
                      <span>github.com/yourusername</span>
                    </a>
                    <a
                      href="https://twitter.com/yourusername"
                      className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <Twitter className="h-5 w-5 mr-2" />
                      <span>@yourusername</span>
                    </a>
                    <a
                      href="mailto:you@example.com"
                      className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <Mail className="h-5 w-5 mr-2" />
                      <span>you@example.com</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
