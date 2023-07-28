/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button, Card } from 'react-bootstrap';
import { getSingleProduct } from '../../utils/data/productData';

const ViewProduct = () => {
  const router = useRouter();
  const [productDetails, setProductDetails] = useState({});
  const { id } = router.query;

  useEffect(() => {
    getSingleProduct(id).then((productData) => {
      setProductDetails(productData);
    });
  }, [id]);

  return (
    <>
      <Card className="text-center">
        <Card.Title> {productDetails.title}</Card.Title>
        <Card.Body>
          <img src={productDetails.product_image} alt="productimage" style={{ width: '200px' }} />
        </Card.Body>
        <Card.Body>
          <Card.Text> {productDetails.description} </Card.Text>
          <Card.Text>${productDetails.price}</Card.Text>
          <Card.Footer>Units Available: {productDetails.units_available}</Card.Footer>
        </Card.Body>
        <Button
          variant="secondary"
          onClick={() => {
            router.push('/cart');
          }}
          style={{
            margin: '10px',
            fontSize: '10px',
            width: '90px',
          }}
        >
          Add To Cart
        </Button>
      </Card>
    </>
  );
};

export default ViewProduct;
