import { initAccordion } from "./features/accordion.js";
import { initFormValidation } from "./features/form.js";
import { initTheme } from "./features/theme.js";
import { loadUsers } from "./features/users.js";
import { initBackToTop } from "./features/backToTop.js";


document.addEventListener("DOMContentLoaded", () => {
  initAccordion();
  initFormValidation();
  initTheme();
  loadUsers();
  initBackToTop();
});
