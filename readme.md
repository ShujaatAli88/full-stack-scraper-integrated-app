# 🛒 Selenium-Based Amazon Product Extraction

A modern, full-stack web application for extracting, displaying, and managing Amazon product data using Selenium, PostgreSQL, Flask, and React.  
Designed with a beautiful Amazon-inspired UI and robust backend automation.

---

## 🚀 Features

- **Automated Amazon Scraping:**  
  Uses Selenium to extract product details (name, price, rating, image, etc.) from Amazon.
- **PostgreSQL Database:**  
  Stores all product and user data securely.
- **User Authentication:**  
  Secure login system with user details modal.
- **Live Product Dashboard:**  
  View, search, and filter the latest 100 products with images and ratings.
- **Crawler Controls:**  
  Start/stop the crawler and schedule runs (daily/weekly) from a stylish control panel.
- **Responsive Amazon-Style UI:**  
  Clean, yellow-themed interface with modals, cards, and tooltips.
- **Copy-to-Clipboard:**  
  Easily copy user email from the profile modal.
- **Session Management:**  
  Persistent login with secure logout and route protection.
- **Error Handling:**  
  Friendly error messages and robust backend validation.

---

## 🖥️ Tech Stack

| Layer         | Technology                                      |
|---------------|-------------------------------------------------|
| **Frontend**  | React, React Router, CSS Modules                |
| **Backend**   | Flask, Flask-CORS, Python, Selenium             |
| **Database**  | PostgreSQL                                      |
| **Automation**| Selenium WebDriver                              |
| **Styling**   | Custom CSS (Amazon-inspired), CSS Flexbox/Grid  |
| **APIs**      | RESTful JSON APIs                               |

---

## 📸 Screenshots

<p align="center">
  <img src="https://img.icons8.com/color/96/000000/amazon.png" height="48"/>
</p>

| ![Login](https://i.imgur.com/4M7IWwP.png) | ![Dashboard](https://i.imgur.com/8zQZy4w.png) |
|:-----------------------------------------:|:---------------------------------------------:|
| Login Page                               | Product Dashboard                             |

---

## 🏗️ Project Structure

```
Selenium-Based-Amazon-product-Extration/
│
├── api/                # Flask backend & Selenium crawler
│   ├── app.py
│   └── ... 
│
├── frontend/           # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ProductTable.jsx
│   │   │   └── ControlPanel.jsx
│   │   └── App.js
│   └── ...
│
├── .env                # Environment variables
├── requirements.txt    # Python dependencies
└── README.md
```

---

## ⚙️ Setup & Installation

### 1. **Clone the Repository**
```bash
git clone https://github.com/yourusername/Selenium-Based-Amazon-product-Extration.git
cd Selenium-Based-Amazon-product-Extration
```

### 2. **Backend Setup (Flask + Selenium)**
```bash
cd api
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
# Set up your .env file with PostgreSQL credentials
python app.py
```

### 3. **Frontend Setup (React)**
```bash
cd ../frontend
npm install
npm start
```
Frontend runs on [http://localhost:3000](http://localhost:3000)

---

## 🔑 Environment Variables

Create a `.env` file in `/api` with:
```
DATABASE_NAME=your_db
DATABASE_USER=your_user
DATABASE_PASSWORD=your_password
DATABASE_HOST=localhost
DATABASE_PORT=5432
```

---

## 🗃️ Database Schema

**users**
| Column      | Type    |
|-------------|---------|
| id          | SERIAL  |
| name        | TEXT    |
| email       | TEXT    |
| password    | TEXT    |
| age         | INT     |

**products_details**
| Column         | Type    |
|----------------|---------|
| product_id     | SERIAL  |
| product_name   | TEXT    |
| product_price  | FLOAT   |
| product_rating | TEXT    |
| image_url      | TEXT    |
| last_scraped   | TIMESTAMP |

---

## 🧑‍💻 Key Scripts

- **Start Backend:**  
  `python app.py`
- **Start Frontend:**  
  `npm start` (from `/frontend`)
- **Run Crawler:**  
  Trigger via the UI or backend endpoint `/api/start-crawl`

---

## 🛡️ Security & Best Practices

- Passwords should be hashed in production.
- Use environment variables for secrets.
- CORS enabled for frontend-backend communication.
- Input validation on both frontend and backend.

---

## 🙌 Credits

- [Icons8](https://icons8.com/) for Amazon icons
- [React](https://react.dev/), [Flask](https://flask.palletsprojects.com/), [Selenium](https://www.selenium.dev/), [PostgreSQL](https://www.postgresql.org/)

---

## 📄 License

This project is licensed under the MIT License.

---

## 💡 Future Improvements

- Add product search and advanced filters
- User registration and password reset
- Dockerize for easy deployment
- Add unit and integration tests

---

**Made with ❤️ for Amazon data enthusiasts!**