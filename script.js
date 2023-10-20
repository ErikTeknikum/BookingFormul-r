let formElem;
let totalCost = 0;
let roomTypeCost = 0;
let totalDays = 1;
let totalCostElem;
let errorMsg

function init(){
    formElem = document.querySelector("form");
    totalCostElem = document.getElementById("totalCost"); //eventuellt ändra så att den tar från parent node 
    calculateCost();
    checkIfFamilyRoom();
    for(i = 0; i < formElem.roomType.length; i++){
        formElem.roomType[i].addEventListener("click", event =>{
            checkIfFamilyRoom();
            calculateCost();
        })
    }
    for(j = 0; j < formElem.addition.length; j++){
        formElem.addition[j].addEventListener("click", event =>{
            calculateCost();
        })
    }
    
    formElem.nights.addEventListener("change", event =>{
        calculateCost();
    })

    formElem.telephone.addEventListener("keyup", checkRegexTelephoneNum);

    formElem.city.addEventListener("blur", makeCapitalLetters);

    formElem.zipcode.addEventListener("keyup", checkRegexZipCode);

    formElem.campaigncode.addEventListener("keyup", checkRegexCampaignCode);

    formElem.campaigncode.addEventListener("focus", checkRegexCampaignCode);

    formElem.email.addEventListener("keyup", checkRegexEmail);
    
}
window.onload = init;


function checkIfFamilyRoom(){
    if(formElem.roomType[2].checked === true){
        formElem.persons.disabled = false;
        formElem.addition[2].disabled = true;

        if(formElem.addition[2].checked === true){
            formElem.addition[2].checked = false;
        }
    }else{
        formElem.persons.disabled = true;
        formElem.addition[2].disabled = false;
    }
}

function checkRegexTelephoneNum(){
    const regexTeleNumber = /^[0]{1}[1-9]{1,2}([-]?|[ ]?)[0-9]{4,12}$/;
    errorMsg = "ditt telefonnummer stämmer inte! >:(";
    if(regexTeleNumber.test(formElem.telephone.value)){
        formElem.telephone.style.background = "#90EE90";
        formElem.telephone.parentNode.parentNode.getElementsByTagName("span")[1].innerHTML = "";
    } else{
        formElem.telephone.style.background = "#FFCCCB";
        formElem.telephone.parentNode.parentNode.getElementsByTagName("span")[1].innerHTML = errorMsg;
    }
}

function checkRegexZipCode(){
    const regexZipCode = /^[0-9]{3}[ ]?[0-9]{2}$/;
    errorMsg = "Postnummer måste innehålla 5 siffror";
    if(regexZipCode.test(formElem.zipcode.value)){
        formElem.zipcode.style.background = "#90EE90";
        formElem.telephone.parentNode.parentNode.getElementsByTagName("span")[1].innerHTML = "";
    } else{
        formElem.zipcode.style.background = "#FFCCCB";
        formElem.zipcode.parentNode.parentNode.getElementsByTagName("span")[1].innerHTML = errorMsg;
    }
}

function checkRegexCampaignCode(){
    const regexCampaignCode = /^[A-Za-zÅÄÖåäö]{3}-[0-9]{2}-[A-Za-zÅÄÖåäö]{1}[0-9]{1}$/;
    if(regexCampaignCode.test(formElem.campaigncode.value)){
        formElem.campaigncode.style.background = "#90EE90";
    }else{
        formElem.campaigncode.style.background = "#FFCCCB";
        
    }
}

function checkRegexEmail(){
    const regexEmail = /^[A-Za-zÅÄÖåäö0-9._]{1,20}[@]{1}[A-Za-zÅÄÖåäö0-9]{1,10}[.]{1}[c][o][m]$/; //Jag vet att det inte behövdes men det är kul att skriva långa regex
    if(regexEmail.test(formElem.email.value)){
        formElem.email.style.background = "#90EE90";
    } else{
        formElem.email.style.background = "#FFCCCB";
    }
}

function makeCapitalLetters(){
    let cityContent = formElem.city.value;
    formElem.city.value = cityContent.toUpperCase();
}

function calculateCost(){
    let additionCost = 0;
    for(i=0;i<formElem.roomType.length;i++){
        if(formElem.roomType[i].checked === true){
          roomTypeCost = Number(formElem.roomType[i].value.split(",")[1]);  
        }   
    }

    for(j=0; j<formElem.addition.length;j++){
        if(formElem.addition[j].checked === true){
            additionCost += Number(formElem.addition[j].value.split(",")[1]);
        } 
        
    }    
    totalDays = Number(formElem.nights.value);

    totalCost = ((roomTypeCost + additionCost) * totalDays);
    totalCostElem.innerHTML = totalCost;
}