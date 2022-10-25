const xmlns = "http://www.w3.org/2000/svg";

function setTheme(theme) {
  const html = document.querySelector("html");
  html.classList = theme;
}

function getTheme() {
  chrome.storage.sync.get(["theme"], (result) => {
    setTheme(result.theme);
  });
}

function toTitleCase(str) {
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

// Utility function to remove DOM element
const removeElement = (id) => {
  const element = document.getElementById(id);
  element && element.remove();
};

// Utility function to inject CSS into page
const addStyles = (id, css) => {
  // First remove before adding
  removeElement(id);

  const head = document.querySelector("head");
  const style = document.createElement("style");
  style.id = id;
  style.textContent = `${css}`;
  head.appendChild(style);
};

// Function to add main stylesheet
const addStylesheets = () => {
  const head = document.querySelector("head");
  const mainStylesheet = document.createElement("link");
  mainStylesheet.rel = "stylesheet";
  mainStylesheet.type = "text/css";
  mainStylesheet.href = chrome.runtime.getURL("content/dist/main.css");
  head.appendChild(mainStylesheet);

  const additionsStylesheet = document.createElement("link");
  additionsStylesheet.rel = "stylesheet";
  additionsStylesheet.type = "text/css";
  additionsStylesheet.href = chrome.runtime.getURL("content/additions.css");
  head.appendChild(additionsStylesheet);
};

// Function to replace favicons (to reduce red dots)
const changeFavicons = () => {
  const currentFaviconss = document.querySelectorAll('[rel="shortcut icons"]');
  currentFaviconss.forEach((item) => {
    item && item.remove();
  });

  const head = document.querySelector("head");
  const faviconsLink = document.createElement("link");
  faviconsLink.id = "replacedFavicons";
  faviconsLink.rel = "shortcut icons";
  faviconsLink.href = chrome.runtime.getURL("content/hn.ico");

  head.appendChild(faviconsLink);
};

// remove the default hn navbar
function removeNav() {
  const nav = document.querySelector("td[bgcolor='#ff6600']");
  nav && nav.remove();
}

const elements = {
  logo: logoElement(),
  navLinks: navLinksElement(),
  seperator: seperatorElement(),
  toggleTheme: toggleThemeElement(),
  moonIcon: moonIconElement(),
  sunIcon: sunIconElement(),
  menuIcon: menuIconElement()
};

function addCustomNav() {
  const nav = document.createElement("nav");
  const rightContainer = document.createElement("div");
  const menuIcon = elements.menuIcon;

  menuIcon.addEventListener("click", () => {
    const linksContainer = document.querySelector(".mobile-menu");
    linksContainer.classList.toggle("hide");
  });

  rightContainer.classList += "nav-right-container";

  rightContainer.appendChild(elements.navLinks);
  rightContainer.appendChild(menuIcon);
  rightContainer.appendChild(elements.seperator);
  rightContainer.appendChild(elements.toggleTheme);

  nav.prepend(elements.logo);
  nav.appendChild(rightContainer);

  document.body.prepend(nav);
}

function addMobileMenu() {
  const mobileMenu = document.createElement("div");
  mobileMenu.classList += "mobile-menu";

  const navLinks = elements.navLinks.cloneNode(true);

  navLinks.classList += " hide mobile-menu-links";
  mobileMenu.appendChild(navLinks);

  document.body.prepend(mobileMenu);
}

function logoElement() {
  const logoContainer = document.createElement("a");
  logoContainer.href = "/";
  logoContainer.classList += "logo";

  const logoImage = document.createElement("img");
  logoImage.src = chrome.runtime.getURL("content/hn.svg");
  logoImage.alt = "Hacker News";
  logoImage.classList += "logo-img";

  const logoText = document.createElement("p");
  logoText.innerText = "Hacker News";
  logoText.classList += "logo-text";

  logoContainer.appendChild(logoImage);
  logoContainer.appendChild(logoText);

  return logoContainer;
}

function moreItemsButtonElement() {
  const link = document.querySelector("a.morelink").href;

  const button = document.createElement("a");
  button.classList += "more-button";
  button.innerText = "More";
  button.href = link;

  return button;
}

function navLinksElement() {
  const links = {
    top: "https://news.ycombinator.com/",
    new: "https://news.ycombinator.com/newest",
    show: "https://news.ycombinator.com/show",
    ask: "https://news.ycombinator.com/ask",
    jobs: "https://news.ycombinator.com/jobs",
    submit: "https://news.ycombinator.com/submit"
  };

  const linksContainer = document.createElement("div");
  linksContainer.classList += "links-container";

  Object.keys(links).forEach((key) => {
    const link = document.createElement("a");
    link.classList += "link";
    link.href = links[key];
    link.innerText = key.charAt(0).toUpperCase() + key.slice(1);
    linksContainer.appendChild(link);
  });

  return linksContainer;
}

function hideHNItems() {
  const container = document.querySelector("center");
  container.classList += "hide";
}

// scrap hn items from the page
function getItems() {
  const items = document.querySelectorAll("tr.athing");
  const ids = [];

  items.forEach((item) => {
    const id = item.id;
    ids.push(id);
  });

  return ids;
}

// scrap data for each item from the page
function getItem(id) {
  const item = document.getElementById(id);
  const title = item.querySelector("td.title span.titleline a");
  const url = title ? title.href : "#";
  const titleText = title.innerText;

  const metadataContainer = item.nextSibling;
  const points = metadataContainer.querySelector(`#score_${id}`);
  const user = metadataContainer.querySelector("td.subtext a.hnuser");
  const time = metadataContainer.querySelector("td.subtext a:last-child");
  const comments = metadataContainer.querySelectorAll(`a[href*="item?id=${id}"]`)[1]; // a bit hacky but works
  const upvoteLinkElement = document.querySelector(`#up_${id}`);
  let isUpvoted = false;
  let upvoteLink = "";

  if (upvoteLinkElement !== null) {
    isUpvoted = upvoteLinkElement.classList.contains("nosee");

    if (isUpvoted) {
      upvoteLink = upvoteLinkElement.href.replace("how=up", "how=un");
    }

    upvoteLink = upvoteLinkElement.href;

    // remove &goto=* from the href
    //upvoteLink = upvoteLinkElement.href.replace(/goto=.*/, "");
  }

  return {
    id,
    url,
    title: titleText,
    points: points !== null ? points.innerText : 0,
    user: user !== null ? user.innerText : null,
    time: time !== null ? time.innerText : null,
    comments: comments ? comments.innerText : null,
    upvoteLink,
    isUpvoted
  };
}

function bulletElement() {
  const bullet = document.createElement("span");
  bullet.classList += "bullet";
  bullet.innerText = "•";

  return bullet;
}

function pointsElement(points) {
  const pointsContainer = document.createElement("div");
  pointsContainer.classList += "metadata points-container";

  const pointsElem = document.createElement("p");
  pointsElem.classList += "points";
  pointsElem.innerText = points;

  pointsContainer.appendChild(pointsElem);

  return pointsContainer;
}

function userElement(id) {
  const userContainer = document.createElement("a");
  userContainer.classList += "metadata user-container";
  userContainer.href = `https://news.ycombinator.com/user?id=${id}`;

  const user = document.createElement("p");
  user.classList += "user";
  user.innerText = id;

  userContainer.appendChild(user);

  return userContainer;
}

function timeElement(time) {
  const timeContainer = document.createElement("div");
  timeContainer.classList += "metadata time-container";

  const timeElem = document.createElement("p");
  timeElem.classList += "time";
  timeElem.innerText = toTitleCase(time);

  timeContainer.appendChild(timeElem);

  return timeContainer;
}

function itemCommentsElement(comments) {
  const commentsContainer = document.createElement("div");
  commentsContainer.classList += "metadata comments-container";

  const commentsElem = document.createElement("p");
  commentsElem.classList += "comments";
  commentsElem.innerText = toTitleCase(comments);

  commentsContainer.appendChild(commentsElem);

  return commentsContainer;
}

function itemElement(item) {
  const itemContainer = document.createElement("a");
  itemContainer.href = `/item?id=${item.id}`;
  itemContainer.classList += "metadata item-container";

  const itemHeader = document.createElement("div");
  itemHeader.classList += "item-header";

  const upvoteLink = document.createElement("a");
  upvoteLink.classList += "upvote-link";
  upvoteLink.href = item.upvoteLink;

  let upvoteIcon = upvoteIconElement();

  if (item.isUpvoted) {
    upvoteIcon.classList += " upvoted";
  }

  upvoteIcon.classList += " upvote-icon";
  upvoteLink.appendChild(upvoteIcon);

  const itemTitle = document.createElement("a");
  itemTitle.classList += "item-title";
  itemTitle.href = item.url;
  itemTitle.innerText = item.title;

  itemHeader.appendChild(upvoteLink);
  itemHeader.appendChild(itemTitle);

  const itemMetadata = document.createElement("div");
  itemMetadata.classList += "item-metadata";

  if (item.points) {
    itemMetadata.appendChild(pointsElement(item.points));
    itemMetadata.appendChild(bulletElement());
  }

  if (item.user) {
    itemMetadata.appendChild(userElement(item.user));
    itemMetadata.appendChild(bulletElement());
  }

  if (item.comments) {
    const bullet = bulletElement();
    bullet.classList += " time-bullet";

    itemMetadata.appendChild(itemCommentsElement(item.comments));
    itemMetadata.appendChild(bullet);
  }

  itemMetadata.appendChild(timeElement(item.time));

  itemContainer.appendChild(itemHeader);
  itemContainer.appendChild(itemMetadata);

  return itemContainer;
}

// create the svg element with base attributes
function createSvg() {
  const svg = document.createElementNS(xmlns, "svg");
  svg.setAttributeNS(null, "viewBox", "0 0 24 24");
  svg.setAttributeNS(null, "fill", "none");
  svg.setAttributeNS(null, "stroke", "none");
  svg.setAttributeNS(null, "stroke-width", "1.5");
  svg.classList += "icon";

  return svg;
}

// create the path element with base attributes
function createPath() {
  const path = document.createElementNS(xmlns, "path");
  path.setAttributeNS(null, "stroke-linecap", "round");
  path.setAttributeNS(null, "stroke-linejoin", "round");

  return path;
}

function upvoteIconElement() {
  const svg = createSvg();
  const firstPath = createPath();
  const secondPath = createPath();

  firstPath.setAttributeNS(
    null,
    "d",
    "M3.37,12.36l7.86-9.44a1,1,0,0,1,1.54,0l7.86,9.44A1,1,0,0,1,19.86,14H16v6a2,2,0,0,1-2,2H10a2,2,0,0,1-2-2V14H4.14A1,1,0,0,1,3.37,12.36Z"
  );

  secondPath.setAttributeNS(
    null,
    "d",
    "M3.37,12.36l7.86-9.44a1,1,0,0,1,1.54,0l7.86,9.44A1,1,0,0,1,19.86,14H16v6a2,2,0,0,1-2,2H10a2,2,0,0,1-2-2V14H4.14A1,1,0,0,1,3.37,12.36Z"
  );

  svg.appendChild(firstPath);
  svg.appendChild(secondPath);

  return svg;
}

function upvotedIconElement() {
  const svg = createSvg();
  const path = createPath();
  path.setAttributeNS(
    null,
    "d",
    "M4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14z"
  );
  svg.appendChild(path);

  return svg;
}

function moonIconElement() {
  const svg = createSvg();
  const path = createPath();
  path.setAttributeNS(
    null,
    "d",
    "M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
  );

  svg.appendChild(path);

  return svg;
}

function sunIconElement() {
  const svg = createSvg();
  const path = createPath();
  path.setAttributeNS(
    null,
    "d",
    "M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
  );

  svg.appendChild(path);

  return svg;
}

function menuIconElement() {
  const svg = createSvg();
  const path = createPath();

  path.setAttributeNS(null, "d", "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5");
  svg.classList += " menu-icon stroke-current";
  svg.appendChild(path);

  return svg;
}

function seperatorElement() {
  const seperator = document.createElement("div");
  seperator.classList += "seperator";

  return seperator;
}

function toggleThemeElement() {
  const button = document.createElement("button");
  const currentTheme = getTheme();

  button.classList += "toggle-theme";

  if (currentTheme === "dark") {
    const icon = sunIconElement();
    button.prepend(icon);
  } else {
    const icon = sunIconElement();

    button.prepend(icon);
  }

  button.addEventListener("click", () => {
    chrome.storage.sync.get(["theme"], (result) => {
      const theme = result.theme === "dark" ? "light" : "dark";

      chrome.storage.sync.set({ theme }, () => {
        setTheme(theme);
      });
    });
  });

  return button;
}

function customizeItemsPage() {
  const itemsContainer = document.createElement("div");
  itemsContainer.classList += "items-container";

  getItems().forEach((id) => {
    const item = getItem(id);
    const itemElem = itemElement(item);

    itemsContainer.appendChild(itemElem);
  });

  document.body.appendChild(itemsContainer);
  document.body.appendChild(moreItemsButtonElement());
}

function customizePage() {
  const page = document.querySelector("html").getAttribute("op");

  if (
    page === "news" ||
    page === "newest" ||
    page === "jobs" ||
    page === "show" ||
    page === "ask"
  ) {
    customizeItemsPage();
  }
}

function resetPage() {
  changeFavicons();
  removeNav();
  hideHNItems();
}

function addCustomElements() {
  addMobileMenu();
  addCustomNav();
}

resetPage();
addStylesheets();
addCustomElements();
customizePage();
