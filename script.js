const items = [
    { id: 1, name: "Kebap", image: "images/kebap.jpg" },
    { id: 2, name: "Mantı", image: "images/mant.jpg" },
    { id: 3, name: "Döner", image: "images/doner.jpg" },
    { id: 4, name: "Lahmacun", image: "images/lahmacun.jpg" },
    { id: 5, name: "Gözleme", image: "images/gozleme.jpg" },
    { id: 6, name: "Pide", image: "images/pide.jpg" },
    { id: 7, name: "SucukEkmek", image: "images/sucuk_ekmek.jpg" },
    { id: 8, name: "İskender", image: "images/İskender.jpg" },
    { id: 9, name: "BalıkEkmek", image: "images/balik_ekmek.jpg" },
    { id: 10, name: "Beyti", image: "images/Beyti.jpg" }
];
let currentItems = [];
let nextRound = [];
let currentIndex = 0;
function startGame() {
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("match-screen").style.display = "block";

    currentItems = [...items];
    currentIndex = 0;
    nextRound = [];

    showMatch();
}
function showMatch() {
    let item1 = currentItems[currentIndex];
    let item2 = currentItems[currentIndex + 1];

    document.getElementById("img1").src = item1.image;
    document.getElementById("name1").innerText = item1.name;

    document.getElementById("img2").src = item2.image;
    document.getElementById("name2").innerText = item2.name;

    updateRoundTitle();
}
function updateRoundTitle() {
    let length = currentItems.length;

    let title = "";

    if (length === 8) title = "Quarter Final";
    else if (length === 4) title = "Semi Final";
    else if (length === 2) title = "Final";

    document.getElementById("round-title").innerText = title;
}
function selectWinner(choice) {
    let winner;

    if (choice === 0) {
        winner = currentItems[currentIndex];
    } else {
        winner = currentItems[currentIndex + 1];
    }

    nextRound.push(winner);
    currentIndex += 2;

    if (currentIndex >= currentItems.length) {
        nextRoundStart();
    } else {
        showMatch();
    }
}
function nextRoundStart() {
    currentItems = nextRound;
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
    document.getElementById("result-screen").style.display = "block";

    let winner = currentItems[0];

    document.getElementById("winner-img").src = winner.image;
    document.getElementById("winner-name").innerText = winner.name;
}
function restart() {
    location.reload();
}