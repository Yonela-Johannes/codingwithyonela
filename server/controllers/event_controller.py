import psycopg2
from utils.db import connection
from psycopg2.extras import RealDictCursor
from controllers.account import get_current_user
from icecream import ic

def create_event(title, description, start_time, end_time):
    try:
        sql = """INSERT INTO event (title, description, start_time, end_time)
                VALUES(%s, %s, %s, %s) RETURNING id;"""
        
        with  connection as conn:
            with  conn.cursor(cursor_factory=RealDictCursor) as cur:
                # execute the INSERT statement
                cur.execute(sql, (title, description, start_time, end_time))

                # get the generated id back                
                rows = cur.fetchone()
                return rows if rows else {}
                # commit the changes to the database
                conn.commit()
                    
    except (Exception, psycopg2.DatabaseError) as error:
        # Log the error for debugging purposes (you may implement logging)
        ic(f"Database error: {error}")
        return {"error": "An error occurred while fetching blogs. Please try again later."}, 500

# fetch event
def fetch_event(id):
    query = """SELECT * FROM event WHERE id=%s"""

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


    
# fetch all events
def fetch_all_events():
    query = """SELECT * FROM event ORDER BY start_time ASC ;"""
    
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


# update event
def edit_event(account_id, name, second_name, lastname, re_image, github, linkedin, email, portfolio, quote, status_id, title_id, country_id, id):
    query = """UPDATE event SET (account_id=%s,name=%s,second_name=%s,lastname=%s,re_image=%s, github=%s, linkedin=%s, email=%s, portfolio=%s,quote=%s,status_id=%s, title_id=%s, country_id=%s) WHERE id = %s RETURNING title
    ;"""
 
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

