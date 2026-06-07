import React from "react";
import { HeroData } from "@/app/mockData";

export interface HeroProps {
  readonly data: HeroData;
  readonly onShopClick?: () => void;
  readonly onStoryClick?: () => void;
}

export default function Hero({ data, onShopClick, onStoryClick }: HeroProps) {
  // Split title by \n for newline rendering
  const titleLines = data.title.split("\n");

  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden px-gutter">
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center"
          role="img"
          aria-label="A sun-drenched traditional Kerala village kitchen featuring earthen clay pots, wooden rafters, and cast iron cookware."
          style={{ backgroundImage: `url('${data.bgImage}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
      </div>
      <div className="relative z-10 max-w-container-max mx-auto w-full">
        <div className="max-w-2xl">
          <span className="text-secondary font-body font-semibold text-xs uppercase tracking-widest mb-4 block">
            {data.tag}
          </span>
          <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl text-on-surface mb-6 font-bold leading-tight tracking-tight">
            {titleLines.map((line, idx) => (
              <React.Fragment key={idx}>
                {line}
                {idx < titleLines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h1>
          <p className="font-body text-body-lg text-on-surface-variant mb-10 max-w-lg">
            {data.description}
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={onShopClick}
              className="wooden-button text-on-primary px-8 py-3 font-body text-xs font-semibold rounded-lg hover:brightness-110 transition-all shadow-lg flex items-center gap-2 cursor-pointer"
            >
              SHOP THE COLLECTION
            </button>
            <button
              onClick={onStoryClick}
              className="border-2 border-primary/20 wooden-button text-on-primary px-8 py-3 font-body text-xs font-semibold rounded-lg hover:brightness-110 transition-all cursor-pointer"
            >
              OUR STORY
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
