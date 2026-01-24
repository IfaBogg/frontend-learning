export function initTheme() {
  const toggle = document.getElementById("theme-toggle");
  if (!toggle) return;

  if (localStorage.getItem("theme") === "dark") {
    enableDarkMode(toggle);
  }

  toggle.addEventListener("click", () => {
    document.body.classList.contains("dark")
      ? disableDarkMode(toggle)
      : enableDarkMode(toggle);
  });
}

function enableDarkMode(toggle) {
  document.body.classList.add("dark");
  localStorage.setItem("theme", "dark");
  toggle.textContent = "☀️ Light Mode";
}

function disableDarkMode(toggle) {
  document.body.classList.remove("dark");
  localStorage.setItem("theme", "light");
  toggle.textContent = "🌙 Dark Mode";
}
