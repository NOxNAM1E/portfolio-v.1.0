const sidebar = document.querySelector("#sidebar");
const menuButton = document.querySelector(".menu-button");
const backdrop = document.querySelector("#sidebar-backdrop");
const searchInput = document.querySelector("#subscriber-search");
const subscribers = [...document.querySelectorAll(".subscriber")];
const emptySearch = document.querySelector("#empty-search");
const allSubscribersButton = document.querySelector("#all-subscribers");
const pageTitle = document.querySelector("#page-title");

function closeSidebar() {
  sidebar.classList.remove("open");
  backdrop.classList.remove("visible");
  menuButton.setAttribute("aria-expanded", "false");
}

menuButton.addEventListener("click", () => {
  const isOpen = sidebar.classList.toggle("open");
  backdrop.classList.toggle("visible", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

backdrop.addEventListener("click", closeSidebar);

document.querySelectorAll(".nav-item").forEach((item) => {
  item.addEventListener("click", () => {
    document.querySelector(".nav-item.active")?.classList.remove("active");
    item.classList.add("active");
    pageTitle.textContent = item.dataset.page;
    closeSidebar();
  });
});

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLocaleLowerCase("ru");
  let visibleCount = 0;

  subscribers.forEach((subscriber) => {
    const matches = subscriber.dataset.name.toLocaleLowerCase("ru").includes(query);
    subscriber.hidden = !matches;
    if (matches) visibleCount += 1;
  });

  emptySearch.hidden = visibleCount !== 0;
});

allSubscribersButton.addEventListener("click", () => {
  searchInput.value = "";
  subscribers.forEach((subscriber) => {
    subscriber.hidden = false;
  });
  emptySearch.hidden = true;
  searchInput.focus();
});
