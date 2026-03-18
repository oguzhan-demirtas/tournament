const items = [
    { id: 1, name: "Kebap", image: "images/Kebap.jpg" },
    { id: 2, name: "Mantı", image: "images/mant.jpg" },
    { id: 3, name: "Döner", image: "images/doner.jpg" },
    { id: 4, name: "Lahmacun", image: "images/lahmacun.jpg" },
    { id: 5, name: "Gözleme", image: "images/gozleme.jpg" },
    { id: 6, name: "Pide", image: "images/pide.jpg" },
    { id: 7, name: "Sucuk Ekmek", image: "images/sucuk_ekmek.jpg" },
    { id: 8, name: "İskender", image: "images/iskender.jpg" },
    { id: 9, name: "Balık Ekmek", image: "images/balik_ekmek.jpg" },
    { id: 10, name: "Beyti", image: "images/Beyti.jpg" }
];

let currentItems = [];
let nextRound = [];
let currentIndex = 0;

function shuffleArray(array) {
    let shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
}

function getRandomEightItems() {
    const shuffled = shuffleArray(items);
    return shuffled.slice(0, 8);
}

function startGame() {
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("result-screen").style.display = "none";
    document.getElementById("match-screen").style.display = "flex";

    currentItems = getRandomEightItems();
    currentItems = shuffleArray(currentItems);

    nextRound = [];
    currentIndex = 0;

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

    const cards = document.querySelectorAll(".card");
    cards.forEach(card => card.classList.remove("selected"));
}

function updateRoundTitle() {
    const length = currentItems.length;
    let title = "";

    if (length === 8) {
        title = "Quarter Final";
    } else if (length === 4) {
        title = "Semi Final";
    } else if (length === 2) {
        title = "Final";
    } else {
        title = "Tournament";
    }

    document.getElementById("round-title").innerText = title;
}

function selectWinner(choice) {
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => card.classList.remove("selected"));

    if (cards[choice]) {
        cards[choice].classList.add("selected");
    }

    const winner = choice === 0
        ? currentItems[currentIndex]
        : currentItems[currentIndex + 1];

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
    document.getElementById("match-screen").style.display = "none";
    document.getElementById("result-screen").style.display = "flex";

    const winner = currentItems[0];
    document.getElementById("winner-img").src = winner.image;
    document.getElementById("winner-name").innerText = winner.name;
}

function restart() {
    document.getElementById("result-screen").style.display = "none";
    document.getElementById("start-screen").style.display = "flex";

    currentItems = [];
    nextRound = [];
    currentIndex = 0;
}

function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    const menuIcon = document.querySelector(".menu-icon");

    sidebar.classList.toggle("active");
    menuIcon.classList.toggle("active");
}