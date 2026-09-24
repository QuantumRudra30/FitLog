import Image from "next/image";
import Link from "next/link";
import React from "react";

import logo from "@/assets/logo.png";

const Navbar = () => {
  // Temporary data
  // Later these will come from your actual Today's Plan and Saved state.
  const todaysPlan = [];
  const saved = [];

  return (
    <nav className="bg-[#0c0d0f] text-white border-b border-[#1d1f22]">
      <div className="navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[70px]">

        {/* LEFT SIDE */}
        <div className="navbar-start">

          {/* Mobile Menu */}
          <div className="dropdown lg:hidden mr-2">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-sm text-white hover:bg-[#1d1f22]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>

            {/* Mobile Menu Items */}
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-[#151719] rounded-box z-50 mt-3 w-52 p-2 shadow-xl border border-[#292b2e]"
            >
              <li>
                <Link
                  href="/"
                  className="text-white hover:bg-[#ccff00] hover:text-black"
                >
                  Workouts
                </Link>
              </li>

              <li>
                <Link
                  href="/my-plan"
                  className="text-white hover:bg-[#ccff00] hover:text-black"
                >
                  My Plan
                </Link>
              </li>
            </ul>
          </div>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={logo}
              alt="FitLog Logo"
              width={32}
              height={32}
              className="object-contain"
            />

            <span className="text-lg font-bold tracking-wide">
              FITLOG
            </span>
          </Link>
        </div>

        {/* CENTER NAVIGATION */}
        <div className="navbar-center hidden lg:flex">
          <ul className="flex items-center gap-2">

            {/* Workouts - Homepage */}
            <li>
              <Link
                href="/"
                className="rounded-full bg-[#172500] px-5 py-2 text-sm font-medium text-[#ccff00] transition hover:bg-[#ccff00] hover:text-black"
              >
                Workouts
              </Link>
            </li>

            {/* My Plan */}
            <li>
              <Link
                href="/my-plan"
                className="rounded-full px-5 py-2 text-sm text-[#a4a5a8] transition hover:bg-[#ccff00] hover:text-black"
              >
                My Plan
              </Link>
            </li>

          </ul>
        </div>

        {/* RIGHT SIDE */}
        <div className="navbar-end">
          <div className="flex items-center gap-4 sm:gap-5">

            {/* PLAN BADGE */}
            <Link
              href="/my-plan"
              className="flex items-center gap-1.5 transition hover:opacity-80"
            >
              <span className="text-xs text-[#d1d1d1]">
                Plan
              </span>

              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ccff00] px-1.5 text-[10px] font-bold text-black">
                {todaysPlan.length}
              </span>
            </Link>

            {/* SAVED BADGE */}
            <Link
              href="/my-plan"
              className="flex items-center gap-1.5 transition hover:opacity-80"
            >
              <span className="text-xs text-[#a4a5a8]">
                Saved
              </span>

              <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-[#3a3c40] px-1.5 text-[10px] text-[#b8b9bb]">
                {saved.length}
              </span>
            </Link>

          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;