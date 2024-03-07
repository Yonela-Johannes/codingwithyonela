import json
from flask import request
from sqlalchemy import JSON
from controllers.blog import ( create_blog, fetch_blog, edit_blog, delete_blog, fetch_blogs )

def blog():
    REQUEST = request.method 
    if REQUEST == 'GET':
        # Fetch one
        try:
            data = json.loads(request.data)
        
            if data:
                id = json.loads(request.data)['id']
                print("TITLE: => ", id)
                if id:
                    response = fetch_blog(id)
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
            # Fetch All
            response = fetch_blogs()
            result = response
            res = {"data": result}
            return res, 200

    
    # Create title
    elif REQUEST == 'POST':
        try:
            user_id = json.loads(request.data)['user_id']
            post = json.loads(request.data)['post']
            category_id = json.loads(request.data)['category_id']
            time = json.loads(request.data)['time']
            image = json.loads(request.data)['image']

            if user_id and post and category_id and time:
                response = create_blog(user_id, post, category_id, image, time)
                if response:
                        res = {"data": f"{response}"}
                        return res, 201
                else:
                    res = {"message": "Blog already exist"}
                    return res, 400 
                
            res = {"message": "Title invalid: (you must enter title)"}
            return res, 400 
        except json.decoder.JSONDecodeError:
            res = {"message": "Missing data"}
        return res, 400 
            
        # edit/update
    elif REQUEST == 'PUT':
        try:
            id = json.loads(request.data)['id']
            post = json.loads(request.data)['post']
            category_id = json.loads(request.data)['category_id']
            image = json.loads(request.data)['image']
            
            if id:
                response = edit_blog(id, post, category_id, image)
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
            response = json.loads(response)
            id = json.loads(request.data)['id']
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
    