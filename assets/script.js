baseUrl = "http://localhost:8000/api/v1/"
titles = baseUrl + "titles/"
genres = baseUrl + "genres/"


const getMovieIds = async(queryParams) => {
    const response = await fetch(`${titles}?${queryParams}`)
    const data = await response.json()
    return data.results
};

const getMovies = async(bestMoviesFound) => {
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

const generateBestMovie = (bestMovie) => {
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

generateRatedList = (bestMovies, sectionId) => {
    let sectionConcerned = document.getElementById(sectionId)
    generateMovieGrid(sectionConcerned, bestMovies)
}

const generateMovieGrid = (passedSection, movies) => {
    let gridDiv = document.createElement("div")
    gridDiv.classList.add("movieGridDiv")
    passedSection.append(gridDiv)
    for (i = 0; i < movies.length; i++) {
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
    movieGrid = passedDiv.children[1]
    movies = movieGrid.children
    const aChildHasClass = Array.from(movies).some(movie =>
    movie.classList.contains("hiddenMobile") || movie.classList.contains("hiddenBoth")
    )
    if (aChildHasClass) {
        for (i = 0; i < movies.length; i++) {
            movies[i].className = "movieDiv"
        }
        e.target.innerText = "Voir moins"
    } else {
        for (i = 0; i < movies.length; i++) {
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

const generateParams = (page_size_num, genre_string) => {
    const newParams = new URLSearchParams();
    newParams.append("sort_by", "-votes");
    newParams.append("page_size", page_size_num);
    newParams.append("lang_contains", "English");
    newParams.append("genre", genre_string);
    const urlParams = newParams.toString()
    return urlParams
}

const sortResults = (movieIds, numberNeeded) => {
    movieIds.sort((a,b) => b.imdb_score - a.imdb_score)
    const ids = []
    for (i = 0; i < movieIds.length; i++) {
        if (ids.includes(movieIds[i].id)) {
            movieIds.splice(i, 1)
        } else {
        ids.push(movieIds[i].id)
        }
    }
    let moviesToRemove = movieIds.length - numberNeeded;
    movieIds.splice(numberNeeded, moviesToRemove)
}

const generateDropDownOptions = (genresList, current) => {
    for (j = 0; j < genresList.length; j++) {
        let optionLi = document.createElement("li")
        optionLi.classList.add("itemOption")
        optionLi.innerText = genresList[j].name
        let carretDown = document.createElement("i")
        carretDown.className = "fa-solid fa-caret-down fa-lg hidden"
        optionLi.appendChild(carretDown)
        let checkbox = document.createElement("i")
        checkbox.className = "fa-solid fa-square-check fa-lg hidden"
        optionLi.appendChild(checkbox)
        optionLi.addEventListener("click", () => {
            changeCategory(optionLi)
        })
        current.append(optionLi)
    }
    if (current.id == "dropDown0") {
        let chosenItem = current.children[0]
        chosenItem.classList.add("chosenItem")
        chosenItem.classList.add("shownItem")
        chosenItem.children[0].className = "fa-solid fa-caret-down fa-lg shown"
        return chosenItem
    } else {
        let chosenItem = current.children[2]
        chosenItem.classList.add("chosenItem")
        chosenItem.classList.add("shownItem")
        chosenItem.children[0].className = "fa-solid fa-caret-down fa-lg shown"
        return chosenItem
    }
}

const generateDropDowns = async() => {
    const newParamsGenres = new URLSearchParams();
    newParamsGenres.append("page_size", 25)
    const response = await fetch(`${genres}?${newParamsGenres}`)
    const data = await response.json()
    let genresList = data.results
    let dropDown0 = document.getElementById("dropDown0")
    let dropDown1 = document.getElementById("dropDown1")
    let chosenItem1 = generateDropDownOptions(genresList, dropDown0)
    let chosenItem2 = generateDropDownOptions(genresList, dropDown1)
    let chosenItemsList = [chosenItem1, chosenItem2]
    return chosenItemsList
}

const generateDropDownMovies = async(chosenItems) => {
    const autres = document.querySelectorAll(".autres")
    let firstAutres = autres[0]
    let secondAutres = autres[1]
    let firstGenre = chosenItems[0].innerText
    let secondGenre = chosenItems[1].innerText
    const firstAutreParams = generateParams(20, firstGenre)
    const bestAutre1Ids = await getMovieIds(firstAutreParams)
    sortResults(bestAutre1Ids, 6)
    const bestAutre1 = await getMovies(bestAutre1Ids)
    generateMovieGrid(firstAutres, bestAutre1)
    const secondAutreParams = generateParams(20, secondGenre)
    const bestAutre2Ids = await getMovieIds(secondAutreParams)
    sortResults(bestAutre2Ids, 6)
    const bestAutre2 = await getMovies(bestAutre2Ids)
    generateMovieGrid(secondAutres, bestAutre2)
}

const changeCategory = async(passed) => {
    let dropDown = passed.parentElement
    let currentlySelected = 0
    for (i = 0; i < dropDown.children.length; i++) {
        if (dropDown.children[i].classList.contains("chosenItem")) {
            currentlySelected = dropDown.children[i]
        }
    }
    const allChildrenHaveClass = Array.from(dropDown.children).every(child =>
    child.classList.contains("shownItem")
    );
    if (allChildrenHaveClass) {
        await closeDropDown(dropDown, passed, currentlySelected)
    }
    else {
        openDropDown(dropDown, passed)
    }
}

const closeDropDown = async(dropDown, passed, currentlySelected) => {
    dropDown.className = "dropDown"
    Array.from(dropDown.children).forEach(child => {
        child.className = "itemOption";
        child.children[1].className = "fa-solid fa-square-check fa-lg hidden"
    })
    passed.classList.add("shownItem")
    passed.classList.add("chosenItem")
    passed.children[0].className = "fa-solid fa-caret-down fa-lg shown"
    if (currentlySelected.innerText != passed.innerText) {
        await regenerateAutreGrid(dropDown, passed)
    }
}

const openDropDown = (dropDown, target) => {
    dropDown.className = "dropDownOpen"
    Array.from(dropDown.children).forEach(child => {
        child.className = "itemOption";

    })
    Array.from(dropDown.children).forEach(child => {
        child.classList.add("shownItem")
        child.children[0].className = "fa-solid fa-caret-down fa-lg hidden"
    })
    target.classList.add("chosenItem")
    target.children[1].className = "fa-solid fa-square-check fa-lg shown"
}

const regenerateAutreGrid = async(dropDown, target) => {
    let autre = dropDown.parentElement.parentElement.parentElement
    let movieGrid = autre.children[1]
    let buttonShowMore = autre.children[2]
    autre.removeChild(movieGrid)
    autre.removeChild(buttonShowMore)
    let loading = document.createElement("p")
    loading.className = "loading"
    loading.innerText = "Loading..."
    autre.appendChild(loading)
    let newAutreMovieParams = generateParams(20, target.innerText)
    let foundNewAutreIds = await getMovieIds(newAutreMovieParams)
    sortResults(foundNewAutreIds, 6)
    let newAutreMovies = await getMovies(foundNewAutreIds)
    autre.removeChild(loading)
    generateMovieGrid(autre, newAutreMovies)
}

const openMovieModal = (movieInfo) => {
    body = document.body
    modalDiv = document.createElement("div")
    modalDiv.className = "modal"
    modalDiv.id = "modal"
    backgroundModal = document.createElement("div")
    backgroundModal.className = "modalBackground"
    backgroundModal.addEventListener("click", closeModal)
    body.appendChild(modalDiv)
    modalDiv.appendChild(backgroundModal)
    modalContent = document.createElement("div")
    modalContent.className = "modalContent"
    modalDiv.append(modalContent)
    generateModalContent(modalContent, movieInfo)
}

const generateGeneralInfo = (modalContent, movieInfo) => {
    let generalInfoDiv = document.createElement("div")
    generalInfoDiv.classList.add("generalInfoDiv")
    let title = document.createElement("h5")
    title.innerText = movieInfo.original_title
    generalInfoDiv.appendChild(title)
    let yearGenres = document.createElement("p")
    let genresString = getGenres(movieInfo.genres)
    yearGenres.innerText = `${movieInfo.year} - ${genresString}`
    generalInfoDiv.appendChild(yearGenres)
    let ratedLengthCountries = document.createElement("p")
    let countriesFilm = getCountries(movieInfo.countries)
    ratedLengthCountries.innerText = `${movieInfo.rated}+ - ${movieInfo.duration} minutes ${countriesFilm}`
    generalInfoDiv.appendChild(ratedLengthCountries)
    generalInfoDiv.className = "generalInfoDiv"
    textIMDB = document.createElement("p")
    textIMDB.innerText = `IMBD score: ${movieInfo.imdb_score}/10`
    generalInfoDiv.appendChild(textIMDB)
    let recettes = document.createElement("p")
    let income = calculateIncome(movieInfo.worldwide_gross_income)
    recettes.innerText = `Recettes au box office: ${income}`
    generalInfoDiv.appendChild(recettes)
    modalContent.appendChild(generalInfoDiv)
    let realisateurDiv = document.createElement("div")
    realisateurDiv.className = "realisateurDiv"
    let realisePar = document.createElement("span")
    realisePar.innerText = "Réalisé par:"
    realisateurDiv.appendChild(realisePar)
    let realisateurs = document.createElement("p")
    let realisateursText = getPeopleList(movieInfo.directors)
    realisateurs.innerText = realisateursText
    realisateurDiv.appendChild(realisateurs)
    modalContent.appendChild(realisateurDiv)
    let xsign = document.createElement("i")
    xsign.className = "fa-solid fa-xmark fa-xl"
    xsign.addEventListener("click", closeModal)
    modalContent.appendChild(xsign)
}

const generateModalContent = (modalContent, movieInfo) => {
    generateGeneralInfo(modalContent, movieInfo)
    let description = document.createElement("p")
    description.className = "modalDesc"
    description.innerText = movieInfo.long_description
    modalContent.append(description)
    let imageMovie = document.createElement("img")
    imageMovie.src = movieInfo.image_url
    imageMovie.alt = "Movie cover image"
    modalContent.appendChild(imageMovie)
    let actorsDiv = document.createElement("div")
    actorsDiv.className = "actorsDiv"
    let avec = document.createElement("span")
    avec.innerText = "Avec: "
    let actorsText = getPeopleList(movieInfo.actors)
    let actorsList = document.createElement("p")
    actorsList.innerText = actorsText
    actorsDiv.appendChild(avec)
    actorsDiv.appendChild(actorsList)
    modalContent.appendChild(actorsDiv)
    let closeButtonDiv = document.createElement("div")
    closeButtonDiv.className = "closeButtonDiv"
    let closeButton = document.createElement("p")
    closeButton.innerText = "Fermer"
    closeButton.addEventListener("click", closeModal)
    closeButtonDiv.appendChild(closeButton)
    modalContent.appendChild(closeButtonDiv)
}

const closeModal = () => {
    body = document.body
    modalDiv = document.getElementById("modal")
    body.removeChild(modalDiv)
}

const getGenres = (genres) => {
    let genresString = ""
    if (genres.length == 1) {
        genresString += `${genres[0]}`
        return genresString
    } else {
        for (i = 0; i < genres.length; i++) {
            if (i < genres.length - 1) {
                genresString += `${genres[i]}, `
            } else {
                genresString += genres[i]
            }
        }
    }
}

const getCountries = (countries) => {
    let countriesFilm = ""
    if (countries.length == 1) {
        countriesFilm += `(${countries[0]})`
        return countriesFilm
    } else {
        countriesFilm += `(${countries[0]} / `
        for (i = 1; i < countries.length; i++) {
            if (i < countries.length - 1) {
                countriesFilm += `${countries[i]} / `
            } else {
                countriesFilm += `${countries[i]})`
            }
        }
        return countriesFilm
    }
}

const getPeopleList = (people) => {
    let peopleFilm = ""
    if (people.length == 1) {
        let peopleFilm = `${people[0]}`
        return peopleFilm
    } else {
        for (i = 0; i < people.length; i++) {
            if (i < people.length - 1) {
                peopleFilm += `${people[i]}, `
            }
            else {
                peopleFilm += `${people[i]}`
            }
        }
        return peopleFilm
    }
}

const calculateIncome = (gross_income) => {
    let income = gross_income
    if (income > 1000000000) {
        income = income / 1000000000
        income = `${income}`
        income = income.split("")
        income.length = 3
        income = `$${income[0]}${income[1]}${income[2]}B`
        return income
    }
    else if (income > 100000000) {
        income = income / 1000000
        income = `${income}`
        income = income.split("")
        income.length = 5
        income = `$${income[0]}${income[1]}${income[2]}${income[3]}${income[4]}m`
        return income
    }
    else if (income > 10000000) {
        income = income / 1000000
        income = `${income}`
        income = income.split("")
        income.length = 4
        income = `$${income[0]}${income[1]}${income[2]}${income[3]}m`
        return income
    }
    else if (income > 1000000) {
        income = `${income}`
        income = income.split("")
        income = `$${income[0]},${income[1]}${income[2]}${income[3]},${income[4]}${income[5]}${income[6]}`
        return income
    }
    else if (income < 1000000) {
        income = `$${income}`
        return income
    }
}

const main = async() => {
    const bestQueryParams = generateParams(20, "")
    const foundBestIds = await getMovieIds(bestQueryParams)
    sortResults(foundBestIds, 7)
    const bestMovies = await getMovies(foundBestIds)
    generateBestMovie(bestMovies[0])
    bestMovies.splice(0, 1)
    generateRatedList(bestMovies, "mieuxNotes")
    const historyQueryParams = generateParams(20, "History")
    const foundBestHist = await getMovieIds(historyQueryParams)
    sortResults(foundBestHist, 6)
    const bestHist = await getMovies(foundBestHist)
    generateRatedList(bestHist, "filmsHist")
    const thrillerQueryParams =  generateParams(20, "Thriller")
    const foundBestThrill = await getMovieIds(thrillerQueryParams)
    sortResults(foundBestThrill, 6)
    const bestThrill = await getMovies(foundBestThrill)
    generateRatedList(bestThrill, "filmsThriller")
    let chosenItems = await generateDropDowns()
    generateDropDownMovies(chosenItems)
}

main()