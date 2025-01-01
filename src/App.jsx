import { Routes, Route } from "react-router-dom";
import AuthenticationLayout from "./components/layouts/AuthenticationLayout";
import HomeLayout from "./components/layouts/HomeLayout";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import RefreshAuthThunk from "./store/Thunks/Authentication/RefreshAuthThunk";
import Home from "./components/pages/Home/Home";
import NotFound from "./utilities/NotFound";
import AdminLayout from "./components/layouts/AdminLayout";
import AdminDashBoard from "./components/pages/Admin/AdminDashBoard";
import AdminProducts from "./components/pages/Admin/AdminProducts";
import AdminCategories from "./components/pages/Admin/AdminCategories";
import Adminfeatures from "./components/pages/Admin/Adminfeatures";
import AdminOrders from "./components/pages/Admin/AdminOrders";
import AddCategory from "./components/pages/Admin/AddCategories";
import AdminBrand from "./components/pages/Admin/AdminBrand";
import AddBrand from "./components/pages/Admin/AddBrand";
import AddProducts from "./components/pages/Admin/AddProducts";
import ShoppingLayout from "./components/layouts/ShoppingLayout";
import Products from "./components/pages/Shopping/Products";
import Categorie from "./components/pages/Shopping/Categorie";
import ProductOverview from "./components/pages/Shopping/ProductOverview";
import Brand from "./components/pages/Shopping/Brand";
import Trending from "./components/pages/Home/Trending";
import CategoriesOverview from "./components/pages/Shopping/CategoriesOverview";
import BrandOverview from "./components/pages/Shopping/BrandOverview";
import AddFeature from "./components/pages/Admin/AddFeatures";
import Carts from "./components/pages/Orders/Carts";
import OrderLayout from "./components/layouts/OrderLayout";
import Favorites from "./components/pages/Orders/Favourites";
import CheckAuth from "./helpers/CheckAuth";
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(RefreshAuthThunk());
  }, []);
  return (
    <>
      <Routes>
        <Route path="" element={<HomeLayout />}>
          <Route path="" element={<Home />} />

          <Route path="shopping" element={<ShoppingLayout />}>
            <Route path="products" element={<Products />} />
            <Route path="trending" element={<Trending />} />
            <Route
              path="category"
              element={
                <Categorie BtnStyle="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mx-auto w-full" />
              }
            />

            <Route
              path="brand"
              element={<Brand BtnStyle="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mx-auto w-full" />}
            />
            <Route
              path="category/:categoryId"
              element={<CategoriesOverview />}
            />
            <Route path="brand/:brandId" element={<BrandOverview />} />
            <Route path="products/:productId" element={<ProductOverview />} />
          </Route>

          <Route
            path="/orders"
            element={
              <CheckAuth>
                <OrderLayout />
              </CheckAuth>
            }
          >
            <Route path="carts/:userId" element={<Carts />} />
            <Route path="favorite/:userId" element={<Favorites />} />
          </Route>
        </Route>
        <Route
          path="/admin"
          element={
            <CheckAuth>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="" element={<AdminDashBoard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="features" element={<Adminfeatures />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="brands" element={<AdminBrand />} />
          <Route path="add_category" element={<AddCategory />} />
          <Route path="add_brand" element={<AddBrand />} />
          <Route path="add_product" element={<AddProducts />} />
          <Route path="add_feature" element={<AddFeature />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <AuthenticationLayout />
    </>
  );
};

export default App;
