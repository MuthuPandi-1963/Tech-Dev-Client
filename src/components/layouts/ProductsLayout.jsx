import { Whatshot as WhatshotIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export default function ProductsLayout({ product }) {
  return (
    <Link
      to={`/shopping/products/${product._id}`}
      key={product._id}
      className="relative mx-2 my-2 bg-white shadow-lg rounded-lg overflow-hidden group cursor-pointer"
    >
      {/* Image Section */}
      <div className="relative w-full">
        <img
          src={product.productImg || 'https://via.placeholder.com/150'}
          alt={product.productName}
          className="w-full h-40 object-cover max-sm:w-96" // Consistent image height across all layouts
        />
        {product.offer && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-black font-bold rounded px-2 py-[2px] text-xs">
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
      <div className="px-4 py-2">
        <div className="grid  items-start">
          <div>
            <h2 className="whitespace-nowrap text-[12px] overflow-hidden mt-1 font-bold">{product.productName}</h2>
            <p className="text-[9px] text-gray-700 overflow-hidden">{product.description?.slice(0, 40)}.....</p>
          </div>
          <div className="flex items-center flex-row-reverse  gap-x-4">
            <span className="font-bold text-green-600">
              ₹{product.sellingPrice}
            </span>
            <span className="text-sm line-through text-black font-semibold ml-2">
              ₹{product.originalPrice}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
