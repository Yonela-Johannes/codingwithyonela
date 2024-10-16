from psycopg2.extras import RealDictCursor
import psycopg2
from utils.db import connection
from controllers.account import get_current_user
from icecream import ic

def create_blog(account, post, blog_image, blog_title, slug, category):

    try:
        """ Create new account into the acount table """
        sql = """INSERT INTO blog (account, post, blog_image, blog_title, slug, category)
                VALUES(%s, %s, %s, %s, %s, %s) RETURNING id;"""
        
        with  connection as conn:
            with  conn.cursor(cursor_factory=RealDictCursor) as cur:
                # execute the INSERT statement
                cur.execute(sql, (account, post, blog_image, blog_title, slug, category))

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
def fetch_blog(slug):
    query = """SELECT blog.*, blog.id AS blog_id, account.*, account.id AS account_id FROM blog JOIN account on account = account.id WHERE slug=%s"""

    try:
        with  connection as conn:
            with  conn.cursor(cursor_factory=RealDictCursor) as cur:
                # execute the UPDATE statement
                cur.execute(query, (slug,))

                # get the generated id back                
                rows = cur.fetchone()
                ic(rows)
                return rows if rows else {}

                # commit the changes to the database
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        # Log the error for debugging purposes (you may implement logging)
        ic(f"Database error: {error}")
        return {"error": "An error occurred while fetching blogs. Please try again later."}, 500

# fetch all users
def fetch_blogs():
    query = """SELECT blog.*, blog.id AS blog_id, account.*, account.id AS account_id FROM blog JOIN account on account = account.id ORDER BY blog_time DESC;"""
    
    try:
        with  connection as conn:
            with  conn.cursor(cursor_factory=RealDictCursor) as cur:
                # execute the INSERT statement
                cur.execute(query)

                # get the generated all data back                
                rows = cur.fetchall()
                return rows if rows else []
                # commit the changes to the database
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        # Log the error for debugging purposes (you may implement logging)
        ic(f"Database error: {error}")
        return {"error": "An error occurred while fetching blogs. Please try again later."}, 500

# update user
def edit_blog(id, post, category_id, blog_image):
    query = """UPDATE account SET (post=%s,category_id=%s,blog_image=%s) WHERE id = %s RETURNING title
    ;"""

    try:
        with  connection as conn:
            with  conn.cursor() as cur:
                # execute the UPDATE statement
                cur.execute(query, (post, category_id, blog_image, int(id)))

                # get the generated id back                
                rows = cur.fetchone()
                return rows if rows else {}[0]

                # commit the changes to the database
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        # Log the error for debugging purposes (you may implement logging)
        ic(f"Database error: {error}")
        return {"error": "An error occurred while fetching blogs. Please try again later."}, 500

# update user
def delete_blog(id):
    query = """DELETE FROM blog WHERE id=%s RETURNING id;"""
    
    try:
        with  connection as conn:
            with  conn.cursor() as cur:
                # execute the UPDATE statement
                cur.execute(query, (int(id), ))

                # get the generated id back                
                rows = cur.fetchone()
                return rows if rows else {}[0]

                # commit the changes to the database
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        # Log the error for debugging purposes (you may implement logging)
        ic(f"Database error: {error}")
        return {"error": "An error occurred while fetching blogs. Please try again later."}, 500

# fetch all users
def fetch_blog_comments(id):
    query = """SELECT blog_comment.*, blog_comment.id AS blog_comment_id, account.*, account.id AS account_id FROM blog_comment JOIN account on account_id = account.id WHERE blog_id = %s ORDER BY comment_time DESC;"""

    try:
        with  connection as conn:
            with  conn.cursor(cursor_factory=RealDictCursor) as cur:
                # execute the INSERT statement
                cur.execute(query, (id,))

                # get the generated all data back                
                rows = cur.fetchall()
                return rows if rows else []
                # commit the changes to the database
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        # Log the error for debugging purposes (you may implement logging)
        ic(f"Database error: {error}")
        return {"error": "An error occurred while fetching blogs. Please try again later."}, 500

    
def create_blog_comment(account_id, comment, blog_id):
    """ Create new account into the acount table """
    sql = """INSERT INTO blog_comment (account_id, comment, blog_id)
             VALUES(%s, %s, %s) RETURNING id;"""
    
    try:
        with  connection as conn:
            with  conn.cursor(cursor_factory=RealDictCursor) as cur:
                # execute the INSERT statement
                cur.execute(sql, (account_id, comment, blog_id))

                # get the generated id back                
                rows = cur.fetchone()
                return rows if rows else {}

                # commit the changes to the database
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        # Log the error for debugging purposes (you may implement logging)
        ic(f"Database error: {error}")
        return {"error": "An error occurred while fetching blogs. Please try again later."}, 500
    
