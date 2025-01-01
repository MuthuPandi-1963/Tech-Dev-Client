import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import AddCategoryThunk from "../../../store/Thunks/Products/AddCategoryThunk";
import {useNavigate} from 'react-router-dom'
const AddCategory = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    categoryName: "",
    categoryDescription: "",
    categoryImage: null,
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [message, setMessage] = useState(null);
  const { isLoading } = useSelector((state) => state.product);
  const dispatch = useDispatch();

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

      setFormData((prevData) => ({ ...prevData, categoryImage: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.categoryName || !formData.categoryDescription || !formData.categoryImage) {
      setMessage("Please fill in all fields and upload an image.");
      return;
    }

    const Data = new FormData();
    Data.append("file", formData.categoryImage);
    Data.append("upload_preset", "gadgets heaven");
    // console.log("Cloudinary URL:", import.meta.env.VITE_CLOUDINARY_URL);
    // console.log(import.meta.env);

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dh2r2wxw0/image/upload",
        // import.meta.env.VITE_CLOUDINARY_URL,
        Data
      );

      const CategoryResponse = await dispatch(
        AddCategoryThunk({
          categoryName: formData.categoryName,
          categoryDescription: formData.categoryDescription,
          categoryImage: response.data.secure_url,
        })
      );

      if (CategoryResponse.payload?.success) {
        // setMessage("Category added successfully!");
        setFormData({ categoryName: "", categoryDescription: "", categoryImage: null });
        setPreviewImage(null);
        return navigate("/admin/categories") 
      } else {
        setMessage(`Error: ${CategoryResponse.payload?.message}`);
      }
    } catch (error) {
      console.error("Error during submission:", error);
      setMessage("Error during submission. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Category</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Category Name</label>
          <input
            type="text"
            name="categoryName"
            value={formData.categoryName}
            onChange={handleInputChange}
            disabled={isLoading}
            placeholder="Enter category name"
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category Description</label>
          <textarea
            name="categoryDescription"
            value={formData.categoryDescription}
            onChange={handleInputChange}
            disabled={isLoading}
            placeholder="Enter category description"
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category Image</label>
          <input
            type="file"
            name="categoryImage"
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
          {isLoading ? "Adding..." : "Add Category"}
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

export default AddCategory;
