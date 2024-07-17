from psycopg2.extras import RealDictCursor
import psycopg2
from utils.db import connection
from controllers.account import get_current_user

def create_blog(account, post, category_id, blog_image, blog_title, slug, token):
    
    try:
        user = get_current_user(token=token)
        if "id" in user:
            """ Create new account into the acount table """
            sql = """INSERT INTO blog (account, post, category_id, blog_image, blog_title, slug)
                    VALUES(%s, %s, %s, %s, %s, %s) RETURNING id;"""
            
            response = None
            with  connection as conn:
                with  conn.cursor(cursor_factory=RealDictCursor) as cur:
                    # execute the INSERT statement
                    cur.execute(sql, (account, post, category_id, blog_image, blog_title, slug))

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
def fetch_blog(id):
    query = """SELECT * FROM blog WHERE id=%s"""
    
    response = None

    try:
        with  connection as conn:
            with  conn.cursor(cursor_factory=RealDictCursor) as cur:
                # execute the UPDATE statement
                cur.execute(query, (id,))

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
def fetch_blogs():
    query = """SELECT blog.*, blog.id AS blog_id, category.*, account.*, account.id AS account_id, user_title.user_title AS title FROM blog JOIN account on account = account.id JOIN category on category_id = category.id JOIN user_title on user_title_id = user_title.id ORDER BY blog_time;"""
    
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
def edit_blog(id, post, category_id, blog_image):
    query = """UPDATE account SET (post=%s,category_id=%s,blog_image=%s) WHERE id = %s RETURNING title
    ;"""
    
    response = None

    try:
        with  connection as conn:
            with  conn.cursor() as cur:
                # execute the UPDATE statement
                cur.execute(query, (post, category_id, blog_image, int(id)))

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
def delete_blog(id):
    query = """DELETE FROM blog WHERE id=%s RETURNING id;"""
    
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
    
# fetch all users
def fetch_blog_comments(id):
    print("ID: INSIDE")
    print("ID: ", id)
    query = """SELECT blog_comment.*, blog_comment.id AS blog_comment_id, account.*, account.id AS account_id FROM blog_comment JOIN account on account_id = account.id WHERE blog_id = %s;"""
    response = None

    try:
        with  connection as conn:
            with  conn.cursor(cursor_factory=RealDictCursor) as cur:
                # execute the INSERT statement
                cur.execute(query, (id,))

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
    
def create_blog_comment(account_id, comment, blog_id):
    """ Create new account into the acount table """
    sql = """INSERT INTO blog_comment (account_id, comment, blog_id)
             VALUES(%s, %s, %s) RETURNING id;"""
    
    response = None

    try:
        with  connection as conn:
            with  conn.cursor(cursor_factory=RealDictCursor) as cur:
                # execute the INSERT statement
                cur.execute(sql, (account_id, comment, blog_id))

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