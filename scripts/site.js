/* Author: Ousmana Tunkara · github.com/Kodelack47 · NYC Photography */
/* Shared on every page: phone menu, footer year, and the cart (saved in localStorage). */

const Cart = (() => {
  const KEY = "nycp-cart";

  function read() {
    try {
      const data = JSON.parse(localStorage.getItem(KEY));
      return Array.isArray(data) ? data : [];
    } catch (e) {
      return [];
    }
  }

  function write(items) {
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch (e) {
      /* storage blocked (e.g. private mode): the cart just won't persist */
    }
    updateBadge();
  }

  function count() {
    return read().reduce((sum, item) => sum + item.qty, 0);
  }

  function add(id) {
    const items = read();
    const found = items.find((i) => i.id === id);
    if (found) found.qty = Math.min(found.qty + 1, 10);
    else items.push({ id, qty: 1 });
    write(items);
  }

  function setQty(id, qty) {
    const items = read()
      .map((i) => (i.id === id ? { ...i, qty: Math.max(0, Math.min(qty, 10)) } : i))
      .filter((i) => i.qty > 0);
    write(items);
  }

  function clear() {
    write([]);
  }

  function updateBadge() {
    document.querySelectorAll(".cart-count").forEach((badge) => {
      badge.textContent = count();
    });
  }

  return { read, add, setQty, clear, count, updateBadge };
})();

function showToast(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    toast.setAttribute("role", "status");
    document.body.append(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2200);
}

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? "Close" : "Menu";
    });
  }

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  Cart.updateBadge();
});
