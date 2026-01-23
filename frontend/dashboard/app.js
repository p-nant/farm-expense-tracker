const API_BASE_URL = 'http://localhost:8000';

document.addEventListener('DOMContentLoaded', () => {
  const totalSpan = document.getElementById('dashTotalExpenses');
  const countSpan = document.getElementById('dashExpenseCount');
  const breakdownBody = document.getElementById('dashCostCentreBody');
  const chartCanvas = document.getElementById('costCentreChart');
  let chartInstance = null;

  loadSummary();

  async function loadSummary() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/expenses`);
      if (!response.ok) {
        throw new Error('Failed to load expenses');
      }

      const expenses = await response.json();
      const total = expenses.reduce((sum, exp) => sum + (parseFloat(exp.amount) || 0), 0);
      totalSpan.textContent = total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      countSpan.textContent = expenses.length.toLocaleString('en-US');

      // Aggregate by cost centre
      const summary = {};
      expenses.forEach(exp => {
        const key = exp.cost_centre || 'N/A';
        if (!summary[key]) {
          summary[key] = { count: 0, total: 0 };
        }
        summary[key].count += 1;
        summary[key].total += parseFloat(exp.amount) || 0;
      });

      renderBreakdown(summary);
      renderChart(summary);
    } catch (error) {
      console.error('Dashboard load error:', error);
      totalSpan.textContent = '—';
      countSpan.textContent = '—';
      breakdownBody.innerHTML = '<tr><td colspan="3">Error loading data</td></tr>';
      if (chartInstance) {
        chartInstance.destroy();
        chartInstance = null;
      }
    }
  }

  function renderBreakdown(summary) {
    breakdownBody.innerHTML = '';
    const entries = Object.entries(summary);
    if (entries.length === 0) {
      breakdownBody.innerHTML = '<tr><td colspan="3">No data</td></tr>';
      if (chartInstance) {
        chartInstance.destroy();
        chartInstance = null;
      }
      return;
    }

    entries.forEach(([centre, stats]) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${escapeHtml(centre)}</td>
        <td>${stats.count.toLocaleString('en-US')}</td>
        <td>${stats.total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
      `;
      breakdownBody.appendChild(tr);
    });
  }

  function renderChart(summary) {
    if (!chartCanvas) return;
    const entries = Object.entries(summary);
    if (entries.length === 0) {
      if (chartInstance) {
        chartInstance.destroy();
        chartInstance = null;
      }
      return;
    }

    const labels = entries.map(([centre]) => centre);
    const data = entries.map(([, stats]) => stats.total);

    // pleasant palette
    const palette = [
      '#2ba0d6','#71e8e2','#ffb347','#ff7f7f','#8fd19e',
      '#c39bd3','#f7dc6f','#85c1e9','#f1948a','#7fb3d5'
    ];

    if (chartInstance) {
      chartInstance.destroy();
    }

    chartInstance = new Chart(chartCanvas, {
      type: 'pie',
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: labels.map((_, i) => palette[i % palette.length]),
          borderWidth: 1,
        }]
      },
      options: {
        plugins: {
          legend: {
            position: 'bottom'
          },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                const value = ctx.parsed;
                return `${ctx.label}: ${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
              }
            }
          }
        }
      }
    });
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
});
