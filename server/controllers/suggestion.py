import psycopg2
from utils.db import connection
from psycopg2.extras import RealDictCursor
from controllers.account import get_current_user

def create_suggestion(account_id, post, category_id, slug, suggestion_title, token):
    try:
        user = get_current_user(token=token)
        if "id" in user:
            """ Create new account_id into  the acount table """
            sql = """INSERT INTO suggestion (account_id, post, category_id, slug, suggestion_title)
                    VALUES(%s, %s, %s, %s, %s) RETURNING id;"""
            
            response = None

            with  connection as conn:
                with  conn.cursor() as cur:
                    # execute the INSERT statement
                    cur.execute(sql, (account_id, post, category_id, slug, suggestion_title))
                
                    rows = cur.fetchone()
                    if rows:
                        response = rows
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
            
                rows = cur.fetchone()
                if rows:
                    response = rows
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

                cur.execute(query, (int(id), ))
            
                rows = cur.fetchone()
                if rows:
                    response = rows
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        response = error
    finally:
        return response
    
# fetch all users
def fetch_suggestions():
    query = """SELECT suggestion.*, suggestion.id AS suggestion_id, account.*, account.id AS account_id FROM suggestion JOIN account on account_id = account.id JOIN category on category_id = category.id JOIN status on status_id = status.id  ORDER BY suggestion_time;"""
    
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
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        response = error
    finally:
        return response


# fetch suggestion responses
def fetch_suggestion_response(id):
    query = """SELECT suggestion_response.*, suggestion_response.id AS response_id, account.email, account.username, account.lastname, account.is_admin, account.is_staff, account.profile, account.user_title_id, user_title.user_title FROM suggestion_response JOIN account ON account_id = account.id JOIN user_title ON user_title_id = user_title.id WHERE suggestion_id=%s ;"""
    
    response = None

    try:
        with  connection as conn:
            with  conn.cursor(cursor_factory=RealDictCursor) as cur:

                cur.execute(query, (int(id), ))
            
                rows = cur.fetchall()
                if rows:
                    response = rows
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        response = error
    finally:
        return response

def edit_suggestion(title, post, category_id, account_id, suggestion_id):

    query = """UPDATE suggestion SET suggestion_title = %s,post = %s,category_id = %s WHERE id = %s AND account_id = %s RETURNING suggestion_title
    ;"""
    
    response = None

    try:
        with  connection as conn:
            with  conn.cursor() as cur:

                cur.execute(query, (title, post, category_id, suggestion_id, account_id))            
                rows = cur.fetchone()
                if rows:
                    response = rows[0]
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        response = error
    finally:
        return response
    

def delete_suggestion(suggestion_id, account_id):
    print("ID ID: ", account_id)
    print("SUGGESTION ID: ", suggestion_id)
    query = """DELETE FROM suggestion WHERE id = %s AND account_id = %s RETURNING id;"""
    
    response = None

    try:
        with  connection as conn:
            with  conn.cursor() as cur:

                cur.execute(query, (suggestion_id, account_id,) )
            
                rows = cur.fetchone()
                if rows:
                    response = rows[0]
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        response = error
    finally:
        return response
    
    
def create_suggestion_comment(account_id, comment, suggestion_id):
    """ Create new account_id into  the acount table """
    print("ACCOUNT_ ID: ", account_id)
    print("COMMENT: ", comment)
    print("SUGGESTION ID: ", suggestion_id)
    sql = """INSERT INTO suggestion_comment (account_id, comment, suggestion_id)
             VALUES(%s, %s, %s) RETURNING id;"""
    
    response = None

    try:
        with  connection as conn:
            with  conn.cursor() as cur:
                # execute the INSERT statement
                cur.execute(sql, (account_id, comment, suggestion_id))
            
                rows = cur.fetchone()
                if rows:
                    response = rows
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)    
    finally:
        return response

# fetch suggestion responses
def fetch_suggestion_comments(id):
    query = """SELECT suggestion_comment.*, suggestion_comment.id AS comment_id, account.email, account.username, account.lastname, account.is_admin, account.is_staff, account.profile, account.user_title_id, user_title.user_title FROM suggestion_comment JOIN account ON account_id = account.id JOIN user_title ON user_title_id = user_title.id WHERE suggestion_id=%s ;"""
    
    response = None

    try:
        with  connection as conn:
            with  conn.cursor(cursor_factory=RealDictCursor) as cur:

                cur.execute(query, (int(id), ))
            
                rows = cur.fetchall()
                if rows:
                    response = rows
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        response = error
    finally:
        return response
