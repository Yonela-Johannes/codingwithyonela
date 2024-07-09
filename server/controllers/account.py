import json
import psycopg2
from psycopg2.extras import RealDictCursor
from utils.db import connection
from passlib.context import CryptContext

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE = 30 # 30 min

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
# oauth_2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

# def create_access_token(data: dict, expires_delta: timedelta or None = None):
#     to_encode = data.copy()
#     if expires_delta:
#         expire = datetime.utcnow() + expires_delta
#     else:
#         expire = datetime.utcnow() + timedelta(minutes=15)
        
#     to_encode.update({"exp": expire})
#     encode_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
#     return encode_jwt

# async def get_current_user(token: str = Depends(oauth_2_scheme)):
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
        print(error)    
    finally:
        return response
    
import psycopg2
from utils.db import connection

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