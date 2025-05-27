let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset-btn")
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnO = true;
let draw = document.querySelector(".draw");



const winPatterns = [ //YAHA PE ARRAY MEIN ARRAY BANAYA HAI JISMEIN 3 ELEMENTS HAI JO KI 3 BOXES KO REPRESENT KARTE HAI
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
]
boxes.forEach((box) => {//YAHA PE HUMNE HAR EK BOX PE EVENT LISTENER LAGAYA HAI JO KI CLICK KARNE PE CHALTA HAI
    box.addEventListener("click",()=>{
        
        if(turnO){
            box.innerText = "O"; //YAHA PE HUMNE HAR EK BOX PE TEXT DAAL DIYA HAI JO KI O HAI
            turnO = false;
        } else{
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;

        checkWinner();
    });
});

const disableBoxes =() =>{ //jo boxes pe click hua hai wo disable ho jayenge jisse app uspe click karne se value change nhi hogi 
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBoxes =() =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner) =>{
    msg.innerText = `Game over, winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disableBoxes();
}
const checkWinner = ()=>{
    for (let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText; //
        let pos2Val = boxes[pattern[1]].innerText; 
        let pos3Val = boxes[pattern[2]].innerText; 
        if (pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
            
            showWinner(pos1Val);
            }
        }
    }
}
const resetGame  = () =>{
    turnO = true;
    enableBoxes();
    msgcontainer.classList.add("hide");
}
resetBtn.addEventListener("click",resetGame);