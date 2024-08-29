import os
from flask import jsonify
import json
from datetime import datetime, timedelta
import psycopg2
from psycopg2.extras import RealDictCursor
from utils.db import connection
from passlib.context import CryptContext
import psycopg2
from utils.db import connection
from icecream import ic
import jwt
from routes.image_upload import uploadImage


SECRET_KEY = os.environ.get('SECRET_KEY')
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE = 1440 # 24 hours

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: timedelta or None = None):
    result = None
    if data:
        if expires_delta:
            expire = datetime.utcnow() + timedelta(minutes=expires_delta)
        else:
            expire = datetime.utcnow() + timedelta(minutes=15)
        if data:
            result = {
                "exp": expire,
                "user": data
            }
        encode_jwt = jwt.encode(result, SECRET_KEY, algorithm=ALGORITHM)
        return encode_jwt
    else:
        return None

# fetch user
def fetch_user(id):
    query = """SELECT account.*, account.id AS account_id FROM account WHERE account.id=%s"""
    
    response = None

    try:
        with  connection as conn:
            with  conn.cursor(cursor_factory=RealDictCursor) as cur:
                # execute the UPDATE statement
                cur.execute(query, (int(id), ))

                # get the generated id back                
                rows = cur.fetchone()
                return rows if rows else {}

                # commit the changes to the database
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        # Log the error for debugging purposes (you may implement logging)
        ic(f"Database error: {error}")
        return {"error": "An error occurred while fetching blogs. Please try again later."}, 500


     
def get_user_by_email(email):
    response = None
    query = """SELECT email, password, id FROM account WHERE email=%s"""

    try:
        with  connection as conn:
            with  conn.cursor(cursor_factory=RealDictCursor) as cur:
                # execute the UPDATE statement
                cur.execute(query, (email, ))

                # get the generated id back                
                rows = cur.fetchone()
                return rows if rows else {}
                # commit the changes to the database
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        # Log the error for debugging purposes (you may implement logging)
        ic(f"Database error: {error}")
        return {"error": "An error occurred while fetching blogs. Please try again later."}, 500



def get_current_user(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        if "email" in payload:
            user = get_user_by_email(payload["email"])
            return user
        return None
    except:
        return {"message": "You are not authorized"}

def create_new_user_with_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        if "user" in payload:
            data = payload['user']
            email = data['email']
            username = data['username']
            firstname = data['firstname']
            lastname = data['lastname']
            password = data['password'] 
            profile = data['profile']
            profile_id = data['profile_id']
            
            user_title_id = None
            if 'user_title_id' in data:
                user_title_id = data['user_title_id']
                
            exist_user = get_user_by_email(email=email)
            if exist_user:
                response = {"message": "Error: User already exist. Try login in."}
                return response
            else:
                response = create_user(email=email, username=username, lastname=lastname, password=password, profile=profile, profile_id=profile_id, user_title_id=user_title_id, firstname=firstname)
                if response and 'id' in response:
                    return  {"message": "User created successfull",
                            "data": response
                            }
                elif 'message' in response and response['message'] == "dup email error":
                    return response
                elif response and 'email' in response or 'id' in response:
                    token = create_access_token(data=response["email"], expires_delta=ACCESS_TOKEN_EXPIRE)
                    if token:
                        response["token"] = token
                        return response
                    else:
                        response = {"message": "Error: creating login token"}
                        return response
        else:
            res = {"message": "Data missing: register again"}
            return res
    except Exception as error:
        ic(error)
        return {"message": "You are not authorized"}

def login(email, password):
    try:
        result = None
        db_user = get_user_by_email(email=email)
        if db_user:
            if "email" in db_user and "password" in db_user and "id" in db_user:
                user_password = db_user["password"]
                user_email = db_user["email"]
                user_id = db_user["id"]
                
                verify_r = verify_password(plain_password=password, hashed_password=user_password)

                if verify_r == False:
                    return {"message": "Invalid user details provided"}
                
                user = fetch_user(id=user_id)
                if user:
                    token =  create_access_token(data=user["email"], expires_delta=ACCESS_TOKEN_EXPIRE)
                    result = {
                        "user": user,
                        "token": token
                    }
                    
                    return result
 

    except (Exception, psycopg2.DatabaseError) as error:
        # Log the error for debugging purposes (you may implement logging)
        ic(f"Database error: {error}")
        return {"error": "An error occurred while fetching blogs. Please try again later."}, 500
    

def create_user(email, username, lastname, password, profile, profile_id, user_title_id, firstname):
    
    hashed_password = get_password_hash(password)
    
    """Create new account into the acount table """

    sql = """INSERT INTO account(email, username, lastname, password, profile, profile_id, user_title_id, firstname)
            VALUES(%s, %s, %s, %s, %s, %s, %s, %s) RETURNING *;"""
    
    response = None

    try:
        with  connection as conn:
            with  conn.cursor(cursor_factory=RealDictCursor) as cur:
                # execute the INSERT statement
                cur.execute(sql, (email, username, lastname, hashed_password, profile, profile_id, user_title_id, firstname))

                # get the generated id back                
                rows = cur.fetchone()
                return rows if rows else {}
                # commit the changes to the database
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        # Log the error for debugging purposes (you may implement logging)
        ic(f"Database error: {error}")
        return {"error": "An error occurred while fetching blogs. Please try again later."}, 500


# fetch all users
def fetch_users():
    query = """SELECT * FROM account ORDER BY username;"""

    try:
        with  connection as conn:
            with  conn.cursor(cursor_factory=RealDictCursor) as cur:
                # execute the INSERT statement
                cur.execute(query)

                # get the generated all data back                
                rows = cur.fetchall()
                return rows if rows else []
                # commit the changes to the database
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        # Log the error for debugging purposes (you may implement logging)
        ic(f"Database error: {error}")
        return {"error": "An error occurred while fetching blogs. Please try again later."}, 500

# update user
def edit_user(id, is_admin, is_staff, user_title_id, username, firstname, lastname, github_username):
    try:
        query = """UPDATE account SET is_admin = %s
        , is_staff = %s, 
        user_title_id = %s, 
        username = %s, 
        firstname = %s, 
        lastname = %s, 
        github_username = %s 
        WHERE id = %s 
        RETURNING *;"""
        
        query_all = """SELECT account.*, account.id AS account_id, user_title.* FROM account JOIN user_title on user_title_id = user_title.id WHERE account.id=%s"""
        
        response = None
        with  connection as conn:
            with  conn.cursor(cursor_factory=RealDictCursor) as cur:
                # execute the UPDATE statement
                cur.execute(query, (is_admin, is_staff, user_title_id, username, firstname, lastname, github_username, id))

                # get the generated id back                
                rows = cur.fetchone()
                
                if rows and 'id' in rows:
                    cur.execute(query_all, (rows['id'], ))
                    user = cur.fetchone()
                    response = user
                else:
                    response = None
                # commit the changes to the database
                conn.commit()

    except (Exception, psycopg2.DatabaseError) as error:
        # Log the error for debugging purposes (you may implement logging)
        ic(f"Database error: {error}")
        return {"error": "An error occurred while fetching blogs. Please try again later."}, 500

# update user
def delete_user(id, token):
    user = get_current_user(token=token)
    if "id" in user:
        query = """DELETE FROM account WHERE id=%s RETURNING id;"""

    try:
        with  connection as conn:
            with  conn.cursor(cursor_factory=RealDictCursor) as cur:
                # execute the UPDATE statement
                cur.execute(query, (int(id), ))

                # get the generated id back                
                rows = cur.fetchone()
                return rows if rows else {}

                # commit the changes to the database
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        # Log the error for debugging purposes (you may implement logging)
        ic(f"Database error: {error}")
        return {"error": "An error occurred while fetching blogs. Please try again later."}, 500

