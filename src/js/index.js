const months = ['January', 'February', 'March', "April", 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const days = ['Sunday', 'Monday', 'Tuesday', "Wednesday", 'Thursday', 'Friday', 'Saturday']
const fullDate = new Date()
const mainDate = `${days[fullDate.getDay()]} ${fullDate.getDate()} ${months[fullDate.getMonth()]} ${fullDate.getFullYear()}`
const apiData = {
    url: 'https://api.openweathermap.org/data/2.5/weather?q=',
    key: 'Your Api Key' // Please read the Your-Api-Key.txt file :)
}

$(function () {
    $('.date_text').text(mainDate)

    $('form').on('submit', function (event) {
        const inputSearchVal = $('.search').val().trim()
        event.preventDefault();

        if (inputSearchVal.length) {
            disabledSearch()

            $.ajax({
                type: "GET",
                url: `${apiData.url}${inputSearchVal}&appid=${apiData.key}&units=metric`,
                dataType: "json",
                success: successGetData,
                error: errorGetData,
                complete: enabledSearch
            });
        }
        return false
    })
})

function successGetData(result) {
    $('.country_city_name').html(`${result.name}<span>, ${result.sys.country}</span>`)
    $('.status_air').text(result.weather[0].main)
    $('.temperature').text(`${temp(result.main.temp)}°C`)
    $('.high_low').text(`${temp(result.main.temp_max)}°C / ${temp(result.main.temp_min)}°C`)
}

function errorGetData(error) {
    const errorMessage = (error.status === 0) 
        ? 'Please check your internet connection' 
        : 'Invalid country or city name';
    
    swal({
        icon: 'error',
        text: errorMessage,
        button: 'Try Again'
    });
}

function disabledSearch() {
    $('.search').attr('disabled', true)
    $('.search_btn').html('<span class="loader"></span>')
    $('.search_btn').addClass('cursor-default')
    $('.search_btn').attr('disabled', true)
}

function enabledSearch() {
    $('.search').removeAttr('disabled')
    $('.search').val('')
    $('.search_btn').html(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                        stroke="#fff">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>`)
    $('.search_btn').removeClass('cursor-default')
    $('.search_btn').removeAttr('disabled')
}

function temp(tempVal) {
    return tempVal.toFixed(1).split('.')[1] === '0' ? Math.floor(tempVal) : tempVal.toFixed(1)
}