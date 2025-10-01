const cloudinary = require("../config/cloudinary"); // Cloudinary configuration for image uploads
exports.uploadCloudinaryImage = async (file) => {
  try {
    const { secure_url, public_id } = await cloudinary.uploader.upload(file, {
      folder: "DawnEats",
    });
    return { secure_url, public_id };
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Failed to upload image");
  }
};

exports.deleteCloudinaryImage = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Error deleting image:", error);
    throw new Error("Failed to delete image");
  }
};
