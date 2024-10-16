from psycopg2.extras import RealDictCursor
import psycopg2
from utils.db import connection
from controllers.account import get_current_user
from icecream import ic

def create_note(account, title, content, tags, slug):
    try:
        """ Create new task into the acount table """
        sql = """INSERT INTO note (account_id, title, content, tags, slug)
                VALUES(%s, %s, %s, %s, %s) RETURNING id;"""
        
        with  connection as conn:
            with  conn.cursor(cursor_factory=RealDictCursor) as cur:
                # execute the INSERT statement
                cur.execute(sql, (account, title, content, tags, slug))

                # get the generated id back                
                rows = cur.fetchone()
 
                return rows if rows else []

                # commit the changes to the database
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        # Log the error for debugging purposes (you may implement logging)
        ic(f"Database error: {error}")
        return {"error": "An error occurred while fetching blogs. Please try again later."}, 500
    
# fetch note
def fetch_note(slug):
    query = """SELECT note.*, note.id AS blog_id, account.*, account.id AS account_id FROM note JOIN account on account = account.id WHERE slug=%s"""

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

# fetch all notes
def fetch_notes():
    query = """SELECT note.*, note.id AS note_id, account.*, account.id AS account_id FROM note JOIN account on account_id = account.id ORDER BY is_pinned = true DESC, note.id DESC;"""
    
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

# update note
def edit_note(title, content, tags, slug, id):
    ic(id)
    sql = """SELECT * FROM note WHERE id=%s
    ;"""
    
    query = """UPDATE note
        SET title=%s, content=%s, tags=%s, slug=%s
        WHERE id = %s
        RETURNING title
    ;"""

    try:
        with  connection as conn:
            with  conn.cursor(cursor_factory=RealDictCursor) as cur:
                # execute the UPDATE statement
                cur.execute(sql, (id,))
                row = cur.fetchone()
                if title == '': title = row.get('title')
                if content == '': content = row.get('content')
                if tags == '': tags = row.get('tags')
                if slug == '': slug = row.get('slug')
                
                cur.execute(query, (title, content, tags, slug, id))
                
                # get the generated id back                
                rows = cur.fetchone()
                return rows if rows else {}[0]

                # commit the changes to the database
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        # Log the error for debugging purposes (you may implement logging)
        ic(f"Database error: {error}")
        return {"error": "An error occurred while fetching blogs. Please try again later."}, 500

# delete note
def delete_note(id):
    query = """DELETE FROM note WHERE id=%s RETURNING id;"""
    
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


# pin note
def pin_note(id, pin):

    query = """UPDATE note
        SET is_pinned=%s
        WHERE id = %s
        RETURNING title
    ;"""

    try:
        with  connection as conn:
            with  conn.cursor(cursor_factory=RealDictCursor) as cur:
                # execute the UPDATE statement                
                cur.execute(query, (pin, id))
                
                # get the generated id back                
                rows = cur.fetchone()
                return rows if rows else {}[0]

                # commit the changes to the database
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        # Log the error for debugging purposes (you may implement logging)
        ic(f"Database error: {error}")
        return {"error": "An error occurred while fetching blogs. Please try again later."}, 500
