"use client";

import React from "react";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Featured from "@/components/landing/Featured";
import Secret from "@/components/landing/Secret";
import Newsletter from "@/components/landing/Newsletter";
import Footer from "@/components/landing/Footer";
import { useRouter } from "next/navigation";
import {
  headerLinks,
  heroData,
  featuredProducts,
  secretData,
  footerData,
  ProductItem,
} from "@/app/mockData";

export default function Home() {
  const router = useRouter();

  const handleSearch = (query: string) => {
    console.log("Search query updated:", query);
  };

  const handleShopClick = () => {
    console.log("Shop Collection clicked");
  };

  const handleStoryClick = () => {
    console.log("Our Story clicked");
  };

  const handleAddToBasket = (product: ProductItem) => {
    console.log("Added to basket:", product.name);
  };

  const handleSubscribe = (email: string) => {
    console.log("Subscribed email:", email);
  };

  return (
    <div className="min-h-screen relative bg-background text-on-background">
      {/* Visual background paper texture overlay */}
      <div className="grain-overlay pointer-events-none" />

      {/* Main navigation */}
      <Header
        title="Granny's Kitchen"
        links={headerLinks}
        searchPlaceholder="Search heritage flavors..."
        buttonText="Login / Register"
        onSearch={handleSearch}
        onButtonClick={() => router.push("/login")}
      />

      {/* Main Content Layout */}
      <main className="pt-20">
        {/* Banner Section */}
        <Hero
          data={heroData}
          onShopClick={handleShopClick}
          onStoryClick={handleStoryClick}
        />

        {/* Highlight Product Carousel Section */}
        <Featured
          title="Seasonal Batches"
          description="Our pickles are made in small batches following the lunar calendar and harvest cycles."
          products={featuredProducts}
          onAddToBasket={handleAddToBasket}
        />

        {/* Cultural heritage illustration section */}
        <Secret data={secretData} />

        {/* Brand promotion call-to-action subscription block */}
        <Newsletter
          title="Join the Family Table"
          description="Get notified about new seasonal batches and heritage food stories from our kitchen."
          placeholder="Email Address"
          buttonText="SUBSCRIBE"
          onSubscribe={handleSubscribe}
        />
      </main>

      {/* Global page footer */}
      <Footer data={footerData} />
    </div>
  );
}