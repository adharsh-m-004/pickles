import React from "react";
import { FooterData } from "@/app/mockData";

export interface FooterProps {
  readonly data: FooterData;
}

export default function Footer({ data }: FooterProps) {
  return (
    <footer className="bg-surface-container-highest border-t border-outline-variant mt-section-gap">
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-gutter py-section-gap max-w-container-max mx-auto gap-8">
        {/* Left Side: Brand Name & Slogan */}
        <div className="text-center md:text-left">
          <div className="text-headline-md font-headline text-secondary mb-4 font-bold">
            {data.title}
          </div>
          <p className="font-body text-xs font-semibold text-on-surface-variant max-w-xs leading-relaxed">
            {data.description}
          </p>
        </div>

        {/* Middle: Links list */}
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-4">
          {data.links.map((link, idx) => {
            // Alternating underlines to match design: tertiary or secondary decoration
            const isTertiary = idx % 2 === 0;
            const decorationClass = isTertiary
              ? "underline decoration-tertiary/30 hover:text-tertiary"
              : "underline decoration-secondary/30 hover:text-secondary";

            return (
              <a
                key={link.label}
                className={`text-on-surface-variant font-medium font-body text-body-md transition-all duration-300 ${decorationClass}`}
                href={link.href}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Right Side: Copyright & Material symbols social icons */}
        <div className="text-on-surface-variant font-body text-xs font-semibold text-center md:text-right">
          {data.copyright}
          <div className="flex justify-center md:justify-end gap-4 mt-4">
            <span className="material-symbols-outlined cursor-pointer hover:text-secondary select-none">
              face_nod
            </span>
            <span className="material-symbols-outlined cursor-pointer hover:text-secondary select-none">
              insert_photo
            </span>
            <span className="material-symbols-outlined cursor-pointer hover:text-secondary select-none">
              mail
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
