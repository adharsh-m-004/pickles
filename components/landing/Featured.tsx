import React from "react";
import ProductCard from "./ProductCard";
import { ProductItem } from "@/app/mockData";

export interface FeaturedProps {
  readonly title: string;
  readonly description: string;
  readonly products: readonly ProductItem[];
  readonly onAddToBasket?: (product: ProductItem) => void;
  readonly onPrevClick?: () => void;
  readonly onNextClick?: () => void;
}

export default function Featured({
  title,
  description,
  products,
  onAddToBasket,
  onPrevClick,
  onNextClick,
}: FeaturedProps) {
  return (
    <section className="py-section-gap px-gutter max-w-container-max mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h2 className="font-headline text-2xl md:text-3xl text-on-surface mb-2 font-bold">
            {title}
          </h2>
          <p className="text-on-surface-variant font-body max-w-md">
            {description}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onPrevClick}
            className="p-3 border border-outline-variant rounded-full hover:bg-surface-container-high transition-colors cursor-pointer flex items-center justify-center"
            aria-label="Previous batch"
          >
            <span className="material-symbols-outlined select-none">chevron_left</span>
          </button>
          <button
            onClick={onNextClick}
            className="p-3 border border-outline-variant rounded-full hover:bg-surface-container-high transition-colors cursor-pointer flex items-center justify-center"
            aria-label="Next batch"
          >
            <span className="material-symbols-outlined select-none">chevron_right</span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product, index) => {
          // Asymmetric column alignment logic: offset the second item
          const isMiddle = index === 1;
          const offsetClass = isMiddle ? "mt-8 md:mt-12" : "";

          return (
            <ProductCard
              key={product.id}
              product={product}
              onAddToBasket={onAddToBasket}
              className={offsetClass}
            />
          );
        })}
      </div>
    </section>
  );
}
