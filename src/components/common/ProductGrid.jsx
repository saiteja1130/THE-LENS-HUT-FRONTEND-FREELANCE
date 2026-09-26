import React, { useState } from 'react';
import { ProductCard } from './ProductCard';
import { ProductQuickView } from '../shop/ProductQuickView';
export const ProductGrid = ({
  products,
  layout = 'grid',
  emptyMessage = 'No optical products match your criteria.',
  columns = 4
}) => {
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  if (products.length === 0) {
    return <div className="py-16 text-center bg-white rounded-lg border border-slate-200">
        <p className="text-slate-500 font-medium text-sm">{emptyMessage}</p>
      </div>;
  }
  const gridColsClass = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
  }[columns];
  return <>
      <div className={layout === 'grid' ? `grid ${gridColsClass} gap-3 sm:gap-6` : 'flex flex-col gap-4'}>
        {products.map(product => <ProductCard key={product.id} product={product} layout={layout} onQuickView={p => setQuickViewProduct(p)} />)}
      </div>

      {quickViewProduct && <ProductQuickView product={quickViewProduct} isOpen={!!quickViewProduct} onClose={() => setQuickViewProduct(null)} />}
    </>;
};