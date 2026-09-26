import React from 'react';
import { Hero } from '../components/home/Hero';
import { CategoryStrip } from '../components/home/CategoryStrip';
import { PromoBanners } from '../components/home/PromoBanners';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { ValueProps } from '../components/home/ValueProps';
import { BrandStory } from '../components/home/BrandStory';
import { Newsletter } from '../components/home/Newsletter';
export const Home = () => {
  return <div className="min-h-screen bg-white">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. 4-Category Cards Strip */}
      <CategoryStrip />

      {/* 3. Promo 2-Banner Section (Trending Frames 50% Off & Sunglasses) */}
      <PromoBanners />

      {/* 4. Featured Products (5 curated products) */}
      <FeaturedProducts />

      {/* 5. 4-Feature Value Props Strip */}
      <ValueProps />

      {/* 6. More Than Just Eyewear Brand Story */}
      <BrandStory />

      {/* 7. Join Our Newsletter Bar */}
      <Newsletter />
    </div>;
};