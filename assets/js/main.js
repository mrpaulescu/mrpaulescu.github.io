import footerCopyrightHandler from "../js/footer.js";

footerCopyrightHandler()

function handleCurrentYear() {
    const year = new Date().getFullYear()
    const currenYear = document.querySelector("#currentYear")

    currenYear.innerText = year
}

handleCurrentYear()