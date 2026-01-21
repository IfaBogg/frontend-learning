// Utility function

function $(selector) {
    return document.querySelector(selector);
}
function $all(selector) {
    return document.querySelectorAll(selector);
}

// Accordion functionality
function initAccordion() {
    const buttons = $all(".accordion-btn");
    const savedIndex = localStorage.getItem("openAccordion");

    buttons.forEach((btn, index) => {
        const panel = btn.parentElement.nextElementSibling;

        if(savedIndex === String(index)) {
            openAccordion(btn, panel, index);
        }
        btn.addEventListener("click", () => {
            const isOpen = btn.getAttribute("aria-expanded") === "true";
            closeAllAccordions(buttons);

            if (!isOpen) {
                openAccordion(btn, panel, index);
            }
        });

        btn.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                btn.click();
            }
        });
        
    });
}
  
function openAccordion(btn, panel, index) {
    btn.setAttribute("aria-expanded", "true");
    panel.classList.add("open");
    panel.hidden = false;
    localStorage.setItem("openAccordion", index);
}

function closeAllAccordions(buttons) {
    buttons.forEach(btn => {
        btn.setAttribute("aria-expanded", "false");
        const panel = btn.parentElement.nextElementSibling;
        panel.classList.remove("open");
        panel.hidden = true;
    });
    localStorage.removeItem("openAccordion");
}

// Form validation
function initFormValidation() {
    const form = $("#contact-form");
    if (!form) return;

    form.addEventListener("submit", e => {
        e.preventDefault();
        clearErrors();

        let isValid = true;

        isValid = validateRequired("#email", "Email is required") && isValid;
        isValid = validateEmail("#email") && isValid;
        isValid = validateRequired("#message", "Message is required") && isValid;
        

        if (isValid) {
            alert("Form submitted successfully!");
            form.reset();
        }
    })
}

function validateRequired(selector, message) {
    const input = $(selector);
    if (!input.value.trim()) {
        showError(input, message);
        return false;
    }
    return true;
}

function validateEmail(selector) {
    const input = $(selector);
    if (!input.value.includes("@")) {
        showError(input, "Enter a valid email address");
        return false;
    }
    return true;
}

function showError(input, message) {
    input.nextElementSibling.textContent = message;
}

function clearErrors() {
    $all(".error").forEach(e => e.textContent = "");
}


// Fetch users from API and display
function initUsers() {
    const btn = $("#load-users-btn");
    if (!btn) return;

    btn.addEventListener("click", fetchUsers);
}

let userLoaded = false;
async function fetchUsers() {
    if (userLoaded) return;

    const btn = $("#load-users-btn");
    btn.disabled = true;
    btn.textContent = "Loading...";

    $("#status").textContent = "Loading users...";
    try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const users = await res.json();
        renderUsers(users);
        userLoaded = true;
        $("#status").textContent = "Users loaded";
        btn.textContent = "Loaded";
    } catch {
        $("#status").textContent = "Failed to load users.";
        btn.disabled = false;
        btn.textContent = "Load Users";
    }
}

function renderUsers(users) {
    const container = $("#users-list");
    users.forEach(user => {
        container.innerHTML += `
            <article class="card">
                <h3>${user.name}</h3>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Phone:</strong> ${user.phone}</p>
                <p><strong>Website:</strong> <a href="http://${user.website}" target="_blank" rel="noopener noreferrer">${user.website}</a></p>
            </article>
        `;
    });
}

// Dark mode toggle
function initTheme() {
    const toggle = $("#theme-toggle");
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

// INIT APP
document.addEventListener("DOMContentLoaded", () => {
    initAccordion();
    initFormValidation();
    initUsers();
    initTheme();
});

// Back to Top Button
const backToTop = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
    backToTop.style.display = window.scrollY > 300 ? "block" : "none";
});

backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});
