import { useState } from "react";
import {
  Bell,
  Clock,
  Shield,
  Zap,
  ChevronDown,
  Dices,
  BarChart3,
  Users,
  CircleDollarSign,
  Pyramid,
} from "lucide-react";
export default function Features() {
  return (
    <>
      <div className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Why Choose Stochaz?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-gray-300">
              Our platform combines the best of blockchain technology with an
              intuitive betting experience.
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="bg-slate-950 rounded-lg p-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-fuchsia-600 text-white">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-medium text-white">
                  Trustless Security
                </h3>
                <p className="mt-2 text-gray-300">
                  Smart contracts eliminate middlemen, guaranteeing that all
                  bets are executed exactly as agreed with full transparency.
                </p>
              </div>

              <div className="bg-slate-950 rounded-lg p-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-fuchsia-600 text-white">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-medium text-white">
                  Real-World Data Feeds
                </h3>
                <p className="mt-2 text-gray-300">
                  Flare’s FTSO provides decentralized, real-time data feeds to
                  settle bets accurately and securely without relying on
                  centralized data sources.
                </p>
              </div>

              <div className="bg-slate-950 rounded-lg p-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-fuchsia-600 text-white">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-medium text-white">
                  Verified External Data
                </h3>
                <p className="mt-2 text-gray-300">
                  With Flare Data Connector, you can bet on events using secure,
                  verified data from other blockchains and the internet.
                </p>
              </div>

              <div className="bg-slate-950 rounded-lg p-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-fuchsia-600 text-white">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-medium text-white">
                  Fair Randomness
                </h3>
                <p className="mt-2 text-gray-300">
                  Random rewards and outcomes are generated using Flare’s secure
                  and verifiable random number generator, ensuring provable
                  fairness.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
