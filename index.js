const form = document.querySelector('.form')
const cardNumber = document.querySelector('#card_number')
const name = document.querySelector('#cardholder-name')
const month = document.querySelector('#month')
const year = document.querySelector('#year')
const cvc = document.querySelector('#cvc')
const error_name = document.querySelector('.error__message__name')
const error_card_number = document.querySelector('.error__message__card')
const error_date = document.querySelector('.error__message__date')
const error_cvc = document.querySelector('.error__message__cvc')

cardNumber.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
})

form.addEventListener('submit', (e) => {
    e.preventDefault()
    validateInput([cardNumber,name,month,year,cvc])
})

const validateInput = (inputs) => {
    console.log(inputs)
    for (let i = 0; i < inputs.length; i++) {
        if (!inputs[i].value) {
            let error = `error_${inputs[i].id}`
            console.log(error)
            error.classList.add('hidden')
        }
    }
}

name.addEventListener('input', () => validateInput())