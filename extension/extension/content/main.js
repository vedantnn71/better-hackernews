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
  menuIcon: menuIconElement(),
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

  const navLinks = elements
    .navLinks
    .cloneNode(true);

  navLinks.classList += " mobile-menu-links";
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

changeFavicons();
addStylesheets();
removeNav();
addMobileMenu();
addCustomNav();
