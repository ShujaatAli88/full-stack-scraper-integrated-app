from flask import Flask, jsonify, request
from flask_cors import CORS
import psycopg2
import os
from dotenv import load_dotenv
import threading

load_dotenv()

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"],supports_credentials=True)

def get_db_connection():
    dbname = os.getenv("DATABASE_NAME")
    print(f"Connecting to database: {dbname}")
    conn = psycopg2.connect(
        dbname=dbname,
        user=os.getenv("DATABASE_USER"),
        password=os.getenv("DATABASE_PASSWORD"),
        host=os.getenv("DATABASE_HOST"),
        port=os.getenv("DATABASE_PORT", 5432)
    )
    return conn

@app.route("/api/products", methods=["GET"])
def get_products():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("""
        SELECT product_id, product_name, product_price, product_rating, image_url
        FROM products_details
        ORDER BY product_id DESC
        LIMIT 100
    """)
    rows = cur.fetchall()
    cur.close()
    conn.close()
    products = [
        {
            "product_id": row[0],
            "product_name": row[1],
            "product_price": row[2],
            "product_rating": row[3],
            "image_url": row[4]
        }
        for row in rows
    ]
    return jsonify(products)

@app.route("/api/products/stats", methods=["GET"])
def get_products_stats():
    conn = get_db_connection()
    cur = conn.cursor()
    # Get count and average price
    cur.execute("SELECT COUNT(*), AVG(NULLIF(REGEXP_REPLACE(product_price, '[^0-9.]', '', 'g'), '')::float) FROM products_details")
    count, avg_price = cur.fetchone()
    avg_price = round(avg_price or 0, 2)

    # Get top rated product (first if tie)
    cur.execute("""
        SELECT product_name, product_rating
        FROM products_details
        WHERE product_rating IS NOT NULL AND product_rating ~ '[0-9]'
        ORDER BY CAST(REGEXP_REPLACE(product_rating, '[^0-9.]', '', 'g') AS FLOAT) DESC, product_id ASC
        LIMIT 1
    """)
    top_row = cur.fetchone()
    if top_row:
        name_words = top_row[0].split()
        short_name = " ".join(name_words[:4]) + ("..." if len(name_words) > 4 else "")
        top_product = f"{short_name} (⭐ {top_row[1]})"
    else:
        top_product = "N/A"

    # Get latest last_scraped date
    cur.execute("""
        SELECT last_scraped
        FROM products_details
        WHERE last_scraped IS NOT NULL
        ORDER BY last_scraped DESC, product_id ASC
        LIMIT 1
    """)
    last_scraped_row = cur.fetchone()
    last_scraped = last_scraped_row[0].strftime("%Y-%m-%d %H:%M") if last_scraped_row and last_scraped_row[0] else "N/A"

    cur.close()
    conn.close()
    return jsonify({
        "count": count,
        "average_price": avg_price,
        "top_rated_product": top_product,
        "last_scraped": last_scraped
    })

def run_crawler():
    pass
    # im
    # crawler = main()
    # crawler.run()  # Replace with your actual crawl method

@app.route("/api/start-crawl", methods=["POST"])
def start_crawl():
    threading.Thread(target=run_crawler).start()
    return jsonify({"status": "started"})

@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(
        "SELECT password FROM users WHERE user_email = %s",
        (email,)
    )
    row = cur.fetchone()
    cur.close()
    conn.close()

    if row and row[0] == password:
        return jsonify({"success": True, "message": "Login successful"})
    else:
        return jsonify({"success": False, "message": "Email or password incorrect, try again"}), 401

@app.route("/api/user-details", methods=["POST"])
def user_details():
    data = request.get_json()
    email = data.get("email")
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT user_name, user_email, user_age FROM users WHERE user_email = %s", (email,))
    row = cur.fetchone()
    cur.close()
    conn.close()
    if row:
        return jsonify({"user_name": row[0], "user_email": row[1], "user_age": row[2]})
    else:
        return jsonify({"error": "User not found"}), 404

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)