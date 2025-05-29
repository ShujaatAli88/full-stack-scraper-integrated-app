import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    AIRTABLE_API_KEY = os.getenv("AIRTABLE_API_KEY")
    AIRTABLE_BASE_ID = os.getenv("AIRTABLE_BASE_ID")

    DATABASE_NAME = os.getenv("DATABASE_NAME", "default_db")
    DATABASE_USER = os.getenv("DATABASE_USER", "default_user")
    DATABASE_PASSWORD = os.getenv("DATABASE_PASSWORD", "default_password")
    DATABASE_HOST = os.getenv("DATABASE_HOST", "localhost")
    DATABASE_PORT = int(os.getenv("DATABASE_PORT", 5432))
