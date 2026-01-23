// theme.js

function $(selector) {
    return document.querySelector(selector);
  }
  
  export function initTheme() {
    const toggle = $("#theme-toggle");
    if (!toggle) return;
  
    if (localStorage.getItem("theme") === "dark") {
      enable(toggle);
    }
  
    toggle.addEventListener("click", () => {
      document.body.classList.contains("dark")
        ? disable(toggle)
        : enable(toggle);
    });
  }
  
  function enable(toggle) {
    document.body.classList.add("dark");
    localStorage.setItem("theme", "dark");
    toggle.textContent = "☀️ Light Mode";
  }
  
  function disable(toggle) {
    document.body.classList.remove("dark");
    localStorage.setItem("theme", "light");
    toggle.textContent = "🌙 Dark Mode";
  }
  