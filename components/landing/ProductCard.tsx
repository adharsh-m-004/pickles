"use client";

import React, { useState } from "react";
import { ProductItem } from "@/app/mockData";

export interface ProductCardProps {
  readonly product: ProductItem;
  readonly onAddToBasket?: (product: ProductItem) => void;
  readonly className?: string;
}

export default function ProductCard({
  product,
  onAddToBasket,
  className = "",
}: ProductCardProps) {
  const [hovered, setHovered] = useState(false);

  // Set color styling based on the tag type
  let badgeClass = "bg-primary text-on-primary";
  if (product.tagType === "FIRE") {
    badgeClass = "bg-tertiary text-on-tertiary";
  } else if (product.tagType === "BOLD") {
    badgeClass = "bg-primary-container text-on-primary-container";
  }

  const handleAddClick = () => {
    if (onAddToBasket) {
      onAddToBasket(product);
    }
  };

  return (
    <div
      className={`group ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-[3/4] mb-6 overflow-hidden bg-surface-container-low border border-outline-variant/30 shadow-lg rounded-xl flex flex-col">
        {/* Wooden Jar Lid Visual element */}
        <div className="wooden-lid h-6 w-full z-20" />
        
        {/* Glass Container Visual element */}
        <div className="relative flex-grow overflow-hidden">
          <div className="glass-reflection absolute inset-0 z-10 opacity-70 pointer-events-none" />
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Jar Spice level tag */}
        <div className="absolute top-10 right-4 z-20">
          <span className={`${badgeClass} px-3 py-1 font-body text-[10px] font-semibold rounded-full uppercase tracking-wider`}>
            {product.tag}
          </span>
        </div>
      </div>

      {/* Card Text Content */}
      <div className="flex justify-between items-start px-1">
        <div>
          <h3 className="font-headline text-lg md:text-xl text-on-surface mb-1 font-semibold">
            {product.name}
          </h3>
          <p className="text-on-surface-variant font-body text-xs font-semibold mb-4">
            {product.subtitle}
          </p>
        </div>
        <span className="text-secondary font-headline text-lg font-bold">
          ₹{product.price}
        </span>
      </div>

      {/* Action CTA Button with simulated physical depth shift */}
      <button
        onClick={handleAddClick}
        style={{ transform: hovered ? "translateY(-2px)" : "translateY(0)" }}
        className="w-full wooden-button text-on-primary py-3 font-body text-xs font-semibold rounded-lg flex items-center justify-between px-4 mt-2 transition-transform duration-300 shadow-md cursor-pointer"
      >
        <span>ADD TO BASKET</span>
        <span className="material-symbols-outlined text-[18px]">add</span>
      </button>
    </div>
  );
}
