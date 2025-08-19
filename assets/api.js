const baseUrl = "http://localhost:8000/api/v1/"
const titles = baseUrl + "titles/"
const genres = baseUrl + "genres/"


export const generateParams = (page_size_num, genre_string) => {
    const newParams = new URLSearchParams();
    newParams.append("sort_by", "-votes");
    newParams.append("page_size", page_size_num);
    newParams.append("genre", genre_string);
    const urlParams = newParams.toString()
    return urlParams
}

export const getMovieIds = async(queryParams) => {
    const response = await fetch(`${titles}?${queryParams}`)
    const data = await response.json()
    return data.results
};

export const getMovies = async(bestMoviesFound) => {
    const movieIds = []
    for (let i = 0; i < bestMoviesFound.length; i++) {
        movieIds.push(bestMoviesFound[i].id)
    }
    const bestMovies = []
    for (let i = 0; i < movieIds.length; i++) {
        const response = await fetch(`${titles}${movieIds[i]}`)
        const movieData = await response.json()
        bestMovies.push(movieData)
    }
    return bestMovies
}

export const getGenres = async() => {
    const newParamsGenres = new URLSearchParams();
    newParamsGenres.append("page_size", 25)
    const response = await fetch(`${genres}?${newParamsGenres}`)
    const data = await response.json()
    return data.results
}

export const getNewMovies = async(targetInnerText) => {
    let newAutreMovieParams = generateParams(20, targetInnerText)
    let foundNewAutreIds = await getMovieIds(newAutreMovieParams)
    sortResults(foundNewAutreIds, 6)
    let newAutreMovies = await getMovies(foundNewAutreIds)
    return newAutreMovies
}

export const getDropDownMovies = async(firstGenre, secondGenre) => {
    const firstAutreParams = generateParams(20, firstGenre)
    const bestAutre1Ids = await getMovieIds(firstAutreParams)
    sortResults(bestAutre1Ids, 6)
    const bestAutre1 = await getMovies(bestAutre1Ids)
    const secondAutreParams = generateParams(20, secondGenre)
    const bestAutre2Ids = await getMovieIds(secondAutreParams)
    sortResults(bestAutre2Ids, 6)
    const bestAutre2 = await getMovies(bestAutre2Ids)
    const bestAutres = [bestAutre1, bestAutre2]
    return bestAutres
}

export const sortResults = (movieIds, numberNeeded) => {
    movieIds.sort((a,b) => b.imdb_score - a.imdb_score)
    const ids = []
    for (let i = 0; i < movieIds.length; i++) {
        if (ids.includes(movieIds[i].id)) {
            movieIds.splice(i, 1)
        } else {
        ids.push(movieIds[i].id)
        }
    }
    let moviesToRemove = movieIds.length - numberNeeded;
    movieIds.splice(numberNeeded, moviesToRemove)
}