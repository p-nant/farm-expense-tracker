<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="" alt=""></a>
</p>

<h3 align="center">Farm Expense Tracker(Early Farm Management System)</h3>

---

<p align="center"> A full-stack web application to track farm expenses with separate entry and dashboard pages.
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Deployment](#deployment)
- [Built Using](#built_using)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## 🧐 About <a name = "about"></a>

A full-stack farm operations and expense tracker web application (Early Farm Management System) designed to help farms track costs with planned crop-based management features that will help them gain financial insights. The system is structured into two main layers:
1. Data Entry 
- Register crops
- Record expenses linked to specific crops
- Capture farm activity costs in real time

2. Dashboard 
- View total expenses by crop
- Monitor monthly spending trends
- Compare crop performance
- Support farm decision-making 

The project is evolving toward a **Farm Management System**, starting with crop tracking and expense analytics.

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them.

- Python 3.10+ (for the FastAPI backend)
- SQLite (comes with Python)
- A modern web browser (Chrome, Edge, Firefox, Safari)
- Optional: VS Code or any code editor
- Optional: DB Browser for SQLite (to view database)

### Installing

1) **Clone the repository**
```bash
git clone https://github.com/p-nant/farm-expense-tracker
cd farm-expense-tracker
```

2) **Backend setup**
```bash
cd backend
pip install -r requirements.txt
python main.py
```
Backend runs at `http://localhost:8000`.
For other devices on the same Wi‑Fi (e.g., mobile), point the frontend `API_BASE_URL` to `http://<YOUR_IP>:8000`.

3) **Frontend (local)**
- Open `frontend/entry/index.html` for data entry
- Open `frontend/dashboard/index.html` for analytics

4) **Frontend (mobile on same Wi‑Fi)**
- Find your computer IP (macOS):
  ```bash
  ifconfig | grep "inet " | grep -v 127.0.0.1
  ```
- Update `API_BASE_URL` in `frontend/entry/app.js` and `frontend/dashboard/app.js` to `http://<YOUR_IP>:8000`
- On your phone (same Wi‑Fi), open `http://<YOUR_IP>:5500/frontend/entry/index.html` (or your static server URL)

5) **API docs**
- Visit `http://localhost:8000/docs`

### Testing

No automated tests are implemented yet.  
Future updates will include:
- Unit tests for backend API endpoints
- Integration tests for frontend-backend communication
- JavaScript validation tests for data entry

## 🎈 Usage <a name="usage"></a>

### Crop Management
1. Open `/frontend/entry/index.html`
2. Navigate to the Crops section
3. Add a new crop:
  - Crop name
  - Planting date
  - Location/plot (optional)
  - Image for verification
4. Saved crops become available when entering expenses

### Data Entry Page
1. Ensure the backend server is running (`python main.py` in the backend folder)
2. Open `/frontend/entry/index.html` in your browser
3. Fill out the form:
  - Date 
  - Crop
  - Person Responsible
  - Description
  - Amount (UGX)
  - Business Unit
4. Click "Add Expense"  
5. The table below will show all entered expenses
6. Total expenses automatically calculated and displayed
7. Data is saved to the database and persists across sessions

### Dashboard Page
Open `/frontend/dashboard/index.html` to see:
- Financial summary: remittances (funding), expenses, net balance
- Expense totals by crop
- Quarterly review with selectable quarter + current quarter comparison
- Monthly trend line chart (expenses vs remittances, last 6 months)
- Business unit breakdown pie (expenses only; remittances excluded)
- Business unit table including remittances (funding highlighted separately) ***

## ✨ Current Features
- Financial dashboard with trends and summaries
- SQLite database persistence
- REST API built with FastAPI
- Frontend dashboards using vanilla JavaScript

Planned:
- Crop registration
- Expense tracking linked to crops
- Activity logging (planting, weeding, harvesting)
- Harvest and sales tracking
- Profit per crop analytics

## 🚀 Deployment <a name = "deployment"></a>

The project currently runs locally using a FastAPI backend with SQLite database.

Planned deployment setup:
- **Backend**: Render or Railway (Python FastAPI hosting)
- **Database**: For production, upgrade from SQLite to PostgreSQL (SQLAlchemy makes this easy)
- **Frontend**: GitHub Pages or alongside the backend
- **CORS**: Already configured to allow frontend-backend communication

Production checklist:
1. Migrate SQLite to PostgreSQL
2. Set environment variables
3. Deploy FastAPI backend
4. Serve frontend statically

## ⛏️ Built Using <a name = "built_using"></a>

- [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) - Frontend structure
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) - Styling
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - Frontend behavior and API integration
- [Python](https://www.python.org/) - Backend language
- [FastAPI](https://fastapi.tiangolo.com/) - Backend REST API framework
- [SQLAlchemy](https://www.sqlalchemy.org/) - Database ORM
- [SQLite](https://www.sqlite.org/) - Database (can be upgraded to PostgreSQL)

## ✍️ Authors <a name = "authors"></a>

- [Philippa Nantamu](https://github.com/p-nant) - Idea, Frontend, and Project Setup

## 🎉 Acknowledgements <a name = "acknowledgement"></a>

- Inspired by farm management needs
- Thanks to tutorials and online resources on FastAPI, HTML/CSS, and PostgreSQL
- freeCodeCamp
