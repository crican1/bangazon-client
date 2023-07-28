import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/product/ProductCard';
import { getProducts } from '../../utils/data/productData';

function Products() {
  const [products, setProducts] = useState([]);

  const showProducts = () => {
    getProducts().then((data) => setProducts(data));
  };
  useEffect(() => {
    showProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <article className="products">
        <h1>Products</h1>

        {products.map((product) => (
          <section key={`product--${product.id}`} className="product">
            <ProductCard
              id={product.id}
              title={product.title}
              productImage={product.product_image}
              description={product.description}
              price={product.price}
              unitsAvailable={product.units_available}
              onUpdate={Products}
            />
          </section>
        ))}
      </article>
    </>
  );
}

export default Products;
