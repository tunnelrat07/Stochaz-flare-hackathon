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

export default function AboutProject() {
  return (
    <>
      <section className="mb-24">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-extrabold text-white flex items-center">
              About the Project
            </h2>
            <a
              href="https://github.com/tunnelrat07/Stochaz-flare-hackathon"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-400 hover:text-blue-300 transition"
            >
              <Github className="mr-1 h-5 w-5" />
              View on GitHub
            </a>
          </div>
          <div className="bg-gray-800 rounded-lg shadow-xl p-8">
            <div className="text-lg text-gray-300 mb-6">
              <p>
                Stochaz is a decentralized betting platform built on the Flare
                Coston2 testnet, enabling users to place bets on real-world
                events across diverse domains such as:
              </p>
              <ul className="list-disc list-inside ml-4">
                <li>Stock price movements</li>
                <li>Cryptocurrency token price changes</li>
                <li>Weather fluctuations</li>
                <li>Sporting event outcomes</li>
                <li>Any measurable external data point</li>
              </ul>
              <p className="mt-4">
                The platform harnesses the power of Flare Network's cutting-edge
                oracle infrastructure to ensure trustless, transparent, and
                verifiable outcomes:
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-gray-900 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-600 p-3 rounded-full">
                    <Shield className="h-6 w-6 text-white" />
                  </div>

                  {/* <ul className="list-disc list-inside ml-4">                 <li>                                    </li>                 <li>                                    </li>                 <li>                                    </li>               </ul> */}

                  <h3 className="text-xl font-semibold ml-3">
                    Secure & Trustless
                  </h3>
                </div>
                <p className="text-gray-400">
                  <strong>Flare Time Series Oracle (FTSO)</strong> provides
                  reliable, decentralized price feeds
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
                  <strong>Flare Data Connector (FDC)</strong> enables secure
                  access to external data sources, bringing real-world
                  information on-chain
                </p>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="bg-green-600 p-3 rounded-full">
                    <Dices className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold ml-3">Provably Fair</h3>
                </div>
                <p className="text-gray-400">
                  <strong>Flare Random Number Generator</strong> ensures
                  fairness in reward distribution through cryptographically
                  secure randomness
                </p>
              </div>
            </div>
            <p className="text-lg text-gray-300 mt-5">
              With Stochaz, users can confidently engage in event-based
              predictions without relying on centralized operators—everything is
              enforced and verified through smart contracts.
            </p>{" "}
            <br />
            <p className="text-lg text-gray-300 mb-6">
              Unlike traditional betting platforms that operate as black boxes,
              DecBet provides complete transparency through smart contracts
              deployed on the Flare blockchain. Every bet, result, and payout is
              verifiable on-chain, eliminating the need to trust centralized
              operators.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
