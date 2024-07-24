
import os
import psycopg2
from dotenv import load_dotenv
from icecream import ic

load_dotenv()

DATABASE = os.getenv('DATABASE')
DATABASE_USER = os.getenv('DATABASE_USER')
HOST = os.getenv('HOST')
PASSWORD = os.getenv('PASSWORD')
PORT = os.getenv('PORT')

connection = psycopg2.connect(
    database = DATABASE, 
    user = DATABASE_USER, 
    host= HOST,
    password = PASSWORD,
    port = PORT)

def create_tables():
    """ Create tables in the PostgreSQL database"""
    commands = (
        # QUOTES TABLE/SCHEMA
        """
        CREATE TABLE IF NOT EXISTS quotes (
            id SERIAL PRIMARY KEY,
            quote TEXT UNIQUE NOT NULL,
            author VARCHAR(70) NOT NULL
        );
        """,
        # TOPICS TABLE/SCHEMA
        """
        CREATE TABLE IF NOT EXISTS topics (
            id SERIAL PRIMARY KEY,
            name VARCHAR(70) UNIQUE NOT NULL
        );
        """,
        # COUNTRIES TABLE/SCHEMA
        """
        CREATE TABLE IF NOT EXISTS countries (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) UNIQUE NOT NULL,
            code VARCHAR(255) NOT NULL,
            emoji TEXT NOT NULL,
            unicode TEXT NOT NULL,
            image TEXT NOT NULL
        );
        """,
        # USER TITLE TABLE/SCHEMA
        """
        CREATE TABLE IF NOT EXISTS user_title (
            id SERIAL PRIMARY KEY,
            user_title VARCHAR(50) UNIQUE NOT NULL,
            description TEXT NOT NULL,
            skills TEXT NOT NULL
        );
        """,
        # USER TABLE/SCHEMA
        """
        CREATE TABLE IF NOT EXISTS account (
            id SERIAL PRIMARY KEY,
            email VARCHAR(50) UNIQUE NOT NULL,
            firstname VARCHAR(20) NOT NULL,
            username VARCHAR(20),
            lastname VARCHAR(20),
            is_admin BOOLEAN NOT NULL DEFAULT false,
            is_staff BOOLEAN NOT NULL DEFAULT false,
            profile TEXT,
            profile_id TEXT,
            password TEXT,
            github_username TEXT,
            user_title_id INTEGER,
            FOREIGN KEY (user_title_id)
            REFERENCES user_title (id)
            ON UPDATE CASCADE ON DELETE CASCADE
        );
        """,
        # CATEGORY TABLE/SCHEMA
        """
        CREATE TABLE IF NOT EXISTS category (
            id SERIAL PRIMARY KEY,
            category VARCHAR(50) NOT NULL,
            account_id INTEGER NOT NULL,
            FOREIGN KEY (account_id)
            REFERENCES account (id)
            ON UPDATE CASCADE ON DELETE CASCADE
        )
        """,
        # BLOG TABLE/SCHEMA
        """
        CREATE TABLE IF NOT EXISTS blog (
            id SERIAL PRIMARY KEY,
            account INTEGER NOT NULL,
            post Text NOT NULL,
            slug VARCHAR(250) UNIQUE NOT NULL,
            blog_image Text NOT NULL,
            blog_title VARCHAR(200) UNIQUE NOT NULL,
            category_id INTEGER NOT NULL,
            blog_time DATE NOT NULL DEFAULT CURRENT_DATE,
            FOREIGN KEY (account)
            REFERENCES account (id)
            ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY (category_id)
            REFERENCES category (id)
            ON UPDATE CASCADE ON DELETE CASCADE      
        )
        """,
        # START OF BLOG RESPONSE SCHEMA LIMIT 1
        """
        CREATE TABLE IF NOT EXISTS blog_response (
            id SERIAL PRIMARY KEY,
            account_id INTEGER NOT NULL,
            response Text NOT NULL,
            blog_id INTEGER NOT NULL,
            response_time DATE NOT NULL DEFAULT CURRENT_DATE,
            FOREIGN KEY (account_id)
            REFERENCES account (id)
            ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY (blog_id)
            REFERENCES blog (id)
            ON UPDATE CASCADE ON DELETE CASCADE   
        )
        """,
        ########################
        # LIKES BLOG/TABLE
        """
        CREATE TABLE IF NOT EXISTS blog_like (
            id SERIAL PRIMARY KEY,
            account_id INTEGER NOT NULL,
            blog_id INTEGER NOT NULL,
            FOREIGN KEY (account_id)
            REFERENCES account (id)
            ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY (blog_id)
            REFERENCES blog (id)
            ON UPDATE CASCADE ON DELETE CASCADE
        )
        """,
        # COMMENTS BLOG/TABLE
        """
        CREATE TABLE IF NOT EXISTS blog_comment (
            id SERIAL PRIMARY KEY,
            comment Text NOT NULL,
            blog_id INTEGER NOT NULL,
            account_id INTEGER NOT NULL,
            comment_time DATE NOT NULL DEFAULT CURRENT_DATE,
            FOREIGN KEY (account_id)
            REFERENCES account (id)
            ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY (blog_id)
            REFERENCES blog (id)
            ON UPDATE CASCADE ON DELETE CASCADE
        )
        """,
        # LIKES BLOG COMMENT/TABLE
        """
        CREATE TABLE IF NOT EXISTS blog_comment_like (
            id SERIAL PRIMARY KEY,
            account_id INTEGER NOT NULL,
            blog_id INTEGER NOT NULL,
            blog_comment_id INTEGER NOT NULL,
            FOREIGN KEY (account_id)
            REFERENCES account (id)
            ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY (blog_id)
            REFERENCES blog (id)
            ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY (blog_comment_id)
            REFERENCES blog_comment (id)
            ON UPDATE CASCADE ON DELETE CASCADE
        )
        """,
        """
            DROP TYPE IF EXISTS question_request CASCADE;
        """,
        """
        CREATE TYPE question_request 
            AS 
            ENUM('pending', 'answered'
        )
        """,
        # END OF BLOG SCHEMA
        # ######################

        # QUESTION TABLE/SCHEMA
        """
        CREATE TABLE IF NOT EXISTS question (
            id SERIAL PRIMARY KEY,
            account_id INTEGER NOT NULL,
            question Text NOT NULL,
            status question_request NOT NULL DEFAULT 'pending',
            category_id INTEGER NOT NULL,
            topic_id INTEGER NOT NULL,
            question_time DATE NOT NULL DEFAULT CURRENT_DATE,
            FOREIGN KEY (account_id)
            REFERENCES account (id)
            ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY (topic_id)
            REFERENCES topics (id)
            ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY (category_id)
            REFERENCES category (id)
            ON UPDATE CASCADE ON DELETE CASCADE  
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS question_comment (
            id SERIAL PRIMARY KEY,
            comment VARCHAR(300) NOT NULL,
            question_id INTEGER NOT NULL,
            account_id INTEGER NOT NULL,
            question_comment_time DATE NOT NULL DEFAULT CURRENT_DATE,
            FOREIGN KEY (account_id)
            REFERENCES account (id)
            ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY (question_id)
            REFERENCES question (id)
            ON UPDATE CASCADE ON DELETE CASCADE
        )
        """,
        # LIKES QUESTION LIKE/TABLE
        """
        CREATE TABLE IF NOT EXISTS question_like (
            id SERIAL PRIMARY KEY,
            account_id INTEGER NOT NULL,
            question_id INTEGER NOT NULL,
            FOREIGN KEY (account_id)
            REFERENCES account (id)
            ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY (question_id)
            REFERENCES question (id)
            ON UPDATE CASCADE ON DELETE CASCADE
        )
        """,
        # LIKES QUESTION COMMENT/TABLE
        """
        CREATE TABLE IF NOT EXISTS question_comment_like (
            id SERIAL PRIMARY KEY,
            account_id INTEGER NOT NULL,
            question_id INTEGER NOT NULL,
            question_comment_id INTEGER NOT NULL,
            FOREIGN KEY (account_id)
            REFERENCES account (id)
            ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY (question_id)
            REFERENCES question (id)
            ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY (question_comment_id)
            REFERENCES question_comment (id)
            ON UPDATE CASCADE ON DELETE CASCADE
        )
        """,
        ######
        # START OF QUESTION RESPONSE SCHEMA
        """
        CREATE TABLE IF NOT EXISTS question_response (
            id SERIAL PRIMARY KEY,
            account_id INTEGER NOT NULL,
            response Text NOT NULL,
            question_id INTEGER NOT NULL,
            time DATE NOT NULL DEFAULT CURRENT_DATE,
            FOREIGN KEY (account_id)
            REFERENCES account (id)
            ON UPDATE CASCADE ON DELETE CASCADE,            
            FOREIGN KEY (question_id)
            REFERENCES question (id)
            ON UPDATE CASCADE ON DELETE CASCADE      
        )
        """,
        # LIKES QUESTION RESPONSE/TABLE
        """
        CREATE TABLE IF NOT EXISTS question_response_like (
            id SERIAL PRIMARY KEY,
            account_id INTEGER NOT NULL,
            question_id INTEGER NOT NULL,
            question_response_id INTEGER NOT NULL,
            FOREIGN KEY (account_id)
            REFERENCES account (id)
            ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY (question_id)
            REFERENCES question (id)
            ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY (question_response_id)
            REFERENCES question_response (id)
            ON UPDATE CASCADE ON DELETE CASCADE
        )
        """,
        ######
            # END OF QUESTION TABLE/SCHEMA
        ######
        # START OF TESTIMONIALS RESPONSE SCHEMA
        """
        CREATE TABLE IF NOT EXISTS testimonial (
            id SERIAL PRIMARY KEY,
            account_id INTEGER NOT NULL,
            comment Text NOT NULL,
            rating INTEGER NOT NULL,
            time DATE NOT NULL DEFAULT CURRENT_DATE,
            FOREIGN KEY (account_id)
            REFERENCES account (id)
            ON UPDATE CASCADE ON DELETE CASCADE                
        )
        """,
        # LIKES TESTIMONIAL/TABLE
        """
        CREATE TABLE IF NOT EXISTS testimonial_like (
            id SERIAL PRIMARY KEY,
            account_id INTEGER NOT NULL,
            testimonial_id INTEGER NOT NULL,
            FOREIGN KEY (account_id)
            REFERENCES account (id)
            ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY (testimonial_id)
            REFERENCES testimonial (id)
            ON UPDATE CASCADE ON DELETE CASCADE
        )
        """, 
        """
            DROP TYPE IF EXISTS recommendation_request CASCADE;
        """,
        """
        CREATE TYPE recommendation_request 
            AS 
            ENUM('pending', 'accepted'
        )
        """,
        ######
            # END OF TESTIMONIAL TABLE/SCHEMA
        ######
        # START OF RECOMMENDATION RESPONSE SCHEMA
        """
        CREATE TABLE IF NOT EXISTS recommendation (
            id SERIAL PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            second_name VARCHAR(50),
            lastname VARCHAR(50) NOT NULL,
            re_image TEXT NOT NULL,
            github VARCHAR(50),
            linkedin VARCHAR(50),
            email VARCHAR(50) UNIQUE NOT NULL,
            country_id INTEGER NOT NULL,
            portfolio VARCHAR(50),         
            account_id INTEGER NOT NULL,
            title_id INTEGER NOT NULL,
            quote VARCHAR(200) NOT NULL,
            status recommendation_request NOT NULL DEFAULT 'pending',
            re_time DATE NOT NULL DEFAULT CURRENT_DATE,
            FOREIGN KEY (account_id)
            REFERENCES account (id)
            ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY (country_id)
            REFERENCES countries (id)
            ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY (title_id)
            REFERENCES user_title (id)
            ON UPDATE CASCADE ON DELETE CASCADE
        )
        """,        
        """
            DROP TYPE IF EXISTS suggestion_request CASCADE;
        """,
        """
        CREATE TYPE suggestion_request 
            AS 
            ENUM('pending', 'accepted', 'watching', 'completed'
        )
        """,
        ######
        # END OF RECOMMENDATIONS TABLE/SCHEMA
                # SUGGESTION TABLE/SCHEMA
        """
        CREATE TABLE IF NOT EXISTS suggestion (
            id SERIAL PRIMARY KEY,
            account_id INTEGER NOT NULL,
            status suggestion_request NOT NULL DEFAULT 'pending',
            post Text NOT NULL,
            suggestion_title VARCHAR(50) UNIQUE NOT NULL,
            slug VARCHAR(100) UNIQUE NOT NULL,
            category_id INTEGER NOT NULL,
            suggestion_time DATE NOT NULL DEFAULT CURRENT_DATE,
            FOREIGN KEY (account_id)
            REFERENCES account (id)
            ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY (category_id)
            REFERENCES category (id)
            ON UPDATE CASCADE ON DELETE CASCADE
        )
        """,
        # START OF SUGGESTION RESPONSE SCHEMA
        """
        CREATE TABLE IF NOT EXISTS suggestion_response (
            id SERIAL PRIMARY KEY,
            account_id INTEGER NOT NULL,
            response Text NOT NULL,
            suggestion_id INTEGER NOT NULL,
            sug_re_time DATE NOT NULL DEFAULT CURRENT_DATE,
            FOREIGN KEY (account_id)
            REFERENCES account (id)
            ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY (suggestion_id)
            REFERENCES suggestion (id)
            ON UPDATE CASCADE ON DELETE CASCADE   
        )
        """,
        ########################
        # VOTES SUGGESTION/TABLE
        """
        CREATE TABLE IF NOT EXISTS suggestion_vote (
            id SERIAL PRIMARY KEY,
            account_id INTEGER NOT NULL,
            suggestion_id INTEGER NOT NULL,
            FOREIGN KEY (account_id)
            REFERENCES account (id)
            ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY (suggestion_id)
            REFERENCES suggestion (id)
            ON UPDATE CASCADE ON DELETE CASCADE
        )
        """,
        # COMMENTS SUGGESTION/TABLE
        """
        CREATE TABLE IF NOT EXISTS suggestion_comment (
            id SERIAL PRIMARY KEY,
            comment Text NOT NULL,
            suggestion_id INTEGER NOT NULL,
            account_id INTEGER NOT NULL,
            sug_com_time DATE NOT NULL DEFAULT CURRENT_DATE,
            FOREIGN KEY (account_id)
            REFERENCES account (id)
            ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY (suggestion_id)
            REFERENCES suggestion (id)
            ON UPDATE CASCADE ON DELETE CASCADE
        )
        """,
        # LIKE SUGGESTION RESPONSE/TABLE
        """
        CREATE TABLE IF NOT EXISTS suggestion_response_like (
            id SERIAL PRIMARY KEY,
            account_id INTEGER NOT NULL,
            suggestion_id INTEGER NOT NULL,
            suggestion_response INTEGER NOT NULL,
            FOREIGN KEY (account_id)
            REFERENCES account (id)
            ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY (suggestion_id)
            REFERENCES blog (id)
            ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY (suggestion_response)
            REFERENCES suggestion_response (id)
            ON UPDATE CASCADE ON DELETE CASCADE
        )
        """,
                # END OF BLOG SCHEMA
                # PROJECT TABLE/SCHEMA
        """
            DROP TYPE IF EXISTS progress CASCADE;
        """,
        """
        CREATE TYPE progress 
            AS 
            ENUM('todo', 'progress', 'on_hold', 'testing', 'done'
        )
        """,
        """
            DROP TYPE IF EXISTS progress_enum CASCADE;
        """,
        """
        CREATE TYPE progress_enum 
            AS 
            ENUM('low', 'medium', 'high'
        )
        """,
            # PROJECT TABLE/SCHEMA
        """
            CREATE TABLE IF NOT EXISTS project (
                id SERIAL PRIMARY KEY,
                account_id INTEGER NOT NULL,
                project_name TEXT NOT NULL,
                image TEXT NOT NULL,
                description TEXT NOT NULL,
                project_status progress NOT NULL DEFAULT 'todo',
                priority progress_enum NOT NULL DEFAULT 'low',
                created DATE NOT NULL DEFAULT CURRENT_DATE,
                user_ids INTEGER NOT NULL,
                github TEXT NOT NULL,
                link TEXT NOT NULL,
                progress INT NOT NULL,
                topic_id INTEGER,
                FOREIGN KEY (account_id) REFERENCES account (id) ON UPDATE CASCADE ON DELETE CASCADE,
                FOREIGN KEY (user_ids) REFERENCES account (id) ON UPDATE CASCADE ON DELETE CASCADE,
                FOREIGN KEY (topic_id) REFERENCES topics (id) 
                ON UPDATE CASCADE ON DELETE CASCADE
            );
        """,
        """
            CREATE TABLE IF NOT EXISTS note (
                project_id INTEGER NOT NULL,
                user_id INTEGER NOT NULL,
                text TEXT NOT NULL,
                topic_id INTEGER,
                FOREIGN KEY (topic_id) REFERENCES topics (id) 
                ON UPDATE CASCADE ON DELETE CASCADE,
                FOREIGN KEY (user_id) REFERENCES account (id) ON UPDATE CASCADE ON DELETE CASCADE
            );
        """,
        
        # TASK TABLE/SCHEMA
        """
        CREATE TABLE IF NOT EXISTS tasks (
            id SERIAL PRIMARY KEY,
            account_id INTEGER NOT NULL,
            task Text NOT NULL,
            description Text NOT NULL,
            topic_ids INTEGER NOT NULL,
            project_status progress NOT NULL DEFAULT 'todo',
            priority progress_enum NOT NULL DEFAULT 'low',
            created DATE NOT NULL DEFAULT CURRENT_DATE,
            progress INT NOT NULL,
            project_id INTEGER NOT NULL,
            FOREIGN KEY (topic_ids)
            REFERENCES topics (id)
            ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY (account_id)
            REFERENCES account (id)
            ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY (project_id)
            REFERENCES project (id)
            ON UPDATE CASCADE ON DELETE CASCADE      
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS project_like (
            id SERIAL PRIMARY KEY,
            account_id INTEGER NOT NULL,
            project_id INTEGER NOT NULL,
            FOREIGN KEY (account_id)
            REFERENCES account (id)
            ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY (project_id)
            REFERENCES project (id)
            ON UPDATE CASCADE ON DELETE CASCADE
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS project_chat (
            id SERIAL PRIMARY KEY,
            message Text NOT NULL,
            project_id INTEGER NOT NULL,
            account_id INTEGER NOT NULL,
            FOREIGN KEY (account_id)
            REFERENCES account (id)
            ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY (project_id)
            REFERENCES project (id)
            ON UPDATE CASCADE ON DELETE CASCADE
        )
        """,
            # END OF PROJECT SCHEMA
            # FEED TABLE/SCHEMA
        """
        CREATE TABLE IF NOT EXISTS feed (
            id SERIAL PRIMARY KEY,
            account_id INTEGER NOT NULL,
            text Text NOT NULL,
            slug Text NOT NULL,
            image Text,
            video Text,
            FOREIGN KEY (account_id)
            REFERENCES account (id)
            ON UPDATE CASCADE ON DELETE CASCADE    
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS feed_like (
            id SERIAL PRIMARY KEY,
            account_id INTEGER NOT NULL,
            feed_id INTEGER NOT NULL,
            FOREIGN KEY (account_id)
            REFERENCES account (id)
            ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY (feed_id)
            REFERENCES feed (id)
            ON UPDATE CASCADE ON DELETE CASCADE
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS feed_comment (
            id SERIAL PRIMARY KEY,
            comment Text NOT NULL,
            feed_id INTEGER NOT NULL,
            account_id INTEGER NOT NULL,
            FOREIGN KEY (account_id)
            REFERENCES account (id)
            ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY (feed_id)
            REFERENCES feed (id)
            ON UPDATE CASCADE ON DELETE CASCADE
        )
        """,
    )
    
    try:
        with connection as conn:
            print(conn)
            with conn.cursor() as cur:
                print(cur)
                # execute the CREATE TABLE statement
                for command in commands:
                    cur.execute(command)
    except (psycopg2.DatabaseError, Exception) as error:
        print(error)

ic()       
        
if __name__ == '__main__':
    create_tables()