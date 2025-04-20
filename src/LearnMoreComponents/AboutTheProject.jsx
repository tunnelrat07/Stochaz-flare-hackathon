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
          <h2 className="text-3xl font-extrabold text-white mb-8 flex items-center">
            <Pyramid className="h-8 w-8 text-fuchsia-500 mr-3" />
            About the Project
          </h2>
          <div className="bg-gray-800 rounded-lg shadow-xl p-8">
            <p className="text-lg text-gray-300 mb-6">
              DecBet is a revolutionary decentralized betting platform built on
              the Flare network. Our mission is to create a transparent, secure,
              and fair betting ecosystem that leverages the power of blockchain
              technology.
            </p>
            <p className="text-lg text-gray-300 mb-6">
              Unlike traditional betting platforms that operate as black boxes,
              DecBet provides complete transparency through smart contracts
              deployed on the Flare blockchain. Every bet, result, and payout is
              verifiable on-chain, eliminating the need to trust centralized
              operators.
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
                  Smart contracts ensure that funds are held in escrow and paid
                  out automatically based on verified outcomes.
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
                  Flare Data Connector provides reliable real-world data for bet
                  resolutions, ensuring accuracy and fairness.
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
                  All bet outcomes and reward distributions are verifiable
                  on-chain, ensuring complete transparency.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
