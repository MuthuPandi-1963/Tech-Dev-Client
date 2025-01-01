import React, { useEffect, useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartThunk, removeFromCartThunk } from "../../../store/Thunks/Carts/CartsThunk";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton"; // You can use any loading skeleton library

const CartItem = React.memo(({ product, handleRemoveFromCart, loading }) => {
  return (
    <div key={product.productId} className="flex items-center justify-between border-b border-gray-200 py-4">
      <div className="flex items-center">
        <img
          src={product.image || "https://via.placeholder.com/100"}
          alt={product.productName}
          className="w-20 h-20 object-cover rounded-md shadow"
        />
        <div className="ml-4">
          <h2 className="text-xl font-semibold">{product.productName}</h2>
          <p className="text-sm text-gray-500">{product.brandName}</p>
          <p className="text-lg font-bold text-black">₹{product.price.toLocaleString()}</p>
        </div>
      </div>
      <div className="flex items-center">
        <p className="text-lg text-gray-600 mr-6">
          Qty: <span className="font-semibold">{product.quantity}</span>
        </p>
        <button
          onClick={() => handleRemoveFromCart(product.productId)}
          className="text-red-500 font-semibold hover:underline"
          disabled={loading === product.productId}
        >
          {loading === product.productId ? "Removing..." : "Remove"}
        </button>
      </div>
    </div>
  );
});

const Carts = () => {
  const dispatch = useDispatch();
  const { cart, isLoading: loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { userId } = useParams();
  const [removing, setRemoving] = useState(null); // Track which item is being removed

  // If userId from URL is undefined, fallback to user.id from the Redux store
  const resolvedUserId = userId || user?.id;

  useEffect(() => {
    const fetchCart = async () => {
      if (resolvedUserId) {
        try {
          await dispatch(getCartThunk(resolvedUserId)); // Fetch cart data
        } catch (err) {
          console.error("Failed to fetch cart:", err);
        }
      } else {
        console.error("User ID is not available");
      }
    };
    fetchCart();
  }, [dispatch, resolvedUserId]);

  // Memoize the remove function using useCallback to avoid unnecessary recreations
  const handleRemoveFromCart = useCallback(async (productId) => {
    setRemoving(productId); // Optimistically remove the item
    const payload = { userId: resolvedUserId, productId };
    try {
      await dispatch(removeFromCartThunk(payload)); // Remove item from cart
      await dispatch(getCartThunk(resolvedUserId)); // Re-fetch cart after removal
    } catch (error) {
      console.error("Failed to remove item:", error);
      setRemoving(null); // Revert if failed
    }
  }, [dispatch, resolvedUserId]);

  // Use useMemo to calculate the total price to avoid recalculating on every render
  const totalPrice = useMemo(() => {
    return cart?.reduce((acc, product) => acc + product.price * product.quantity, 0);
  }, [cart]);

  if (loading) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold text-gray-500">Loading your cart...</h2>
        <Skeleton height={50} count={5} />
      </div>
    );
  }

  if (!cart || cart.length === 0) {
    return (
      <div className="text-center mt-20 text-gray-500">
        <h2 className="text-2xl font-bold">Your Cart is Empty</h2>
        <p className="mt-2 text-gray-400">Explore products and add them to your cart!</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Shopping Cart</h1>
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6">
        {cart.map((product) => (
          <CartItem
            key={product.productId}
            product={product}
            handleRemoveFromCart={handleRemoveFromCart}
            loading={removing}
          />
        ))}
        <div className="text-right mt-6">
          <h2 className="text-xl font-bold">
            Total: ₹{totalPrice.toLocaleString()}
          </h2>
          <button className="mt-4 px-6 py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-800">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carts;
