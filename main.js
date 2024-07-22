document.getElementById('birthdayForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const birthdayInput = document.getElementById('birthday').value;
  if (!birthdayInput || !isValidDate(birthdayInput)) {
    alert('請輸入有效的日期格式 (YYYYMMDD)');
    return;
  }

  const birthday = parseDate(birthdayInput);
  const results = calculateFutureDates(birthday);

  displayResults(results);
});

function isValidDate(dateString) {
  if (!/^\d{8}$/.test(dateString)) return false;
  const year = parseInt(dateString.substring(0, 4), 10);
  const month = parseInt(dateString.substring(4, 6), 10) - 1;
  const day = parseInt(dateString.substring(6, 8), 10);
  const date = new Date(year, month, day);
  return date.getFullYear() === year && date.getMonth() === month && date.getDate() === day;
}

function parseDate(dateString) {
  const year = parseInt(dateString.substring(0, 4), 10);
  const month = parseInt(dateString.substring(4, 6), 10) - 1;
  const day = parseInt(dateString.substring(6, 8), 10);
  return new Date(year, month, day);
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
}

function calculateFutureDates(birthday) {
  const dayInMillisecs = 24 * 60 * 60 * 1000;
  const futureDays = [1, 10, 100, 1000, 10000, 100000, 1000000];
  return futureDays.map(days => {
    const futureDate = new Date(birthday.getTime() - days * dayInMillisecs);
    return {
      days: days,
      date: formatDate(futureDate)
    };
  });
}

function displayResults(results) {
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = '';
  results.forEach(result => {
    const p = document.createElement('p');
    p.textContent = `出生前第 ${result.days} 天：${result.date}`;
    resultDiv.appendChild(p);
  });
}

document.getElementById("birthday").onclick = function() {
  document.getElementById('birthday').value = "";
};
