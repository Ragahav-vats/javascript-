var Allquestations = document.querySelectorAll('.question');
Allquestations.forEach((value, index) =>{
    value.addEventListener('click', ()=>{
        var currentAnswer = value.nextElementSibling;
        var Allanswers = document.querySelectorAll('.answer');
        for(var i=0; i<Allanswers.length; i++){
            if(Allanswers[i] != currentAnswer){
               Allanswers[i].classList.remove('active');
            }
        }
        currentAnswer.classList.toggle('active');

    })
})