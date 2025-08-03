
function loadBibleQuotes() {
  const quotes = JSON.parse(localStorage.getItem('bibleQuotes')) || [];
  const list = document.getElementById('bibleQuoteList');
  list.innerHTML = '';

  quotes.forEach((quote, index) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>[${quote.category}]</strong> ${quote.text}`;
    const btn = document.createElement('button');
    btn.textContent = 'Usuń';
    btn.onclick = () => deleteBibleQuote(index);
    li.appendChild(btn);
    list.appendChild(li);
  });
}

function addBibleQuote() {
  const input = document.getElementById('quoteInput');
  const category = document.getElementById('quoteCategory').value;
  const text = input.value.trim();
  if (text) {
    const quotes = JSON.parse(localStorage.getItem('bibleQuotes')) || [];
    quotes.push({ text, category });
    localStorage.setItem('bibleQuotes', JSON.stringify(quotes));
    input.value = '';
    loadBibleQuotes();
  }
}

function deleteBibleQuote(index) {
  const quotes = JSON.parse(localStorage.getItem('bibleQuotes')) || [];
  quotes.splice(index, 1);
  localStorage.setItem('bibleQuotes', JSON.stringify(quotes));
  loadBibleQuotes();
}

window.onload = loadBibleQuotes;
