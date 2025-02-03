// Night mode toggle
const toggleButton = document.getElementById("nightModeToggle");
const bodyElement = document.body;

toggleButton.addEventListener("click", function() {
    bodyElement.classList.toggle("night-mode");
    localStorage.setItem("nightMode", bodyElement.classList.contains("night-mode") ? "enabled" : "disabled");
});

if (localStorage.getItem("nightMode") === "enabled") {
    bodyElement.classList.add("night-mode");
}
