import { $ } from "./dom.js";

export async function loadUsers() {
    const btn = $("#load-users");
    const container = $("#users");

    if (!btn || !container) return;

    btn.addEventListener("click", async () => {
        btn.disabled = true;
        btn.textContent = "Loading...";

        try {
            const res = await fetch("https://jsonplaceholder.typicode.com/users");
            const users = await res.json();
            renderUsers(users);
        } catch (err) {
            container.textContent = "Failed to load users.";
        }
    });
}

function renderUsers(users) {
    let html = "";
    users.forEach(user => {
        html += `
        <article class="card">
            <h3>${user.name}</h3>
            <p>${user.email}</p>
        </article>`;
    });
    $("#users").innerHTML = html;
}
