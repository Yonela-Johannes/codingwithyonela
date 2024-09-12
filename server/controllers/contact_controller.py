import psycopg2
from utils.db import connection
from psycopg2.extras import RealDictCursor
from controllers.account import get_current_user
from icecream import ic

def create_contact_us(name, image, lastname, email, message):
    try:
        sql = """INSERT INTO contact (name, image, lastname, email, message)
                VALUES(%s, %s, %s, %s, %s) RETURNING *;"""
        
        with  connection as conn:
            with  conn.cursor(cursor_factory=RealDictCursor) as cur:
                # execute the INSERT statement
                cur.execute(sql, (name, image, lastname, email, message, ))

                # get the generated id back                
                rows = cur.fetchone()
                return rows if rows else {}
                # commit the changes to the database
                conn.commit()
                    
    except (Exception, psycopg2.DatabaseError) as error:
        # Log the error for debugging purposes (you may implement logging)
        ic(f"Database error: {error}")
        return {"error": "An error occurred sending a message. Please try again later."}
    
# fetch recommendation
def fetch_contact(id):
    query = """SELECT * FROM contact WHERE id=%s"""
    
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

# fetch all contacts
def fetch_contacts():
    query = """SELECT * FROM contact;"""
    
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


# fetch all newsletters
def fetch_newsletters():
    query = """SELECT * FROM newsletter;"""
    
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

# Create newsletter
def create_newsletter(email):
    try:
        sql = """INSERT INTO newsletter (email)
                VALUES(%s) RETURNING *;"""
        
        with  connection as conn:
            with  conn.cursor(cursor_factory=RealDictCursor) as cur:
                # execute the INSERT statement
                cur.execute(sql, (email, ))

                # get the generated id back                
                rows = cur.fetchone()
                return rows if rows else {}
                # commit the changes to the database
                conn.commit()
                    
    except (Exception, psycopg2.DatabaseError) as error:
        # Log the error for debugging purposes (you may implement logging)
        ic(f"Database error: {error}")
        return {"error": "An error occurred sending a message. Please try again later."}
    