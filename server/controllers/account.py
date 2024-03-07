
import psycopg2
from utils.db import connection

def create_user(email, user_name, lastname, is_admin, is_staff, image, user_title):
    """ Create new account into the acount table """

    sql = """INSERT INTO account(email, user_name, lastname, is_admin, is_staff, image, user_title)
             VALUES(%s, %s, %s, %s, %s, %s, %s,) RETURNING account_id;"""
    
    user_id = None

    try:
        with  connection as conn:
            with  conn.cursor() as cur:
                # execute the INSERT statement
                cur.execute(sql, (email, user_name, lastname, is_admin, is_staff, image, user_title))

                # get the generated id back                
                rows = cur.fetchone()
                if rows:
                    user_id = rows[0]

                # commit the changes to the database
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)    
    finally:
        return user_id