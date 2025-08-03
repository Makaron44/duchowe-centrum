
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("trybNocny", document.body.classList.contains("dark-mode"));
}

window.addEventListener("load", () => {
  if (localStorage.getItem("trybNocny") === "true") {
    document.body.classList.add("dark-mode");
  }

  const toggleBtn = document.createElement('button');
  toggleBtn.textContent = "🌙 Tryb nocny / dzienny";
  toggleBtn.style.position = "fixed";
  toggleBtn.style.bottom = "2px";
  toggleBtn.style.right = "20px";
  toggleBtn.style.zIndex = "1000";
  toggleBtn.onclick = toggleDarkMode;
  document.body.appendChild(toggleBtn);
});