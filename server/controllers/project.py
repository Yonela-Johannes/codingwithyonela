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
                if rows:
                    response = rows
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)    
    finally:
        return response

def create_project(user_ids, account_id, project_name, image, description, project_status, category_id, github, link, progress, priority, topic_ids):
    response = None
    try:
        with  connection as conn:
            with  conn.cursor(cursor_factory=RealDictCursor) as cur:
                """ Create new project into  the acount table """
                cur.execute("""INSERT INTO project (account_id, project_name, image, description, project_status, priority, github, link, progress, user_ids, topic_id)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                
                RETURNING id""",(account_id, project_name, image, description, project_status, priority, github, link, progress, user_ids, topic_ids))
                
                rows = cur.fetchone()
                if rows:
                    response = rows
                else:
                    response = None
                conn.commit()
                
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)    
    finally:
        return response
    
# fetch all users
def fetch_projects():
    # query = """SELECT project.*, project.id AS project_id, account.*, account.id AS account_id, status.id A FROM project JOIN account on account_id = account.id JOIN status O = status.id ORDER BY project_time;"""
    query = """SELECT project.*, project.id as project_id, topics.name as tag_name, account.* FROM public.project JOIN topics on topic_id = topics.id JOIN account on account_id = account.id ORDER BY project.id ASC """
    
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
        ic(error)
        response = error
    finally:
        return response

def fetch_project(id):

    query = """SELECT project.*, project.id AS project_id, account.*, account.id AS account_id, status.id A, status.status FROM project JOIN account on account_id = account.id JOIN status O = status.id WHERE project.id=%s"""

    response = None

    try:
        with  connection as conn:
            with  conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(query, (id,))            
                rows = cur.fetchone()
                if rows:
                    response = rows
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        response = error
    finally:
        return response
    

def edit_project(user_ids, project_id, project_status, project_name, description, github, link, priority, topic_id, progress):

    ic(user_ids)
    

    query = """UPDATE project SET user_ids = %s, project_status = %s, project_name = %s, description = %s, github = %s, link = %s, priority = %s, topic_id = %s, progress = %s WHERE id = %s RETURNING project.*;"""
    
    response = None
    
    try:
        with  connection as conn:
            with  conn.cursor(cursor_factory=RealDictCursor) as cur:

                cur.execute("""SELECT * FROM project WHERE id = %s and user_ids = %s;""", (project_id, user_ids))
                
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
                    if user_ids == None:
                        user_ids = row['user_ids']
                    if progress == None:
                        progress = row['progress']
                    if topic_id == None:
                        topic_id = row['topic_id']
                
                cur.execute(query, (user_ids, project_status, project_name, description, github, link, priority, topic_id, progress, project_id))            
                rows = cur.fetchone()
                if rows:
                    response = rows
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        response = error
    finally:
        return response
    

def delete_project(project_id, account_id):
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
    
    
def create_project_chat(account_id, message, project_id):
    """ Create new account_id into  the acount table """
    sql = """INSERT INTO project_chat (account_id, message, project_id)
             VALUES(%s, %s, %s) RETURNING id;"""
    
    response = None

    try:
        with  connection as conn:
            with  conn.cursor() as cur:
                # execute the INSERT statement
                cur.execute(sql, (account_id, message, project_id))
            
                rows = cur.fetchone()
                if rows:
                    response = rows
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)    
    finally:
        return response
    
    
# fetch suggestion responses
def fetch_projects_chats(id):
    query = """SELECT project_chat.*, project_chat.id AS chat_id, account.email, account.username, account.lastname, account.is_admin, account.is_staff, account.profile, account.user_title_id, user_title.user_title FROM project_chat JOIN account ON account_id = account.id JOIN user_title ON user_title_id = user_title.id WHERE project_id=%s ;"""
    
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
    

def project_like(account_id, project_id):
    """ Create new account_id into  the acount table """

    sql = """INSERT INTO project_like (account_id)
             VALUES(%s) WHERE id = %s RETURNING id;"""
    
    response = None

    try:
        with  connection as conn:
            with  conn.cursor() as cur:
                # execute the INSERT statement
                cur.execute(sql, (account_id, project_id))
            
                rows = cur.fetchone()
                if rows:
                    response = rows
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)    
    finally:
        return response