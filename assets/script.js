import { generateBest, generateHist, generateThrill, generateAutres } from "./sections.js"

const main = async() => {
    await generateBest()
    await generateHist()
    await generateThrill()
    await generateAutres()
}

main()