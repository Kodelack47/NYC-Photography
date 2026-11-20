/* Author: Ousmana Tunkara · github.com/Kodelack47 · NYC Photography */
/* Form validation shared by checkout, contact, log in, and registration.
   Each form is a front-end demo: it checks the input and shows a message, nothing is sent. */

// Checks every field that has a rule. Shows messages under fields and focuses the first problem.
function validate(form, rules) {
  let firstBad = null;
  Object.entries(rules).forEach(([name, rule]) => {
    const field = form.elements[name];
    const message = rule(field.type === "checkbox" ? field.checked : field.value, form);
    const error = document.getElementById(`${name}-error`);
    if (error) error.textContent = message;
    field.setAttribute("aria-invalid", message ? "true" : "false");
    if (message && !firstBad) firstBad = field;
  });
  if (firstBad) firstBad.focus();
  return !firstBad;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function hookForm(id, rules, onSuccess) {
  const form = document.getElementById(id);
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!validate(form, rules)) return;
    const notice = document.getElementById("confirmation");
    notice.textContent = onSuccess(form);
    notice.hidden = false;
    notice.scrollIntoView({ behavior: "smooth", block: "start" });
    form.reset();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  hookForm(
    "contact-form",
    {
      name: (v) => (v.trim().length >= 2 ? "" : "Please enter your name."),
      email: (v) => (EMAIL.test(v) ? "" : "Please enter a valid email address."),
      message: (v) => (v.trim().length >= 10 ? "" : "Please write at least a short message (10+ characters)."),
    },
    (f) => `Thanks, ${f.elements.name.value.trim()}! We'll reply to ${f.elements.email.value.trim()} within two business days.`
  );

  hookForm(
    "login-form",
    {
      email: (v) => (EMAIL.test(v) ? "" : "Please enter the email you registered with."),
      password: (v) => (v.length >= 8 ? "" : "Passwords are at least 8 characters."),
    },
    () => "Welcome back! (Demo: accounts aren't stored, so any valid email and password works.)"
  );

  hookForm(
    "register-form",
    {
      firstName: (v) => (v.trim() ? "" : "Please enter your first name."),
      lastName: (v) => (v.trim() ? "" : "Please enter your last name."),
      email: (v) => (EMAIL.test(v) ? "" : "Please enter a valid email address."),
      password: (v) =>
        v.length >= 8 && /\d/.test(v) && /[A-Za-z]/.test(v) ? "" : "Use at least 8 characters with a letter and a number.",
      confirm: (v, f) => (v && v === f.elements.password.value ? "" : "Passwords don't match."),
      terms: (checked) => (checked ? "" : "Please agree to the terms to continue."),
    },
    (f) => `Your account is ready, ${f.elements.firstName.value.trim()}! (Demo: nothing is saved.)`
  );
});
