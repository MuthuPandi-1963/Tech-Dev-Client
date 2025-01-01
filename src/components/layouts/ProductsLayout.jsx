import { Whatshot as WhatshotIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export default function ProductsLayout({ product }) {
  return (
    <Link
      to={`/shopping/products/${product._id}`}
      key={product._id}
      className="relative bg-white shadow-lg rounded-lg overflow-hidden group cursor-pointer"
    >
      {/* Image Section */}
      <div className="relative w-full">
        <img
          src={product.productImg || 'https://via.placeholder.com/150'}
          alt={product.productName}
          className="w-full h-64 object-cover max-sm:w-96" // Consistent image height across all layouts
        />
        {product.offer && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-black font-bold rounded-full px-3 py-1 text-xs">
            {product.offer}% Off
          </div>
        )}
        {/* Trending Label */}
      {product.trending && (
        <div className="absolute flex items-center gap-x-1 bottom-0 left-0 z-40 bg-black text-yellow-500 px-4 py-1 rounded-tr-md text-xs font-bold">
          <WhatshotIcon sx={{ fontSize: '14px', color: 'red' }} />
          <p>Top Selling</p>
        </div>
      )}
      </div>

      

      {/* Product Details */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="my-1 font-bold">{product.productName}</h2>
            <p className="text-xs text-gray-500 overflow-hidden">{product.description?.slice(0, 60)}.....</p>
          </div>
          <div className="text-right grid">
            <span className="text-lg font-bold text-green-600">
              ₹{product.sellingPrice}
            </span>
            <span className="text-sm line-through text-red-400 font-semibold ml-2">
              ₹{product.originalPrice}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
