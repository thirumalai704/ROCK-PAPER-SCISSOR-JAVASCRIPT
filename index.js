// popup for instruction 
const popUp =document.querySelector("#popUp");

// play btn 
const playButton =document.querySelector("#playButton");
const nextRoundButton =document.querySelector("#nextRoundButton");
const initButton =document.querySelector("#initButton");

// control btn
const gameControl =document.querySelectorAll(".gameControl");
const userControl =document.querySelectorAll(".userControl");
const ComputerControl =document.querySelectorAll(".ComputerControl");

// count down and round btn
const roundSelectContainer =document.querySelector("#roundSelectContainer");
const roundID =document.querySelector("#roundID");
const roundselect =document.querySelector("#roundSelect");
const roundIDSpan =roundID.querySelector("span");
const CountDown =document.querySelector("#CountDown");
const errorMessagePara =document.querySelector("#errorMessagePara");

// user firework and computer firework
const userFireWork =document.querySelector("#userFireWork");
const userScore =document.querySelector("#userScore");

const ComputerFirework =document.querySelector("#ComputerFirework");
const computerscore =document.querySelector("#computerscore");

let currentRound = 1;
const LongDelay =1300;
const shortDelay = 300;
const Delay = 1000;



// popup event listener function
function openPop(){
    removeClasses([popUp],["hidden"])
    // popUp.classList.remove('hidden') 
}
function closePopup(){
    // popUp.classList.add('hidden')
addClasses([popUp],["hidden"])
}
// add and remove class 
function addClasses(elements,classes){
    elements.forEach((element) => {
      classes.forEach((className) => {
            element.classList.add(className);
        });
        
    });
}
function removeClasses(elements,classes){
    elements.forEach((element) => {
      classes.forEach((className) => {
            element.classList.remove(className);
        });
        
    });
}
// reset btn 
  let isGameStarted = false;
function init(){
     isGameStarted =false;
    userScore.innerText = '0'
    computerscore.innerText = "0"
 
    show([roundSelectContainer,playButton])
    hide([CountDown,roundID,nextRoundButton,initButton])
    roundselect.value ="5";
   
    
}
function enable(elements){
    elements.forEach((element)=>{
        element.disabled = false;
    })

}
function disable(elements){
    elements.forEach((element)=>{
        element.disabled = true;
    })
}

//start game
let numberOfRounds = undefined;
function startGame() {
 if (roundselect.value==="") {
   displayError(errorMessagePara);
    return;
 }  
 numberOfRounds= +roundselect.value;
 isGameStarted =true;
 hide([roundSelectContainer,playButton])
 show([roundID,CountDown])
 currentRound=1;
CountDown.innerText="4";
addClasses([CountDown],["animate-[bounce_1s_ease-in-out_infinite]"])

 triggerCountDown();
}
function triggerCountDown() {
    if(+CountDown.innerText > 1){
        CountDown.innerText = +CountDown.innerText - 1;
        setTimeout(()=>{
            triggerCountDown();
        },Delay)
    }else {
        CountDown.innerText = "Go!!!"
        removeClasses([CountDown],["animate-[bounce_1s_ease-in-out_infinite]"]);
        enable(gameControl);
        
        
    }
    
}

// next round game
function nextRound(){
    hide([nextRoundButton]);
    show([CountDown]);
    CountDown.innerText ="4"
    addClasses([CountDown],["animate-[bounce_1s_ease-in-out_infinite]"])
    triggerCountDown();

}
//user input and computerInput
function select(userInput){
    
    let computerInput = Math.floor(Math.random()*3)+1;
    console.log({userInput,computerInput});
     setTimeout(()=>{
        disable(gameControl)
     },shortDelay)

     if (userInput===computerInput) {
        CountDown.innerText="Draw!"
     } else if(
        (userInput ===1 && computerInput===3) ||
        (userInput ===2 && computerInput===1) ||
        (userInput ===3 && computerInput===2) 
     ) {
        updateScore(userScore);
        show([userFireWork]);
         setTimeout(() => {
             hide([userFireWork]);
         }, Delay);
    }
    else{
       updateScore(computerscore);
        show([ComputerFirework]);
         setTimeout(() => {
             hide([ComputerFirework])
         }, Delay);
     }
     prepareForNextRound();
    }
function  prepareForNextRound() {
    if(currentRound<numberOfRounds){
        setTimeout(() => {
            currentRound++;
            roundIDSpan.innerText=currentRound;
            show([nextRoundButton]);
        }, Delay);
    }else{
        const userScoreValue = +this.userScore.innerText;
        const computerScoreValue = +this.computerscore.innerText;
       if(userScoreValue==computerScoreValue){
        CountDown.innerText ="Game Over, It was a Draw!";
    }else if (userScoreValue>computerScoreValue) {
           CountDown.innerText ="You Won!";
           
        } else {
           CountDown.innerText ="You Lost";
        
       }
    show([initButton])
    }
    
}
function updateScore(element) {

    CountDown.innerText ="";
        element.innerText = +element.innerText +1;
}
function hide(elements) {
    elements.forEach((element) =>{
        if(element){

            element.classList.add("hidden")
        }
    }
)
    
}
function show(elements) {
    elements.forEach((element) =>{
        if(element){
            console.log("Elements found:", elements);

            element.classList.remove("hidden");
        }
    })
    
}
function displayError(){
    errorMessagePara.innerText="Choose number of rounds above";
    setTimeout( () => {
        errorMessagePara.innerText=""
    },1000)
}