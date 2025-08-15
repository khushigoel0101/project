import { Link } from "react-router-dom";

const ProductGrid = ({ products, loading, error }) => {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <Link key={index} to={`/products/${product._id}`} className="block">
          <div className="bg-white p-4 hover:shadow-lg transition-shadow duration-300">
            <div className="w-full h-96 mb-4 overflow-hidden">
              <img
                src={product.images[0].url}
                alt={product.images[0].altText || product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-sm mb-2 font-semibold text-gray-800">{product.name}</h3>
            <p className="text-gray-600 font-medium text-sm tracking-tighter">
              ${product.price}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;
