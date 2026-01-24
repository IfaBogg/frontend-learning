// form.js

function $(selector) {
    return document.querySelector(selector);
  }
  
  function $all(selector) {
    return document.querySelectorAll(selector);
  }
  
  export function initFormValidation() {
    const form = $("#contact-form");
    if (!form) return;
  
    form.addEventListener("submit", e => {
      e.preventDefault();
      clearErrors();
  
      let valid = true;
      valid = required("#email", "Email is required") && valid;
      valid = email("#email") && valid;
      valid = required("#message", "Message is required") && valid;
  
      if (valid) {
        alert("Form submitted successfully!");
        form.reset();
      }
    });
  }
  
  function required(selector, msg) {
    const input = $(selector);
    if (!input.value.trim()) {
      showError(input, msg);
      return false;
    }
    return true;
  }
  
  function email(selector) {
    const input = $(selector);
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(input.value)) {
      showError(input, "Enter a valid email address");
      return false;
    }
    return true;
  }
  
  function showError(input, msg) {
    input.nextElementSibling.textContent = msg;
  }
  
  function clearErrors() {
    $all(".error").forEach(e => (e.textContent = ""));
  }
  