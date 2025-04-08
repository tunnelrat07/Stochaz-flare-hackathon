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
import Navbar from "./AppComponents/Navigation.jsx";
import Hero from "./AppComponents/Hero.jsx";
import Features from "./AppComponents/Features.jsx";
import HowitWorks from "./AppComponents/HowItWorks.jsx";
import Cta from "./AppComponents/CTA.jsx";
import Footer from "./AppComponents/Footer.jsx";
export function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-whit animate-fadeIn opacity-1">
      {/* Navigation */}
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      {/* Hero Section */}
      <Hero />
      {/* Features Section */}
      <Features />
      {/* How It Works */}
      <HowitWorks />
      {/* CTA Section */}
      <Cta />
      {/* Footer */}
      <Footer />
    </div>
  );
}
