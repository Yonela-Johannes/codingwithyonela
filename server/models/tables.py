import os
import psycopg2
from dotenv import load_dotenv

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
        # BLOG TABLE/SCHEMA
        """
            DROP TYPE IF EXISTS blog_category CASCADE;
        """,
        """
        CREATE TYPE blog_category AS ENUM('General', 'My quest', 'Coding', 'Views', 'Trending Topics');
        """,
        """
        CREATE TABLE IF NOT EXISTS blog (
            id SERIAL PRIMARY KEY,
            account INTEGER NOT NULL,
            post Text NOT NULL,
            slug VARCHAR(250) UNIQUE NOT NULL,
            category blog_category NOT NULL DEFAULT 'General',
            blog_image Text NOT NULL,
            blog_title VARCHAR(200) UNIQUE NOT NULL,
            blog_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (account)
            REFERENCES account (id)
            ON UPDATE CASCADE ON DELETE CASCADE   
        );
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
        );
        """,
        # COMMENTS BLOG/TABLE
        """
        CREATE TABLE IF NOT EXISTS blog_comment (
            id SERIAL PRIMARY KEY,
            comment Text NOT NULL,
            blog_id INTEGER NOT NULL,
            account_id INTEGER NOT NULL,
            comment_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (account_id)
            REFERENCES account (id)
            ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY (blog_id)
            REFERENCES blog (id)
            ON UPDATE CASCADE ON DELETE CASCADE
        );
        """,
        # POLL ANSWER
        """
        CREATE TABLE IF NOT EXISTS poll_answer (
            id SERIAL PRIMARY KEY,
            text TEXT NOT NULL
        );
        """,
        # POLL ANSWER
        """
        CREATE TABLE IF NOT EXISTS poll_vote (
            id SERIAL PRIMARY KEY,
            poll_answer_id INTEGER NOT NULL,
            account_id INTEGER NOT NULL,
            FOREIGN KEY (account_id) REFERENCES account (id) ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY (poll_answer_id) REFERENCES poll_answer (id) ON UPDATE CASCADE ON DELETE CASCADE
        );
        """,
        """
            DROP TYPE IF EXISTS post_type CASCADE;
        """,
        """
        CREATE TYPE post_type AS ENUM ('post', 'question', 'suggestion', 'image/video', 'poll');
        """,
        """
            DROP TYPE IF EXISTS post_status CASCADE;
        """,
        """
        CREATE TYPE post_status AS ENUM('pending', 'accepted', 'watching', 'completed');
        """,
        """
        CREATE TABLE IF NOT EXISTS post (
            id SERIAL PRIMARY KEY,
            account_id INTEGER NOT NULL,
            text Text,
            image Text,
            video Text,
            link Text,
            answer_one_id INTEGER,
            answer_two_id INTEGER,
            answer_three_id INTEGER,
            type post_type NOT NULL DEFAULT 'post',
            status post_status NOT NULL DEFAULT 'pending',
            slug VARCHAR(100) UNIQUE NOT NULL,
            post_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (account_id)
            REFERENCES account (id)
            ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY (answer_one_id)
            REFERENCES poll_answer (id)
            ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY (answer_two_id)
            REFERENCES poll_answer (id)
            ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY (answer_three_id)
            REFERENCES poll_answer (id)
            ON UPDATE CASCADE ON DELETE CASCADE
        );
        """,
        # QUESTION TABLE/SCHEMA
        """
        CREATE TABLE IF NOT EXISTS post_response (
            id SERIAL PRIMARY KEY,
            text VARCHAR(300) NOT NULL,
            post_id INTEGER NOT NULL,
            account_id INTEGER NOT NULL,
            post_response_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (account_id)
            REFERENCES account (id)
            ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY (post_id)
            REFERENCES post (id)
            ON UPDATE CASCADE ON DELETE CASCADE
        );
        """,
        """
        CREATE TABLE IF NOT EXISTS post_comment (
            id SERIAL PRIMARY KEY,
            comment VARCHAR(300) NOT NULL,
            post_id INTEGER NOT NULL,
            account_id INTEGER NOT NULL,
            post_comment_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (account_id)
            REFERENCES account (id)
            ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY (post_id)
            REFERENCES post (id)
            ON UPDATE CASCADE ON DELETE CASCADE
        );
        """,
        # LIKES POST LIKE/TABLE
        """
        CREATE TABLE IF NOT EXISTS post_like (
            id SERIAL PRIMARY KEY,
            account_id INTEGER NOT NULL,
            post_id INTEGER NOT NULL,
            FOREIGN KEY (account_id)
            REFERENCES account (id)
            ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY (post_id)
            REFERENCES post (id)
            ON UPDATE CASCADE ON DELETE CASCADE
        );
        """,
        """
            DROP TYPE IF EXISTS recommendation_request CASCADE;
        """,
        """
        CREATE TYPE recommendation_request AS ENUM ('pending', 'accepted');
        """,
        ######
        # RECOMMENDATION SCHEMA
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
            re_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (account_id)
            REFERENCES account (id)
            ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY (country_id)
            REFERENCES countries (id)
            ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY (title_id)
            REFERENCES user_title (id)
            ON UPDATE CASCADE ON DELETE CASCADE
        );
        """,
        """
            DROP TYPE IF EXISTS progress CASCADE;
        """,      
        """
        CREATE TYPE progress AS ENUM ('todo', 'progress', 'on_hold', 'testing', 'done');
        """,
        """
            DROP TYPE IF EXISTS progress_enum CASCADE;
        """,
        """
        CREATE TYPE progress_enum AS ENUM ('low', 'medium', 'high');
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
            created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            github TEXT NOT NULL,
            link TEXT NOT NULL,
            topic_id INTEGER,
            FOREIGN KEY (account_id) REFERENCES account (id) ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY (topic_id) REFERENCES topics (id) 
            ON UPDATE CASCADE ON DELETE CASCADE
        );
        """,
        # TASK TABLE/SCHEMA
        """
        CREATE TABLE IF NOT EXISTS tasks (
            id SERIAL PRIMARY KEY,
            account_id INTEGER NOT NULL,
            task Text NOT NULL,
            description Text NOT NULL,
            project_status progress NOT NULL DEFAULT 'todo',
            priority progress_enum NOT NULL DEFAULT 'low',
            created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            project_id INTEGER NOT NULL,
            FOREIGN KEY (account_id)
            REFERENCES account (id)
            ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY (project_id)
            REFERENCES project (id)
            ON UPDATE CASCADE ON DELETE CASCADE      
        );
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
        );
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
        );
        """
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
        
if __name__ == '__main__':
    create_tables()