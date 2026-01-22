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
1. Data Entry - to be used by the farm staff to input expenses related to the farm activities. 2. Dashboard - used by stakeholders to view summaries, totals, and trends for decision making.

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them.

- Python 3.10+ (for the backend, later)
- PostgreSQL (for storing expenses)
- A modern web browser (Chrome, Edge, Firefox)
- Optional: VS Code or any code editor
- Node/npm not required yet
- Backend placeholder exists in /backend

### Installing

A step by step series of examples that tell you how to get a development env running.

1. Clone the repository:
2. Open the frontend entry page in your browser:
3. Open the dashboard page in your browser:
At this stage, data is stored in the browser memory (JavaScript array). Backend integration will come later.

Since the project currently doesn’t have automated tests,
No automated tests are implemented yet.  
Future updates will include:
- Unit tests for backend API endpoints
- Integration tests for frontend-backend communication
- JavaScript validation tests for data entry

## 🎈 Usage <a name="usage"></a>
Data Entry Page
1. Open `/frontend/entry/index.html`
2. Fill out the form:
   - Date, Person Responsible, Description, Amount, Category
3. Click "Add Expense"  
4. The table below will show all entered expenses

Dashboard Page
1. Open `/frontend/dashboard/index.html`
2. Currently displays placeholder summary for stakeholders
3. Future version will show total expenses, breakdowns by category, and trends

## 🚀 Deployment <a name = "deployment"></a>

The project is intended to be deployed with a backend server (FastAPI) and PostgreSQL database.  
Future deployment options:
- Host the backend on Heroku, AWS, or any cloud provider
- Frontend can be served via GitHub Pages or the backend server
- Ensure PostgreSQL is accessible to both entry and dashboard pages

## ⛏️ Built Using <a name = "built_using"></a>

- [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) - Frontend structure
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) - Styling
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - Frontend behavior
- [Python](https://www.python.org/) - Backend (future)
- [FastAPI](https://fastapi.tiangolo.com/) - Backend framework (future)
- [PostgreSQL](https://www.postgresql.org/) - Database (future)

## ✍️ Authors <a name = "authors"></a>

- [Philippa Nantamu](https://github.com/p-nant) - Idea, Frontend, and Project Setup

## 🎉 Acknowledgements <a name = "acknowledgement"></a>

- Inspired by farm management and expense tracking needs
- Thanks to tutorials and online resources on FastAPI, HTML/CSS, and PostgreSQL
- freeCodeCamp
