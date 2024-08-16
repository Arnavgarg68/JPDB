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
    var rollnumber = document.getElementById("roll-number").value;
    var name = document.getElementById('full-name').value;
    var clas = document.getElementById('class').value;
    var DOB = document.getElementById('DOB').value;
    var enroll = document.getElementById('enrollment-date').value;
    var address = document.getElementById('address').value;
    if (name.trim(' ').length == 0) {
        document.getElementById('full-name').focus();
        return 0;
    }
    if (rollnumber.trim(' ').length == 0) {
        document.getElementById('roll-number').focus();
        return 0;
    }
    if (address.trim(' ').length == 0) {
        document.getElementById('address').focus();
        return 0;
    }
    if (clas.trim(' ').length == 0) {
        document.getElementById('class').focus();
        return 0;
    }
    if (DOB.trim(' ').length == 0) {
        document.getElementById('DOB').focus();
        return 0;
    }
    if (enroll.trim(' ').length == 0) {
        document.getElementById('enrollment-date').focus();
        return 0;
    }
    return 1;
}
// automatic form fetch using roll number
async function getByRollno() {
    var rollnumber = document.getElementById('roll-number').value;
    var url = 'http://api.login2explore.com:5577/api/irl';
    rollnumber = Number(rollnumber);
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
                rel: "Students-rel",
                createTime: true,
                updateTime: true,
                jsonStr: { "roll-number": rollnumber }
            })
        })
        if (!response.ok) {
            alert("not ok probably cors error");
            return;
        }
        const data = await response.json();

        if (data.status == 400) {
            document.getElementById("save-btn").disabled = false;
            document.getElementById("reset-btn").disabled = false;
            return;
        }
        let parsedData = JSON.parse(data.data);
        localStorage.setItem("recordNumber", parsedData.rec_no);
        document.getElementById("change-btn").disabled = false;
        document.getElementById("reset-btn").disabled = false;
        document.getElementById('full-name').value = parsedData.record.name;
        document.getElementById('class').value = parsedData.record.class
        document.getElementById('DOB').value = parsedData.record.DOB
        document.getElementById('enrollment-date').value = parsedData.record["enrollment-date"]
        document.getElementById('address').value = parsedData.record.address
    } catch (error) {
        console.log(error);
    }
}
// new user request
async function sendnewreq() {
    var ans = validate();
    if (ans == 0) {
        alert("form filled invalid");
        return;
    }
    var url = 'http://api.login2explore.com:5577/api/iml';
    var rollnumber = document.getElementById("roll-number").value;
    var name = document.getElementById('full-name').value;
    var clas = document.getElementById('class').value;
    var DOB = document.getElementById('DOB').value;
    var enroll = document.getElementById('enrollment-date').value;
    var address = document.getElementById('address').value;
    sendobj = {
        "roll-number": rollnumber,
        "name": name,
        "class": clas,
        "DOB": DOB,
        "address": address,
        "enrollment-date": enroll
    }
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            }, body: JSON.stringify({
                token: "90932109|-31949222019124649|90962072",
                cmd: "PUT",
                dbName: "Students",
                rel: "Students-rel",
                jsonStr: [sendobj]
            }
            )
        })
        if (!response.ok) {
            alert("unable to submit for error");
            return;
        }
        const data = await response.json();
        alert("new student filled successfully");
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
    var url = 'http://api.login2explore.com:5577/api/iml';
    const rec = localStorage.getItem("recordNumber");
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            }, body: JSON.stringify({
                token: "90932109|-31949222019124649|90962072",
                cmd: "UPDATE",
                dbName: "Students",
                rel: "Students-rel",
                jsonStr: {
                    [rec]: {
                        "name": name,
                        "class": clas,
                        "DOB": DOB,
                        "address": address,
                        "enrollment-date": enroll
                    }
                },

            }
            )
        })
        if (!response.ok) {
            alert("unable to update error");
            return;
        }
        const data = await response.json();
        alert("user updated successfull");
        resetForm();
    } catch (error) {
        alert("error in form submission Try after sometime");
        console.log(error);

    }
}