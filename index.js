const form = document.querySelector('.form')
const section = document.querySelector('.section')
const container = document.querySelector('.container')
const continueButton = document.querySelector('.button.button--continue')
const cardNumber = document.querySelector('#card_number')
const name = document.querySelector('#name')
const month = document.querySelector('#month')
const year = document.querySelector('#year')
const cvc = document.querySelector('#cvc')
const cardNumberBox = document.querySelector('.card__box__card-number')
const nameBox = document.querySelector('.card__box__name')
const monthBox = document.querySelector('.card__box__date--month')
const yearBox = document.querySelector('.card__box__date--year')
const cvcBox = document.querySelector('.card__box__cvc')
const inputs = [cardNumber, name, month, year, cvc]
const boxes = [cardNumberBox, nameBox, monthBox, yearBox, cvcBox]
section.remove()

const clearInputs = () => {
    inputs.forEach(e => e.value = '')
}

const clearBoxes = (box) => {
    switch(box.className) {
        case 'card__box__name':
            box.innerText = 'JANE APPLESEED'
            break
        case 'card__box__card-number':
            box.innerText = '0000 0000 0000 0000'
            break
        case 'card__box__date--month':
        case 'card__box__date--year':
            box.innerText = '00'
            break
        case 'card__box__cvc':
            box.innerText = '000'
            break
    }
}

cardNumber.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^\d0-9]/g, '').replace(/(.{4})/g, '$1 ').trim();
})

continueButton.addEventListener('click', () => {
    section.remove()
    container.append(form)
    clearInputs()
    boxes.forEach(box => clearBoxes(box))
})

const setErrorFor = (input, message) => {
    const error = document.querySelector(`.error__message__${input.name}`)
    error.innerText = message
    error.classList.add('visible')
    input.classList.add('invalid__input')
}

const setSuccessFor = (input) => {
    const error = document.querySelector(`.error__message__${input.name}`)
    error.classList.remove('visible')
    input.classList.remove('invalid__input')
}

const isFormValid = () => {
    const errors = document.getElementsByClassName('error__message')
    let counter = 0

    for (let i = 0; i < errors.length; i++) {
        errors[i].classList.contains('visible') ? counter++ : null
    }

    return counter
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const nameValue = name.value.replace(/ /g, '')
    const cardNumberValue = cardNumber.value.replace(/ /g, '')
    const monthValue = month.value.replace(/ /g, '')
    const yearValue = year.value.replace(/ /g, '')
    const cvcValue = cvc.value.replace(/ /g, '')

    let monthErrors = 0
    let yearErrors = 0

    if (!nameValue) {
        setErrorFor(name, "Can't be blank")
    } else if (nameValue.length < 2) {
        setErrorFor(name, "Name too short")
    } else {
        setSuccessFor(name)
    }
    
    if (!cardNumberValue) {
        setErrorFor(cardNumber, "Can't be blank")
    } else if (checkForLetters(cardNumberValue)) {
        setErrorFor(cardNumber, "Wrong format")
    } else if (cardNumberValue.replace(/ /g, '').length < 16) {
        setErrorFor(cardNumber, "Number too short")
    } else {
        setSuccessFor(cardNumber)
    }
    
    if (!monthValue) {
        monthErrors = 1
        setErrorFor(month, "Can't be blank")
    } else if (monthValue > 12) {
        monthErrors = 1
        setErrorFor(month, "Incorrect month")
    } else if (checkForLetters(monthValue)) {
        monthErrors = 1
        setErrorFor(month, "Wrong format")
    } else {
        monthErrors = 0
        month.classList.remove('invalid__input')
    }
    
    if (!yearValue) {
        yearErrors = 1
        setErrorFor(year, "Can't be blank")
    } else if (yearValue < 22) {
        yearErrors = 1
        setErrorFor(year, "Card has expired")
    } else if (checkForLetters(yearValue)) {
        yearErrors = 1
        setErrorFor(year, "Wrong format")
    } else {
        yearErrors = 0
        year.classList.remove('invalid__input')
    }

    if (monthErrors === 0 && yearErrors === 0) {
        setSuccessFor(year)
        setSuccessFor(month)
    }

    if (!cvcValue) {
        setErrorFor(cvc, "Can't be blank")
    } else if (checkForLetters(cvcValue)) {
        setErrorFor(cvc, "Wrong format")

    } else {
        setSuccessFor(cvc)
    }

    const formValidation = isFormValid()

    if (formValidation === 0) {
        form.remove()
        container.append(section)
    }
})

const setBoxes = (inputBox, value, e) => {
    inputBox.innerText = e.target.value
    if (!inputBox.innerText) {
        clearBoxes(inputBox)
    }
}

cardNumber.addEventListener('input', e => 
setBoxes(cardNumberBox, '0000 0000 0000 0000', e))

name.addEventListener('input', e => 
setBoxes(nameBox, 'JANE APPLESEED', e))

month.addEventListener('input', e => 
setBoxes(monthBox, '00', e))

year.addEventListener('input', e => 
setBoxes(yearBox, '00', e))

cvc.addEventListener('input', e => 
setBoxes(cvcBox, '000', e))

const checkForLetters = (str) => {
    return isNaN(str)
}
