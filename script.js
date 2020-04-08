var apikey = "4db931ed54bec48eee7d482de6b9ed2b";
var searchHistory = localStorage.getItem('search') ? JSON.parse(localStorage.getItem('search')) : [] ;

function runSearch(param){
    $.ajax({
        method: 'GET',
        url: `https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=${apikey}`
    }).then(response=>{
        renderWeather(response)
        console.log(response)
    })
}

$('#button-submit').on('click', function(){
    var search = $('#searchInput').val().trim();
    searchHistory.includes(search) ? '' : searchHistory.push(search);
    localStorage.setItem('search', JSON.stringify(searchHistory));
    renderBtns()
    runSearch(search)
})

function renderBtns(){
    $('#btnDiv').html("");
    searchHistory.map(item=>{
        $('#btnDiv').append(`<div class='row'><button class='search_Btn'>${item}</button></div>`)
        window.onload = window.localStorage.clear();
       
    })
}

function renderWeather(data){
    $('#currentWeather').empty();
    var str = `<h4>${data.name}</h4><p>Forcast: ${data.weather[0].main}</p><p>Temperature: ${data.main.temp}</p>`
    if(data.weather[0].main == "Rain"){
            str = str + `<i class="fas fa-cloud-showers-heavy"></i>`
    } else if(data.weather[0].main == "Clouds"){
        str = str + `<i class="fas fa-cloud"></i>`
    } else if(data.weather[0].main == "Clear"){
        str = str + `<i class="fas fa-sun"></i>`
    } 
    $('#currentWeather').append(str)
  
}

renderBtns()


