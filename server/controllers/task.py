import psycopg2
from utils.db import connection
from psycopg2.extras import RealDictCursor
from icecream import ic

def create_task(project_id, account_id, task, status, priority, description):
    """ Create new account_id into the acount table """
    sql = """INSERT INTO tasks (project_id, account_id, task, status, priority, description)
             VALUES(%s, %s, %s, %s, %s, %s) RETURNING *;"""
    
    response = None

    try:
        with  connection as conn:
            with  conn.cursor() as cur:
                # execute the INSERT statement
                cur.execute(sql, (project_id, account_id, task, status, priority, description))
            
                rows = cur.fetchone()
                if rows:
                    response = rows
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)    
    finally:
        return response
    
# fetch all users
def fetch_projects():
    query = """SELECT project.*, project.id AS project_id, account.*, account.id AS account_id, status.id A, status.status FROM project JOIN account on account_id = account.id JOIN status O = status.id ORDER BY project_time;"""
    
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

def fetch_task(project_id):
    
    query = """SELECT * FROM tasks WHERE project_id=%s"""
    response = None
    try:
        with  connection as conn:
            with  conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(query, (project_id,))            
                rows = cur.fetchall()
                ic(rows)
                if rows:
                    response = rows
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        ic(error)
        response = error
    finally:
        return response
    

def edit_task(users_id, project_name, description, category_id, github, link, management_tool):

    query = """UPDATE project SET users_id = %s, project_name = %s, description = %s = %s, category_id = %s, github = %s, link = %s, management_tool = %s  WHERE id = %s AND account_id = %s RETURNING suggestion_title
    ;"""
    
    response = None

    try:
        with  connection as conn:
            with  conn.cursor() as cur:

                cur.execute(query, (users_id, project_name, description, category_id, github, link, management_tool))            
                rows = cur.fetchone()
                if rows:
                    response = rows[0]
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        response = error
    finally:
        return response

def delete_task(project_id, account_id):
    print("ID ID: ", account_id)
    print("SUGGESTION ID: ", project_id)
    query = """DELETE FROM projects WHERE id = %s AND account_id = %s RETURNING id;"""
    
    response = None

    try:
        with  connection as conn:
            with  conn.cursor() as cur:

                cur.execute(query, (project_id, account_id,) )
            
                rows = cur.fetchone()
                if rows:
                    response = rows[0]
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        response = error
    finally:
        return response