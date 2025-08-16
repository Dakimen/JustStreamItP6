import { getGenres } from "./api.js"
import { regenerateAutreGrid } from "./html.js"

export const generateDropDowns = async() => {
    let genresList = await getGenres()
    let dropDown0 = document.getElementById("dropDown0")
    let dropDown1 = document.getElementById("dropDown1")
    let chosenItem1 = generateDropDownOptions(genresList, dropDown0)
    let chosenItem2 = generateDropDownOptions(genresList, dropDown1)
    let chosenItemsList = [chosenItem1, chosenItem2]
    return chosenItemsList
}

export const generateDropDownOptions = (genresList, current) => {
    for (let j = 0; j < genresList.length; j++) {
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

const changeCategory = async(passed) => {
    let dropDown = passed.parentElement
    let currentlySelected = 0
    for (let i = 0; i < dropDown.children.length; i++) {
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