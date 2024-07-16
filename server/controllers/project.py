import psycopg2
from utils.db import connection
from psycopg2.extras import RealDictCursor
from icecream import ic

def create_project(users_id, account_id, image, project_name, description, category_id, skill_id, github, link, management_tool, progress, project_status, priority, tags_id):
    """ Create new account_id into  the acount table """
    sql = """INSERT INTO project (users_id, account_id, image, project_name, description, category_id, skill_id, github, link, management_tool, progress, project_status, priority, tags_id)
             VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING id;"""
    
    response = None

    try:
        with  connection as conn:
            with  conn.cursor() as cur:
                # execute the INSERT statement
                cur.execute(sql, (users_id, account_id, image, project_name, description, category_id, skill_id, github, link, management_tool, progress, project_status, priority, tags_id))
            
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
    # query = """SELECT project.*, project.id AS project_id, account.*, account.id AS account_id, status.id A FROM project JOIN account on account_id = account.id JOIN status O = status.id ORDER BY project_time;"""
    query = """SELECT project.*, project.id as project_id, topics.* FROM project JOIN account ON account_id = account.id JOIN topics ON tags_id = topics.id ORDER BY project_time;"""
    
    response = None

    try:
        with  connection as conn:
            with  conn.cursor(cursor_factory=RealDictCursor) as cur:
                # execute the INSERT statement
                cur.execute(query)

                # get the generated all data back                
                rows = cur.fetchall()
                ic()
                print(rows)
                if rows:
                    response = rows
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
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
    

def edit_project(users_id, project_name, description, category_id, github, link, management_tool):

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