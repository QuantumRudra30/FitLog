import Link from "next/link";
import { TbBarbell } from "react-icons/tb";

const Footer = () => {
  return (
    <footer className="border-t border-base-300 bg-base-100">
      <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-6 py-5 sm:flex-row">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <TbBarbell size={20} className="text-lime-400" />
          <span className="text-sm font-extrabold uppercase tracking-wide text-base-content">
            FitLog
          </span>
        </Link>

        {/* Copyright */}
        <p className="text-xs text-base-content/50">
          © {new Date().getFullYear()} FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
};

export default Footer;