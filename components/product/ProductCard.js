/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import {
  Button, Card,
} from 'react-bootstrap';

const ProductCard = ({
  id,
  productImage,
  title,
  description,
  price,
  unitsAvailable,
}) => {
  const router = useRouter();

  return (
    <>
      <Card className="text-center">
        <Card.Title> {title}</Card.Title>
        <Card.Body>
          <img src={productImage} alt="productimage" style={{ width: '200px' }} />
        </Card.Body>
        <Card.Body>
          <Card.Text> {description} </Card.Text>
          <Card.Text>${price}</Card.Text>
          <Card.Footer>Units Available: {unitsAvailable}</Card.Footer>
        </Card.Body>
        <Button
          variant="secondary"
          onClick={() => {
            router.push(`/products/${id}`);
          }}
        >
          View Product
        </Button>
      </Card>
    </>
  );
};

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  productImage: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  unitsAvailable: PropTypes.number.isRequired,
};

export default ProductCard;
