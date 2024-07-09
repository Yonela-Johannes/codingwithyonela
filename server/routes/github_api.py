import requests
from flask import request
from icecream import ic 
from dotenv import load_dotenv
import os
load_dotenv()

TOKEN = os.getenv("TOKEN")

headers = {
    "Accept": "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "Authorization": "Token " + TOKEN,
    "access_token": "ACCESS_TOKEN_TO_CHECK"
}

def list_my_repos():
    REQUEST = request.method
    if REQUEST == 'GET':
        try:
            username = 'yonela-johannes'
            # The API endpoint
            url = f"https://api.github.com/users/{username}/repos"

            # A GET request to the API
            response = requests.get(url, headers=headers)
            
            # Print the response
            response_json = response.json()
            res = {"data": response_json}
            return res, 200

        except json.decoder.JSONDecodeError:   
            res = {"message": "Something went wrong!"}
            return res, 400 

def list_all_users_repos():
    REQUEST = request.method
    if REQUEST == 'GET':
        try:
            username = 'yonela-johannes'
            # The API endpoint
            url = f"https://api.github.com/users/{username}/repos"

            # A GET request to the API
            response = requests.get(url, headers=headers)
            
            # Print the response
            response_json = response.json()
            res = {"data": response_json}
            return res, 200

        except json.decoder.JSONDecodeError:   
            res = {"message": "Something went wrong!"}
            return res, 400 
        
        
def list_profiles():
    REQUEST = request.method
    if REQUEST == 'GET':
        try:
            username = 'yonela-johannes'
            # The API endpoint
            url = f"https://api.github.com/users/{username}/repos"

            # A GET request to the API
            response = requests.get(url, headers=headers)
            
            # Print the response
            response_json = response.json()
            res = {"data": response_json}
            return res, 200

        except json.decoder.JSONDecodeError:   
            res = {"message": "Something went wrong!"}
            return res, 400 
        
        
def my_profile():
    REQUEST = request.method
    if REQUEST == 'GET':
        try:
            username = 'yonela-johannes'
            # The API endpoint
            url = f"https://api.github.com/users/{username}"

            # A GET request to the API
            response = requests.get(url, headers=headers)
            
            # Print the response
            response_json = response.json()
            res = {"data": response_json}
            return res, 200

        except json.decoder.JSONDecodeError:   
            res = {"message": "Something went wrong!"}
            return res, 400 