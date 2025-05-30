import React from "react";
import { Crown, Star } from "lucide-react";

const Premium = () => {
  return (
    <div className="m-10">
      <h1 className="text-4xl font-bold text-center text-white mb-10">
        Upgrade Your Membership
      </h1>
      <div className="flex flex-col lg:flex-row gap-6 justify-center items-center">
        {/* Silver Membership */}
        <div className="card w-96 bg-base-200 shadow-xl border border-gray-700">
          <div className="card-body items-center text-center">
            <Crown className="text-slate-300" size={48} />
            <h2 className="card-title text-2xl font-bold text-white">
              Silver Membership
            </h2>
            <ul className="text-gray-300 list-disc text-left mt-4 mb-6 space-y-2">
              <li>Chat with other people</li>
              <li>100 connection requests/day</li>
              <li>Blue Tick</li>
              <li>Valid for 3 months</li>
            </ul>
            <button className="btn btn-secondary w-full">Buy Silver</button>
          </div>
        </div>

        {/* Gold Membership */}
        <div className="card w-96 bg-yellow-900 shadow-xl border border-yellow-700">
          <div className="card-body items-center text-center">
            <Star className="text-yellow-300" size={48} />
            <h2 className="card-title text-2xl font-bold text-white">
              Gold Membership
            </h2>
            <ul className="text-yellow-100 list-disc text-left mt-4 mb-6 space-y-2">
              <li>Chat with other people</li>
              <li>Unlimited connection requests/day</li>
              <li>Blue Tick</li>
              <li>Valid for 6 months</li>
            </ul>
            <button className="btn btn-warning w-full">Buy Gold</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premium;
