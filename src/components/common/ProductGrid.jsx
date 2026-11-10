import React, { useState } from 'react';
import { ProductCard } from './ProductCard';
import { ProductQuickView } from '../shop/ProductQuickView';

export const ProductGrid = ({
  products = [],
  layout = 'grid',
  emptyMessage = 'No optical products match your criteria.',
  columns = 3
}) => {
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  if (!products || products.length === 0) {
    return null;
  }

  const gridColsClass = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
  }[columns] || 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-3';

  return (
    <>
      <div
        className={
          layout === 'grid'
            ? `grid ${gridColsClass} gap-3 sm:gap-5`
            : 'flex flex-col gap-4'
        }
      >
        {products.map((product) => (
          <ProductCard
            key={product.id || product._id}
            product={product}
            layout={layout}
            onQuickView={(p) => setQuickViewProduct(p)}
          />
        ))}
      </div>

      {quickViewProduct && (
        <ProductQuickView
          product={quickViewProduct}
          isOpen={!!quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </>
  );
};
