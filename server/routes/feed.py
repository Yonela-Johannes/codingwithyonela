import json
from flask import request, jsonify
from sqlalchemy import JSON
from controllers.feed import ( create_feed, fetch_feed, create_feed_comment, fetch_feed_comments, fetch_feeds, edit_feed )
from icecream import ic
from routes.image_upload import uploadImage

def feed(id):
    REQUEST = request.method 
    if REQUEST == 'GET':
        # Fetch one
        try:
            if id:
                response = fetch_feed(id)
                if response:
                    res = {
                            "message": "Fetch successful",
                            "data": response
                            }
                    return res, 200
                else:
                    res = {"message": "Fetch failed: something went wrong."}
                    return res, 400
            
        except:
            return {"message": "Fetch failed: something went wrong."}
            
        # edit/update
    elif REQUEST == 'PUT':
        try:
            
            data = request.get_json()
            id = data['id']
            text = data['text']
            image = data['image']
            video = data['video']
            
            if id:
                response = edit_feed(id, text, image, video)
                if response:
                        res = {"data": f"{response}",
                            "message": "Update successful"
                            }
                        return res, 200
            res = {"message": "Title or is ID invalid"}
            return res, 400
        except json.decoder.JSONDecodeError:
            res = {"message": "Missing data"}
            return res, 400
    
    # delete
    elif REQUEST == 'DELETE':
        try:
            data = request.get_json()
            id = data['id']
            if id:
                response = delete_blog(id)
                if response == id:
                    res = {"message": "Delete failed: something went wrong."}
                    return res, 400
                else:
                    res = {
                            "message": "Delete successful"
                            }
                    return res, 200
            res = {"message": "Title or is ID invalid"}
            return res, 400 
        except json.decoder.JSONDecodeError:
           res = {"message": "Missing data"}
        return res, 400
    
    
def feeds():
    REQUEST = request.method
    if REQUEST == 'POST':
        try:
            data = request.form
            get_image = request.files
            account = data['account']
            text = data['text']
            
            image = get_image['image']
  
            new_image = uploadImage(image)
            if new_image == None:        
                return {"message": "Error: something went wrong with image upload"}, 409
            
            video = None
            new_video = None
            if "video" in data == True:
                video = data['video']
                new_video_response = uploadImage(video)
                if new_video_response == None:
                    return {"message": "Error: something went wrong with video upload"}, 409
                new_video = new_video_response
            else:
                new_video = ''
            
            token = data['token']
            
            if account and text and token:
                response = create_feed(account_id=account, text=text, image=new_image, video=new_video, token=token)
                ic(response)
                if "message" in response and response['message'] == 'You are not authorized':
                    return response, 409
                elif response:
                    res = {"message": "Feed created successful"}
                    return res, 201
                else:
                    res = {"message": "Error: something went wrong"}
                    return res, 400 
                
            res = {"message": "Error: missing data"}
            return res, 400 
        except json.decoder.JSONDecodeError:
            res = {"message": "Missing data"}
        return res, 400 
    elif REQUEST == 'GET':
        try:
            response = fetch_feeds()
            if response:
                return response, 200
            else:
                return [],200
        except:
            return {"message": "Fetch failed: something went wrong."}
        
        
def feed_comment(id):
    REQUEST = request.method
    if REQUEST == 'GET':
        try:
            if id:
                response = fetch_feed_comments(id)
                print("RESPONSE: ", response)
                res = {"data": response}
                return res, 200
            else:
                res = {"data": "Missing data"}
            return res, 200
        except:
            return {"message": "Fetch failed: something went wrong."}, 400
        
def feed_comment_create():
    REQUEST = request.method
    if REQUEST == 'POST':
        try:
            data = request.get_json()
            account_id = data['account']
            comment = data['comment']
            feed_id = data['feed']

            if account_id and comment and feed_id:
                response = create_feed_comment(account_id, comment, feed_id)
                if len(response) > 0:
                        res = {"data": f"{response}",
                               "message": "Commented successful"}
                        return res, 201
                else:
                    res = {"message": "Feed already exist"}
                    return res, 400 
                
            res = {"message": "Title invalid: (you must enter title)"}
            return res, 400 
        except json.decoder.JSONDecodeError:
            res = {"message": "Missing data"}
        return res, 400 