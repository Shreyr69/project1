const historyBody = document.getElementById('history-body');
const clearBtn = document.getElementById('clear-btn');

function loadHistory() {

    historyBody.innerHTML = '';

    const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    const viewHistory = JSON.parse(localStorage.getItem('viewHistory')) || [];

    let combinedHistory = [];

    searchHistory.forEach(item => {
        combinedHistory.push({
            type: "Search",
            name: item.query,
            time: item.time
        });
    });

    viewHistory.forEach(item => {
        combinedHistory.push({
            type: "Product View",
            name: item.title,
            time: item.time
        });
    });

    combinedHistory.sort((a, b) => b.time - a.time);

    if (combinedHistory.length === 0) {
        historyBody.innerHTML =
            '<tr><td colspan="3" style="text-align:center;">No history found.</td></tr>';
        return;
    }

    combinedHistory.forEach(item => {
        const row = document.createElement('tr');
        const dateStr = new Date(item.time).toLocaleString();

        row.innerHTML = `
            <td>${item.type}</td>
            <td><strong>${item.name}</strong></td>
            <td>${dateStr}</td>
        `;

        historyBody.appendChild(row);
    });
}

clearBtn.addEventListener('click', () => {
    localStorage.removeItem('searchHistory');
    localStorage.removeItem('viewHistory');
    loadHistory();
});

loadHistory();
