import { openMovieModal } from "./modal.js"
import { getNewMovies, getDropDownMovies } from "./api.js"

export const generateBestMovie = (bestMovie) => {
    let bestFilmCadre = document.getElementById("meilleurFilmCadre")
    let bestFilmLeft = document.createElement("div")
    let bestFilmImg = document.createElement("img")
    bestFilmImg.src = bestMovie.image_url
    bestFilmImg.alt = "Film cover image"
    let bestFilmRight = document.createElement("div")
    bestFilmRight.classList.add("bestFilmRight")
    let bestFilmTitle = document.createElement("h3")
    bestFilmTitle.innerText = bestMovie.original_title
    let bestFilmDetails = document.createElement("p")
    bestFilmDetails.innerText = bestMovie.description
    let bestFilmRightDown = document.createElement("div")
    bestFilmRightDown.classList.add("bestFilmButtonContainer")
    let bestFilmButton = document.createElement("div")
    bestFilmButton.classList.add("bestFilmButton")
    let bestFilmButtonText = document.createElement("p")
    bestFilmButtonText.innerText = "details"
    bestFilmButton.addEventListener("click", () => {
        openMovieModal(bestMovie)
    })
    bestFilmLeft.append(bestFilmImg)
    bestFilmCadre.append(bestFilmLeft)
    bestFilmButton.append(bestFilmButtonText)
    bestFilmRightDown.append(bestFilmButton)
    bestFilmRight.append(bestFilmTitle)
    bestFilmRight.append(bestFilmDetails)
    bestFilmRight.append(bestFilmRightDown)
    bestFilmCadre.append(bestFilmRight)
}

export const generateRatedList = (bestMovies, sectionId) => {
    let sectionConcerned = document.getElementById(sectionId)
    generateMovieGrid(sectionConcerned, bestMovies)
}

export const generateMovieGrid = (passedSection, movies) => {
    let gridDiv = document.createElement("div")
    gridDiv.classList.add("movieGridDiv")
    passedSection.append(gridDiv)
    for (let i = 0; i < movies.length; i++) {
        let currentMovie = movies[i]
        let movieDiv = document.createElement("div")
        movieDiv.classList.add("movieDiv")
        let overlayDiv =document.createElement("div")
        overlayDiv.classList.add("overlayDiv")
        movieDiv.appendChild(overlayDiv)
        overlayDiv.addEventListener("click", () => {
            openMovieModal(currentMovie)
        })
        gridDiv.append(movieDiv)
        let movieImageDiv = document.createElement("div")
        let movieImg = document.createElement("img")
        movieImageDiv.classList.add("movieImg")
        movieImg.src = currentMovie.image_url
        movieImg.alt = "Movie cover image"
        movieImageDiv.append(movieImg)
        movieDiv.append(movieImageDiv)
        let movieDescDiv = document.createElement("div")
        movieDescDiv.classList.add("movieDescDiv")
        let movieTitle = document.createElement("h4")
        movieTitle.innerText = currentMovie.original_title
        movieDescDiv.append(movieTitle)
        movieDiv.append(movieDescDiv)
        let movieButtonDiv = document.createElement("div")
        movieButtonDiv.classList.add("movieButtonDiv")
        let movieButtonText = document.createElement("p")
        movieButtonDiv.append(movieButtonText)
        movieButtonText.innerText = "Détails"
        movieDescDiv.append(movieButtonDiv)
        if (i == 2 || i == 3) {
            movieDiv.classList.add("hiddenMobile")
        }
        else if (i == 4 || i == 5) {
            movieDiv.classList.add("hiddenBoth")
        }
    }
    let showMoreButtonDiv = document.createElement("div")
    showMoreButtonDiv.className = "showMoreButtonDiv"
    let showMoreButton = document.createElement("p")
    showMoreButton.innerText = "Voir plus"
    showMoreButton.classList.add("showMoreButton")
    showMoreButton.addEventListener("click", (e) => {
        showMore(e, passedSection)
    })
    showMoreButtonDiv.appendChild(showMoreButton)
    passedSection.append(showMoreButtonDiv)
}

const showMore = (e, passedDiv) => {
    let movieGrid = passedDiv.children[1]
    let movies = movieGrid.children
    const aChildHasClass = Array.from(movies).some(movie =>
    movie.classList.contains("hiddenMobile") || movie.classList.contains("hiddenBoth")
    )
    if (aChildHasClass) {
        for (let i = 0; i < movies.length; i++) {
            movies[i].className = "movieDiv"
        }
        e.target.innerText = "Voir moins"
    } else {
        for (let i = 0; i < movies.length; i++) {
            if (i == 2 || i == 3) {
                movies[i].classList.add("hiddenMobile")
            }
            else if (i == 4 || i == 5) {
                movies[i].classList.add("hiddenBoth")
            }
        }
        e.target.innerText = "Voir plus"
    }
}

export const generateDropDownMovies = async(chosenItems) => {
    const autres = document.querySelectorAll(".autres")
    let firstAutres = autres[0]
    let secondAutres = autres[1]
    let firstGenre = chosenItems[0].innerText
    let secondGenre = chosenItems[1].innerText
    let bestAutres = await getDropDownMovies(firstGenre, secondGenre)
    generateMovieGrid(firstAutres, bestAutres[0])
    generateMovieGrid(secondAutres, bestAutres[1])
}

export const regenerateAutreGrid = async(dropDown, target) => {
    let autre = dropDown.parentElement.parentElement.parentElement
    let movieGrid = autre.children[1]
    let buttonShowMore = autre.children[2]
    autre.removeChild(movieGrid)
    autre.removeChild(buttonShowMore)
    let loading = document.createElement("p")
    loading.className = "loading"
    loading.innerText = "Loading..."
    autre.appendChild(loading)
    let newAutreMovies = await getNewMovies(target.innerText)
    autre.removeChild(loading)
    generateMovieGrid(autre, newAutreMovies)
}