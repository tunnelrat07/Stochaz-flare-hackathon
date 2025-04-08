export default function Filters() {
  return (
    <>
      <div className="flex flex-wrap gap-2 mb-6">
        <div className="bg-gray-900 rounded-md px-3 py-1.5 text-sm flex items-center">
          Chain:
          <select className="ml-2 bg-transparent text-fuchsia-400 focus:outline-none">
            <option>All Chains</option>
            <option>Ethereum</option>
            <option>Bitcoin</option>
            <option>Solana</option>
            <option>Polygon</option>
          </select>
        </div>
        <div className="bg-gray-900 rounded-md px-3 py-1.5 text-sm flex items-center">
          Category:
          <select className="ml-2 bg-transparent text-fuchsia-400 focus:outline-none">
            <option>All Categories</option>
            <option>Price Action</option>
            <option>NFT</option>
            <option>Protocol</option>
            <option>Other</option>
          </select>
        </div>
        <div className="bg-gray-900 rounded-md px-3 py-1.5 text-sm flex items-center">
          Sort By:
          <select className="ml-2 bg-transparent text-fuchsia-400 focus:outline-none">
            <option>Ending Soon</option>
            <option>Pool Size</option>
            <option>Recently Added</option>
            <option>Activity</option>
          </select>
        </div>
      </div>
    </>
  );
}
