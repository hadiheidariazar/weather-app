const months = ['January', 'February', 'March', "April", 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const days = ['Sunday', 'Monday', 'Tuesday', "Wednesday", 'Thursday', 'Friday', 'Saturday']
const fullDate = new Date()
const mainDate = `${days[fullDate.getDay()]} ${fullDate.getDate()} ${months[fullDate.getMonth()]} ${fullDate.getFullYear()}`
const apiData = {
    url: 'https://api.openweathermap.org/data/2.5/weather?q=',
    key: 'f9df4a408bb2c23af21fe128b90cfaf4'
}

$(function () {
    $('.date_text').text(mainDate)

    $('form').on('submit', function (event) {
        const inputSearchVal = $('.search').val().trim()
        event.preventDefault()

        if (inputSearchVal.length) {
            disabledSearch()

            $.ajax({
                type: "GET",
                url: `${apiData.url}${inputSearchVal}&appid=${apiData.key}`,
                dataType: "json",
                success: successGetData,
                error: errorGetData,
                complete: enabledSearch
            });
        }
    })
})

function successGetData(result) {
    $('.country_city_name').html(`${result.name}<span>, ${result.sys.country}</span>`)
    $('.status_air').text(result.weather[0].main)
    $('.temperature').text(`${Math.round(result.main.temp - 272.15)}°C`)
    $('.high_low').text(`${Math.round(result.main.temp_max - 272.15)}°C / ${Math.round(result.main.temp_min - 272.15)}°C`)
}

function errorGetData(error) {
    (error.statusText === 'error' && error.status === 0) ? swal({
        text: 'Please check your internet :|',
        icon: 'error',
        button: 'Got it!'
    }) : swal({
        text: 'The entered country or city name is invalid :|',
        icon: 'error',
        button: 'Got it!'
    })
}

function disabledSearch() {
    $('.search').attr('disabled', 'yes')
    $('.search_btn').html('<span class="loader"></span>')
    $('.search_btn').addClass('cursor-default')
    $('.search_btn').attr('disabled', 'yes')
}

function enabledSearch() {
    $('.search').removeAttr('disabled')
    $('.search_btn').html(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                        stroke="#fff">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>`)
    $('.search_btn').removeClass('cursor-default')
    $('.search_btn').removeAttr('disabled')
}