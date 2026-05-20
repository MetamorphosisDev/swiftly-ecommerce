import { corousel } from "../components/corousel"

function renderLandingPage() {
    const main = document.getElementById("main")
    if (!main) throw new Error("Error Page")

    main.innerHTML = `
        <div class="landing-page">
            <div id="carousel"></div>
        </div>
    `

    document.getElementById("carousel")?.appendChild(corousel())
}
renderLandingPage()