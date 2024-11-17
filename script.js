// Fetch data from /data/kols
fetch('/data/kols')
  .then(response => response.json())
  .then(data => {
    displayData(data);
    addSearchFunctionality(data);
    addSortingFunctionality(data);
  })
  .catch(error => console.error('Error fetching data:', error));

// Display data in the table
function displayData(data) {
  const tableBody = document.querySelector('#kol-table tbody');
  tableBody.innerHTML = '';

  data.forEach(kol => {
    const row = document.createElement('tr');

    // KOL Name
    const nameCell = document.createElement('td');
    nameCell.textContent = kol.name;
    row.appendChild(nameCell);

    // Projects
    const projectsCell = document.createElement('td');
    projectsCell.textContent = kol.projects.join(', ');
    row.appendChild(projectsCell);

    // Amount ETH
    const ethCell = document.createElement('td');
    ethCell.textContent = kol.amount_eth;
    row.appendChild(ethCell);

    // Amount Tokens
    const tokensCell = document.createElement('td');
    tokensCell.textContent = kol.amount_tokens;
    row.appendChild(tokensCell);

    // Activity Period
    const periodCell = document.createElement('td');
    periodCell.textContent = `${kol.activity_period.start_date} to ${kol.activity_period.end_date}`;
    row.appendChild(periodCell);

    // JeetIndex
    const jeetCell = document.createElement('td');
    jeetCell.textContent = kol.jeet_index + '%';
    jeetCell.classList.add(getJeetClass(kol.jeet_index));
    row.appendChild(jeetCell);

    tableBody.appendChild(row);
  });
}

// Determine JeetIndex class for coloring
function getJeetClass(jeetIndex) {
  if (jeetIndex <= 20) {
    return 'jeet-good';
  } else if (jeetIndex <= 50) {
    return 'jeet-moderate';
  } else {
    return 'jeet-bad';
  }
}

// Add search functionality
function addSearchFunctionality(data) {
  const searchInput = document.getElementById('search');
  searchInput.addEventListener('keyup', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredData = data.filter(kol =>
      kol.name.toLowerCase().includes(searchTerm) ||
      kol.projects.join(', ').toLowerCase().includes(searchTerm)
    );
    displayData(filteredData);
  });
}

// Add sorting functionality
function addSortingFunctionality(data) {
  const headers = document.querySelectorAll('#kol-table th');
  headers.forEach(header => {
    header.addEventListener('click', () => {
      const column = header.getAttribute('data-column');
      const sortedData = [...data].sort((a, b) => {
        if (a[column] > b[column]) return 1;
        if (a[column] < b[column]) return -1;
        return 0;
      });
      displayData(sortedData);
    });
  });
}
