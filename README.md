# NYC Photography

A storefront for a fine-art city photography studio: browse an exhibition of 16 prints from New
York and around the world, add them to a cart, and check out. It's built with **HTML, CSS, and
vanilla JavaScript** and works on phones, tablets, and desktops.

**[View the live site →](https://kodelack47.github.io/NYC-Photography/)**

## Features

- **Exhibition:** 16 prints with titles, locations, captions, and prices, filterable by
  *New York*, *United States*, and *World*.
- **Cart that remembers:** add prints from any page. The cart is saved in `localStorage`, so it
  survives page changes and refreshes, and a live count shows in the header.
- **Checkout:** change quantities, remove items, and see the subtotal, shipping, and total update
  instantly. The shipping form is validated. It's a demo, so **no payment details are collected**.
- **Forms with validation:** contact, log in, and registration each show a clear message under
  the field that needs fixing (registration also checks password strength and that both
  passwords match).
- **Responsive:** a Menu button on phones, layouts for tablet and desktop, and photos resized
  for the web (18 MB down to 3.2 MB).

## Pages

| Page | File |
|---|---|
| Home | `index.html` |
| Exhibition | `Exhibition.html` |
| Cart and checkout | `checkout.html` |
| Contact and policies | `Contact.html` |
| Log in | `login.html` |
| Create an account | `user-reg.html` |

## How it's built

| File | What it does |
|---|---|
| `styles/site.css` | One stylesheet for every page, with breakpoints at 960, 760, and 480px |
| `scripts/prints.js` | The print catalog (title, place, collection, price, image, caption) |
| `scripts/site.js` | Phone menu, footer year, and the `Cart` module (localStorage) |
| `scripts/gallery.js` | Renders print cards, the featured prints, and the collection filters |
| `scripts/checkout.js` | Cart lines, quantity controls, totals, and the checkout form |
| `scripts/forms.js` | Shared validation for the checkout, contact, log in, and registration forms |

All catalog text is inserted with `textContent`, not as raw HTML.

## Run it locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Author

**Ousmana Tunkara** · [GitHub @Kodelack47](https://github.com/Kodelack47)

Licensed under the [MIT License](LICENSE).
