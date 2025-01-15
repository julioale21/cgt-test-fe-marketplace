import { useParams } from 'react-router-dom';
import pictureA from '../assets/a.jpg';
import pictureB from '../assets/b.jpg';

const Product = () => {
  const { productId } = useParams();

  const renderProduct = () => {
    switch (productId) {
      case 'b':
        return (
          <div>
            <h1>Product B</h1>
            <p>Price: 30 USD</p>
            <button type="button" onClick={() => console.warn('Not implemented!')}>
              Add to cart
            </button>
            <div>
              <img src={pictureB} width={640} alt="Product B" />
            </div>
          </div>
        );
      case 'a':
        return (
          <div>
            <h1>Product A</h1>
            <p>Price: 10 USD</p>
            <button type="button" onClick={() => console.log('Not implemented!')}>
              Add to cart
            </button>
            <div>
              <img src={pictureA} width={640} alt="Product A" />
            </div>
          </div>
        );
      default:
        return <div>Product not found</div>;
    }
  };

  return renderProduct();
};

export default Product;
