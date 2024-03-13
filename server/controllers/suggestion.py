import psycopg2
from utils.db import connection
from psycopg2.extras import RealDictCursor

def create_suggestion(account_id, post, status_id, category_id, slug, suggestion_title):
    """ Create new account_id into  the acount table """

    sql = """INSERT INTO suggestion (account_id, post, status_id, category_id, slug, suggestion_title)
             VALUES(%s, %s, %s, %s, %s, %s) RETURNING id;"""
    
    response = None

    try:
        with  connection as conn:
            with  conn.cursor() as cur:
                # execute the INSERT statement
                cur.execute(sql, (account_id, post, status_id, category_id, slug, suggestion_title))

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
 
def create_suggestion_response(account_id, res, suggestion_id):
    """ Create new account_id into  the acount table """

    sql = """INSERT INTO suggestion_response (account_id, response, suggestion_id)
             VALUES(%s, %s, %s) RETURNING id;"""
    
    response = None

    try:
        with  connection as conn:
            with  conn.cursor() as cur:
                # execute the INSERT statement
                cur.execute(sql, (account_id, res, suggestion_id))

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

# fetch user
def fetch_suggestion(id):
    query = """SELECT * FROM suggestion WHERE id=%s"""
    
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
def fetch_suggestions():
    query = """SELECT * FROM suggestion JOIN account on account_id = account.id JOIN category on category_id = category.id JOIN status on status_id = status.id  ORDER BY suggestion_time;"""
    
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
def edit_suggestion(id, post, category_id, status_id):
    query = """UPDATE account SET (post=%s,category_id=%s,status_id=%s) WHERE id = %s RETURNING title
    ;"""
    
    response = None

    try:
        with  connection as conn:
            with  conn.cursor() as cur:
                # execute the UPDATE statement
                cur.execute(query, (post, category_id, status_id, int(id)))

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
def delete_suggestion(id):
    query = """DELETE FROM suggestion WHERE id=%s RETURNING id;"""
    
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