function loadPrayers() {
  const prayers = JSON.parse(localStorage.getItem('myPrayers')) || [];
  const list = document.getElementById('prayerList');
  list.innerHTML = '';

  prayers.forEach((prayer, index) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>[${prayer.type}]</strong> ${prayer.text}`;

    const btn = document.createElement('button');
    btn.textContent = 'Usuń';
    btn.onclick = () => deletePrayer(index);
    li.appendChild(btn);

    const hour = new Date().getHours();
    let highlight = false;

    if (hour >= 5 && hour < 10 && prayer.type === "Poranna") {
      highlight = true;
    } else if ((hour >= 20 || hour < 2) && prayer.type === "Wieczorna") {
      highlight = true;
    }

    if (highlight) {
      li.style.backgroundColor = "#e6ffe6";
      li.style.border = "1px solid #6c6";
    } else {
      li.style.opacity = "0.6";
    }

    list.appendChild(li);
  });
}

function addPrayer() {
  const input = document.getElementById('prayerInput');
  const type = document.getElementById('prayerType').value;
  const text = input.value.trim();

  if (text) {
    const prayers = JSON.parse(localStorage.getItem('myPrayers')) || [];
    prayers.push({ text, type });
    localStorage.setItem('myPrayers', JSON.stringify(prayers));
    input.value = '';
    loadPrayers();
  }
}

function deletePrayer(index) {
  const prayers = JSON.parse(localStorage.getItem('myPrayers')) || [];
  prayers.splice(index, 1);
  localStorage.setItem('myPrayers', JSON.stringify(prayers));
  loadPrayers();
}

function showReminder() {
  const hour = new Date().getHours();
  let message = "";

  if (hour >= 5 && hour < 10) {
    message = "☀️ Dobrego poranka! To idealny moment na modlitwę poranną.";
  } else if (hour >= 20 || hour < 2) {
    message = "🌙 Dobry wieczór! Zatrzymaj się na chwilę refleksji przed snem.";
  }

  if (message) {
    const reminder = document.createElement('div');
    reminder.style.backgroundColor = '#fff8dc';
    reminder.style.border = '1px solid #ccb';
    reminder.style.padding = '1rem';
    reminder.style.marginBottom = '1rem';
    reminder.style.borderRadius = '10px';
    reminder.style.textAlign = 'center';
    reminder.style.fontWeight = 'bold';
    reminder.textContent = message;
    document.querySelector('.container').prepend(reminder);
  }
}

function showCountdown() {
  const countdownBox = document.getElementById('countdownBox');
  if (!countdownBox) return;

  const countdownDiv = document.createElement('div');
  countdownDiv.style.backgroundColor = '#eef';
  countdownDiv.style.border = '1px solid #66c';
  countdownDiv.style.padding = '1rem';
  countdownDiv.style.marginBottom = '1rem';
  countdownDiv.style.borderRadius = '10px';
  countdownDiv.style.textAlign = 'center';
  countdownDiv.style.fontWeight = 'bold';
  countdownBox.appendChild(countdownDiv);

  let hasNotified = false;

  function updateCountdown() {
    const now = new Date();
    const czas = localStorage.getItem('czasModlitwy') || "21:00";
    const [h, m] = czas.split(":");
    const target = new Date();
    target.setHours(+h, +m, 0, 0);
    if (now > target) target.setDate(target.getDate() + 1);

    const diff = target - now;
    const hours = Math.floor(diff / 1000 / 60 / 60);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    countdownDiv.textContent = `🕒 Do Twojej modlitwy (${czas}) zostało: ${hours}h ${minutes}m ${seconds}s`;

    if (!hasNotified && hours === 0 && minutes === 0 && seconds === 0) {
      const notice = document.createElement('div');
      notice.style.backgroundColor = '#d4edda';
      notice.style.border = '1px solid #28a745';
      notice.style.padding = '1rem';
      notice.style.marginTop = '1rem';
      notice.style.borderRadius = '10px';
      notice.style.textAlign = 'center';
      notice.style.fontWeight = 'bold';
      notice.style.color = '#155724';
      notice.textContent = "🙏 To już czas na Twoją modlitwę.";
      countdownBox.appendChild(notice);
      hasNotified = true;
    }
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

function showTimePicker() {
  const wrapper = document.createElement('div');
  wrapper.style.marginBottom = '1rem';
  wrapper.style.textAlign = 'center';

  const input = document.createElement('input');
  input.type = 'time';
  input.id = 'prayerTime';
  input.value = localStorage.getItem('czasModlitwy') || "21:00";

  const btn = document.createElement('button');
  btn.textContent = "Zapisz godzinę";
  btn.onclick = () => {
    localStorage.setItem('czasModlitwy', input.value);
    alert(`Zapisano godzinę modlitwy: ${input.value}`);
  };

  wrapper.appendChild(input);
  wrapper.appendChild(btn);
  document.querySelector('.container').prepend(wrapper);
}

// Wczytaj wszystko po załadowaniu strony
window.onload = () => {
  loadPrayers();
  showReminder();
  showCountdown();

  const timeButton = document.createElement('button');
  timeButton.textContent = "🕒 Ustaw godzinę modlitwy";
  timeButton.style.display = 'block';
  timeButton.style.margin = '1rem auto';
  timeButton.onclick = showTimePicker;

  document.querySelector('.container').prepend(timeButton);
};