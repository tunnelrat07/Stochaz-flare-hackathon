export default function Tabs({ activeTab, setActiveTab }) {
  return (
    <>
      <div className="border-b border-gray-800 mb-6">
        <div className="flex space-x-8">
          <button
            className={`py-4 px-1 ${
              activeTab === "live"
                ? "border-b-2 border-fuchsia-500 text-fuchsia-400"
                : "text-gray-400 hover:text-gray-300"
            } font-medium text-sm`}
            onClick={() => setActiveTab("live")}
          >
            Live Events
          </button>
          <button
            className={`py-4 px-1 ${
              activeTab === "my-bets"
                ? "border-b-2 border-fuchsia-500 text-fuchsia-400"
                : "text-gray-400 hover:text-gray-300"
            } font-medium text-sm`}
            onClick={() => setActiveTab("my-bets")}
          >
            My Bets
          </button>
        </div>
      </div>
    </>
  );
}
