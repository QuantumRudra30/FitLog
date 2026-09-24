import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Oswald } from "next/font/google";

import bannerImg from "@/assets/banner.png";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["600", "700"],
});

const Banner = () => {
  return (
    <section className="px-4 py-6 sm:px-6 md:py-8 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-xl border border-[#24262b] bg-[#15171c]">
        <div className="grid min-h-[325px] items-center md:grid-cols-2">

          {/* LEFT CONTENT */}
          <div className="px-6 py-10 sm:px-10 md:px-12 lg:px-14 lg:py-12">

            {/* Eyebrow */}
            <p className="mb-4 text-[10px] font-bold tracking-[0.12em] text-[#ccff00] sm:text-xs">
              WORKOUT LIBRARY
            </p>

            {/* Heading */}
            <h1
              className={`${oswald.className} max-w-[620px] text-4xl font-bold uppercase leading-[0.98] tracking-tight text-white sm:text-5xl md:text-5xl lg:text-6xl`}
            >
              TRAIN WITH INTENT. LOG EVERY SET.
            </h1>

            {/* Subtitle */}
            <p className="mt-5 max-w-[560px] text-sm leading-6 text-[#969aa3] sm:text-base">
              FitLog is a dark, no-nonsense gym companion: pick a lift,
              lock it into today&apos;s plan, and watch the week&apos;s work
              add up.
            </p>

            {/* CTA */}
            <div className="mt-6">
              <Link
                href="#library"
                className="btn h-11 min-h-11 rounded-md border-0 bg-[#ccff00] px-6 text-xs font-bold uppercase text-black hover:bg-[#b8e600]"
              >
                <span>Browse Workouts</span>

                {/* Arrow Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative flex min-h-[260px] items-center justify-center px-6 pb-8 md:min-h-[325px] md:px-4 md:pb-0 lg:px-8">
            <Image
              src={bannerImg}
              alt="Workout illustration"
              priority
              className="relative z-10 h-auto w-[75%] max-w-[360px] object-contain sm:w-[65%] md:w-[90%] lg:max-w-[400px]"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Banner;