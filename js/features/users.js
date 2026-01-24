import { $ } from "../core/dom.js";

export function loadUsers() {
  const btn = $("#load-users-btn");
  const container = $("#users-list");

  if (!btn || !container) return;

  btn.addEventListener("click", async () => {
    btn.disabled = true;
    btn.textContent = "Loading...";

    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const users = await res.json();
      renderUsers(users, container);
      btn.textContent = "Loaded ✓";
    } catch {
      container.textContent = "Failed to load users.";
      btn.disabled = false;
      btn.textContent = "Retry";
    }
  });
}

function renderUsers(users, container) {
  container.innerHTML = users
    .map(
      user => `
      <article class="card">
        <h3>${user.name}</h3>
        <p>${user.email}</p>
      </article>
    `
    )
    .join("");
}
