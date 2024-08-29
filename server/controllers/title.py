import psycopg2
from utils.db import connection
from psycopg2.extras import RealDictCursor

# fetch title
def fetch_title(id):
    query = """SELECT id,title FROM user_title WHERE id=%s ORDER BY title,id;"""
    
    response = None

    try:
        with  connection as conn:
            with  conn.cursor() as cur:
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


# create title
def create_title(user_title, description, skills):
    query = """INSERT INTO user_title (user_title, description, skills)
             VALUES(%s, %s, %s) RETURNING user_title;"""
    
    response = None

    try:
        with  connection as conn:
            with  conn.cursor() as cur:
                # execute the INSERT statement
                cur.execute(query, (user_title, description, skills))

                # get the generated title back                
                rows = cur.fetchone()
                return rows if rows else {}

                # commit the changes to the database
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        # Log the error for debugging purposes (you may implement logging)
        ic(f"Database error: {error}")
        return {"error": "An error occurred while fetching blogs. Please try again later."}, 500

# fetch all titles
def fetch_titles():
    query = """SELECT * FROM user_title ORDER BY user_title;"""
    
    response = None

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

# update title
def edit_title(id, title):
    query = """UPDATE user_title SET title=%s WHERE id = %s RETURNING title
    ;"""
    
    response = None

    try:
        with  connection as conn:
            with  conn.cursor(cursor_factory=RealDictCursor) as cur:
                # execute the UPDATE statement
                cur.execute(query, (title, int(id)))

                # get the generated id back                
                rows = cur.fetchone()
                return rows if rows else {}

                # commit the changes to the database
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        # Log the error for debugging purposes (you may implement logging)
        ic(f"Database error: {error}")
        return {"error": "An error occurred while fetching blogs. Please try again later."}, 500
 
# update title
def delete_title(id):
    query = """DELETE FROM user_title WHERE id=%s RETURNING id;"""
    
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

