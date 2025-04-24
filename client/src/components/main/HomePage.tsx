import React from 'react';
import HeroSection from './HeroSection';
import ProductCategories from './ProductCategories';
import HottestProducts from './HottestProducts';

const HomePage: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <ProductCategories />
      <HottestProducts />
    </div>
  );
};

export default HomePage; 