/* Author: Ousmana Tunkara · github.com/Kodelack47 · NYC Photography */
/* Checkout: shows the cart, lets you change quantities, and validates the shipping form.
   This is a portfolio demo: no payment is taken and nothing is sent anywhere. */

document.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById("cart-items");
  const totals = document.getElementById("totals");
  const form = document.getElementById("checkout-form");
  const confirmation = document.getElementById("confirmation");
  const SHIPPING = 12;
  const money = (n) => `$${n.toFixed(2)}`;

  function lines() {
    return Cart.read()
      .map((item) => ({ ...item, print: PRINTS.find((p) => p.id === item.id) }))
      .filter((line) => line.print);
  }

  function render() {
    const items = lines();
    list.replaceChildren();

    if (!items.length) {
      const empty = document.createElement("p");
      empty.className = "empty";
      empty.append("Your cart is empty. ");
      const link = document.createElement("a");
      link.href = "Exhibition.html";
      link.textContent = "Browse the exhibition";
      empty.append(link, ".");
      list.append(empty);
      totals.hidden = true;
      form.querySelector("button[type=submit]").disabled = true;
      return;
    }

    items.forEach(({ print, qty }) => {
      const row = document.createElement("div");
      row.className = "cart-item";

      const img = document.createElement("img");
      img.src = `images/${print.img}`;
      img.alt = "";

      const info = document.createElement("div");
      const name = document.createElement("h3");
      name.textContent = print.title;
      const controls = document.createElement("div");
      controls.className = "qty";
      const minus = document.createElement("button");
      minus.type = "button";
      minus.textContent = "−";
      minus.setAttribute("aria-label", `One less ${print.title}`);
      minus.addEventListener("click", () => { Cart.setQty(print.id, qty - 1); render(); });
      const amount = document.createElement("span");
      amount.textContent = qty;
      const plus = document.createElement("button");
      plus.type = "button";
      plus.textContent = "+";
      plus.setAttribute("aria-label", `One more ${print.title}`);
      plus.addEventListener("click", () => { Cart.setQty(print.id, qty + 1); render(); });
      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "remove";
      remove.textContent = "Remove";
      remove.addEventListener("click", () => { Cart.setQty(print.id, 0); render(); });
      controls.append(minus, amount, plus, remove);
      info.append(name, controls);

      const lineTotal = document.createElement("strong");
      lineTotal.className = "line-total";
      lineTotal.textContent = money(print.price * qty);

      row.append(img, info, lineTotal);
      list.append(row);
    });

    const subtotal = items.reduce((sum, { print, qty }) => sum + print.price * qty, 0);
    totals.hidden = false;
    totals.replaceChildren();
    [["Subtotal", money(subtotal)], ["Shipping", money(SHIPPING)], ["Total", money(subtotal + SHIPPING)]].forEach(
      ([label, value], i) => {
        const row = document.createElement("div");
        if (i === 2) row.className = "grand";
        const l = document.createElement("span");
        l.textContent = label;
        const v = document.createElement("span");
        v.textContent = value;
        row.append(l, v);
        totals.append(row);
      }
    );
    form.querySelector("button[type=submit]").disabled = false;
  }

  const rules = {
    name: (v) => (v.trim().length >= 2 ? "" : "Please enter your full name."),
    email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Please enter a valid email address."),
    address: (v) => (v.trim().length >= 5 ? "" : "Please enter a street address."),
    city: (v) => (v.trim() ? "" : "Please enter a city."),
    zip: (v) => (/^\d{5}(-\d{4})?$/.test(v.trim()) ? "" : "Please enter a 5-digit ZIP code."),
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!validate(form, rules)) return;
    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const count = Cart.count();
    Cart.clear();
    form.reset();
    render();
    confirmation.textContent = `Thank you, ${name}! Your order for ${count} ${count === 1 ? "print" : "prints"} is confirmed. A receipt would go to ${email}.`;
    confirmation.hidden = false;
    confirmation.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  render();
});
