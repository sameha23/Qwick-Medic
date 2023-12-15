import React from "react";
import Image from "next/image";
import appointment from "/public/appointment/appointment.png";
import doctorImage from "/public/appointment/Ellipse 208.png";
import pinLogo from "/public/appointment/pin 1.png";
import bkashLogo from "/public/appointment/bKash.png";
import nagadLogo from "/public/appointment/nagad.png";
import mastercardLogo from "/public/appointment/master.png";

import "./Third.css";

const Third = () => {
  
  return (
    <div className="min-h-screen">
      <div className="hidden sm:block relative h-96 overflow-hidden">
        <Image
          src={appointment}
          alt="Cover Image"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl text-white font-bold">Appointment</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-4 p-5 sm:p-10 mx-1 sm:mx-3">
        <div className="grid gap-2 sm:gap-2 py-2 sm:py-4">
          {/* Left Column Boxes */}
          {/* Box 1 */}
          <div className="bg-white p-4 border border-gray-300">
            <div className="flex items-center">
              {/* Circle Image */}
              <div className="rounded-full overflow-hidden mr-4 sm:mr-12">
                <Image
                  src={doctorImage}
                  alt="Doctor"
                  width={80}
                  height={80}
                  className="sm:w-24 sm:h-24"
                />
              </div>
              {/* Doctor Name */}
              <div>
                <p className="text-lg sm:text-xl font-bold">
                  Dr. Rudolf Prager
                </p>
                {/* Specialization */}
                <p className="inline-block bg-[#38A04F] text-white px-2 py-1 text-xs sm:text-sm my-2">
                  Cardiology
                </p>
                <p className="font-bold text-sm sm:text-base">
                  <Image
                    src={pinLogo}
                    alt="Pin Logo"
                    width={18}
                    height={14}
                    className="inline-block mr-2"
                  />
                  Ontario, Canada
                  <span className="border-r h-4 mx-2"></span> English, Bangla
                </p>
              </div>
            </div>
          </div>

          {/* Box 2 */}
          <div className="bg-white p-7 border border-gray-300 my-5 sm:my-10">
            {/* Personal Details */}
            <p className="text-xl font-bold mb-3">Personal Details</p>
            {/* Name */}
            <p className="text-sm font-bold mb-3">James Walter</p>
            {/* Phone Number */}
            <p className="text-m">+88017xxxxxxxxxxxxx</p>
          </div>

          {/* Box 3 (Instructions) - Hidden on Small Screens */}
          <div className="bg-white pr-20 pl-5 pt-5 pb-10 border border-gray-300 my-2 sm:my-10 hidden sm:block">
            {/* Instructions */}
            <p className="text-xl font-bold mb-2">Instructions</p>
            {/* Ordered List */}
            <ol className="list-inside">
              <li className="mb-4">
                <p className="line-height-[2.0rem]">
                  <span className="font-bold">1.</span>
                  <span className="ml-2 mr-2 font-bold">
                    Registration and Verification:
                  </span>
                  <span>
                    To access QwikMedic's online doctor consultations, users in
                    Bangladesh must register on the platform. Verification of
                    identity and contact information is essential to ensure the
                    safety and legitimacy of consultations.
                  </span>
                </p>
              </li>
              <li className="mb-4">
                <p className="line-height-[2.0rem]">
                  <span className="font-bold">2.</span>
                  <span className="ml-2 mr-2 font-bold">
                    Appointment Scheduling:
                  </span>
                  <span>
                    Users can book appointments with qualified doctors at their
                    preferred time slots. It's important to adhere to the
                    scheduled time to ensure timely consultations.
                  </span>
                </p>
              </li>
              <li className="mb-4">
                <p className="line-height-[2.0rem]">
                  <span className="font-bold">3.</span>
                  <span className="ml-2 mr-2 font-bold">Secure Payment:</span>
                  <span>
                    QwikMedic requires users to make secure online payments for
                    consultations. Various payment options are available for
                    convenience, and the system ensures the privacy of financial
                    information.
                  </span>
                </p>
              </li>
              <li className="mb-4">
                <p>
                  <span className="font-bold">4.</span>
                  <span className="ml-2 mr-2 font-bold">
                    Confidentiality and Privacy:
                  </span>
                  <span className="line-height-[2.0rem]">
                    QwikMedic prioritizes patient privacy and confidentiality.
                    All consultations and medical records are kept strictly
                    confidential, adhering to the highest standards of data
                    security and privacy regulations.
                  </span>
                </p>
              </li>
            </ol>
          </div>
        </div>

        {/* Right Column */}
        <div className="p-1 sm:p-4  sm:mx-1">
          {/* Box 1 in the Right Column */}
          <div className="bg-white px-10 py-7 border border-gray-300">
            {/* Fee */}
            <p className="text-xl font-bold mb-4 hidden sm:block">Fee</p>
            {/* Horizontal Line */}
            <hr className="mb-4 border-t border-black border-2 hidden sm:block" />
            {/* Video Call Session Fees */}
            <div className="flex justify-between items-center mb-4">
              <p className="text-m font-bold">Video Call Session Fees</p>
              <p className="text-m font-bold">1000</p>
            </div>

            {/* Input Box */}
            <div className="flex flex-col sm:flex-row items-center mb-4">
              <input
                type="text"
                className="w-full sm:w-38 h-8 sm:h-10 border border-gray-400 px-2 mb-2 sm:mr-2 sm:mb-0"
                placeholder="Use Promo Code"
              />
              <button className="bg-[#4366AC] text-white px-2 py-1 sm:px-4 sm:py-2">
                Apply
              </button>
            </div>

            {/* Total Payable */}
            <div className="flex justify-between items-center">
              <p className="text-xl font-bold">Total Payable</p>
              <p className="text-[#38A04F] text-xl font-bold">৳1000</p>
            </div>
          </div>

          <div className="bg-white px-10 py-7 sm:py-10 border border-gray-300 my-10 sm:my-20">
            {/* Payment Options */}
            <p className="text-xl font-bold mb-4">Payment Options</p>

            {/* Three Boxes with Radio Buttons */}
            <div className="grid grid-cols-1 gap-4">
              {/* Box 1 - Bkash */}
              <div className="border p-4 flex items-center">
                <input
                  type="radio"
                  id="bkash"
                  name="paymentOption"
                  className="mr-2"
                />
                <label htmlFor="bkash" className="text-sm font-bold">
                  Bkash
                </label>
                <div className="flex-grow"></div>
                <Image
                  src={bkashLogo}
                  alt="Bkash Logo"
                  width={80}
                  height={80}
                  className="inline-block"
                />
              </div>

              {/* Box 2 - Nagad */}
              <div className="border p-4 flex items-center">
                <input
                  type="radio"
                  id="nagad"
                  name="paymentOption"
                  className="mr-2"
                />
                <label htmlFor="nagad" className="text-sm font-bold">
                  Nagad
                </label>
                <div className="flex-grow"></div>
                <Image
                  src={nagadLogo}
                  alt="Nagad Logo"
                  width={80}
                  height={80}
                  className="inline-block"
                />
              </div>

              {/* Box 3 - MasterCard */}
              <div className="border p-4 flex items-center">
                <input
                  type="radio"
                  id="mastercard"
                  name="paymentOption"
                  className="mr-2"
                />
                <label htmlFor="mastercard" className="text-sm font-bold">
                  MasterCard
                </label>
                <div className="flex-grow"></div>
                <Image
                  src={mastercardLogo}
                  alt="MasterCard Logo"
                  width={80}
                  height={80}
                  className="inline-block"
                />
              </div>
            </div>
          </div>

          {/* Add another box here if needed */}
          <div className="flex items-center mb-9">
            <input
              type="file"
              id="attachment"
              className="border-dotted border border-gray-400 p-2 w-3/4"
            />
            <button className="ml-2 bg-[#4366AC] text-white px-4 py-2">
              Attach
            </button>
            <span className="hidden sm:inline-block text-sm ml-2 text-gray-500">
              (Optional)
            </span>
          </div>

          <div className="mb-4 mt-6 sm:mt-1">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span>
                I have read and accepted the terms of service and privacy policy
              </span>
            </label>
          </div>

          {/* Make an Appointment Button (Disabled) */}
          <button
            className="bg-[#C4C4C4] text-white font-bold xl:px-[20rem] sm:px-[19rem] sm:py-[1.5rem] md:px-[5rem] md:py-[1.5rem]"
            disabled
          >
            Make an Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Third;
