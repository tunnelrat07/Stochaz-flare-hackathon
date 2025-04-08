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
export default function Footer() {
  return (
    <>
      <footer className="bg-slate-950">
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
          <div className="mt-8 flex justify-center space-x-6">
            {/* Social Media Icons */}
            {["Twitter", "GitHub", "Discord", "Telegram"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-gray-400 hover:text-fuchsia-400"
              >
                <span className="sr-only">{social}</span>
                <div className="h-6 w-6 rounded-full bg-gray-800"></div>
              </a>
            ))}
          </div>
          <div className="mt-8 flex justify-center space-x-6">
            <a
              href="#"
              className="text-gray-400 hover:text-fuchsia-400 text-sm"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-fuchsia-400 text-sm"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-fuchsia-400 text-sm"
            >
              FAQ
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-fuchsia-400 text-sm"
            >
              Contact
            </a>
          </div>
          <p className="mt-8 text-center text-gray-400">
            &copy; 2025 Stochaz. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
