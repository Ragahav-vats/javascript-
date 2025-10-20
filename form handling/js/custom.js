var states = [
    {id: 1, name: 'Maharashtra',country_name: 'India'},
    {id: 2, name: 'Karnataka',country_name: 'India'},
    {id: 3, name: 'Tamil Nadu',country_name: 'India'},
    {id: 4, name: 'Bihar',country_name: 'India'},
    {id: 5, name: 'Gujarat',country_name: 'India'},
    {id: 6, name: 'Ontario',country_name: 'Canada'},
    {id: 7, name: 'Quebec',country_name: 'Canada'},
    {id: 8, name: 'British Columbia',country_name: 'Canada'},
    {id: 9, name: 'Alberta',country_name: 'Canada'},
    {id: 10, name: 'Manitoba',country_name: 'Canada'},
    {id: 11, name: 'New South Wales',country_name: 'Austraila'},
    {id: 12, name: 'Victoria',country_name: 'Austraila'},
    {id: 13, name: 'Queensland',country_name: 'Austraila'},
    {id: 14, name: 'Western Australia',country_name: 'Austraila'},
    {id: 15, name: 'South Australia',country_name: 'Austraila'}
];


    document.getElementById('country').addEventListener('change', (event) => {
    console.log(event.target.value);

    var filterStates = states.filter((v,i) => {
        if(v.country_name == event.target.value){
            return v;
        }
    })
    var showStates = '<option value="">Select State</option>';

    filterStates.forEach((v,i) => {
        showStates += '<option value="'+ v.name +'">'+ v.name +'</option>';
    })

    document.getElementById('state').innerHTML = showStates;
});

var userData = localStorage.getItem('userInfo');
if(userData){
    userInfo = JSON.parse(userData);
}else{
    userInfo = [];
}

document.getElementById('formHandler').addEventListener('submit', (event)=>{
     event.preventDefault();

    //  var name = document.getElementById('name').value;
    //  var email = event.target.email.value;
    //  console.log(email);

    var userData = {
        name : document.getElementById('name').value,
        email : document.getElementById('email').value,
        mobile : document.getElementById('mobile').value,
        country : document.getElementById('country').value,
        state : document.getElementById('state').value,
    }
    // var Data = [userData];
    // var userInfo = (Data);
    userInfo.push(userData);
    console.log(userInfo);
    localStorage.setItem('userInfo',JSON.stringify(userInfo));
    event.target.reset();
    
})

