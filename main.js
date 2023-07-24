const numbersActive = Array.from(document.querySelectorAll('.numbers'))
const containerPage = Array.from(document.querySelectorAll('.container-page'))
const nextBtn = document.querySelectorAll('.btn-next')
const previousBtn = document.querySelectorAll('.btn-previous')
const form = document.querySelector('form')
const checkBox = document.getElementById('checkbox')
const arcade = document.getElementById('arcade')
const advanced = document.getElementById('advanced')
const professional = document.getElementById('professional')
const planYearly = document.querySelectorAll('.yearly-switch')
const onlineService = document.getElementById('online-service')
const duration = document.getElementById('duration')
const servicePro = document.getElementById('service-pro')

// Create me a multiform step using the information above

function slideShow() {
  containerPage.forEach((slide, idx) => {
    if (idx === 0) {
      // Hide the previous button
      previousBtn.forEach((btn, idx) => {
        if (idx === 0) {
          btn.style.display = 'none'
        }
      })
    }
  })
}

slideShow()

// Custom validation functions
function validateEmail(email) {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  return emailRegex.test(email)
}

function validatePhoneNumber(phoneNumber) {
  const phoneRegex = /^\d{10}$/ // Assuming the phone number should be exactly 10 digits
  return phoneRegex.test(phoneNumber)
}

// Function to validate the form inputs in the current active step
function validateFormInputs() {
  const activeSection = document.querySelector('.container-page.active')
  const inputGroups = activeSection.querySelectorAll('.input-group')

  let isValid = true

  inputGroups.forEach((inputGroup) => {
    const inputField = inputGroup.querySelector('.input-group-input')
    const errorElement = inputGroup.querySelector('.input-group-text')

    // Reset previous error state
    inputField.classList.remove('input-group-invalid')
    errorElement.textContent = ''

    if (!inputField.value.trim()) {
      // If a required field is empty, show error message and add red border
      inputField.classList.add('input-group-invalid')
      errorElement.textContent = 'This field is required.'
      isValid = false
    } else {
      // Additional custom validation for specific input types
      const inputType = inputField.getAttribute('type')
      if (inputType === 'email' && !validateEmail(inputField.value)) {
        inputField.classList.add('input-group-invalid')
        errorElement.textContent = 'Invalid email format.'
        isValid = false
      } else if (
        inputType === 'tel' &&
        !validatePhoneNumber(inputField.value)
      ) {
        inputField.classList.add('input-group-invalid')
        errorElement.textContent = 'Invalid phone number format.'
        isValid = false
      }
    }
  })

  return isValid
}

// Looping over the button to

nextBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    const isValid = validateFormInputs()
    if (isValid) {
      changeActiveNum('next')
      changeSteps('next')
    }
  })
})

previousBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    changeActiveNum('prev')
    changeSteps('prev')
  })
})

// Changing the position of the form steps
function changeSteps(btn) {
  let index = 0
  const active = document.querySelector('.active') // Getting the active div in the html
  index = containerPage.indexOf(active) // Getting the section and incrementing it
  // Getting the numbers background to be changed

  // console.log(containerPage[containerPage.length - 1])

  containerPage[index].classList.remove('active')
  if (btn === 'next') {
    index++
  } else if (btn === 'prev') {
    index--
  }
  containerPage[index].classList.add('active')
}

// Changing the next steps of the numbers
/* function changeActiveNum(idx) {
  let indexNum = 0
  const activeNum = document.querySelector('.active-number')
  indexNum = numbersActive.indexOf(activeNum)
  numbersActive[indexNum].classList.remove('active-number')
  console.log(numbersActive[indexNum])

  if (idx === 'next') {
    console.log(indexNum++ === 2)
    indexNum++
  } else if (idx === 'prev') {
    indexNum--
  }
  console.log(numbersActive[numbersActive.length - 1])
  numbersActive[indexNum].classList.add('active-number')
} */

/* function changeActiveNum(idx) {
  const numbersActive = document.querySelectorAll('.numbers')
  const activeNum = document.querySelector('.active-number')
  const indexNum = Array.from(numbersActive).indexOf(activeNum)

  numbersActive[indexNum].classList.remove('active-number')

  if (idx === 'next') {
    const nextIndex = (indexNum + 1) % numbersActive.length
    numbersActive[nextIndex].classList.add('active-number')
  } else if (idx === 'prev') {
    const prevIndex =
      (indexNum - 1 + numbersActive.length) % numbersActive.length
    numbersActive[prevIndex].classList.add('active-number')
  }
} */

function changeActiveNum(idx) {
  const numbersActive = document.querySelectorAll('.numbers')
  const activeNum = document.querySelector('.active-number')
  const indexNum = Array.from(numbersActive).indexOf(activeNum)

  numbersActive[indexNum].classList.remove('active-number')

  if (idx === 'next') {
    const nextIndex = indexNum + 1
    if (nextIndex < numbersActive.length) {
      numbersActive[nextIndex].classList.add('active-number')
    } else {
      numbersActive[numbersActive.length - 1].classList.add('active-number')
    }
  } else if (idx === 'prev') {
    const prevIndex = indexNum - 1
    if (prevIndex >= 0) {
      numbersActive[prevIndex].classList.add('active-number')
    } else {
      numbersActive[0].classList.add('active-number')
    }
  }
}

// Disabling the default form of a browser
// Event listener for form submission
form.addEventListener('submit', (e) => {
  e.preventDefault()
  const isValid = validateFormInputs()

  if (isValid) {
    console.log('Form submitted successfully!')
  }
})

// Focusing on the Pricing box when clicked

function pricingClicked() {
  const priceSingle = document.querySelectorAll('.plan-single')
  priceSingle.forEach((plan) => {
    plan.addEventListener('click', () => {
      plan.classList.toggle('plan-single-active')

      priceSingle.forEach((otherPlan) => {
        if (otherPlan !== plan) {
          otherPlan.classList.remove('plan-single-active')
        }
      })
    })
  })
}

pricingClicked()

// Changing the Planning Pricing
checkBox.addEventListener('click', () => {
  if (
    arcade.textContent === '$90/yr' &&
    advanced.textContent === '$120/yr' &&
    professional.textContent === '$150/yr'
  ) {
    arcade.innerHTML = `<p class="plan-text" id="arcade">$9/mo</p>`
    advanced.innerHTML = `<p class="plan-text" id="advanced">$12/mo</p>`
    professional.innerHTML = `<p class="plan-text" id="professional">$15/mo</p>`
    planYearly.forEach((plan) => {
      plan.style.display = 'none'
    })
  } else {
    arcade.innerHTML = `<p class="plan-text" id="arcade">$90/yr</p>`
    advanced.innerHTML = `<p class="plan-text" id="advanced">$120/yr</p>`
    professional.innerHTML = `<p class="plan-text" id="professional">$150/yr</p>`
    planYearly.forEach((plan) => {
      plan.style.display = 'block'
    })
  }
})

checkBox.addEventListener('click', () => {
  if (
    onlineService.textContent === '+$10/yr' &&
    duration.textContent === '+$20/yr' &&
    servicePro.textContent === '+$20/yr'
  ) {
    onlineService.innerHTML = `<p class="service-duration">+$1/mo</p>`
    duration.innerHTML = `<p class="service-duration">+$2/mo</p>`
    servicePro.innerHTML = `<p class="service-duration">+$2/mo</p>`
  } else {
    onlineService.innerHTML = `<p class="service-duration">+$10/yr</p>`
    duration.innerHTML = `<p class="service-duration">+$20/yr</p>`
    servicePro.innerHTML = `<p class="service-duration">+$20/yr</p>`
  }
})

function singleAddon() {
  const singleAdd = document.querySelectorAll('.input-checkbox')
  singleAdd.forEach((single) => {
    single.addEventListener('click', () => {
      const parentAddon = single.closest('.single-addon')
      if (single.checked) {
        parentAddon.classList.add('active-single-addon')
      } else {
        parentAddon.classList.remove('active-single-addon')
      }
    })
  })
}

singleAddon()
