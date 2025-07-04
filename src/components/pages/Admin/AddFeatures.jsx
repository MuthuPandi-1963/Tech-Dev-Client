import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import GetCategoryThunk from "../../../store/Thunks/Products/GetCategoryThunk";
import AddFeatureThunk from "../../../store/Thunks/Products/AddFeatureThunk";
const FeatureData = {
  Title: "",
  categoryType: "",
  Description: "",
  image: "",
}
const AddFeature = () => {
  const [formData, setFormData] = useState(FeatureData);
  const [previewImage, setPreviewImage] = useState(null);
  const [message, setMessage] = useState(null);
  const { isLoading } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
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

      setFormData((prevData) => ({ ...prevData, image: file }));
    }
  };

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setFormData({
      ...formData,
      categoryType: selectedCategory,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.Title || !formData.categoryType || !formData.Description || !formData.image) {
      setMessage("Please fill in all fields, select a category, and upload an image.");
      return;
    }

    const Data = new FormData();
    Data.append("file", formData.image);
    Data.append("upload_preset", "gadgets heaven");

    try {
      const response = await axios.post(
        import.meta.env.VITE_CLOUDINARY_URL,
        Data
      );
      console.log(response);

      const FeatureResponse = await dispatch(
        AddFeatureThunk({
          Title: formData.Title,
          categoryType: formData.categoryType,
          Description: formData.Description,
          Image: response.data.secure_url,
        })
      );

      if (FeatureResponse.payload?.message) {
        setMessage("Feature added successfully!");
        setFormData(FeatureData);
        setPreviewImage(null);
      } else {
        setMessage(`Error: ${FeatureResponse.payload?.message}`);
      }
    } catch (error) {
      console.error("Error during submission:", error);
      setMessage("Error during submission. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Feature</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="Title"
            value={formData.Title}
            onChange={handleInputChange}
            disabled={isLoading}
            placeholder="Enter feature title"
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
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="Description"
            value={formData.Description}
            onChange={handleInputChange}
            disabled={isLoading}
            placeholder="Enter feature description"
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Image</label>
          <input
            type="file"
            name="image"
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
          className={`w-full py-2 px-4 rounded-lg bg-blue-500 text-white font-semibold ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}`}
        >
          {isLoading ? "Adding..." : "Add Feature"}
        </button>
      </form>

      {message && (
        <div className={`mt-4 text-center p-2 rounded-lg ${message.startsWith("Error") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default AddFeature;
