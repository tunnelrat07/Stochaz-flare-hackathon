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
  Github,
  Twitter,
  Mail,
} from "lucide-react";
export default function Footer() {
  return (
    <>
      <footer className="bg-slate-950">
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
          <div className="mt-8 flex justify-center space-x-6">
            {/* Social Media Icons */}
            <div className="flex flex-wrap gap-4">
              <a
                href="https://github.com/tunnelrat07"
                className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
              >
                <Github className="h-5 w-5 mr-2" />
                <span>Github</span>
              </a>
              <a
                href="https://x.com/mundane_league7"
                className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
              >
                <Twitter className="h-5 w-5 mr-2" />
                <span>Twitter</span>
              </a>
              <a
                href="mailto:reachashish2004@gmail.com"
                className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
              >
                <Mail className="h-5 w-5 mr-2" />
                <span>Mail</span>
              </a>
            </div>
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
