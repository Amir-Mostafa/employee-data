
var nameInput=document.getElementById("name");
var ageInput=document.getElementById("age");
var phoneInput=document.getElementById("phone");
var titleInput=document.getElementById("title");
var searchInput=document.getElementById("search");
var inputs=document.getElementsByClassName("form-control");
var idInput=document.getElementById("id");
var add=document.getElementById("add");
var alertName=document.getElementById("alert-name");
var alertAge=document.getElementById("alert-age");
var alertPhone=document.getElementById("alert-phone");
var alertTitle=document.getElementById("alert-title");
idInput.style.display="none";
var employee=[];

add.setAttribute("disabled","true");
alertName.style.display="none";
alertAge.style.display="none";
alertPhone.style.display="none";
alertTitle.style.display="none";
var regexName=/(^([A-Za-z]{3,10}\s|[A-Za-z]{3,10}){1,3}$)/;
var regexAge=/(^[2-7][0-9]|80)$/;
var regexPhone=/^01[0125][0-9]{8}$/
var regexTitle=/^[A-Za-z0-9\s\-_,\.;:()]+$/;
//check if lockal host include data or not
if(localStorage.getItem("employees")!=null)
    {
        employee=JSON.parse(localStorage.getItem("employees"));
        displayData();
    }
//on click add button
document.getElementById("add").onclick = function(){

    checkAdd();
    if(this.innerHTML=="Update")
    {
        updateEmployee();
        this.innerHTML="Add";   
    }
    else
        addEmployee();
    displayData();
    clearInputs();
    nameInput.classList.remove("is-valid");
    ageInput.classList.remove("is-valid");
    phoneInput.classList.remove("is-valid");
    titleInput.classList.remove("is-valid");
    checkAdd();
};

//when changr text in search input
document.getElementById("search").onkeyup=function(){
    
        var str="";
    for(var i=0;i<employee.length;i++)
    {
        if(employee[i].name.toLowerCase().includes(searchInput.value.toLowerCase()))
        str+="<tr><td>"+employee[i].name+"</td><td>"+employee[i].age+"</td><td>"+employee[i].phone+"</td><td>"+employee[i].title+"</td><td class='text-center' ><button id='del'  class='btn btn-danger ml-2' Onclick='deleteEmployee("+i+");' >Delete</button></td><td><button class='btn btn-warning ml-2' Onclick='update("+i+");' id='update' >Updata</button></td></tr>"
    }
    document.getElementById("content").innerHTML=str;
    
}
//function to clear all inputs
function clearInputs()
{
    for(var i=0;i<inputs.length;i++)
        inputs[i].value = "";
}

//functio add employee in array and localstorage
function addEmployee()
{
    var emp=
    {
        name:nameInput.value,
        age:ageInput.value,
        phone:phoneInput.value,
        title:titleInput.value,
    }
    employee.push(emp);
    localStorage.setItem("employees",JSON.stringify(employee));
}
// paint data in tablebody
function displayData()
{
    var str="";
    for(var i=0;i<employee.length;i++)
    {
        
        str+="<tr><td>"+employee[i].name+"</td><td>"+employee[i].age+"</td><td>"+employee[i].phone+"</td><td>"+employee[i].title+"</td><td class='text-center' ><button id='del'  class='btn btn-danger ml-2' Onclick='deleteEmployee("+i+");' >Delete</button></td><td><button class='btn btn-warning ml-2' Onclick='update("+i+");' id='update' >Updata</button></td></tr>"
    }
    document.getElementById("content").innerHTML=str;
}

//function delete employee from array and localstorage
function deleteEmployee(index)
{
    employee.splice(index,1);
    displayData();
    localStorage.setItem("employees",JSON.stringify(employee));
}
//function to put data in inputs and chage innerhtml of addbtn to update
function update(index)
{   
    idInput.value=index;
    nameInput.value=employee[index].name;
    ageInput.value=employee[index].age;
    phoneInput.value=employee[index].phone;
    titleInput.value=employee[index].title;
    document.getElementById("add").innerHTML="Update";
    
}

//function to update data in array and localstorage
function updateEmployee()
{
    employee[idInput.value].name=nameInput.value;
    employee[idInput.value].age=ageInput.value;
    employee[idInput.value].phone=phoneInput.value;
    employee[idInput.value].title=titleInput.value;
    localStorage.setItem("employees",JSON.stringify(employee));
}


//validation


nameInput.addEventListener("keyup",function(){

    if(!regexName.test(nameInput.value))
    {
        nameInput.classList.remove("is-valid");
        nameInput.classList.add("is-invalid");
        alertName.style.display="block";
    }
    else
    {
        nameInput.classList.add("is-valid");
        nameInput.classList.remove("is-invalid");
        alertName.style.display="none";
    }
    checkAdd();
});

ageInput.addEventListener("keyup",function(){

    if(!regexAge.test(ageInput.value))
    {
        ageInput.classList.remove("is-valid");
        ageInput.classList.add("is-invalid");
        alertAge.style.display="block";
    }
    else
    {
        ageInput.classList.add("is-valid");
        ageInput.classList.remove("is-invalid");
        alertAge.style.display="none";
    }
    checkAdd();
});

phoneInput.addEventListener("keyup",function(){

    if(!regexPhone.test(phoneInput.value))
    {
        phoneInput.classList.remove("is-valid");
        phoneInput.classList.add("is-invalid");
        alertPhone.style.display="block";
    }
    else
    {
        phoneInput.classList.add("is-valid");
        phoneInput.classList.remove("is-invalid");
        alertPhone.style.display="none";
    }
    checkAdd();
});

titleInput.addEventListener("keyup",function(){

    if(!regexTitle.test(titleInput.value))
    {
        titleInput.classList.remove("is-valid");
        titleInput.classList.add("is-invalid");
        alertTitle.style.display="block";
    }
    else
    {
        titleInput.classList.add("is-valid");
        titleInput.classList.remove("is-invalid");
        alertTitle.style.display="none";
    }
    checkAdd();
});


function checkAdd()
{
    if(regexName.test(nameInput.value)&&regexAge.test(ageInput.value)&&regexPhone.test(phoneInput.value)&&regexTitle.test(titleInput.value))
    {
        add.removeAttribute("disabled");
    }
    else
    {
    
    add.setAttribute("disabled","true");
    }
}


