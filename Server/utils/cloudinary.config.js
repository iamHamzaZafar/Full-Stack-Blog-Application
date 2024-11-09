const cloudinary = require('cloudinary').v2 ;
const fs = require('fs')


// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) =>{
  try {
    if(!localFilePath) return null;
    // upload the file on cloudinary
    const responce = await cloudinary.uploader.upload(localFilePath,{
      resource_type:'auto'
    })
    // file has been uploaded successfully
    console.log("File is uploaded on cloudinary", responce.url);
    // Remove local file after upload
    fs.unlinkSync(localFilePath);
    return responce;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    // if the files are not uploaded or error int upload method
    fs.unlinkSync(localFilePath); // remove the locally saved file
  }
}

module.exports = uploadOnCloudinary ;