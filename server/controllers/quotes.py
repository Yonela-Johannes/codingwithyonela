import psycopg2
from utils.db import connection
from psycopg2.extras import RealDictCursor
from icecream import ic

# fetch all quotes
def fetch_quotes():
    query = """SELECT * FROM quotes ORDER BY quote;"""
    
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

# create quote
def create_quote(quote):
    query = """INSERT INTO quotes (quote) VALUES (%s);"""
    
    try:
        with  connection as conn:
            with  conn.cursor(cursor_factory=RealDictCursor) as cur:
                # execute the INSERT statement
                cur.execute(query, (quote, ))

                # get the generated all data back                
                rows = cur.fetchall()
                return rows if rows else []
                # commit the changes to the database
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        # Log the error for debugging purposes (you may implement logging)
        ic(f"Database error: {error}")
        return {"error": "An error occurred while fetching blogs. Please try again later."}, 500

