function resetForm() {
    alert("Form reset successfull");
    document.getElementById("save-btn").disabled = true;
    document.getElementById("reset-btn").disabled = true;
    document.getElementById("change-btn").disabled = true;
    document.getElementById("full-name").value = ""
    document.getElementById("roll-number").value = ""
    document.getElementById("address").value = ""
    document.getElementById("DOB").value = ""
    document.getElementById("enrollment-date").value = ""
    document.getElementById("class").value = ""
}
// validation
function validate() {
    var rollnumber = document.getElementById("roll-number");
    var name = document.getElementById('full-name').value;
    var clas = document.getElementById('class').value;
    var DOB = document.getElementById('DOB').value;
    var enroll = document.getElementById('enrollment-date').value;
    var address = document.getElementById('address').value;
    if (name.trim(' ').length == 0) {
        return 0;
    }
    if (rollnumber.trim(' ').length == 0) {
        return 0;
    }
    if (address.trim(' ').length == 0) {
        return 0;
    }
    if (clas.trim(' ').length == 0) {
        return 0;
    }
    if (DOB.trim(' ').length == 0) {
        return 0;
    }
    if (enroll.trim(' ').length == 0) {
        return 0;
    }
    console.log("object")
    return 1;
}
// automatic form fetch using roll number
async function getByRollno() {
    var rollnumber = document.getElementById('roll-number').value;
    // var url = 'http://api.login2explore.com:5577/api/irl';
    var url = 'https://jsonplaceholder.typicode.com/posts';
    try {
        var response = await fetch(url, {
            method: "POST",
            headers: {
                'content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: "90932109|-31949222019124649|90962072",
                cmd: "GET_BY_KEY",
                dbName: "Students",
                rel: "Students-Rel",
                createTime:true,
                updateTime:true,
                jsonStr: {"roll-number": rollnumber},
                data:{
                    "name":"Arnav garg",
                    "class":10,
                    "DOB":"2002-10-15",
                    "address":"C-126/devlok colony",
                    "enrollmentDate":"2002-10-15"
                }
            })
        })
        if(!response.ok){
            alert("not ok probably cors error");
            console.log(response);
        }
        const data = await response.json();
        if(response.status==400){
            document.getElementById("save-btn").disabled=false;
            document.getElementById("reset-btn").disabled=false;
            return;
        }
        else{
            localStorage.setItem("recordNumber",data.data.rec_no);
            document.getElementById("change-btn").disabled=false;
            document.getElementById("reset-btn").disabled=false;
            document.getElementById('full-name').value=data.data.name;
            document.getElementById('class').value=data.data.class
            document.getElementById('DOB').value=data.data.DOB
            document.getElementById('enrollment-date').value=data.data.enrollmentDate
            document.getElementById('address').value=data.data.address
        }
        console.log(data.data);
    } catch (error) {
        console.log(error);
        alert(error);
    }
}
// new user request
async function sendnewreq() {
    var ans = validate();
    if (ans == 0) {
        alert("form filled invalid");
        return;
    }
    var rollnumber = document.getElementById("roll-number");
    var name = document.getElementById('full-name').value;
    var clas = document.getElementById('class').value;
    var DOB = document.getElementById('DOB').value;
    var enroll = document.getElementById('enrollment-date').value;
    var address = document.getElementById('address').value;
    sendobj = {
        "roll-number":rollnumber,
        "name": name,
        "class": clas,
        "DOB": DOB,
        "address": address,
        "enrollmentDate": enroll
    }
    try {
        const response = await fetch("", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            }, body: JSON.stringify({
                token: "90932109|-31949222019124649|90962072",
                cmd: "PUT",
                dbName: "Students",
                rel: "Students-rel",
                jsonStr: sendobj
            }
            )
        })
        if (!response.ok) {
            alert("unable to submit for error");
        }
        const data = await response.json();
        alert("new student filled successfully");
        console.log(data);
        resetForm();
    } catch (error) {
        alert("error in form submission Try after sometime");
        console.log(error);
    }
}
// function for update
async function sendupdatereq() {
    var ans = validate();
    if (ans == 0) {
        alert("form filled invalid");
        return;
    }
    var name = document.getElementById('full-name').value;
    var clas = document.getElementById('class').value;
    var DOB = document.getElementById('DOB').value;
    var enroll = document.getElementById('enrollment-date').value;
    var address = document.getElementById('address').value;
    sendobj = {
        "name": name,
        "class": clas,
        "DOB": DOB,
        "address": address,
        "enrollmentDate": enroll
    }
    const rec =  localStorage.getItem("recordNumber").toString();
    try {
        const response = await fetch("", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            }, body: JSON.stringify({
                token: "90932109|-31949222019124649|90962072",
                cmd: "UPDATE",
                dbName: "Student",
                rel: "Student-Rel",
                jsonStr: { 
                    rec:{
                        sendobj
                    }
                 },
                
            }
            )
        })
        if (!response.ok) {
            alert("unable to submit for error");
        }
        const data = await response.json();
        console.log(data);
        alert("user updated successfull");
        resetForm();
    } catch (error) {
        alert("error in form submission Try after sometime");
        console.log(error);
    }
}