import psycopg2
from utils.db import connection

def create_title(title):
    query = """INSERT INTO user_title(title)
             VALUES(%s) RETURNING title;"""
    
    response = None

    try:
        with  connection as conn:
            with  conn.cursor() as cur:
                # execute the INSERT statement
                cur.execute(query, (title,))

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
    
def fetch_titles():
    query = """SELECT * FROM user_title( RETURNING id, title ORDER BY id, title;"""
    
    response = None

    try:
        with  connection as conn:
            with  conn.cursor() as cur:
                # execute the INSERT statement
                cur.execute(query)

                # get the generated id back                
                rows = cur.fetchone()
                print("ROWS: ==> ", rows)
                if rows:
                    response = rows[0]

                # commit the changes to the database
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        response = error
    finally:
        return response