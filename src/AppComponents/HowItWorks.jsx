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

export default function HowitWorks() {
  return (
    <>
      <div className="py-16 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              How Stochaz Works
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-gray-300">
              Getting started is simple, secure, and only takes a few minutes.
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {[
                {
                  title: "Connect Your Wallet",
                  description:
                    "Link your crypto wallet to access the platform. We support MetaMask, WalletConnect, and more.",
                  step: "1",
                },
                {
                  title: "Choose Your Market",
                  description:
                    "Browse available betting markets or create your own with customizable parameters.",
                  step: "2",
                },
                {
                  title: "Place Your Bet",
                  description:
                    "Stake your crypto and confirm your position. Smart contracts handle the rest.",
                  step: "3",
                },
              ].map((item, i) => (
                <div key={i} className="relative">
                  <div className="absolute flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white font-bold text-lg">
                    {item.step}
                  </div>
                  <div className="pl-16">
                    <h3 className="text-xl font-medium text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-gray-300">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
