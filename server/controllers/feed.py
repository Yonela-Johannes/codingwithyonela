import psycopg2                                                                                                                                                                       
from utils.db import connection
from psycopg2.extras import RealDictCursor
from slugify import slugify
from icecream import ic
from controllers.account import get_current_user

def create_feed(account_id, text, image, video, token):
    try:
        user = get_current_user(token=token)
        if "id" in user:
            
            slug = slugify(text)
            """ Create feed into the feed"""
            sql = """INSERT INTO feed (account_id, text, image, video, slug)
                    VALUES(%s, %s, %s, %s, %s) RETURNING id;"""
            
            response = None
            with  connection as conn:
                with  conn.cursor() as cur:
                    # execute the INSERT statement
                    cur.execute(sql, (account_id, text, image, video, slug))
                
                    rows = cur.fetchone()
                    if rows:
                        response = rows
                    conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)    
    finally:
        return response
 
# fetch user
def fetch_feed(id):
    query = """SELECT * FROM feed WHERE id=%s"""
    
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
def fetch_feeds():
    query = """SELECT *, feed.id as post_id FROM feed LEFT JOIN account ON account_id = account.id;"""
    
    response = None

    try:
        with  connection as conn:
            with  conn.cursor(cursor_factory=RealDictCursor) as cur:
                # execute the INSERT statement
                cur.execute(query)

                # get the generated all data back                
                rows = cur.fetchall()
                ic()
                ic(rows)
                if rows:
                    response = rows
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        response = error
    finally:
        return response


def edit_feed(title, text, account_id, feed_id):

    query = """UPDATE feed SET feed_title = %s,text = % = %s WHERE id = %s AND account_id = %s RETURNING feed_title
    ;"""
    
    response = None

    try:
        with  connection as conn:
            with  conn.cursor() as cur:

                cur.execute(query, (title, text, feed_id, account_id))            
                rows = cur.fetchone()
                if rows:
                    response = rows[0]
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        response = error
    finally:
        return response
    

def delete_feed(feed_id, account_id):
    print("ID ID: ", account_id)
    print("feed ID: ", feed_id)
    query = """DELETE FROM feed WHERE id = %s AND account_id = %s RETURNING id;"""
    
    response = None

    try:
        with  connection as conn:
            with  conn.cursor() as cur:

                cur.execute(query, (feed_id, account_id,) )
            
                rows = cur.fetchone()
                if rows:
                    response = rows[0]
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        response = error
    finally:
        return response
    
    
def create_feed_comment(account_id, comment, feed_id):
    """ Create feed into  the feed """
    print("ACCOUNT_ ID: ", account_id)
    print("COMMENT: ", comment)
    print("feed ID: ", feed_id)
    sql = """INSERT INTO feed_comment (account_id, comment, feed_id)
             VALUES(%s, %s, %s) RETURNING id;"""
    
    response = None

    try:
        with  connection as conn:
            with  conn.cursor() as cur:
                # execute the INSERT statement
                cur.execute(sql, (account_id, comment, feed_id))
            
                rows = cur.fetchone()
                if rows:
                    response = rows
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)    
    finally:
        return response

# fetch feed responses
def fetch_feed_comments(id):
    query = """SELECT feed_comment.*, feed_comment.id AS comment_id, account.email, account.username, account.lastname, account.is_admin, account.is_staff, account.profile, account.user_title_id, user_title.user_title FROM feed_comment JOIN account ON account_id = account.id JOIN user_title ON user_title_id = user_title.id WHERE feed_id=%s ;"""
    
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
