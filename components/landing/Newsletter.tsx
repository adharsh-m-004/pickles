"use client";

import React, { useState } from "react";

export interface NewsletterProps {
  readonly title: string;
  readonly description: string;
  readonly placeholder: string;
  readonly buttonText: string;
  readonly onSubscribe?: (email: string) => void;
}

export default function Newsletter({
  title,
  description,
  placeholder,
  buttonText,
  onSubscribe,
}: NewsletterProps) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubscribe && email.trim()) {
      onSubscribe(email.trim());
      setEmail("");
    }
  };

  return (
    <section className="py-section-gap px-gutter text-center">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="w-16 h-px bg-secondary mx-auto" />
        <h2 className="font-headline text-2xl md:text-3xl text-on-surface font-bold">
          {title}
        </h2>
        <p className="text-on-surface-variant font-body leading-relaxed">
          {description}
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-4 max-w-md mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-grow bg-transparent border-none border-b border-outline-variant focus:border-primary focus:ring-0 text-center md:text-left py-3 font-body"
            placeholder={placeholder}
            required
          />
          <button
            type="submit"
            className="wooden-button text-on-primary px-8 py-3 font-body text-xs font-semibold rounded-lg hover:brightness-110 transition-all cursor-pointer shadow-md"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}
