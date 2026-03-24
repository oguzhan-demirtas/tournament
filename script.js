const stories = [
  {
    key: "loop-2359",
    title: "Loop 23:59",
    category: "mystery",
    description: "You wake up at 23:59 again and again. Every choice brings you closer to the truth you tried to bury.",
    cover: createStoryCover("LOOP 23:59", "MYSTERY"),
    type: "branch"
  },
  {
    key: "chronicles-of-aethel",
    title: "Chronicles of Aethel",
    category: "fantasy",
    description: "Enter an ancient kingdom where every choice changes your fate.",
    cover: createStoryCover("AETHEL", "FANTASY"),
    type: "tournament",
    items: [
      { id: 1, name: "Knight", image: createItemCover("Knight") },
      { id: 2, name: "Mage", image: createItemCover("Mage") },
      { id: 3, name: "Dragon", image: createItemCover("Dragon") },
      { id: 4, name: "Forest", image: createItemCover("Forest") },
      { id: 5, name: "Crown", image: createItemCover("Crown") },
      { id: 6, name: "Sword", image: createItemCover("Sword") },
      { id: 7, name: "Castle", image: createItemCover("Castle") },
      { id: 8, name: "Oracle", image: createItemCover("Oracle") }
    ]
  },
  {
    key: "neon-shadows",
    title: "Neon Shadows",
    category: "sci-fi",
    description: "A cyber city full of secrets, danger, and impossible decisions.",
    cover: createStoryCover("NEON SHADOWS", "SCI-FI"),
    type: "tournament",
    items: [
      { id: 1, name: "Android", image: createItemCover("Android") },
      { id: 2, name: "Hacker", image: createItemCover("Hacker") },
      { id: 3, name: "Drone", image: createItemCover("Drone") },
      { id: 4, name: "Neon Alley", image: createItemCover("Neon Alley") },
      { id: 5, name: "Data Core", image: createItemCover("Data Core") },
      { id: 6, name: "Mercenary", image: createItemCover("Mercenary") },
      { id: 7, name: "AI", image: createItemCover("AI") },
      { id: 8, name: "Ship", image: createItemCover("Ship") }
    ]
  },
  {
    key: "spellbound",
    title: "Spellbound",
    category: "mystery",
    description: "A forgotten library, hidden symbols, and a secret that should stay buried.",
    cover: createStoryCover("SPELLBOUND", "MYSTERY"),
    type: "tournament",
    items: [
      { id: 1, name: "Key", image: createItemCover("Key") },
      { id: 2, name: "Mirror", image: createItemCover("Mirror") },
      { id: 3, name: "Book", image: createItemCover("Book") },
      { id: 4, name: "Door", image: createItemCover("Door") },
      { id: 5, name: "Lantern", image: createItemCover("Lantern") },
      { id: 6, name: "Clock", image: createItemCover("Clock") },
      { id: 7, name: "Whisper", image: createItemCover("Whisper") },
      { id: 8, name: "Mask", image: createItemCover("Mask") }
    ]
  },
  {
    key: "echoes-of-eternity",
    title: "Echoes of Eternity",
    category: "horror",
    description: "Something ancient is calling you from the dark. Will you answer?",
    cover: createStoryCover("ECHOES", "HORROR"),
    type: "tournament",
    items: [
      { id: 1, name: "Skull", image: createItemCover("Skull") },
      { id: 2, name: "Shadow", image: createItemCover("Shadow") },
      { id: 3, name: "Ritual", image: createItemCover("Ritual") },
      { id: 4, name: "Candle", image: createItemCover("Candle") },
      { id: 5, name: "Corridor", image: createItemCover("Corridor") },
      { id: 6, name: "Scream", image: createItemCover("Scream") },
      { id: 7, name: "Fog", image: createItemCover("Fog") },
      { id: 8, name: "Curse", image: createItemCover("Curse") }
    ]
  }
];

let filteredStories = [...stories];
let selectedStory = null;
let currentItems = [];
let nextRound = [];
let currentIndex = 0;
let activeCategory = "all";

function createStoryCover(title, category) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="900" height="600" viewBox="0 0 900 600">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#1a1333"/>
          <stop offset="50%" stop-color="#1d3557"/>
          <stop offset="100%" stop-color="#0b1320"/>
        </linearGradient>
        <radialGradient id="glow" cx="30%" cy="25%" r="45%">
          <stop offset="0%" stop-color="rgba(206,147,255,0.55)"/>
          <stop offset="100%" stop-color="rgba(206,147,255,0)"/>
        </radialGradient>
      </defs>
      <rect width="900" height="600" fill="url(#bg)"/>
      <rect width="900" height="600" fill="url(#glow)"/>
      <text x="60" y="120" fill="#ffd2b0" font-size="28" font-family="Arial">OAK STORIES</text>
      <text x="60" y="300" fill="#f5e8ff" font-size="64" font-weight="700" font-family="Arial">${escapeHtml(title)}</text>
      <text x="60" y="360" fill="#d9c6ff" font-size="28" font-family="Arial">${escapeHtml(category)}</text>
    </svg>
  `;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function createItemCover(name) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="700" height="700" viewBox="0 0 700 700">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#24143f"/>
          <stop offset="100%" stop-color="#0f2536"/>
        </linearGradient>
      </defs>
      <rect width="700" height="700" rx="40" fill="url(#bg)"/>
      <circle cx="350" cy="240" r="120" fill="rgba(255,255,255,0.08)"/>
      <text x="350" y="420" text-anchor="middle" fill="#f5e8ff" font-size="48" font-weight="700" font-family="Arial">${escapeHtml(name)}</text>
    </svg>
  `;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function showScreen(screenId) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });
  document.getElementById(screenId).classList.add("active");
}

function renderStories(data = filteredStories) {
  const grid = document.getElementById("story-grid");
  grid.innerHTML = "";

  data.forEach(story => {
    const card = document.createElement("div");
    card.className = "story-card";
    card.innerHTML = `
      <img src="${story.cover}" alt="${story.title}">
      <div class="story-overlay">
        <span class="story-tag">${story.category.toUpperCase()}</span>
        <h4>${story.title}</h4>
        <button onclick="openStory('${story.key}')">Open Story</button>
      </div>
    `;
    grid.appendChild(card);
  });

  if (data.length === 0) {
    grid.innerHTML = `<p class="empty-text">No stories found.</p>`;
  }
}

function openStory(storyKey) {
  selectedStory = stories.find(story => story.key === storyKey);
  if (!selectedStory) return;

  document.getElementById("detail-image").src = selectedStory.cover;
  document.getElementById("detail-title").innerText = selectedStory.title;
  document.getElementById("detail-description").innerText = selectedStory.description;
  document.getElementById("detail-category").innerText = selectedStory.category.toUpperCase();

  const startButton = document.querySelector("#story-detail-screen .detail-info button");
  if (startButton) {
    startButton.textContent = selectedStory.type === "branch" ? "Play Story" : "Start Tournament";
  }

  showScreen("story-detail-screen");
}

function goHome() {
  showScreen("home-screen");
}

function filterByCategory(category) {
  activeCategory = category;

  document.querySelectorAll(".cat-btn").forEach(btn => btn.classList.remove("active-cat"));
  const clickedButton = [...document.querySelectorAll(".cat-btn")].find(
    btn => btn.textContent.toLowerCase() === category || (category === "all" && btn.textContent === "ALL")
  );
  if (clickedButton) clickedButton.classList.add("active-cat");

  applyFilters();
}

function filterStories() {
  applyFilters();
}

function applyFilters() {
  const searchValue = document.getElementById("search-input").value.toLowerCase().trim();

  filteredStories = stories.filter(story => {
    const matchesCategory = activeCategory === "all" || story.category === activeCategory;
    const matchesSearch =
      story.title.toLowerCase().includes(searchValue) ||
      story.description.toLowerCase().includes(searchValue) ||
      story.category.toLowerCase().includes(searchValue);

    return matchesCategory && matchesSearch;
  });

  renderStories(filteredStories);
}

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function getRandomEightItems(items) {
  return shuffleArray(items).slice(0, 8);
}

function startGame() {
  if (!selectedStory) return;

  if (selectedStory.type === "branch") {
    window.location.href = "23_59story/story.html";
    return;
  }

  currentItems = getRandomEightItems(selectedStory.items);
  currentItems = shuffleArray(currentItems);
  nextRound = [];
  currentIndex = 0;

  showScreen("match-screen");
  showMatch();
}

function showMatch() {
  const item1 = currentItems[currentIndex];
  const item2 = currentItems[currentIndex + 1];

  if (!item1 || !item2) return;

  document.getElementById("img1").src = item1.image;
  document.getElementById("name1").innerText = item1.name;

  document.getElementById("img2").src = item2.image;
  document.getElementById("name2").innerText = item2.name;

  updateRoundTitle();

  document.querySelectorAll(".card").forEach(card => card.classList.remove("selected"));
}

function updateRoundTitle() {
  const length = currentItems.length;
  let title = "Tournament";

  if (length === 8) title = "Quarter Final";
  else if (length === 4) title = "Semi Final";
  else if (length === 2) title = "Final";

  document.getElementById("round-title").innerText = `${selectedStory.title} • ${title}`;
}

function selectWinner(choice) {
  const cards = document.querySelectorAll(".card");
  cards.forEach(card => card.classList.remove("selected"));
  if (cards[choice]) cards[choice].classList.add("selected");

  const winner = choice === 0 ? currentItems[currentIndex] : currentItems[currentIndex + 1];
  nextRound.push(winner);
  currentIndex += 2;

  setTimeout(() => {
    if (currentIndex >= currentItems.length) {
      startNextRound();
    } else {
      showMatch();
    }
  }, 300);
}

function startNextRound() {
  currentItems = [...nextRound];
  nextRound = [];
  currentIndex = 0;

  if (currentItems.length === 1) {
    showWinner();
  } else {
    showMatch();
  }
}

function showWinner() {
  const winner = currentItems[0];
  document.getElementById("winner-img").src = winner.image;
  document.getElementById("winner-name").innerText = winner.name;
  showScreen("result-screen");
}

function playAgain() {
  if (!selectedStory) return;
  openStory(selectedStory.key);
}

renderStories();