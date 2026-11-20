/* Author: Ousmana Tunkara · github.com/Kodelack47 · NYC Photography */
/* Renders print cards. Used by the home page (featured prints) and the exhibition (all prints, with filters). */

function printCard(print) {
  const card = document.createElement("article");
  card.className = "print";

  const img = document.createElement("img");
  img.src = `images/${print.img}`;
  img.alt = `${print.title}, ${print.place}`;
  img.loading = "lazy";

  const body = document.createElement("div");
  body.className = "print-body";

  const place = document.createElement("p");
  place.className = "place";
  place.textContent = print.place;

  const title = document.createElement("h3");
  title.textContent = print.title;

  const caption = document.createElement("p");
  caption.textContent = print.caption;

  const foot = document.createElement("div");
  foot.className = "print-foot";
  const price = document.createElement("span");
  price.className = "price";
  price.textContent = `$${print.price}`;
  const button = document.createElement("button");
  button.type = "button";
  button.className = "btn btn-gold btn-small";
  button.textContent = "Add to cart";
  button.setAttribute("aria-label", `Add ${print.title} to cart`);
  button.addEventListener("click", () => {
    Cart.add(print.id);
    showToast(`Added “${print.title}” to your cart`);
  });
  foot.append(price, button);

  body.append(place, title, caption, foot);
  card.append(img, body);
  return card;
}

document.addEventListener("DOMContentLoaded", () => {
  // Home page: a few featured prints
  const featured = document.getElementById("featured");
  if (featured) {
    const ids = ["midtown-sunset", "paris-twilight", "hong-kong-harbour"];
    featured.replaceChildren(...ids.map((id) => printCard(PRINTS.find((p) => p.id === id))));
  }

  // Exhibition page: every print, filterable by collection
  const all = document.getElementById("prints");
  if (all) {
    const buttons = document.querySelectorAll("[data-collection]");
    const count = document.getElementById("print-count");

    function show(collection) {
      const list = collection === "All" ? PRINTS : PRINTS.filter((p) => p.collection === collection);
      all.replaceChildren(...list.map(printCard));
      count.textContent = `${list.length} ${list.length === 1 ? "print" : "prints"}`;
      buttons.forEach((b) => {
        const active = b.dataset.collection === collection;
        b.classList.toggle("active", active);
        b.setAttribute("aria-pressed", String(active));
      });
    }

    buttons.forEach((b) => b.addEventListener("click", () => show(b.dataset.collection)));
    show("All");
  }
});
