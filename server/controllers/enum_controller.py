from psycopg2.extras import RealDictCursor
import psycopg2
from utils.db import connection
from controllers.account import get_current_user
from icecream import ic


def create_enum(name, value):

    try:
        """ Create new account into the acount table """
        sql = """ALTER TYPE enum_name 
            ADD VALUE [IF NOT EXISTS] %s;"""

        with  connection as conn:
            with  conn.cursor(cursor_factory=RealDictCursor) as cur:
                # execute the INSERT statement
                cur.execute(sql, (name, value))

                # get the generated id back                
                rows = cur.fetchone()
 
                return rows if rows else []

                # commit the changes to the database
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        # Log the error for debugging purposes (you may implement logging)
        ic(f"Database error: {error}")
        return {"error": "An error occurred while fetching blogs. Please try again later."}, 500

  

    
# fetch user
def fetch_blog_enum():
    query = """SELECT enum_range(null::blog_category);"""
    
    response = None

    try:
        with  connection as conn:
            with  conn.cursor(cursor_factory=RealDictCursor) as cur:
                # execute the UPDATE statement
                cur.execute(query,)

                # get the generated id back                
                rows = cur.fetchone()
                ic(rows)
                return rows if rows else []
                # commit the changes to the database
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        # Log the error for debugging purposes (you may implement logging)
        ic(f"Database error: {error}")
        return {"error": "An error occurred while fetching blogs. Please try again later."}, 500


     