import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import GetCategoryThunk from "../../../store/Thunks/Products/GetCategoryThunk";
import GetBrandTypeThunk from "../../../store/Thunks/Products/GetBrandThunk";
import AddProductThunk from "../../../store/Thunks/Products/AddProductsThunk";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    productName: "",
    categoryType: "",
    brandType: "",
    originalPrice: "",
    sellingPrice: "",
    description: "",
    specification: "",
    stock: "",
    productImg: null,
    trending: false,
    offer: 0,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [message, setMessage] = useState(null);
  const { isLoading } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  // States to store categories, brands, and filtered brands based on category
  const [categories, setCategories] = useState([]);
  const [allBrands, setAllBrands] = useState([]);
  const [filteredBrands, setFilteredBrands] = useState([]);

  useEffect(() => {
    // Fetch categories and brand types from the backend
    const fetchData = async () => {
      try {
        const categoryResponse = await dispatch(GetCategoryThunk());
        const brandTypeResponse = await dispatch(GetBrandTypeThunk());

        setCategories(categoryResponse.payload);
        setAllBrands(brandTypeResponse.payload);
        setFilteredBrands(brandTypeResponse.payload); // Initially show all brands
      } catch (error) {
        console.error("Error fetching categories or brand types:", error);
        setMessage("Error fetching categories or brand types.");
      }
    };

    fetchData();
  }, [dispatch]);

  // Update state to reflect selected category and filter brands accordingly
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      categoryType: selectedCategory,
    }));
    console.log(allBrands);
  
    // Filter brands based on selected category
    const filtered = allBrands.filter((brand) =>
      brand.categoryType.includes(selectedCategory)
    );
  
    console.log(selectedCategory, filtered);
    setFilteredBrands(filtered);
  };
  
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: checked }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setMessage("Please upload a valid image file.");
        return;
      }

      if (file.size > 5 * 1024 * 1024) { // 5MB size limit
        setMessage("File size should be less than 5MB.");
        return;
      }

      setFormData((prevData) => ({ ...prevData, productImg: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.productName ||
      !formData.categoryType ||
      !formData.brandType ||
      !formData.originalPrice ||
      !formData.sellingPrice ||
      !formData.description ||
      !formData.specification ||
      !formData.stock ||
      !formData.productImg
    ) {
      setMessage("Please fill in all fields and upload an image.");
      return;
    }

    const data = new FormData();
    data.append("file", formData.productImg);
    data.append("upload_preset", "gadgets heaven");

    try {
      const uploadResponse = await axios.post(
        import.meta.env.VITE_CLOUDINARY_URL,
        data
      );
      console.log(uploadResponse);
      
      const productResponse = await dispatch(
        AddProductThunk({
          productName: formData.productName,
          categoryType: formData.categoryType,
          brandType: formData.brandType,
          originalPrice: formData.originalPrice,
          sellingPrice: formData.sellingPrice,
          description: formData.description,
          specification: formData.specification,
          stock: formData.stock,
          productImage: uploadResponse.data.secure_url,
          trending: formData.trending,
          offer: formData.offer,
        })
      );

      if (productResponse.payload?.success) {
        setMessage("Product added successfully!");
        setFormData({
          productName: "",
          categoryType: "",
          brandType: "",
          originalPrice: "",
          sellingPrice: "",
          description: "",
          specification: "",
          stock: "",
          productImg: null,
          trending: false,
          offer: 0,
        });
        setPreviewImage(null);
      } else {
        setMessage(`Error: ${productResponse.payload?.message}`);
      }
    } catch (error) {
      console.error("Error during product submission:", error);
      setMessage("Error during submission. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleInputChange}
            disabled={isLoading}
            placeholder="Enter product name"
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category Type</label>
          <select
            name="categoryType"
            value={formData.categoryType}
            onChange={handleCategoryChange}
            disabled={isLoading}
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a category</option>
            {categories?.map((category) => (
              <option key={category._id} value={category._id}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Brand Type</label>
          <select
            name="brandType"
            value={formData.brandType}
            onChange={handleInputChange}
            disabled={isLoading}
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a brand type</option>
            {filteredBrands?.map((brand) => (
              <option key={brand._id} value={brand._id}>
                {brand.brandName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Original Price</label>
          <input
            type="number"
            name="originalPrice"
            value={formData.originalPrice}
            onChange={handleInputChange}
            disabled={isLoading}
            placeholder="Enter original price"
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Selling Price</label>
          <input
            type="number"
            name="sellingPrice"
            value={formData.sellingPrice}
            onChange={handleInputChange}
            disabled={isLoading}
            placeholder="Enter selling price"
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            disabled={isLoading}
            placeholder="Enter product description"
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Specification</label>
          <textarea
            name="specification"
            value={formData.specification}
            onChange={handleInputChange}
            disabled={isLoading}
            placeholder="Enter product specification"
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Stock</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleInputChange}
            disabled={isLoading}
            placeholder="Enter stock"
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Product Image</label>
          <input
            type="file"
            name="productImg"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isLoading}
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {previewImage && (
            <div className="mt-4">
              <img
                src={previewImage}
                alt="Preview"
                className="w-32 h-32 object-cover border rounded-lg"
              />
            </div>
          )}
        </div>

        <div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="trending"
              checked={formData.trending}
              onChange={handleCheckboxChange}
              disabled={isLoading}
              className="form-checkbox"
            />
            <span className="ml-2">Trending</span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Offer (%)</label>
          <input
            type="number"
            name="offer"
            value={formData.offer}
            onChange={handleInputChange}
            disabled={isLoading}
            placeholder="Enter offer percentage"
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* Other form fields here... */}

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 mt-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isLoading ? "Adding Product..." : "Add Product"}
          </button>
        </div>
      </form>
      {message && <p className="text-red-500 text-sm mt-2">{message}</p>}
    </div>
  );
};

export default AddProduct;
