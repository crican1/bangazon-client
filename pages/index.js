import React, { useEffect, useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { getProducts } from '../utils/data/productData';
import ProductCard from '../components/product/ProductCard';

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  console.warn(search);

  const showProducts = () => {
    getProducts().then((data) => {
      setProducts(data);
    })
      .catch((error) => {
        console.error('No products:', error);
      });
  };
  useEffect(() => {
    showProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <article className="posts">
        <h1>Products</h1>
        <Form>
          <InputGroup className="my-3">
            <Form.Control onChange={(e) => setSearch(e.target.value)} placeholder="Search Products" />
          </InputGroup>
        </Form>
        {products.filter((product) => (search.toLowerCase() === '' ? product : product.title.toLowerCase().includes(search))).map((product) => (
          <section key={`product--${product.id}`} className="product">
            <ProductCard
              id={product.id}
              title={product.title}
              productImage={product.product_image}
              description={product.description}
              price={product.price}
              unitsAvailable={product.units_available}
              onUpdate={showProducts}
            />
          </section>
        ))}
      </article>
    </>
  );
}

export default Home;
