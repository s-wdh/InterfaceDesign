"use strict";
var MicroInteractions;
(function (MicroInteractions) {
    window.addEventListener("load", handleLoad);
    /* definitions of all variables */
    //get html-elements
    let controlBar = document.getElementById("controlBar");
    let powerBtn = document.getElementById("powerBtn");
    let programWheel = document.getElementById("programWheel");
    let tempWheel = document.getElementById("tempWheel");
    let spinWheel = document.getElementById("spinWheel");
    let timeWheel = document.getElementById("timeWheel");
    let display = document.getElementById("display");
    let lock = document.getElementById("lock");
    let rinseBtn = document.getElementById("rinseBtn");
    let shortBtn = document.getElementById("shortBtn");
    let ecoBtn = document.getElementById("ecoBtn");
    let startBtn = document.getElementById("startBtn");
    let startText = document.getElementById("startText");
    //other variables
    let timeHours;
    let timeMinutes;
    let washTime;
    let startBtnAnim;
    function handleLoad() {
        console.log("start");
        for (let i = 0; i < programWheel.children.length; i++) {
            programWheel.children[i].classList.add("invisible");
        }
        for (let i = 0; i < tempWheel.children.length; i++) {
            tempWheel.children[i].classList.add("invisible");
        }
        for (let i = 0; i < spinWheel.children.length; i++) {
            spinWheel.children[i].classList.add("invisible");
        }
        for (let i = 0; i < timeWheel.children.length; i++) {
            timeWheel.children[i].classList.add("invisible");
        }
        powerBtn.addEventListener("click", regulatePower);
    } //handleLoad
    function regulatePower(_event) {
        if (powerBtn.className == "active") {
            for (let i = 0; i < programWheel.children.length; i++) {
                programWheel.children[i].classList.add("invisible");
            }
            for (let i = 0; i < tempWheel.children.length; i++) {
                tempWheel.children[i].classList.add("invisible");
            }
            for (let i = 0; i < spinWheel.children.length; i++) {
                spinWheel.children[i].classList.add("invisible");
            }
            for (let i = 0; i < timeWheel.children.length; i++) {
                timeWheel.children[i].classList.add("invisible");
            }
            rinseBtn.classList.add("invisible");
            shortBtn.classList.add("invisible");
            ecoBtn.classList.add("invisible");
            lock.classList.remove("active");
            clearInterval(startBtnAnim);
            startBtn.classList.remove("active");
            startBtn.style.color = "#000000";
            display.style.color = "#000000";
            powerBtn.classList.remove("active");
            controlBar.removeEventListener("click", handleClick);
        }
        else {
            powerBtn.classList.add("active");
            controlBar.addEventListener("click", handleClick);
            let elements = document.getElementsByClassName("invisible");
            console.log(elements);
            for (let i = 0; i < elements.length; i + 1) {
                elements[i].classList.remove("invisible");
            }
            display.style.color = "#FFB800";
            startBtnAnim = setInterval(startBtnAnimation, 1000);
            handleTime();
        }
    } //regulatePowers
    function startBtnAnimation() {
        startBtn.style.color = "#FFB800";
        if (startText.classList.contains("blink")) {
            startText.classList.remove("blink");
        }
        else {
            startText.classList.add("blink");
        }
    } //startBtnAnimation
    function handleClick(_event) {
        let target = _event.target;
        console.log(target.id);
        switch (target.id) {
            case "rinseBtn": {
                if (rinseBtn.className == "active") {
                    rinseBtn.classList.remove("active");
                }
                else {
                    rinseBtn.classList.add("active");
                }
                break;
            }
            case "rinseText": {
                if (rinseBtn.className == "active") {
                    rinseBtn.classList.remove("active");
                }
                else {
                    rinseBtn.classList.add("active");
                }
                break;
            }
            case "shortBtn": {
                if (shortBtn.className == "active") {
                    shortBtn.classList.remove("active");
                }
                else {
                    shortBtn.classList.add("active");
                }
                break;
            }
            case "shortText": {
                if (shortBtn.className == "active") {
                    shortBtn.classList.remove("active");
                }
                else {
                    shortBtn.classList.add("active");
                }
                break;
            }
            case "ecoBtn": {
                if (ecoBtn.className == "active") {
                    ecoBtn.classList.remove("active");
                }
                else {
                    ecoBtn.classList.add("active");
                }
                break;
            }
            case "ecoText": {
                if (ecoBtn.className == "active") {
                    ecoBtn.classList.remove("active");
                }
                else {
                    ecoBtn.classList.add("active");
                }
                break;
            }
            case "startBtn": {
                if (startBtn.className != "active") {
                    clearInterval(startBtnAnim);
                    startBtn.classList.add("active");
                    lock.classList.add("active");
                    washTime = setInterval(startWasher, 1000);
                    controlBar.removeEventListener("click", handleClick);
                }
                break;
            }
            case "startText": {
                if (startBtn.className != "active") {
                    clearInterval(startBtnAnim);
                    startBtn.classList.add("active");
                    lock.classList.add("active");
                    washTime = setInterval(startWasher, 1000);
                    controlBar.removeEventListener("click", handleClick);
                }
                break;
            }
        } //switch target.id
        switch (target.parentElement) {
            case programWheel: {
                for (let index = 0; index < programWheel.children.length; index++) {
                    if (programWheel.children[index].classList.contains("active")) {
                        programWheel.children[index].classList.remove("active");
                    }
                }
                target.classList.add("active");
                break;
            }
            case tempWheel: {
                for (let index = 0; index < tempWheel.children.length; index++) {
                    if (tempWheel.children[index].classList.contains("active")) {
                        tempWheel.children[index].classList.remove("active");
                    }
                }
                target.classList.add("active");
                break;
            }
            case spinWheel: {
                for (let index = 0; index < spinWheel.children.length; index++) {
                    if (spinWheel.children[index].classList.contains("active")) {
                        spinWheel.children[index].classList.remove("active");
                    }
                }
                target.classList.add("active");
                break;
            }
            case timeWheel: {
                for (let index = 0; index < timeWheel.children.length; index++) {
                    if (timeWheel.children[index].classList.contains("active")) {
                        timeWheel.children[index].classList.remove("active");
                    }
                }
                target.classList.add("active");
                break;
            }
        } //switch target.parentElement
        handleTime();
    } //handleClick
    function handleTime() {
        console.log("time");
        for (const child of programWheel.children) {
            if (child.classList.contains("active")) {
                console.log(child.id);
                switch (child.id) {
                    case "cotton": {
                        timeHours = 2;
                        timeMinutes = 15;
                        break;
                    }
                    case "boil": {
                        timeHours = 2;
                        timeMinutes = 30;
                        break;
                    }
                    case "jeans": {
                        timeHours = 1;
                        timeMinutes = 30;
                        break;
                    }
                    case "wool": {
                        timeHours = 0;
                        timeMinutes = 40;
                        break;
                    }
                    case "express": {
                        timeHours = 0;
                        timeMinutes = 15;
                        break;
                    }
                    case "delicates": {
                        timeHours = 1;
                        timeMinutes = 0;
                        break;
                    }
                    case "easyCare": {
                        timeHours = 2;
                        timeMinutes = 0;
                        break;
                    }
                    case "spin": {
                        timeHours = 0;
                        timeMinutes = 30;
                        break;
                    }
                    case "stains": {
                        timeHours = 2;
                        timeMinutes = 45;
                        break;
                    }
                    case "sport": {
                        timeHours = 1;
                        timeMinutes = 15;
                        break;
                    }
                    case "outdoor": {
                        timeHours = 2;
                        timeMinutes = 30;
                        break;
                    }
                    case "impregnate": {
                        timeHours = 0;
                        timeMinutes = 30;
                        break;
                    }
                } //switch child.id
                for (const child of timeWheel.children) {
                    if (child.classList.contains("active")) {
                        switch (child.id) {
                            case "time0":
                                timeHours += 0;
                                break;
                            case "time1":
                                timeHours += 1;
                                break;
                            case "time2":
                                timeHours += 2;
                                break;
                            case "time3":
                                timeHours += 3;
                                break;
                            case "time4":
                                timeHours += 4;
                                break;
                            case "time5":
                                timeHours += 5;
                                break;
                            case "time6":
                                timeHours += 6;
                                break;
                            case "time7":
                                timeHours += 7;
                                break;
                            case "time8":
                                timeHours += 8;
                                break;
                            case "time9":
                                timeHours += 9;
                                break;
                            case "time10":
                                timeHours += 10;
                                break;
                            case "time11":
                                timeHours += 11;
                                break;
                            case "time12":
                                timeHours += 12;
                                break;
                            case "time13":
                                timeHours += 13;
                                break;
                            case "time14":
                                timeHours += 14;
                                break;
                            case "time15":
                                timeHours += 15;
                                break;
                        } // switch child.id
                    } //if child.class = "active"
                } //for child of programWheel.children
                if (rinseBtn.classList.contains("active")) {
                    timeMinutes += 20;
                }
                if (shortBtn.classList.contains("active")) {
                    timeMinutes -= 30;
                }
                if (ecoBtn.classList.contains("active")) {
                    timeMinutes += 30;
                }
                if (timeMinutes >= 60) {
                    timeMinutes -= 60;
                    timeHours += 1;
                }
                else if (timeMinutes < 0) {
                    timeMinutes += 60;
                    timeHours -= 1;
                }
                if (timeMinutes < 10) {
                    display.innerHTML = timeHours + ":" + "0" + timeMinutes;
                }
                else {
                    display.innerHTML = timeHours + ":" + timeMinutes;
                }
            } //if child.class = "active"
        } //for child of programWheel.children
    } //handleTime
    function startWasher() {
        if (timeHours > 0 || timeMinutes > 0) {
            timeMinutes = timeMinutes - 10;
            if (timeMinutes < 0 && timeHours > 0) {
                timeMinutes += 60;
                timeHours -= 1;
            }
            else {
                timeMinutes = 0;
            }
            if (timeMinutes < 10) {
                display.innerHTML = timeHours + ":" + "0" + timeMinutes;
            }
            else {
                display.innerHTML = timeHours + ":" + timeMinutes;
            }
        }
        else {
            clearInterval(washTime);
            window.setTimeout(function machineFinished() {
                controlBar.addEventListener("click", handleClick);
                lock.classList.remove("active");
                startBtn.classList.remove("active");
                handleTime();
            }, 3000);
        }
    } //startWasher
})(MicroInteractions || (MicroInteractions = {}));
//# sourceMappingURL=main.js.map