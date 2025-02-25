import { useState } from "react";
import { Upload, Trash, Image } from "lucide-react";

const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleUrlUpload = () => {
    if (imageUrl.trim() !== "") {
      setImage(imageUrl);
      setImageUrl("");
    }
  };

  const removeImage = () => setImage(null);

  return (
    <div className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg border border-gray-300">
      <h2 className="text-lg font-semibold mb-4">Upload Image</h2>

      {/* Image Preview */}
      {image && (
        <div className="relative mb-4">
          <img src={image} alt="Uploaded" className="w-full h-48 object-cover rounded-md border" />
          <button
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"
            onClick={removeImage}
          >
            <Trash className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Upload via File */}
      <label className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 transition">
        <Upload className="w-5 h-5" />
        <span>Upload File</span>
        <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
      </label>

      {/* OR Divider */}
      <div className="flex items-center my-4">
        <span className="flex-1 border-b border-gray-300"></span>
        <span className="px-2 text-gray-500">OR</span>
        <span className="flex-1 border-b border-gray-300"></span>
      </div>

      {/* Upload via URL */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Enter Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="flex-1 p-2 border rounded"
        />
        <button
          className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 transition"
          onClick={handleUrlUpload}
        >
          <Image className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default UploadImage;