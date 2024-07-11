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
from jose import jwt

SECRET_KEY = "699c228df46b9cf78837567965b88004628df169c4875ccab07725341762f531"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE = 1440 # 24 hours

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: timedelta or None = None):
    if data:
        ic(timedelta)
        if expires_delta:
            expire = datetime.utcnow() + timedelta(minutes=expires_delta)
        else:
            expire = datetime.utcnow() + timedelta(minutes=15)
        if data:
            data["exp"] = expire
        encode_jwt = jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)
        return encode_jwt
    else:
        return None

# async def get_current_user(token: str):
#     credential_exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, 
#                                          detail="Could not validate credentials", headers={"WWW-Authenticate": "Bearer"})
#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         username: str = payload.get("sub")
#         if username is None:
#             raise credential_exception
        
#         token_data = TokenData(username=username)
#     except JWTError:
#         raise credential_exception
    
#     user = get_user(db, username=token_data.username)
#     if user is None:
#         raise credential_exception
    
#     return user

# fetch user

def fetch_user(id):
    query = """SELECT account.*, account.id AS account_id, user_title.* FROM account JOIN user_title on user_title_id = user_title.id WHERE account.id=%s"""
    
    response = None

    try:
        with  connection as conn:
            with  conn.cursor(cursor_factory=RealDictCursor) as cur:
                # execute the UPDATE statement
                cur.execute(query, (int(id), ))

                # get the generated id back                
                rows = cur.fetchone()
                if rows:
                    response = rows

                # commit the changes to the database
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        response = error
    finally:
        return response
    
    
def get_user_by_email(email):
    query = """SELECT email, password, id FROM account WHERE email=%s"""
    response = None

    try:
        with  connection as conn:
            with  conn.cursor(cursor_factory=RealDictCursor) as cur:
                # execute the UPDATE statement
                cur.execute(query, (email, ))

                # get the generated id back                
                rows = cur.fetchone()
                if rows:
                    response = rows

                # commit the changes to the database
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        response = error
    finally:
        return response

def login(email, password):
    db_user = get_user_by_email(email=email)
    ic()
    ic(db_user)
    
    if "email" in db_user and "password" in db_user and "id" in db_user:
        user_password = db_user["password"]
        user_email = db_user["email"]
        user_id = db_user["id"]
        verify_r = verify_password(plain_password=password, hashed_password=user_password)
        if verify_r:
            user = fetch_user(id=user_id)
            ic(user)
            create_access_token(data=user, expires_delta=ACCESS_TOKEN_EXPIRE)
        else:
            return {"message": "Error: invalid data provided"}, 400
    else:
        return {"message": "Error: missing data input"}, 400
        
    # print(db_user)
    
    return {}, 200

    # try:

    # except (Exception, psycopg2.DatabaseError) as error:
    #     print(error)    
    # finally:
    #     return response


def create_user(email, username, lastname, password, is_admin, is_staff, user_title_id, profile):
    
    hashed_password = get_password_hash(password)
    
    if is_admin == "False":
        is_admin = False
    else:
        is_admin = True
        
    if is_staff == "False":
        is_staff = False
    else:
        is_staff = True
    
    """Create new account into the acount table """

    sql = """INSERT INTO account(email, username, lastname, password, is_admin, is_staff, user_title_id, profile)
            VALUES(%s, %s, %s, %s, %s, %s, %s, %s) RETURNING id, username, email, lastname, is_staff, user_title_id;"""
    
    response = None

    try:
        with  connection as conn:
            with  conn.cursor(cursor_factory=RealDictCursor) as cur:
                # execute the INSERT statement
                cur.execute(sql, (email, username, lastname, hashed_password, is_admin, is_staff, user_title_id, profile))

                # get the generated id back                
                rows = cur.fetchone()
                if rows:
                    response = rows

                # commit the changes to the database
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        ic(error)    
    finally:
        token = create_access_token(data=response, expires_delta=ACCESS_TOKEN_EXPIRE)
        if token:
            response["token"] = token
            return response
        else:
            return None
# fetch all users
def fetch_users():
    query = """SELECT * FROM account JOIN user_title on user_title_id = user_title.id  ORDER BY username;"""
    
    response = None

    try:
        with  connection as conn:
            with  conn.cursor(cursor_factory=RealDictCursor) as cur:
                # execute the INSERT statement
                cur.execute(query)

                # get the generated all data back                
                rows = cur.fetchall()
                if rows:
                    response = rows
                # commit the changes to the database
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        response = error
    finally:
        return response

# update user
def edit_user(id, is_admin, is_staff, user_title_id):
    query = """UPDATE account SET (is_admin=%s,is_staff=%s,user_title_id=%s) WHERE id = %s RETURNING title
    ;"""
    
    response = None

    try:
        with  connection as conn:
            with  conn.cursor() as cur:
                # execute the UPDATE statement
                cur.execute(query, (is_admin, is_staff, user_title_id, int(id)))

                # get the generated id back                
                rows = cur.fetchone()
                if rows:
                    response = rows[0]

                # commit the changes to the database
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        response = error
    finally:
        return response
    
# update user
def delete_user(id):
    query = """DELETE FROM account WHERE id=%s RETURNING id;"""
    
    response = None

    try:
        with  connection as conn:
            with  conn.cursor() as cur:
                # execute the UPDATE statement
                cur.execute(query, (int(id), ))

                # get the generated id back                
                rows = cur.fetchone()
                if rows:
                    response = rows[0]

                # commit the changes to the database
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        response = error
    finally:
        return response