import React from "react";
import { SecretData } from "@/app/mockData";

export interface SecretProps {
  readonly data: SecretData;
}

export default function Secret({ data }: SecretProps) {
  return (
    <section className="bg-surface-container-low py-section-gap relative overflow-hidden">
      <div className="max-w-container-max mx-auto px-gutter grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Left Side: Images & Quote box */}
        <div className="relative">
          <div className="aspect-square bg-surface-container-high rounded-lg overflow-hidden border border-outline-variant p-6">
            <div className="w-full h-full border border-dashed border-outline-variant flex items-center justify-center relative">
              <img
                className="w-full h-full object-cover opacity-90 mix-blend-multiply"
                src={data.image}
                alt="Grandmother's hands mixing spices and pickling ingredients."
              />
              <div className="absolute -bottom-8 -right-8 bg-background p-6 border border-outline-variant shadow-lg max-w-[200px] z-10">
                <p className="font-headline text-lg md:text-xl text-secondary leading-tight italic">
                  &ldquo;{data.quote}&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Description & Process items list */}
        <div className="space-y-8 mt-8 md:mt-0">
          <div>
            <span className="text-secondary font-body font-semibold text-xs uppercase tracking-widest block mb-4">
              {data.tag}
            </span>
            <h2 className="font-headline text-3xl md:text-4xl text-on-surface mb-6 font-bold leading-tight">
              {data.title}
            </h2>
            <p className="font-body text-body-lg text-on-surface-variant leading-relaxed">
              {data.description}
            </p>
          </div>
          <div className="space-y-6">
            {data.processes.map((proc, index) => (
              <div key={index} className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary select-none">
                    {proc.icon}
                  </span>
                </div>
                <div>
                  <h4 className="font-body font-bold text-on-surface mb-1">
                    {proc.title}
                  </h4>
                  <p className="text-on-surface-variant font-body text-sm leading-relaxed">
                    {proc.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
