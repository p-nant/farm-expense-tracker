const API_BASE_URL = 'http://localhost:8000';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('expenseForm');
  const tbody = document.querySelector('#expensesTable tbody');

  // Load existing expenses on page load
  loadExpenses();

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form values
    const date = form.date.value;
    const person = form.person.value.trim();
    const description = form.description.value.trim();
    const amount = parseFloat(form.amount.value) || 0;
    const cost_centre = form["cost-centre"].value;

    // Basic validation
    if (!date || !person || !description || amount <= 0) {
      alert('Please fill all required fields with valid data.');
      return;
    }

    // Submit to API
    try {
      const response = await fetch(`${API_BASE_URL}/api/expenses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date,
          person,
          description,
          amount,
          cost_centre
        })
      });

      if (response.ok) {
        const expense = await response.json();
        addExpenseRow(expense);
        form.reset();
      } else {
        alert('Error adding expense. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error connecting to API. Make sure backend is running.');
    }
  });

  async function loadExpenses() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/expenses`);
      if (response.ok) {
        const expenses = await response.json();
        expenses.forEach(expense => addExpenseRow(expense));
      }
    } catch (error) {
      console.error('Error loading expenses:', error);
    }
  }

  function addExpenseRow(expense) {
    const tr = document.createElement('tr');
    tr.dataset.expenseId = expense.id;
    tr.innerHTML = `
      <td>${escapeHtml(expense.date)}</td>
      <td>${escapeHtml(expense.person)}</td>
      <td>${escapeHtml(expense.description)}</td>
      <td>${parseFloat(expense.amount).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
      <td>${escapeHtml(expense.cost_centre)}</td>
      <td><button class="delete-btn">Delete</button></td>
    `;

    tbody.appendChild(tr);

    // Add delete functionality
    tr.querySelector('.delete-btn').addEventListener('click', async () => {
      if (confirm('Are you sure you want to delete this expense?')) {
        try {
          const response = await fetch(`${API_BASE_URL}/api/expenses/${expense.id}`, {
            method: 'DELETE'
          });
          if (response.ok) {
            tr.remove();
          }
        } catch (error) {
          console.error('Error deleting expense:', error);
          alert('Error deleting expense.');
        }
      }
    });
  }

  // Simple XSS protection helper
  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
})
