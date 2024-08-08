from dotenv import load_dotenv
load_dotenv()
import cloudinary
from cloudinary import CloudinaryImage
import cloudinary.uploader
import cloudinary.api
import json
from slugify import slugify
from icecream import ic

config = cloudinary.config(secure=True)

def uploadImage(image):
  response = None
  response = cloudinary.uploader.upload(image, unique_filename = False, overwrite=True,
        transformation=[{"width": 400, "height": 400, "crop": "auto", "gravity":"auto", "effect": "improve:50"}]
      )

  if "url" in response:
    return response
  else:
      return response
      
      


