//Focus the text input name
let name = document.getElementById("name")
name.focus()

//Create a text field when other job role is selected
title = document.querySelector("#title")
otherTitle = document.querySelector("#other-title")
title.addEventListener("change", function (e) {
    if (e.target.value === "other") {
        otherTitle.removeAttribute("class", "hide")
    } else {
        otherTitle.setAttribute("class","hide")
    }
})


//Design and color selects correlation 
color = document.querySelector("#color")
design = document.querySelector("#design")

design.addEventListener('change', function(e){
    if (design.value ==="select theme") {
        document.querySelector("#color-label").setAttribute("class", "hide")
        color.setAttribute("class", "hide")
    }
    if (design.value === "heart js") {
        document.querySelector("#color-label").removeAttribute("class", "hide")
        color.removeAttribute("class", "hide")
        color.value = "tomato"
        for (let i = 0; i < color.length; i++) {
            if (color[i].innerHTML.toLowerCase().includes("puns")) {
                color[i].setAttribute("class", "hide")
            } else {
                color[i].removeAttribute("class", "hide")
            }

        }
    } 
    if (design.value === "js puns") { 
        document.querySelector("#color-label").removeAttribute("class", "hide")
        color.removeAttribute("class", "hide")
        color.value = "cornflowerblue"
        for (let i = 0; i < color.length; i++) {
            if (!color[i].innerHTML.toLowerCase().includes("puns")) {
                color[i].setAttribute("class", "hide")
            } else {
                color[i].removeAttribute("class", "hide")
            }

        }
    }
})


//Check conflicts between activities and get the cost
let total = { main: false, frameworks: false, libs: false, express: false, node: false}
let main, frameworks, lib, node, express, build ,npm

let getCost = function (total) {
     if(total.main === true) {
        main = 200
     } else {
         main = 0
    }

    if (total.frameworks === true) {
        frameworks = 100
    } else {
        frameworks = 0
    }
    if (total.libs === true) {
        libs = 100
    } else {
        libs = 0
    }
    if (total.node === true) {
        node = 100
    } else {
        node = 0
    }
    if (total.express === true) {
        express = 100
    } else {
        express = 0
    }
    if (total.build === true) {
        build = 100
    } else {
        build = 0
    }
    if (total.npm === true ) {
        npm = 100
    } else {
        npm = 0
    }
    document.getElementById('cost').innerHTML = `Total: $${main+frameworks+libs+node+express+build+npm}`
}


document.getElementById('all').addEventListener('change', function (e){
    if (e.target.checked === true ) {
        total.main=true
    } else {
        total.main=false
    }
    getCost(total)
})
document.getElementById('js-frameworks').addEventListener('change', function (e) {
    if (e.target.checked === true) {
        total.frameworks=true
        document.getElementById('express').disabled=true
        

        
    } else {
        total.frameworks=false
        document.getElementById('express').disabled = false
        
    }
    getCost(total)
})
document.getElementById('js-libs').addEventListener('change', function (e) {
    if (e.target.checked === true) {
        total.libs = true
        document.getElementById('node').disabled = true
    } else {
        total.libs=false
        document.getElementById('node').disabled = false
    }
    getCost(total)
})
document.getElementById('express').addEventListener('change', function (e) {
    if (e.target.checked === true) {
        total.express=true
        document.getElementById('js-frameworks').disabled = true
    } else {
        total.express=false
        document.getElementById('js-frameworks').disabled = false
    }
    getCost(total)
})
document.getElementById('node').addEventListener('change', function (e) {
    if (e.target.checked === true) {
        total.node=true
        document.getElementById('js-libs').disabled = true
    } else {
        total.node=false
        document.getElementById('js-libs').disabled = false
    }
    getCost(total)
})
document.getElementById('build').addEventListener('change', function (e) {
    if (e.target.checked === true) {
        total.build = true
    } else {
        total.build = false
    }
    getCost(total)
})
document.getElementById('npm').addEventListener('change', function (e) {
    if (e.target.checked === true) {
        total.npm = true
    } else {
        total.npm = false
    }
    getCost(total)
})

//Payment area DOM behaviour
creditCard = document.getElementById('credit-card')
paypal = document.getElementById('paypal')
bitcoin = document.getElementById('bitcoin')
payment = document.getElementById('payment')


payment.addEventListener("change", function(){
    if(payment.value==="credit card"){
        console.log(payment.value)
        creditCard.removeAttribute("class", "hide")
        paypal.setAttribute("class", "hide")
        bitcoin.setAttribute("class", "hide")
    } else if (payment.value==="paypal") {
        console.log(payment.value)
        paypal.removeAttribute("class", "hide")
        creditCard.setAttribute("class", "hide")
        bitcoin.setAttribute("class", "hide")
    } else {
        console.log(payment.value)
        bitcoin.removeAttribute("class", "hide")
        creditCard.setAttribute("class", "hide")
        paypal.setAttribute("class", "hide")
    }
})

//Check  and messages validation

mail = document.getElementById("mail")
ccNum = document.getElementById("cc-num")
form = document.getElementById("form")
zip = document.getElementById("zip")
cvv = document.getElementById("cvv")
let checkName = function() {
    if (document.getElementById("name").value === "") {
        document.getElementById("name-error").innerHTML = "Please provide a name"
        document.getElementById("name").setAttribute("class", "error")
        document.getElementById("form").addEventListener("submit", function (event) {
            event.preventDefault()
        })
        document.getElementById("name").focus()
        
    } else {
        document.getElementById("name-error").innerHTML = ""
        document.getElementById("name").removeAttribute("class", "error")
    }
}

let checkMail = function () {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!re.test(String(mail.value).toLowerCase())) {
        mail.setAttribute("class", "error")
        document.getElementById("mail-error").innerHTML = "Please provide a valid email"
        document.getElementById("form").addEventListener("submit", function (event) {
            event.preventDefault()
        })
        mail.focus()
    } else if (re.test(String(mail.value).toLowerCase())) {
        mail.removeAttribute("class", "error")
        document.getElementById("mail-error").innerHTML = ""
    }
    
}

let checkCc = function(){
    if(payment.value==="credit card") {
        if (ccNum.value==="") {
            document.getElementById("cc-error").innerHTML = "This field can't be empty"
            ccNum.setAttribute("class", "error")
            document.getElementById("form").addEventListener("submit", function (event) {
                event.preventDefault()
            })
            ccNum.focus()
        } else if (isNaN(ccNum.value) || ccNum.value.toString().length < 13 || ccNum.value.toString().length > 16) {
            document.getElementById("cc-error").innerHTML = "Please introduce a Number between 13 and 16 digits"
            ccNum.setAttribute("class", "error")
            document.getElementById("form").addEventListener("submit", function (event) {
                event.preventDefault()
            })
            ccNum.focus()
        } else {
            document.getElementById("cc-error").innerHTML = ""
            ccNum.removeAttribute("class", "error")
        }

        if (!isNaN(zip.value) && zip.value.toString().length === 5) {
            document.getElementById("zip-error").innerHTML = ""
            zip.removeAttribute("class", "error")
        } else {
            document.getElementById("zip-error").innerHTML = "Please introduce a Number of 5 digits"
            zip.setAttribute("class", "error")
            document.getElementById("form").addEventListener("submit", function (event) {
                event.preventDefault()
            })
            zip.focus()
        }

        if (!isNaN(cvv.value) && cvv.value.toString().length === 3) {
            document.getElementById("cvv-error").innerHTML = ""
            cvv.removeAttribute("class", "error")
        } else {
            document.getElementById("cvv-error").innerHTML = "Please introduce a Number of 3 digits"
            cvv.setAttribute("class", "error")
            document.getElementById("form").addEventListener("submit", function (event) {
                event.preventDefault()
            })
            cvv.focus()
        }  
    }
 
}
activities = document.querySelector(".activities")
let checkActivities = function () {
    let activitiesCount=0
    for (let i = 1; i <= 7; i++){
        if (activities.children[i].children[0].checked) {
            activitiesCount+=1
        }
    }
    if (activitiesCount===0) {
        document.getElementById("activities-error").innerHTML="Please check at least one activity"
        document.getElementById("form").addEventListener("submit", function (event) {
            event.preventDefault()
        })
    } else if (activitiesCount>=1){
        document.getElementById("activities-error").innerHTML = ""
    }
}


let selectDefault = function () {
    //Default behaviour of the color and design area 
    design.value = "select theme"
    document.querySelector("#color-label").setAttribute("class", "hide")
    color.setAttribute("class", "hide")
 
    //Default behaviour for the activities area
    let checkboxes = document.getElementsByTagName('input');
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].type == 'checkbox') {
            checkboxes[i].checked = false;
        }
    }
    //Default behaviour for the payment area
    payment.value = "credit card"
    paypal.setAttribute("class", "hide")
    bitcoin.setAttribute("class", "hide")
    //Default Behaviuour for the job area 
    title.value = "full - stack js developer"
    otherTitle.setAttribute("class", "hide")
}
document.addEventListener("load", selectDefault())

//validate data of the form
button = document.getElementById("button")
button.addEventListener("click", function () {
    checkCc()
    checkActivities()
    checkMail()
    checkName()
}) 





