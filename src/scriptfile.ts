const scriptHtml = document.getElementById("script")

if (scriptHtml) {
        // Main.ts
        const mainTs = document.createElement("script") as HTMLScriptElement
        mainTs.src = "src/main.ts"

        // services-api.ts
        const ApiTs = document.createElement("script") as HTMLScriptElement
        ApiTs.src = "src/services/api.ts"

        // FlowBite plugin
        const flowBite = document.createElement("script") as HTMLScriptElement
        flowBite.src = "../node_modules/flowbite/dist/flowbite.min.js"

        // componentsNavbar
        const navHtml = document.createElement("script") as HTMLScriptElement
        navHtml.src = "src/components/navbar.ts"

        const scripts: HTMLScriptElement[] = [mainTs, ApiTs, flowBite, navHtml]

        scripts.forEach(s => {
                scriptHtml?.appendChild(s)
        });
}


