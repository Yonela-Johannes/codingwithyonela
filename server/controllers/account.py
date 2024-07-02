import json
import psycopg2
from psycopg2.extras import RealDictCursor
from utils.db import connection

def create_user(email, username, lastname, is_admin, is_staff, user_title_id):
    print("USER TTILE: ", user_title_id)
    """ Create new account into the acount table """

    sql = """INSERT INTO account(email, username, lastname, is_admin, is_staff, user_title_id)
             VALUES(%s, %s, %s, %s, %s, %s, %s) RETURNING id, username, email, lastname, is_staff, user_title_id;"""
    
    response = None

    try:
        with  connection as conn:
            with  conn.cursor(cursor_factory=RealDictCursor) as cur:
                # execute the INSERT statement
                cur.execute(sql, (email, username, lastname, is_admin, is_staff, int(user_title_id)))

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
    query = """SELECT * FROM account WHERE id=%s"""
    
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