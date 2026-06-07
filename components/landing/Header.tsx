"use client";

import React, { useEffect, useState } from "react";
import { HeaderLink } from "@/app/mockData";

export interface HeaderProps {
  readonly title: string;
  readonly links: readonly HeaderLink[];
  readonly searchPlaceholder: string;
  readonly buttonText: string;
  readonly onSearch?: (query: string) => void;
  readonly onButtonClick?: () => void;
}

export default function Header({
  title,
  links,
  searchPlaceholder,
  buttonText,
  onSearch,
  onButtonClick,
}: HeaderProps) {
  const [visible, setVisible] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let lastScroll = 0;
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > lastScroll && currentScroll > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScroll = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <header
      className={`bg-background border-b border-outline-variant fixed top-0 left-0 right-0 z-40 w-full transition-transform duration-300 ease-in-out ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="flex justify-between items-center w-full px-gutter py-4 max-w-container-max mx-auto">
        <div className="text-headline-md font-headline text-secondary dark:text-secondary-fixed">
          {title}
        </div>
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              className={`${
                link.active
                  ? "text-primary font-bold border-b-2 border-primary pb-1"
                  : "text-on-surface-variant font-medium hover:text-secondary"
              } font-body text-body-md transition-all duration-300`}
              href={link.href}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                className="bg-surface-container-low border-none border-b border-outline-variant focus:ring-0 text-sm py-1 px-2 w-48 font-body placeholder:text-on-surface-variant/50"
                placeholder={searchPlaceholder}
              />
            </div>
          </div>
          <button
            onClick={onButtonClick}
            className="wooden-button text-on-primary px-4 py-2 font-body text-[10px] font-semibold rounded hover:brightness-110 transition-all uppercase tracking-wider shadow-md cursor-pointer"
          >
            {buttonText}
          </button>
        </div>
      </nav>
    </header>
  );
}
