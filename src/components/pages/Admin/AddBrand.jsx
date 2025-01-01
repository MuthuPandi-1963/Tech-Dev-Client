import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import GetCategoryThunk from "../../../store/Thunks/Products/GetCategoryThunk";
import AddBrandThunk from "../../../store/Thunks/Products/AddBrandThunk";

const AddBrand = () => {
  const [formData, setFormData] = useState({
    brandName: "",
    categoryType: [], // Array to store selected categories
    brandDescription: "",
    brandImg: null,
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [message, setMessage] = useState(null);
  const { isLoading } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  // To store the categories fetched from the backend
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch the existing categories from the backend
    const fetchCategories = async () => {
      try {
        const response = await dispatch(GetCategoryThunk());
        setCategories(response.payload);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setMessage("Error fetching categories.");
      }
    };

    fetchCategories();
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setMessage("Please upload a valid image file.");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setMessage("File size should be less than 5MB.");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);

      setFormData((prevData) => ({ ...prevData, brandImg: file }));
    }
  };

  // Handle category selection with checkboxes
  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      const updatedCategories = checked
        ? [...prevData.categoryType, value] // Add category if checked
        : prevData.categoryType.filter((category) => category !== value); // Remove if unchecked
      return { ...prevData, categoryType: updatedCategories };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.brandName ||
      formData.categoryType.length === 0 ||
      !formData.brandDescription ||
      !formData.brandImg
    ) {
      setMessage("Please fill in all fields, select at least one category, and upload an image.");
      return;
    }

    const Data = new FormData();
    Data.append("file", formData.brandImg);
    Data.append("upload_preset", "gadgets heaven");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dh2r2wxw0/image/upload",
        Data
      );

      const BrandResponse = await dispatch(
        AddBrandThunk({
          brandName: formData.brandName,
          categoryType: formData.categoryType, // Send the array of selected categories
          brandDescription: formData.brandDescription,
          brandImage: response.data.secure_url,
        })
      );

      if (BrandResponse.payload?.success) {
        setMessage("Brand added successfully!");
        setFormData({ brandName: "", categoryType: [], brandDescription: "", brandImg: null });
        setPreviewImage(null);
      } else {
        setMessage(`Error: ${BrandResponse.payload?.message}`);
      }
    } catch (error) {
      console.error("Error during submission:", error);
      setMessage("Error during submission. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Brand</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Brand Name</label>
          <input
            type="text"
            name="brandName"
            value={formData.brandName}
            onChange={handleInputChange}
            disabled={isLoading}
            placeholder="Enter brand name"
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category Type</label>
          <div className="space-y-2">
            {categories?.map((category) => (
              <div key={category._id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`category-${category._id}`}
                  value={category._id}
                  checked={formData.categoryType.includes(category._id)}
                  onChange={handleCategoryChange}
                  disabled={isLoading}
                  className="h-4 w-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor={`category-${category._id}`} className="ml-2 text-sm text-gray-700">
                  {category.categoryName}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Brand Description</label>
          <textarea
            name="brandDescription"
            value={formData.brandDescription}
            onChange={handleInputChange}
            disabled={isLoading}
            placeholder="Enter brand description"
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Brand Image</label>
          <input
            type="file"
            name="brandImg"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isLoading}
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="w-32 h-32 mt-4 border rounded-lg"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 rounded-lg bg-blue-500 text-white font-semibold ${
            isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
        >
          {isLoading ? "Adding..." : "Add Brand"}
        </button>
      </form>

      {message && (
        <div
          className={`mt-4 text-center p-2 rounded-lg ${
            message.startsWith("Error") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default AddBrand;
