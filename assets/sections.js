import { generateDropDowns } from "./dropdown.js"
import { generateParams, getMovies, getMovieIds, sortResults } from "./api.js"
import { generateBestMovie, generateRatedList, generateDropDownMovies } from "./html.js"

export async function generateBest() {
    const bestQueryParams = generateParams(20, "")
    const foundBestIds = await getMovieIds(bestQueryParams)
    sortResults(foundBestIds, 7)
    const bestMovies = await getMovies(foundBestIds)
    generateBestMovie(bestMovies[0])
    bestMovies.splice(0, 1)
    generateRatedList(bestMovies, "mieuxNotes")
}

export async function generateHist() {
    const historyQueryParams = generateParams(20, "History")
    const foundBestHist = await getMovieIds(historyQueryParams)
    sortResults(foundBestHist, 6)
    const bestHist = await getMovies(foundBestHist)
    generateRatedList(bestHist, "filmsHist")
}

export async function generateThrill() {
    const thrillerQueryParams =  generateParams(20, "Thriller")
    const foundBestThrill = await getMovieIds(thrillerQueryParams)
    sortResults(foundBestThrill, 6)
    const bestThrill = await getMovies(foundBestThrill)
    generateRatedList(bestThrill, "filmsThriller")
}

export async function generateAutres() {
    let chosenItems = await generateDropDowns()
    generateDropDownMovies(chosenItems)
}