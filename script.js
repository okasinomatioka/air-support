const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".global-nav");

menuButton.addEventListener("click", () => {
  const open = menuButton.classList.toggle("is-open");
  nav.classList.toggle("is-open", open);
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuButton.classList.remove("is-open");
    nav.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      } else {
        entry.target.classList.remove("is-visible");
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

document.querySelectorAll(".value-card").forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.remove("is-active");
    window.requestAnimationFrame(() => {
      card.classList.add("is-active");
      window.setTimeout(() => card.classList.remove("is-active"), 700);
    });
  });
});

const contactForm = document.querySelector("#contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const category = String(formData.get("category") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const subject = `[air お問い合わせ] ${category || "ご相談"}`;
    const body = [
      "air ご担当者さま",
      "",
      "ホームページのお問い合わせフォームからご連絡します。",
      "",
      `お名前: ${name}`,
      `メールアドレス: ${email}`,
      `お電話番号: ${phone || "未記入"}`,
      `お問い合わせ種別: ${category || "未選択"}`,
      "",
      "お問い合わせ内容",
      message,
    ].join("\n");

    window.location.href = `mailto:sodatsukai.funabashi.in.house@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

const mapsApiKey = String(window.AIR_GOOGLE_MAPS_API_KEY || "").trim();

document.querySelectorAll(".detail-map").forEach((map) => {
  const query = map.dataset.mapQuery || "";
  const title = map.dataset.mapTitle || "Google Map";

  if (!mapsApiKey || !query) {
    return;
  }

  const iframe = document.createElement("iframe");
  iframe.title = title;
  iframe.loading = "lazy";
  iframe.referrerPolicy = "no-referrer-when-downgrade";
  iframe.allowFullscreen = true;
  iframe.src = `https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(mapsApiKey)}&q=${encodeURIComponent(query)}&language=ja&region=JP`;

  map.replaceChildren(iframe);
});
