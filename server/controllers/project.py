import psycopg2
from flask import jsonify
from utils.db import connection
from psycopg2.extras import RealDictCursor
from icecream import ic

def add_users(users_id):
    """ Insert users in to project table """
    sql = """UPDATE project SET users_id = (SELECT array_agg(users_id ORDER BY username) FROM account GROUP BY username) WHERE id = %s"""
    
    response = None

    try:
        with  connection as conn:
            with  conn.cursor() as cur:
                # execute the INSERT statement
                cur.execute(sql, (users_id))
            
                rows = cur.fetchone()
                return rows if rows else {}
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        # Log the error for debugging purposes (you may implement logging)
        ic(f"Database error: {error}")
        return {"error": "An error occurred while fetching blogs. Please try again later."}, 500
    
def create_project( account_id, project_name, image, description, github, link, tags, team, manager, due_date):
    response = None
    try:
        with  connection as conn:
            with  conn.cursor(cursor_factory=RealDictCursor) as cur:
                """ Create new project into  the acount table """
                cur.execute("""INSERT INTO project (account_id, project_name, image, description, github, link, tags, team, manager, due_date)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                
                RETURNING id""",(account_id, project_name, image, description, github, link, tags, team, manager, due_date))
                
                rows = cur.fetchone()
                return rows if rows else {}
                conn.commit()
                
    except (Exception, psycopg2.DatabaseError) as error:
        # Log the error for debugging purposes (you may implement logging)
        ic(f"Database error: {error}")
        return {"error": "An error occurred while fetching blogs. Please try again later."}, 500
    
# fetch all projects
def fetch_projects():
    # query = """SELECT project.*, project.id AS project_id, account.*, account.id AS account_id, status.id A FROM project JOIN account on account_id = account.id JOIN status O = status.id ORDER BY project_time;"""
    query = """SELECT project.*, project.id as project_id, account.* FROM project JOIN account on account_id = account.id ORDER BY project.id ASC """

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

def fetch_project(id):

    query = """SELECT project.*, project.id as project_id, account.*, account.id as account_id FROM project JOIN account on account_id = account.id WHERE project.id=%s"""

    try:
        with  connection as conn:
            with  conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(query, (id,))            
                rows = cur.fetchone()
                return rows if rows else {}
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        # Log the error for debugging purposes (you may implement logging)
        ic(f"Database error: {error}")
        return {"error": "An error occurred while fetching blogs. Please try again later."}, 500

def edit_project(user_id, project_id, project_status, project_name, description, github, link, priority, topic_id):

    query = """UPDATE project SET account_id = %s, project_status = %s, project_name = %s, description = %s, github = %s, link = %s, priority = %s, topic_id = %s WHERE id = %s RETURNING project.*;"""
    
    try:
        with  connection as conn:
            with  conn.cursor(cursor_factory=RealDictCursor) as cur:

                cur.execute("""SELECT * FROM project WHERE id = %s and account_id = %s;""", (project_id, user_id))
                
                row =  cur.fetchone()
                
                if row:
                    if project_status == None:
                        project_status = row['project_status']
                    if project_name == None:
                        project_name = row['project_name']
                    if description == None:
                        description = row['description']
                    if github == None:
                        github = row['github']
                    if link == None:
                        link = row['link']
                    if priority == None:
                        priority = row['priority']
                    if topic_id == None:
                        topic_id = row['topic_id']
                
                cur.execute(query, (user_id, project_status, project_name, description, github, link, priority, topic_id, project_id))            
                rows = cur.fetchone()
                return rows if rows else {}
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        # Log the error for debugging purposes (you may implement logging)
        ic(f"Database error: {error}")
        return {"error": "An error occurred while fetching blogs. Please try again later."}, 500

def delete_project(project_id, account_id):

    query = """DELETE FROM project WHERE id = %s AND account_id = %s RETURNING id;"""

    try:
        with  connection as conn:
            with  conn.cursor(cursor_factory=RealDictCursor) as cur:

                cur.execute(query, (project_id, account_id))
            
                rows = cur.fetchone()
                return rows if rows else {}
                conn.commit()
                
    except (Exception, psycopg2.DatabaseError) as error:
        # Log the error for debugging purposes (you may implement logging)
        ic(f"Database error: {error}")
        return {"error": "An error occurred while fetching blogs. Please try again later."}, 500

def create_project_chat(account_id, message, project_id):
    """ Create new account_id into  the acount table """
    sql = """INSERT INTO project_chat (account_id, message, project_id)
             VALUES(%s, %s, %s) RETURNING id;"""

    try:
        with  connection as conn:
            with  conn.cursor(cursor_factory=RealDictCursor) as cur:
                # execute the INSERT statement
                cur.execute(sql, (account_id, message, project_id))
            
                rows = cur.fetchone()
                return rows if rows else {}
                conn.commit()
                
    except (Exception, psycopg2.DatabaseError) as error:
        # Log the error for debugging purposes (you may implement logging)
        ic(f"Database error: {error}")
        return {"error": "An error occurred while fetching blogs. Please try again later."}, 500
    
# fetch suggestion responses
def fetch_projects_chats(id):
    query = """SELECT project_chat.*, project_chat.id AS chat_id, account.email, account.username, account.lastname, account.is_admin, account.is_staff, account.profile FROM project_chat JOIN account ON account_id = account.id  WHERE project_id=%s ;"""

    try:
        with  connection as conn:
            with  conn.cursor(cursor_factory=RealDictCursor) as cur:

                cur.execute(query, (int(id), ))
            
                rows = cur.fetchall()
                return rows if rows else []
                conn.commit()
                
    except (Exception, psycopg2.DatabaseError) as error:
        # Log the error for debugging purposes (you may implement logging)
        ic(f"Database error: {error}")
        return {"error": "An error occurred while fetching blogs. Please try again later."}, 500

def project_like(account_id, project_id):
    """ Create new account_id into  the acount table """

    sql = """INSERT INTO project_like (account_id)
             VALUES(%s) WHERE id = %s RETURNING id;"""
             
    try:
        with  connection as conn:
            with  conn.cursor() as cur:
                # execute the INSERT statement
                cur.execute(sql, (account_id, project_id))
            
                rows = cur.fetchone()
                return rows if rows else {}
                conn.commit()
                
    except (Exception, psycopg2.DatabaseError) as error:
        # Log the error for debugging purposes (you may implement logging)
        ic(f"Database error: {error}")
        return {"error": "An error occurred while fetching blogs. Please try again later."}, 500
    
