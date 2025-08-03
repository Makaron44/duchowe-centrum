function loadEntries() {
  const entries = JSON.parse(localStorage.getItem('gratitudeEntries')) || [];
  const list = document.getElementById('entries');
  list.innerHTML = '';
  entries.forEach((entry, index) => {
    const li = document.createElement('li');
    li.textContent = `${entry.date}: ${entry.text}`;
    const btn = document.createElement('button');
    btn.textContent = 'Usuń';
    btn.onclick = () => deleteEntry(index);
    li.appendChild(btn);
    list.appendChild(li);
  });
  updateStreak();
  drawCalendar();
}

function addEntry() {
  const textarea = document.getElementById('entry');
  const text = textarea.value.trim();
  if (text) {
    const entries = JSON.parse(localStorage.getItem('gratitudeEntries')) || [];
    const date = new Date().toLocaleDateString('pl-PL');
    entries.push({ text, date });
    localStorage.setItem('gratitudeEntries', JSON.stringify(entries));
    textarea.value = '';
    loadEntries();
  }
}

function deleteEntry(index) {
  const entries = JSON.parse(localStorage.getItem('gratitudeEntries')) || [];
  entries.splice(index, 1);
  localStorage.setItem('gratitudeEntries', JSON.stringify(entries));
  loadEntries();
}

function loadQuotes() {
  const quotes = JSON.parse(localStorage.getItem('myQuotes')) || [];
  const list = document.getElementById('quoteList');
  list.innerHTML = '';
  quotes.forEach((quote, index) => {
    const li = document.createElement('li');
    li.textContent = quote;
    const btn = document.createElement('button');
    btn.textContent = 'Usuń';
    btn.onclick = () => deleteQuote(index);
    li.appendChild(btn);
    list.appendChild(li);
  });
}

function addQuote() {
  const input = document.getElementById('quoteInput');
  const text = input.value.trim();
  if (text) {
    const quotes = JSON.parse(localStorage.getItem('myQuotes')) || [];
    quotes.push(text);
    localStorage.setItem('myQuotes', JSON.stringify(quotes));
    input.value = '';
    loadQuotes();
  }
}

function deleteQuote(index) {
  const quotes = JSON.parse(localStorage.getItem('myQuotes')) || [];
  quotes.splice(index, 1);
  localStorage.setItem('myQuotes', JSON.stringify(quotes));
  loadQuotes();
}

function updateStreak() {
  const entries = JSON.parse(localStorage.getItem('gratitudeEntries')) || [];
  const dates = entries.map(e => e.date);
  const today = new Date();
  let streak = 0;

  for (let i = 0; i < 365; i++) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    const str = d.toLocaleDateString('pl-PL');
    if (dates.includes(str)) {
      streak++;
    } else {
      break;
    }
  }

  document.getElementById('streakCount').textContent = streak;
  document.getElementById('progressBar').style.width = Math.min(streak * 10, 100) + '%';
}

let currentMonthOffset = 0;

function changeMonth(offset) {
  currentMonthOffset += offset;
  drawCalendar();
}

function drawCalendar() {

  const calendarHeader = document.getElementById('calendarHeader');
  const calendar = document.getElementById('calendar');
  const entries = JSON.parse(localStorage.getItem('gratitudeEntries')) || [];
  const dates = entries.map(e => e.date);

  const now = new Date();
  now.setMonth(now.getMonth() + currentMonthOffset);
  const year = now.getFullYear();
  const month = now.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const months = [
    'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
    'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'
  ];
  const daysOfWeek = ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So', 'Nd'];

  calendarHeader.innerHTML = `<button onclick="changeMonth(-1)">◀️</button> ${months[month]} ${year} <button onclick="changeMonth(1)">▶️</button>`;
  calendar.innerHTML = '';

  daysOfWeek.forEach(day => {
    const div = document.createElement('div');
    div.textContent = day;
    div.className = 'day-name';
        div.onclick = () => showEntriesForDate(str);
    calendar.appendChild(div);
  });

  let blankDays = (firstDay + 6) % 7;
  for (let i = 0; i < blankDays; i++) {
    const empty = document.createElement('div');
    calendar.appendChild(empty);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const d = new Date(year, month, day);
    const str = d.toLocaleDateString('pl-PL');
    const div = document.createElement('div');
    div.textContent = day;
    if (dates.includes(str)) {
      div.className = 'marked';
    }
        div.onclick = () => showEntriesForDate(str);
    calendar.appendChild(div);
  }
}

loadEntries();
loadQuotes();


function showEntriesForDate(date) {
  const entries = JSON.parse(localStorage.getItem('gratitudeEntries')) || [];
  const filtered = entries.filter(e => e.date === date);

  if (filtered.length > 0) {
    let text = `Wpisy z dnia ${date}:\n\n`;
    filtered.forEach(e => {
      text += `• ${e.text}\n`;
    });
    alert(text);
  } else {
    alert(`Brak wpisów z dnia ${date}`);
  }
}
