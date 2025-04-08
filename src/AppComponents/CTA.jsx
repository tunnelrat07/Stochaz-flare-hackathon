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
export default function Cta() {
  return (
    <>
      <div className="bg-slate-900">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to start betting?</span>
            <span className="block text-fuchsia-300">
              Join thousands of users today.
            </span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <a
                href="/playground"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-900 bg-white hover:bg-gray-100"
              >
                Place your first Bet
              </a>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-fuchsia-700 hover:bg-fuchsia-600"
              >
                Learn more
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
