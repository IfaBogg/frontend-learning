// accordion.js

function $all(selector) {
    return document.querySelectorAll(selector);
  }
  
  export function initAccordion() {
    const buttons = $all(".accordion-btn");
    const savedIndex = localStorage.getItem("openAccordion");
  
    buttons.forEach((btn, index) => {
      const panel = btn.parentElement.nextElementSibling;
  
      if (savedIndex === String(index)) {
        open(btn, panel, index);
      }
  
      btn.addEventListener("click", () => {
        const isOpen = btn.getAttribute("aria-expanded") === "true";
        closeAll(buttons);
        if (!isOpen) open(btn, panel, index);
      });
  
      btn.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          btn.click();
        }
      });
    });
  }
  
  function open(btn, panel, index) {
    btn.setAttribute("aria-expanded", "true");
    panel.hidden = false;
    panel.classList.add("open");
    localStorage.setItem("openAccordion", index);
  }
  
  function closeAll(buttons) {
    buttons.forEach(btn => {
      btn.setAttribute("aria-expanded", "false");
      const panel = btn.parentElement.nextElementSibling;
      panel.hidden = true;
      panel.classList.remove("open");
    });
    localStorage.removeItem("openAccordion");
  }
  