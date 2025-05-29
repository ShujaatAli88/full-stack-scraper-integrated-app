import psycopg2
from psycopg2.extras import execute_values
from typing import Dict, Any
from log_handler import logger
import os
from config import Config
from dotenv import load_dotenv
from datetime import datetime


class PostgresHandler:
    def __init__(
            self, 
            dbname, 
            user, 
            password, 
            host="localhost", 
            port=5432
        ):
        self.conn = psycopg2.connect(
            dbname=dbname, 
            user=user, 
            password=password, 
            host=host, 
            port=port
        )
        self.conn.autocommit = True

    def insert_product(self, data: Dict[str, Any]):
        try:
            logger.info("Inserting product data into Postgres database.")
            with self.conn.cursor() as cur:
                cur.execute("""
                    CREATE TABLE IF NOT EXISTS products_details(
                        product_id TEXT PRIMARY KEY,
                        product_name TEXT,
                        product_price TEXT,
                        product_rating TEXT,
                        image_url TEXT,
                        last_scraped TIMESTAMP
                    );
                """)
                cur.execute("""
                    INSERT INTO products_details (product_id, product_name, product_price, product_rating, image_url, last_scraped)
                    VALUES (%s, %s, %s, %s, %s, %s)
                    ON CONFLICT (product_id) DO UPDATE SET
                        product_name=EXCLUDED.product_name,
                        product_price=EXCLUDED.product_price,
                        product_rating=EXCLUDED.product_rating,
                        image_url=EXCLUDED.image_url,
                        last_scraped=EXCLUDED.last_scraped;
                """, (
                    data.get("Product_id"),
                    data.get("Product Name"),
                    data.get("Product Price"),
                    data.get("Product_rating"),
                    data.get("Image_URL"),
                    datetime.now()
                ))
                logger.info("Product data inserted successfully.")
        except Exception as e:
            logger.error(f"Postgres insert error: {e}")

    def close(self):
        self.conn.close()

#Example usage:
if __name__ == "__main__":
    load_dotenv()  # Load environment variables from .env

    dbname = os.getenv("DATABASE_NAME")
    user = os.getenv("DATABASE_USER")
    password = os.getenv("DATABASE_PASSWORD")
    host = os.getenv("DATABASE_HOST", "localhost")
    port = int(os.getenv("DATABASE_PORT", 5432))

    handler = PostgresHandler(dbname, user, password, host, port)

    dummy_data = {
        "Product_id": "TEST123",
        "Product Name": "Test Product",
        "Product Price": "$9.99",
        "Product_rating": "4.8",
        "Image_URL": "https://example.com/image.jpg"
    }

    handler.insert_product(dummy_data)
    print("Dummy data inserted (if no errors above).")
    handler.close()