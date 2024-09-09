import psycopg2
from utils.db import connection
from psycopg2.extras import RealDictCursor
from icecream import ic

def create_task(project_id, account_id, task, description):
    """ Create new account_id into the acount table """
    sql = """INSERT INTO tasks (project_id, account_id, task, description)
             VALUES(%s, %s, %s, %s) RETURNING *;"""
             
    try:
        with  connection as conn:
            with  conn.cursor(cursor_factory=RealDictCursor) as cur:
                # execute the INSERT statement
                cur.execute(sql, (project_id, account_id, task, description))
            
                rows = cur.fetchone()
                return rows if rows else {}
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        # Log the error for debugging purposes (you may implement logging)
        ic(f"Database error: {error}")
        return {"error": "An error occurred while fetching blogs. Please try again later."}, 500

# fetch all projects
def fetch_projects():
    query = """SELECT project.*, project.id AS project_id, account.*, account.id AS account_id, status.id A, status.status FROM project JOIN account on account_id = account.id JOIN status O = status.id ORDER BY project_time;"""
    
    try:
        with  connection as conn:
            with  conn.cursor(cursor_factory=RealDictCursor) as cur:
                # execute the INSERT statement
                cur.execute(query)

                # get the generated all data back                
                rows = cur.fetchall()
                return rows if rows else []
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        # Log the error for debugging purposes (you may implement logging)
        ic(f"Database error: {error}")
        return {"error": "An error occurred while fetching blogs. Please try again later."}, 500


def fetch_task(project_id):
    
    query = """SELECT task, description, task_status, priority, project_id, created, tasks.id AS task_id, account.*, account.id as account_id, username, profile FROM tasks JOIN account on account_id = account.id WHERE project_id=%s"""
    try:
        with  connection as conn:
            with  conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(query, (project_id,))            
                rows = cur.fetchall()
                ic(rows)
                return rows if rows else []
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        # Log the error for debugging purposes (you may implement logging)
        ic(f"Database error: {error}")
        return {"error": "An error occurred while fetching blogs. Please try again later."}, 500

def edit_task(account_id, task_id, status, priority):
    query = """UPDATE tasks SET task_status = %s, priority = %s  WHERE id = %s AND account_id = %s RETURNING *
    ;"""
    
    try:
        with  connection as conn:
            with  conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("""SELECT * FROM tasks WHERE id = %s and account_id = %s;""", (task_id, account_id))

                row =  cur.fetchone()
                
                if row:
                    if status == None:
                        status = row['task_status']
                    if priority == None:
                        priority = row['priority']
                        
                cur.execute(query, (status, priority, task_id, account_id))            
                rows = cur.fetchone()
                
                return rows if rows else []
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        # Log the error for debugging purposes (you may implement logging)
        ic(f"Database error: {error}")
        return {"error": "An error occurred while fetching blogs. Please try again later."}, 500


def delete_task(task_id, account_id):
    query = """DELETE FROM tasks WHERE id = %s AND account_id = %s RETURNING id;"""
    
    response = None

    try:
        with  connection as conn:
            with  conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(query, (task_id, account_id,))
                rows = cur.fetchone()
                return rows if rows else {}
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        # Log the error for debugging purposes (you may implement logging)
        ic(f"Database error: {error}")
        return {"error": "An error occurred while fetching blogs. Please try again later."}, 500
