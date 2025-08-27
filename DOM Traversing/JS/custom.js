// var output = document.getElementById('question').parentElement;

// var output = document.getElementById('main').parentNode;

// var output = document.getElementById('question').parentNode;

// var output = document.getElementById('html').parentNode;


// var output = document.getElementById('html').parentElement;

// var output = document.getElementById('html').parentNode;

// var output = document.getElementById('question').children;
// var output = document.getElementById('question').firstElementChild
// var output = document.getElementById('answer').nextElementSibling;
// var output = document.getElementById('question2').previousElementSiblingElementSibling;

// console.log(output)


 var allSelect = document.querySelectorAll('.question_answer');
 // console.log(allSelect)

 allSelect.forEach((v,i) =>{
 //  console.log(v)
 v.addEventListener('click',(btn) =>{
     // console.log(res.target)

     btn.target.nextElementSibiling.classList.toggle('d-none');
    
     allQuestionAnswer.forEach((value,index) => {

            
             if(i != index){
                 value.nextElementSibling.classList.add('d-none');
                 value.children[0].innerText = '+';
             }

        });
   })   
 })



