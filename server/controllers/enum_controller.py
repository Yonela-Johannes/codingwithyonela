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
        
        response = None
        with  connection as conn:
            with  conn.cursor(cursor_factory=RealDictCursor) as cur:
                # execute the INSERT statement
                cur.execute(sql, (name, value))

                # get the generated id back                
                rows = cur.fetchone()
 
                if rows:
                    response = rows

                # commit the changes to the database
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        ic(error)
        print(error)    
    finally:
        return response
    
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
                if rows:
                    response = rows
                # commit the changes to the database
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        response = error
    finally:
        return response
     