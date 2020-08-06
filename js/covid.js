
  


var todayCases, cases, todayRecovered, recovered, todayDeaths, deaths;
var country, CountryCode;

function fetchData(countryName){
    fetch(' https://disease.sh/v3/covid-19/' + countryName)
        .then(res => res.json())
        .then((api) => {
        console.log(`API Response => ${countryName}\n`, api);

        if(api.message === "Country not found or doesn't have any cases"){
            alert("Country not found or doesn't have any cases.\n\nPlease Try Again with a valid Country!");
        }
        else{
        assignVal(countryName, api);
        }
    }).catch(err => function(){
        console.error(err);

    });
    
}
//fetchData('Global');

function assignVal(countryName, api){
    if(countryName.toLowerCase() === 'all'){
        document.querySelector('.countryInfo').style.display = "none";
        document.querySelector('.globalName').style.display = "flex";
        country = "null";
        countryCode = "null";
        console.log("-----------------\nHiding CountryInfo\nShowing Global");

    }
    else{
        document.querySelector('.globalName').style.display = "none";
        document.querySelector('.countryInfo').style.display = "flex";
        country = api.country;
        countryCode = api.countryInfo.iso2;
        console.log("\nCountry Info : \n----------\n" + country + ", " + countryCode);
    }

//- - - - - - - Cases - - - - - - -

    todayCases = api.todayCases;
    cases = api.cases;

//- - - - - - Recoveries - - - - - -

    todayRecovered = api.todayRecovered;
    recovered = api.recovered;

//- - - - - - - Deaths - - - - - - -

    todayDeaths = api.todayDeaths;
    deaths = api.deaths;

    if(todayCases === 0 && todayRecovered === 0 && todayDeaths === 0){
        console.log("Today's data N/A.");
        todayCases = todayRecovered = todayDeaths = 'N/A';
    }
    else{
        console.log('Data Available...');
    }
    printer();
}

function printer(){
    document.querySelector('main').className = "animator";

    console.log("Printer Called!");

    var countName = document.querySelector('.countryName');
    var countryMap = document.getElementById('countryMapImg');

    var NC = document.getElementById('NC');
    var TC = document.getElementById('TC');

    var NR = document.getElementById('NR');
    var TR = document.getElementById('TR');
    
    var ND = document.getElementById('ND');
    var TD = document.getElementById('TD');

    var lastUpdated = document.querySelector('.date-time');

    
    if( countryCode != 'null' ){
        countName.innerHTML = country + ', ' + countryCode;
        console.log(CountryCode);
        countryMap.src = 'images/Countries/all-maps/' + countryCode.toLowerCase() + '/vector.svg';
    }
    else{}


    NC.innerHTML = todayCases.toLocaleString();
    TC.innerHTML = cases.toLocaleString();

    NR.innerHTML = todayRecovered.toLocaleString();
    TR.innerHTML = recovered.toLocaleString();

    ND.innerHTML = todayDeaths.toLocaleString();
    TD.innerHTML = deaths.toLocaleString();

    //lastUpdated.innerHTML = ( newDate + ', ' + newTime );

    dateConvert();

    document.querySelector('.searchText').value = "";
    resetKeyboardAndTxt();
    
}

function resetKeyboardAndTxt(){

    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
	if (isMobile) {
        document.activeElement.blur();
        $("input").blur();
	} else {
	}
}

function dateConvert(){
    var date = new Date();
    var newTime = date.getHours() + ":";
    if(date.getMinutes() < 10){
        newTime += ('0' + date.getMinutes());
    }
    else{
        newTime += date.getMinutes();
    }
    console.log(date.getMonth())
    newTime += " (Local Time)"
    newDate = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
    console.log("Coverted Date/Time : \n" + date + "\n\nConverted Time => " + newTime + "\n\nConverted Date => " + newDate);
    document.querySelector(".date-time").innerHTML = newDate + ", " + newTime;
}


/*
    console.log(commaSep(3333333));
    function commaSep(number){
        return number.toLocaleString();
    }
*/