from dotenv import load_dotenv
load_dotenv()
import cloudinary
from cloudinary import CloudinaryImage
import cloudinary.uploader
import cloudinary.api
import json
from icecream import ic

config = cloudinary.config(secure=True)

# Log the configuration
# ==============================
print("****1. Set up and configure the SDK:****\nCredentials: ", config.cloud_name, config.api_key, "\n")

def uploadImage(image):

    ic(image)
    cloudinary.uploader.upload(image, public_id="quickstart_butterfly", unique_filename = False, overwrite=True)

    # Build the URL for the image and save it in the variable 'srcURL'
    srcURL = CloudinaryImage("quickstart_butterfly").build_url()

    print("****2. Upload an image****\nDelivery URL: ", srcURL, "\n")



def getAssetInfo():

  image_info=cloudinary.api.resource("quickstart_butterfly")
  print("****3. Get and use details of the image****\nUpload response:\n", json.dumps(image_info,indent=2), "\n")

  # Assign tags to the uploaded image based on its width. Save the response to the update in the variable 'update_resp'.
  if image_info["width"]>900:
    update_resp=cloudinary.api.update("quickstart_butterfly", tags = "large")
  elif image_info["width"]>500:
    update_resp=cloudinary.api.update("quickstart_butterfly", tags = "medium")
  else:
    update_resp=cloudinary.api.update("quickstart_butterfly", tags = "small")

  # Log the new tag to the console.
  print("New tag: ", update_resp["tags"], "\n")
  
  
def main():
  uploadImage()
  getAssetInfo()
main()