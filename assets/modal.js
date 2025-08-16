export const openMovieModal = (movieInfo) => {
    let body = document.body
    let modalDiv = document.createElement("div")
    modalDiv.className = "modal"
    modalDiv.id = "modal"
    let backgroundModal = document.createElement("div")
    backgroundModal.className = "modalBackground"
    backgroundModal.addEventListener("click", closeModal)
    body.appendChild(modalDiv)
    modalDiv.appendChild(backgroundModal)
    let modalContent = document.createElement("div")
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
    let textIMDB = document.createElement("p")
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
    let body = document.body
    let modalDiv = document.getElementById("modal")
    body.removeChild(modalDiv)
}

const getGenres = (genres) => {
    let genresString = ""
    if (genres.length == 1) {
        genresString += `${genres[0]}`
        return genresString
    } else {
        for (let i = 0; i < genres.length; i++) {
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
        for (let i = 1; i < countries.length; i++) {
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
        for (let i = 0; i < people.length; i++) {
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