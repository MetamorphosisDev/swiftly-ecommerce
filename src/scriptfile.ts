const scriptHtml = document.getElementById("script")

if (scriptHtml) {
        // Main.ts
        const mainTs = document.createElement("script") as HTMLScriptElement
        mainTs.src = "src/main.ts"

        const ApiTs = document.createElement("script") as HTMLScriptElement
        ApiTs.src = "src/services/api.ts"

        const scripts: HTMLScriptElement[] = [mainTs, ApiTs]

        scripts.forEach(s => {
                scriptHtml?.appendChild(s)
        });
}

