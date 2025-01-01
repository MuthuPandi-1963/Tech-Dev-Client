import React, { useEffect, useCallback, useMemo, useState } from "react"; 
import { useDispatch, useSelector } from "react-redux"; 
import { getFavoriteThunk, removeFromFavoriteThunk } from "../../../store/Thunks/Carts/FavoriteThunk"; 
import { useParams } from "react-router-dom"; 
import Skeleton from "react-loading-skeleton"; // You can use any loading skeleton library

const FavoriteItem = React.memo(({ product, handleRemoveFromFavorites, loading }) => {
  const {offer,productImg,productName , sellingPrice,_id} = product.productId
  return (
    <div key={product.productId} className="flex items-center justify-between border-b border-gray-200 py-4">
      <div className="flex items-center">
        <img
          src={productImg || "https://via.placeholder.com/100"}
          alt={productName}
          className="w-20 h-20 object-cover rounded-md shadow"
        />
        <div className="ml-4">
          <h2 className="text-xl font-semibold">{productName}</h2>
          <p className="text-sm text-gray-500">{product.brandName}</p>
          <p className="text-lg font-bold text-black">₹{sellingPrice}</p>
        </div>
      </div>
      <div className="flex items-center">
        <button
          onClick={() => handleRemoveFromFavorites(_id)}
          className="text-red-500 font-semibold hover:underline"
          disabled={loading === product.productId}
        >
          {loading === product.productId ? "Removing..." : "Remove from Favorites"}
        </button>
      </div>
    </div>
  );
});

const Favorites = () => {
  const dispatch = useDispatch();
  const { favorites, isLoading: loading, error } = useSelector((state) => state.favorite);
  const { user } = useSelector((state) => state.auth);
  const { userId } = useParams();
  const [removing, setRemoving] = useState(null); // Track which item is being removed
  console.log(favorites);
  
  // If userId from URL is undefined, fallback to user.id from the Redux store
  const resolvedUserId = userId || user?.id;

  useEffect(() => {
    const fetchFavorites = async () => {
      if (resolvedUserId) {
        try {
          await dispatch(getFavoriteThunk(resolvedUserId)); // Fetch favorites data
        } catch (err) {
          console.error("Failed to fetch favorites:", err);
        }
      } else {
        console.error("User ID is not available");
      }
    };
    fetchFavorites();
  }, [dispatch, resolvedUserId]);

  // Memoize the remove function using useCallback to avoid unnecessary recreations
  const handleRemoveFromFavorites = useCallback(async (productId) => {
    setRemoving(productId); // Optimistically remove the item
    const payload = { userId: resolvedUserId, productId };
    try {
      await dispatch(removeFromFavoriteThunk(payload)); // Remove item from favorites
      await dispatch(getFavoriteThunk(resolvedUserId)); // Re-fetch favorites after removal
    } catch (error) {
      console.error("Failed to remove item:", error);
      setRemoving(null); // Revert if failed
    }
  }, [dispatch, resolvedUserId]);

  // Use useMemo to calculate the total price to avoid recalculating on every render
  const totalPrice = useMemo(() => {
    return favorites?.reduce((acc, product) => acc + product.productId.sellingPrice, 0); // Use only the product price
  }, [favorites]);

  if (loading) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold text-gray-500">Loading your favorites...</h2>
        <Skeleton height={50} count={5} />
      </div>
    );
  }

  if (!favorites || favorites.length === 0) {
    return (
      <div className="text-center mt-20 text-gray-500">
        <h2 className="text-2xl font-bold">Your Favorites List is Empty</h2>
        <p className="mt-2 text-gray-400">Browse products and add them to your favorites!</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Favorite Products</h1>
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6">
        {favorites.map((product) => (
          <FavoriteItem
            key={product._id}
            product={product}  // Ensure product includes product details (e.g., productName, price, image)
            handleRemoveFromFavorites={handleRemoveFromFavorites}
            loading={removing}
          />
        ))}
        <div className="text-right mt-6">
          <h2 className="text-xl font-bold">
            Total: ₹{totalPrice.toLocaleString()}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Favorites;
