const hideAlert = () => {
    const alertBox = document.querySelector('.select-alert')
    const first = document.querySelector('body').removeChild(alertBox);
}

export const showAlert = (message, type) => {
    const markup = `<div class = "alert alert-${type} select-alert">${message}</div>`
    document.querySelector('body').insertAdjacentHTML('afterbegin', markup)
    setTimeout(hideAlert , 3000)
}