
// - showing one week
// - one meal per day
// - when the page is loaded, Monday is already pre-filled
// - the day according to the visiting date (e.g. 10 March is Friday) will be highlighted
// - click on the add button of the day will direct the user to the form at the bottom, 
// they can select from 3 categories - vegetable, meat and carbs, with 4 options each
// - after submitting the choices, they will be displayed on the calendar in the relevant colour of that category

window.onload = function () {

    // create variables
    // get the five buttons from the html
    var monButton = document.getElementById("monButton");
    var tueButton = document.getElementById("tueButton");
    var wedButton = document.getElementById("wedButton");
    var thuButton = document.getElementById("thuButton");
    var friButton = document.getElementById("friButton");
    var satButton = document.getElementById("satButton");
    var sunButton = document.getElementById("sunButton");
    // store the buttons into an array
    var buttons = [monButton, tueButton, wedButton, thuButton, friButton, satButton, sunButton];

    // buttonIndex was set to 0 as Monday is the prefilled example
    var buttonIndex = 0;

    // an array consist list of days 
    var weekday = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    
    // get two <span> to display the date and the day of the week
    var dayDisplay = document.getElementById("day");
    var todayDate = document.getElementById("todayDate");

    // create a new date timestamp
    var dateVar = new Date();
    // getting date of the week from the timestamp
    var dayOfWeek = dateVar.getDay();

    // access the whole form by creating a 'handle'
    var formHandle = document.forms.foodForm;
    // variables to store the input values from the form
    var vegeInput = formHandle.vege;
    var meatInput = formHandle.meat;
    var carbsInput = formHandle.carbs;

    // variable of the div with the day selected
    var daySelected = document.getElementById(weekday[buttonIndex]);

    // five objects to store the input values of the 5 days from the form
    var monChoice = {
        vegeChoice: "Onion",
        meatChoice: "Lamb",
        carbsChoice: "Noodle",
    };

    var tueChoice = {
        vegeChoice: "",
        meatChoice: "",
        carbsChoice: "",
    };

    var wedChoice = {
        vegeChoice: "",
        meatChoice: "",
        carbsChoice: "",
    };

    var thuChoice = {
        vegeChoice: "",
        meatChoice: "",
        carbsChoice: "",
    };

    var friChoice = {
        vegeChoice: "",
        meatChoice: "",
        carbsChoice: "",
    };

    var satChoice = {
        vegeChoice: "",
        meatChoice: "",
        carbsChoice: "",
    };

    var sunChoice = {
        vegeChoice: "",
        meatChoice: "",
        carbsChoice: "",
    };


    // store the 5 objects into an array
    var choiceArray = [monChoice, tueChoice, wedChoice, thuChoice, friChoice, satChoice, sunChoice];

    // display the date part of the timestamp
    todayDate.innerHTML = dateVar.toDateString();

    // the button of day according to the visiting date will be highlighted, with different background color and text
    if (dayOfWeek >= 1 && dayOfWeek <= 6) {
        buttons[dayOfWeek-1].focus();
        buttons[dayOfWeek-1].style.background = "#ff6b1c";
        buttons[dayOfWeek-1].innerHTML = "Plan for TODAY";
    } else if (dayOfWeek === 0) { // Handle the case for Sunday
        buttons[6].focus();
        buttons[6].style.background = "#ff6b1c";
        buttons[6].innerHTML = "Plan for TODAY";
    }
    
    // when clicking on any of the button will enable displayForm function
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].onclick = displayForm;
    }

    function displayForm() {
        // showing the form section
        formHandle.style.display = "block";

        // all the inputted value will be resetted
        formHandle.reset();

        // redefine buttonIndex according to the day selected
        buttonIndex = buttons.indexOf(this);
        
        // showing the day selected at the first question of the form
        dayDisplay.innerHTML = weekday[buttonIndex];

        //showing the previous choice for user to edit the form
        vegeInput.value = choiceArray[buttonIndex].vegeChoice;
        meatInput.value = choiceArray[buttonIndex].meatChoice;
        carbsInput.value = choiceArray[buttonIndex].carbsChoice;
    
    }

    // listen for the onsubmit event to process the data of the form before it is submitted
    formHandle.onsubmit = displayFood;

    function displayFood(){
        // change the text of the button to guide the user the possibility to change their input
        buttons[buttonIndex].innerHTML = "Change your plan";

        // store the chosen value to the respective object
        choiceArray[buttonIndex].vegeChoice = vegeInput.value;
        choiceArray[buttonIndex].meatChoice = meatInput.value;
        choiceArray[buttonIndex].carbsChoice = carbsInput.value;

        // update the variable of the div with the day selected
        daySelected = document.getElementById(weekday[buttonIndex]);

        // variables to get the child div based on their class
        var mealVegeElement = daySelected.querySelector(".mealVege");
        var mealMeatElement = daySelected.querySelector(".mealMeat");
        var mealCarbsElement = daySelected.querySelector(".mealCarbs");

        // check if the user has selected anything from catagory vege/ meat/ carbs
        // if they do, display their choice in the box with the background color according to the catergory
        if (vegeInput.value != ""){
            mealVegeElement.style.background = "#2EC4B6";
            mealVegeElement.innerHTML = choiceArray[buttonIndex].vegeChoice;
        }
        
        if (meatInput.value != ""){
            mealMeatElement.style.background = "pink";
            mealMeatElement.innerHTML = choiceArray[buttonIndex].meatChoice;
        }
       
        if (carbsInput.value != ""){
            mealCarbsElement.style.background = "#FFED66";
            mealCarbsElement.innerHTML = choiceArray[buttonIndex].carbsChoice;
        }
        
        return false; // stop the script from going further
    }

}


