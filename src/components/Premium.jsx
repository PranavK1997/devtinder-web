import React, { useState } from "react";
import { Crown, Star } from "lucide-react";
import { Dialog } from "@headlessui/react";

const Premium = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");

  const openModal = (plan) => {
    setSelectedPlan(plan);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedPlan("");
  };

  return (
    <div className="m-10">
      <h1 className="text-4xl font-bold text-center text-white mb-10">
        Upgrade Your Membership
      </h1>

      <div className="flex flex-col lg:flex-row gap-6 justify-center items-center">
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
            <button
              className="btn btn-secondary w-full"
              onClick={() => openModal("Silver")}
            >
              Buy Silver
            </button>
          </div>
        </div>

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
            <button
              className="btn btn-warning w-full"
              onClick={() => openModal("Gold")}
            >
              Buy Gold
            </button>
          </div>
        </div>
      </div>

      <Dialog open={isOpen} onClose={closeModal} className="fixed z-50 inset-0">
        <div className="flex items-center justify-center min-h-screen bg-black/50 p-4">
          <Dialog.Panel className="w-full max-w-md bg-gray-950 rounded-xl p-6 text-center space-y-4">
            <Dialog.Title className="text-2xl font-bold text-red-500">
              {selectedPlan} Membership Payment
            </Dialog.Title>
            <p className="text-gray-600">
              Scan the QR code to complete payment
            </p>
            <div className="flex justify-center">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=fakeuser@upi"
                alt="Fake QR Code"
                className="rounded"
              />
            </div>
            <p className="text-green-600 font-semibold mt-4">
              ₹{selectedPlan === "Gold" ? "999" : "499"}
            </p>
            <button className="btn btn-accent w-full" onClick={closeModal}>
              Simulate Payment
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default Premium;
