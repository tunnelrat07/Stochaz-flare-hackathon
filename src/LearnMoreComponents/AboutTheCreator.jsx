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
export default function AboutTheCreator() {
  return (
    <>
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
                  bring transparency and fairness to traditional systems. With a
                  background in both finance and software development, I aim to
                  bridge the gap between these worlds through innovative
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
    </>
  );
}
