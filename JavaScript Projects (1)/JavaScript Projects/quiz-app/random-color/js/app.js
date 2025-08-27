// function colorcng(){
//     const randomNumber = Math.floor(Math.random() * 16777215);
//     const randomCode = "#" + randomNumber.toString(10);

//     alert(randomCode);
// }

// alert(Math.floor(Math.random() * 16777215));
const colorcng = () => {
    // Hex Code
    const randomNumber = Math.floor(Math.random() * 16777215);
    const randomCode = "#" + randomNumber.toString(10);
    
    document.body.style.backgroundColor = randomCode;

    // alert(randomCode);
    document.getElementById("color-code").innerText = randomCode;

    navigator.clipboard.writeText(randomCode)
}

//event call
document.getElementById("btn").addEventListener(
    "click",
    colorcng
)


// // init call
// getColor();