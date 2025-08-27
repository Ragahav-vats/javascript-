
// var i='10+20+'
// var lastchar=i(i.length-1);
// var afterRemovelastchar=i.slice(0,i.length-1);
// console.log(afterRemovelastchar)

var opr=['+','-','*','/','.'];


var res=document.querySelector('table');
var input=document.querySelector('input');
res.addEventListener('click',(event) =>{
    var btn=event.target;
    var oldvalue=input.value;
    var lastchar=oldvalue[oldvalue.length-1];
   var afterRemovelastchar=oldvalue.slice(0,oldvalue.length-1);

    if(btn.tagName=='BUTTON'){
        // console.log(btn.innerHTML)

        if(btn.innerHTML=='c'){
            input.value=''
        }
        else if(btn.innerHTML=='='){
            input.value=eval(input.value)
        }
        else{

            if(opr.includes(btn.innerHTML) && opr.includes(lastchar)){
                input.value=afterRemovelastchar+btn.innerHTML
            }
            else{
                input.value=oldvalue+btn.innerHTML
            }
            input.value=btn.innerHTML+oldvalue
        }
    }
})