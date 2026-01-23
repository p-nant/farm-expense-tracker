<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="" alt=""></a>
</p>

<h3 align="center">Farm Expense Tracker</h3>

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

A simple full-stack web application to track farm expenses, designed with separate layers:
1. Data Entry - to be used by the farm staff to input expenses related to the farm activities. 
2. Dashboard - used by stakeholders to view summaries, totals, and trends for decision making.

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

A step by step series of examples that tell you how to get a development env running.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/p-nant/farm-expense-tracker
   cd farm-expense-tracker
   ```

2. **Set up the backend:**
   ```bash
   cd backend
   pip install -r requirements.txt
   python main.py
   ```
   The backend will run on `http://localhost:8000`

3. **Open the frontend entry page in your browser:**
   - Open `frontend/entry/index.html` in your browser
   - The form will automatically connect to the backend API
   - Data is persisted in `backend/expenses.db` SQLite database

4. **View API documentation:**
   - Navigate to `http://localhost:8000/docs` for interactive API docs

### Testing

No automated tests are implemented yet.  
Future updates will include:
- Unit tests for backend API endpoints
- Integration tests for frontend-backend communication
- JavaScript validation tests for data entry

## 🎈 Usage <a name="usage"></a>

### Data Entry Page
1. Ensure the backend server is running (`python main.py` in the backend folder)
2. Open `/frontend/entry/index.html` in your browser
3. Fill out the form:
   - Date
   - Person Responsible
   - Description
   - Amount (UGX)
   - Cost Centre
4. Click "Add Expense"  
5. The table below will show all entered expenses
6. Total expenses automatically calculated and displayed
7. Data is saved to the database and persists across sessions

### Dashboard Page
1. Open `/frontend/dashboard/index.html` (coming soon)
2. View expense summaries and visualizations for stakeholders
3. Future features: total expenses, breakdowns by cost centre, trends, and date filters

## 🚀 Deployment <a name = "deployment"></a>

The project uses FastAPI backend with SQLite database.

Deployment options:
- **Backend**: Host the backend on Heroku, AWS, Render, or any cloud provider that supports Python
- **Database**: For production, upgrade from SQLite to PostgreSQL (SQLAlchemy makes this easy)
- **Frontend**: Can be served via GitHub Pages or alongside the backend
- **CORS**: Already configured to allow frontend-backend communication

For production:
1. Update database connection in `backend/database.py` to PostgreSQL
2. Set environment variables for production configuration
3. Use a process manager like Gunicorn with Uvicorn workers

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

- Inspired by farm management and expense tracking needs
- Thanks to tutorials and online resources on FastAPI, HTML/CSS, and PostgreSQL
- freeCodeCamp
