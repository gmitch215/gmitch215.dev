let index_strs = [
    "Isn't afraid of OOP",
    "Loves to code",
    "Is a fan of Rocket League",
    "Hates Boilerplate",
    "Enjoyer of Java",
    "Wants to Learn",
    "JoJo's Bizarre Adventure: Stardust Crusaders",
    "Enjoyer of Kotlin",
    "Super Mario Galaxy",
    "Runs an ok 1600m"
]

function getTheme() {
    let theme = "dark";

    if (localStorage.getItem("theme") && localStorage.getItem("theme") === "dark") theme = "dark";
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) theme = "dark";

    if (document.cookie.indexOf("theme=dark") > -1) theme = "dark";
    else if (document.cookie.indexOf("theme=light") > -1) theme = "light";

    return theme;
}

function switchTheme() {
    let theme = getTheme() === "light" ? "dark" : "light";
    loadTheme(theme);
}

function getThemeIcon(theme) {
    if (theme === "light") return "assets/sun.png";
    else return "assets/moon.png";
}

function loadTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    document.cookie = "theme=" + theme + "; SameSite=None; Secure";

    document.getElementById("theme-icon").src = getThemeIcon(theme);
}

document.onload = function(e) {
    document.documentElement.setAttribute("data-theme", getTheme());
}

document.onreadystatechange = function() {
    document.getElementById("theme-icon").src = getThemeIcon(getTheme());
    loadTheme(getTheme());
}

window.onload = async function() {
    $("#index-subtitle").text(index_strs[Math.floor(Math.random() * index_strs.length)]);
    setInterval(function () {
        $("#index-subtitle").text(index_strs[Math.floor(Math.random() * index_strs.length)]);
    }, 5000);

    $("#repos").text("📦 " + await getRepos() + " Repositories");
    $("#stars").text("⭐ " + (await getStars()).toLocaleString("en-US") + " Stars");

    $("#downloads").text("📥 " + (await getDownloads()).toLocaleString("en-US") + " Downloads");
}

const cache = {
    repos: -1,
    downloads: -1,
    stars: -1,
}

async function getRepos() {
    if (cache.repos !== -1) return cache.repos;
    let repos = 0;
    let url = "https://api.github.com/users/gmitch215/repos";
    let data = JSON.parse(await makeRequest(url));

    for (let i = 0; i < data.length; i++) repos++;

    cache.repos = repos;
    return cache.repos
}

async function getDownloads() {
    if (cache.downloads !== -1) return cache.downloads;
    let downloads = 0

    // Legacy Minecraft Downloads
    let url1 = "https://api.spiget.org/v2/authors/1229877/resources"
    let data1 = JSON.parse(await makeRequest(url1))
    for (let i = 0; i < data1.length; i++) downloads += data1[i].downloads;

    let url2 = "https://api.modrinth.com/v2/user/gmitch215/projects"
    let data2 = JSON.parse(await makeRequest(url2))
    for (let i = 0; i < data2.length; i++) downloads += data2[i].downloads;

    // GitHub Releases Downloads
    let repos = "https://api.github.com/users/gmitch215/repos";
    let repoData = JSON.parse(await makeRequest(repos));

    let releases = [];
    for (let i = 0; i < repoData.length; i++) {
        let repo = repoData[i];
        releases.push(getReleasesDownloads(repo.releases_url));
    }
    const counts = await Promise.all(releases);
    downloads += counts.reduce((a, b) => a + b, 0);

    cache.downloads = downloads;
    return cache.downloads;
}

async function getReleasesDownloads(url) {
    const url0 = url.replace("{/id}", "");
    let data = JSON.parse(await makeRequest(url0));
    if (data.length === 0) return 0;

    async function getReleaseDownloads(data) {
        let downloads = 0;
        for (let i = 0; i < data.assets.length; i++) {
            downloads += data.assets[i].download_count;
        }

        return downloads
    }

    let downloads = [];
    for (let i = 0; i < data.length; i++) {
        let release = data[i];
        downloads.push(getReleaseDownloads(release));
    }

    const counts = await Promise.all(downloads);
    return counts.reduce((a, b) => a + b, 0);
}

async function getStars() {
    if (cache.stars !== -1) return cache.stars;
    let stars = 0;

    let url = "https://api.github.com/users/gmitch215/repos";
    let data = JSON.parse(await makeRequest(url));
    for (let i = 0; i < data.length; i++) stars += data[i].stargazers_count;

    cache.stars = stars;
    return cache.stars
}

function makeRequest(url) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();

        xhr.open("GET", url);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });
}