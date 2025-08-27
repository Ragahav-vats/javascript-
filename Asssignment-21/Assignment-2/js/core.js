var allques=document.querySelectorAll('.question');
allques.forEach((Value, index) =>{
    Value.addEventListener('click',()=>{
        var currentAns=Value.nextElementSibling;
        var allAns=document.querySelectorAll('.answer');

        for(var i=0;i<allAns.length;i++){
            if(allAns[i]!=currentAns){
                allAns[i].classList.remove('active')

            }
        }
        currentAns.classList.toggle('active')
        currentAns.classList.toggle("")
    })
})


