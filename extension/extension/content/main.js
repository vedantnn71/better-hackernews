const xmlns = "http://www.w3.org/2000/svg";

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

// Function to replace favicon (to reduce red dots)
const changeFavicon = () => {
  const currentFavicons = document.querySelectorAll('[rel="shortcut icon"]');
  currentFavicons.forEach((item) => {
    item && item.remove();
  });

  const head = document.querySelector("head");
  const faviconLink = document.createElement("link");
  faviconLink.id = "replacedFavicon";
  faviconLink.rel = "shortcut icon";
  faviconLink.href = chrome.runtime.getURL("content/hn.ico");

  head.appendChild(faviconLink);
};

// remove the default hn navbar
function removeNav() {
  const nav = document.querySelector("td[bgcolor='#ff6600']");
  nav && nav.remove();
}

function addCustomNav() {
  const nav = document.createElement("nav");
  nav.id = "nav";
  nav.innerHTML = `
<a href="/" class="logo">
  <img
    src="${chrome.runtime.getURL("content/hn.svg")}"
    alt="Hacker News Logo"
    class="logo-img"
  />
  <p class="logo-text">Hacker News</p>
</a>

<div class="links-container">
    <a href="https://news.ycombinator.com/" class="link">
      Top         
    </a>
    <a href="https://news.ycombinator.com/newest" class="link">
      New
    </a>
    <a href="https://news.ycombinator.com/show" class="link">
      Show
    </a>
    <a href="https://news.ycombinator.com/ask" class="link">
      Ask
    </a>
    <a href="https://news.ycombinator.com/jobs" class="link">
      Jobs
    </a>
    <a href="https://news.ycombinator.com/submit" class="link">
      Submit
    </a>

  <div class="seperator"></div>

  <button class="toggle-theme">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="toggle-theme-icon"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
        />
      </svg>
      <span class="ml-2">Light</span>
  </button>
</div>

<button class="menu-btn">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="menu-icon"
  >
    <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
</button>
`;
  document.body.prepend(nav);
}

changeFavicon();
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
addStylesheets();
removeNav();
addCustomNav();
