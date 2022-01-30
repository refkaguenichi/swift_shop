import { data } from "./data";
const App = () => {
  return (
    <div>
      {data.products.map((product) => (
        <div key={product._id}>
          <a href={`/product/${product._id}`}>
            <img src={product.image} alt={product.name} />
          </a>
          <h1>{product.name}</h1>
          <i className="fa fa-star"></i>
          <span>Rating:{product.rating}</span>
          <i className="fa fa-dollar"></i>
          <span>Price:{product.price}</span>
        </div>
      ))}
    </div>
  );
};

export default App;
