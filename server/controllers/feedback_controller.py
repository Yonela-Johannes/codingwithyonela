import psycopg2
from utils.db import connection
from psycopg2.extras import RealDictCursor
from controllers.account import get_current_user
from icecream import ic

def create_feedback(name, lastname, email, company, image, message, rating):
    try:
        sql = """INSERT INTO feedback (name, lastname, email, company, image, message, rating)
                VALUES(%s, %s, %s, %s, %s, %s, %s) RETURNING *;"""
        
        response = None
        with  connection as conn:
            with  conn.cursor(cursor_factory=RealDictCursor) as cur:
                # execute the INSERT statement
                cur.execute(sql, (name, lastname, email, company, image, message, rating))

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
def fetch_feedback(id):
    query = """SELECT * FROM recommendation WHERE id=%s"""
    
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
def fetch_all_feedback():
    query = """SELECT * FROM feedback;"""
    
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
        ic(error)
        response = error
    finally:
        return response

# update recommendation
def edit_feedback(account_id, name, second_name, lastname, re_image, github, linkedin, email, portfolio, quote, status_id, title_id, country_id, id):
    query = """UPDATE recommendation SET (account_id=%s,name=%s,second_name=%s,lastname=%s,re_image=%s, github=%s, linkedin=%s, email=%s, portfolio=%s,quote=%s,status_id=%s, title_id=%s, country_id=%s) WHERE id = %s RETURNING title
    ;"""

# update recommendation status
def edit_feedback_status(status, feedback_id):
    query = """UPDATE feedback SET status=%s WHERE id=%s RETURNING *
    ;"""
    
    response = None

    try:
        with  connection as conn:
            with  conn.cursor(cursor_factory=RealDictCursor) as cur:
                # execute the UPDATE statement
                cur.execute(query, (status, feedback_id))

                # get the generated id back                
                rows = cur.fetchone()
                if rows:
                    response = rows
                # commit the changes to the database
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        ic(error)
        response = error
    finally:
        return response