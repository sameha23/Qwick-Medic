import React from "react";
// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';

import Image from "next/image";
import Doctors from "/public/about/Doctors.png";
import Reminder from "/public/about/Reminder.png";
import FN from "/public/about/Family Nutation.png";
import K from "/public/about/_x30_1.png";
import Impactimg from "/public/about/img.png";
import DonorImage from "/public/about/image 4.png";
import Rectangle1 from "/public/about/Rectangle1.png";
import Rectangle2 from "/public/about/Rectangle2.png";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Second.css";

const Second = () => {
  return (
    <div className="min-h-screen">
      {/* <Carousel>
        <div className="relative w-full h-[400px]">
          <div className="w-full h-full object-cover">
            <img src={Rectangle2} alt="My Image" />
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white font-semibold">
            <h1 className="text-4xl">About Us</h1>
            <h2 className="text-2xl">
              Choose the Health Care That Is Right for You
            </h2>
            <p className="text-lg">Home/About Us</p>
          </div>
        </div>
      </Carousel> */}
      <div className="relative w-full h-[400px]">
        <Image
          className="w-full h-full object-cover"
          src={Rectangle2}
          alt="My Image"
          layout="fill"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white font-semibold">
          <h1 className="text-4xl md:text-3xl sm:text-xl m-3">About Us</h1>
          <h2 className="text-xl md:text-lg sm:text-base my-2">
            Choose the Health Care That Is Right for You
          </h2>
          <p className="text-sm">Home/About Us</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 m-10 lg:m-20">
        <div className="section">
          <h1 className="text-4xl font-semibold text-center">
            Our <span className="text-[#38A04F]">Mission</span>
          </h1>
          <div className="h-1 bg-[#38A04F] my-3 md:col-span-full"></div>
          <p className="text-lg mt-10 leading-10">
            QwikMedic strives to provide accessible and reliable online health
            support to the people of Bangladesh, ensuring their well-being
            through innovative digital solutions.
          </p>
        </div>

        <div className="section">
          <h1 className="text-4xl font-semibold text-center">
            Our <span className="text-[#38A04F]">Vision</span>
          </h1>
          <div className="h-1 bg-[#38A04F] my-3 md:col-span-full"></div>
          <p className="text-lg mt-10 leading-10">
            To be the leading healthcare technology provider in Bangladesh,
            enhancing the quality of life by delivering seamless and affordable
            online health services.
          </p>
        </div>

        <div className="section">
          <h1 className="text-4xl font-semibold text-center">
            What We <span className="text-[#38A04F]">Do</span>
          </h1>
          <div className="h-1 bg-[#38A04F] my-3 md:col-span-full"></div>
          <p className="text-lg mt-10 leading-10">
            QwikMedic, powered by Qwik IT Services in Canada, offers
            comprehensive online health support, telemedicine, and health
            information services, improving healthcare accessibility and
            outcomes in Bangladesh.
          </p>
        </div>
      </div>

      <div className="bg-[#38A04F] w-full h-[251px] flex items-center justify-center text-white uppercase text-center relative md:space-x-14">
        <div className="service-card flex items-center flex-col gap-4">
          <Image className="myImage mb-2" src={Doctors} alt="My Image" />
          <div className="text-center">
            <p className="mb-1 md:text-xl sm:text-sm">1000+</p>
            <p className="mb-1 md:text-xl sm:text-sm">OF TREATMENTS MADE</p>
          </div>
        </div>
        <div className="vertical-line border-l-3 border-white h-40 w-2"></div>

        <div className="service-card flex items-center flex-col gap-4">
          <Image className="myImage mb-2" src={Reminder} alt="My Image" />
          <div className="text-center">
            <p className="mb-1 md:text-xl sm:text-sm">200K</p>
            <p className="mb-1 md:text-xl sm:text-sm">CURED PATIENTS</p>
          </div>
        </div>
        <div className="vertical-line border-l-3 border-white h-40 w-2"></div>

        <div className="service-card flex items-center flex-col gap-4">
          <Image className="myImage mb-2" src={FN} alt="My Image" />
          <div className="text-center">
            <p className="mb-1 md:text-xl sm:text-sm">500K</p>
            <p className="mb-1 md:text-xl sm:text-sm">PROVIDE SERVICES</p>
          </div>
        </div>
        <div className="vertical-line border-l-3 border-white h-40 w-2"></div>

        <div className="service-card flex items-center flex-col gap-4">
          <Image className="myImage mb-2" src={K} alt="My Image" />
          <div className="text-center">
            <p className="mb-1 md:text-xl sm:text-sm">200K</p>
            <p className="mb-1 md:text-xl sm:text-sm">AVAILABLE AMBULANCE</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 m-20">
        <div className="impact-element-left">
          <p className="text-lg font-bold my-2">Our Impact</p>

          <h2 className="text-4xl font-semibold my-7">
            Why Choose{" "}
            <span className="font-quicksand font-semibold text-primary">
              Qwik
            </span>
            <span className="font-quicksand font-semibold text-[#38A04F]">
              {" "}
              Medic
            </span>{" "}
            ?
          </h2>
          <p className="text-lg leading-10">
            Qwik Medic is a Canada-based online health support service, tailored
            for the needs of Bangladesh, provided by Qwik IT Services. They
            offer convenient and accessible healthcare solutions, including
            telemedicine consultations, medical information, and health
            resources. With a focus on bridging the healthcare gap, Qwik Medic
            ensures reliable and timely support for individuals in Bangladesh,
            making it a preferred choice for accessible and efficient healthcare
            services.
          </p>
        </div>
        <div className="impact-element-right">
          <Image className="impact-img" src={Impactimg} alt="My Image" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 bg-[#F5F5F5] w-full md:h-[556px] text-black">
        <Image
          className="donorImage md:h-full "
          src={DonorImage}
          alt="My Image"
        />

        <div className="flex flex-col items-center p-1 m-4 md:m-10">
          <h1 className="text-2xl md:text-4xl font-semibold m-1">
            Your gift holds great power. Blood donate today!
          </h1>

          <div className="text-sm md:text-lg my-2 text-[#525252] leading-6 md:leading-10">
            Blood Donation is a vital act of altruism that saves lives.
            QwikMedic, a Canada-based online health support company, extends its
            services to Bangladesh through Qwik IT Services. This initiative
            promotes blood donation, ensuring a stable supply for those in need
            and fostering a culture of humanitarianism.
          </div>

          <div class="mt-4 md:mt-10">
            <button class="bg-[#38A04F] text-white font-bold py-2 px-4">
              Donate Blood
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Second;
