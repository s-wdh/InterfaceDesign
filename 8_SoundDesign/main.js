"use strict";
var SoundDesign;
(function (SoundDesign) {
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
    let leadTimeIcon = document.getElementById("leadTime");
    let leadTimediv = document.getElementById("leadTimediv");
    let preWashIcon = document.getElementById("preWash");
    let preWashdiv = document.getElementById("preWashdiv");
    let mainWashIcon = document.getElementById("mainWash");
    let mainWashdiv = document.getElementById("mainWashdiv");
    let rinseIcon = document.getElementById("rinse");
    let rinsediv = document.getElementById("rinsediv");
    let spinIcon = document.getElementById("spinIcon");
    let spindiv = document.getElementById("spindiv");
    let drainIcon = document.getElementById("drain");
    let draindiv = document.getElementById("draindiv");
    let finished = document.getElementById("finished");
    let openDoor = document.getElementById("openDoor");
    let lock = document.getElementById("lock");
    let rinseBtn = document.getElementById("rinseBtn");
    let shortBtn = document.getElementById("shortBtn");
    let ecoBtn = document.getElementById("ecoBtn");
    let startBtn = document.getElementById("startBtn");
    let startText = document.getElementById("startText");
    let door = document.getElementById("door");
    //other variables
    let timeHours;
    let timeMinutes;
    let washTime;
    let startBtnAnim;
    //sounds
    let onSound = new Audio("Sounds/anschalten.mp3");
    let chooseSound = new Audio("Sounds/auswahl.mp3");
    let startSound = new Audio("Sounds/starten.mp3");
    let endSound = new Audio("Sounds/ende.mp3");
    let offSound = new Audio("Sounds/ausschalten.mp3");
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
            offSound.play();
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
            leadTimediv.removeAttribute("hidden");
            finished.classList.remove("active");
            lock.classList.remove("active");
            clearInterval(startBtnAnim);
            startBtn.classList.remove("active");
            startBtn.style.color = "#000000";
            display.style.color = "#000000";
            powerBtn.classList.remove("active");
            controlBar.removeEventListener("click", handleClick);
            door.removeEventListener("click", handleDoor);
        }
        else {
            onSound.play();
            leadTimediv.setAttribute("hidden", "hidden");
            powerBtn.classList.add("active");
            door.addEventListener("click", handleDoor);
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
    function handleDoor() {
        if (openDoor.hasAttribute("hidden")) {
            openDoor.removeAttribute("hidden");
        }
        else {
            openDoor.setAttribute("hidden", "hidden");
            if (openDoor.classList.contains("blink")) {
                openDoor.classList.remove("blink");
            }
        }
    } //handleDoor
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
        if (target.id == "startBtn" || target.id == "startText") {
            //no choose sound
        }
        else if (target.id == "powerBtn" || target.id == "powerIcon") {
            //no choose sound
        }
        else {
            chooseSound.play();
        }
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
                if (startBtn.className != "active" && openDoor.hasAttribute("hidden")) {
                    clearInterval(startBtnAnim);
                    startBtn.classList.add("active");
                    lock.classList.add("active");
                    startSound.play();
                    door.removeEventListener("click", handleDoor);
                    washTime = setInterval(startWasher, 1000);
                    controlBar.removeEventListener("click", handleClick);
                }
                else {
                    openDoor.classList.add("blink");
                }
                break;
            }
            case "startText": {
                if (startBtn.className != "active" && openDoor.hasAttribute("hidden")) {
                    clearInterval(startBtnAnim);
                    startBtn.classList.add("active");
                    lock.classList.add("active");
                    startSound.play();
                    door.removeEventListener("click", handleDoor);
                    washTime = setInterval(startWasher, 1000);
                    controlBar.removeEventListener("click", handleClick);
                }
                else {
                    openDoor.classList.add("blink");
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
                        timeMinutes = 0;
                        preWashIcon.setAttribute("hidden", "hidden");
                        mainWashIcon.removeAttribute("hidden");
                        rinseIcon.removeAttribute("hidden");
                        spinIcon.removeAttribute("hidden");
                        drainIcon.removeAttribute("hidden");
                        break;
                    }
                    case "boil": {
                        timeHours = 2;
                        timeMinutes = 30;
                        preWashIcon.removeAttribute("hidden");
                        mainWashIcon.removeAttribute("hidden");
                        rinseIcon.removeAttribute("hidden");
                        spinIcon.removeAttribute("hidden");
                        drainIcon.removeAttribute("hidden");
                        break;
                    }
                    case "jeans": {
                        timeHours = 1;
                        timeMinutes = 30;
                        preWashIcon.setAttribute("hidden", "hidden");
                        mainWashIcon.removeAttribute("hidden");
                        rinseIcon.removeAttribute("hidden");
                        spinIcon.removeAttribute("hidden");
                        drainIcon.removeAttribute("hidden");
                        break;
                    }
                    case "wool": {
                        timeHours = 0;
                        timeMinutes = 40;
                        preWashIcon.setAttribute("hidden", "hidden");
                        mainWashIcon.removeAttribute("hidden");
                        rinseIcon.removeAttribute("hidden");
                        spinIcon.setAttribute("hidden", "hidden");
                        drainIcon.removeAttribute("hidden");
                        break;
                    }
                    case "express": {
                        timeHours = 0;
                        timeMinutes = 30;
                        preWashIcon.setAttribute("hidden", "hidden");
                        mainWashIcon.removeAttribute("hidden");
                        rinseIcon.removeAttribute("hidden");
                        spinIcon.removeAttribute("hidden");
                        drainIcon.removeAttribute("hidden");
                        break;
                    }
                    case "delicates": {
                        timeHours = 1;
                        timeMinutes = 0;
                        preWashIcon.setAttribute("hidden", "hidden");
                        mainWashIcon.removeAttribute("hidden");
                        rinseIcon.removeAttribute("hidden");
                        spinIcon.setAttribute("hidden", "hidden");
                        drainIcon.removeAttribute("hidden");
                        break;
                    }
                    case "easyCare": {
                        timeHours = 2;
                        timeMinutes = 15;
                        preWashIcon.removeAttribute("hidden");
                        mainWashIcon.removeAttribute("hidden");
                        rinseIcon.removeAttribute("hidden");
                        spinIcon.removeAttribute("hidden");
                        drainIcon.removeAttribute("hidden");
                        break;
                    }
                    case "spin": {
                        timeHours = 0;
                        timeMinutes = 15;
                        preWashIcon.setAttribute("hidden", "hidden");
                        mainWashIcon.setAttribute("hidden", "hidden");
                        rinseIcon.setAttribute("hidden", "hidden");
                        spinIcon.removeAttribute("hidden");
                        drainIcon.removeAttribute("hidden");
                        break;
                    }
                    case "stains": {
                        timeHours = 2;
                        timeMinutes = 45;
                        preWashIcon.removeAttribute("hidden");
                        mainWashIcon.removeAttribute("hidden");
                        rinseIcon.removeAttribute("hidden");
                        spinIcon.removeAttribute("hidden");
                        drainIcon.removeAttribute("hidden");
                        break;
                    }
                    case "sport": {
                        timeHours = 1;
                        timeMinutes = 15;
                        preWashIcon.setAttribute("hidden", "hidden");
                        mainWashIcon.removeAttribute("hidden");
                        rinseIcon.removeAttribute("hidden");
                        spinIcon.removeAttribute("hidden");
                        drainIcon.removeAttribute("hidden");
                        break;
                    }
                    case "outdoor": {
                        timeHours = 2;
                        timeMinutes = 30;
                        preWashIcon.removeAttribute("hidden");
                        mainWashIcon.removeAttribute("hidden");
                        rinseIcon.removeAttribute("hidden");
                        spinIcon.removeAttribute("hidden");
                        drainIcon.removeAttribute("hidden");
                        break;
                    }
                    case "impregnate": {
                        timeHours = 0;
                        timeMinutes = 30;
                        preWashIcon.setAttribute("hidden", "hidden");
                        mainWashIcon.removeAttribute("hidden");
                        rinseIcon.removeAttribute("hidden");
                        spinIcon.setAttribute("hidden", "hidden");
                        drainIcon.removeAttribute("hidden");
                        break;
                    }
                } //switch child.id
                for (const child of timeWheel.children) {
                    if (child.classList.contains("active")) {
                        switch (child.id) {
                            case "time0":
                                timeHours += 0;
                                leadTimeIcon.setAttribute("hidden", "hidden");
                                break;
                            case "time1":
                                timeHours += 1;
                                leadTimeIcon.removeAttribute("hidden");
                                break;
                            case "time2":
                                timeHours += 2;
                                leadTimeIcon.removeAttribute("hidden");
                                break;
                            case "time3":
                                timeHours += 3;
                                leadTimeIcon.removeAttribute("hidden");
                                break;
                            case "time4":
                                timeHours += 4;
                                leadTimeIcon.removeAttribute("hidden");
                                break;
                            case "time5":
                                timeHours += 5;
                                leadTimeIcon.removeAttribute("hidden");
                                break;
                            case "time6":
                                timeHours += 6;
                                leadTimeIcon.removeAttribute("hidden");
                                break;
                            case "time7":
                                timeHours += 7;
                                leadTimeIcon.removeAttribute("hidden");
                                break;
                            case "time8":
                                timeHours += 8;
                                leadTimeIcon.removeAttribute("hidden");
                                break;
                            case "time9":
                                timeHours += 9;
                                leadTimeIcon.removeAttribute("hidden");
                                break;
                            case "time10":
                                timeHours += 10;
                                leadTimeIcon.removeAttribute("hidden");
                                break;
                            case "time11":
                                timeHours += 11;
                                leadTimeIcon.removeAttribute("hidden");
                                break;
                            case "time12":
                                timeHours += 12;
                                leadTimeIcon.removeAttribute("hidden");
                                break;
                            case "time13":
                                timeHours += 13;
                                leadTimeIcon.removeAttribute("hidden");
                                break;
                            case "time14":
                                timeHours += 14;
                                leadTimeIcon.removeAttribute("hidden");
                                break;
                            case "time15":
                                timeHours += 15;
                                leadTimeIcon.removeAttribute("hidden");
                                break;
                        } // switch child.id
                    } //if child.class = "active"
                } //for child of programWheel.children
                if (rinseBtn.classList.contains("active")) {
                    timeMinutes += 20;
                }
                if (shortBtn.classList.contains("active")) {
                    for (const child of programWheel.children) {
                        if (child.classList.contains("active")) {
                            console.log(child.id);
                            switch (child.id) {
                                case "impregnate":
                                    timeMinutes -= 0;
                                    break;
                                case "spin":
                                    timeMinutes -= 0;
                                    break;
                                case "express":
                                    timeMinutes -= 0;
                                    break;
                                case "wool":
                                    timeMinutes -= 0;
                                    break;
                                default:
                                    timeMinutes -= 30;
                                    break;
                            } // switch child.id
                        }
                    }
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
            //time for each washing step
            if (rinseBtn.classList.contains("active")) {
                if (timeHours < 4 && timeMinutes < 5) {
                    preWashdiv.setAttribute("hidden", "hidden");
                }
                if (timeHours < 3 && timeMinutes < 20) {
                    mainWashdiv.setAttribute("hidden", "hidden");
                }
                if (timeHours == 0 && timeMinutes < 45) {
                    rinsediv.setAttribute("hidden", "hidden");
                }
                if (timeHours == 0 && timeMinutes < 15) {
                    spindiv.setAttribute("hidden", "hidden");
                }
                if (timeHours == 0 && timeMinutes < 15) {
                    draindiv.setAttribute("hidden", "hidden");
                }
            }
            else if (rinseBtn.classList.contains("active") && ecoBtn.classList.contains("active")) {
                if (timeHours < 4 && timeMinutes < 35) {
                    preWashdiv.setAttribute("hidden", "hidden");
                }
                if (timeHours < 3 && timeMinutes < 50) {
                    mainWashdiv.setAttribute("hidden", "hidden");
                }
                if (timeHours == 0 && timeMinutes < 45) {
                    rinsediv.setAttribute("hidden", "hidden");
                }
                if (timeHours == 0 && timeMinutes < 15) {
                    spindiv.setAttribute("hidden", "hidden");
                }
                if (timeHours == 0 && timeMinutes < 15) {
                    draindiv.setAttribute("hidden", "hidden");
                }
            }
            else if (rinseBtn.classList.contains("active") && shortBtn.classList.contains("active")) {
                if (timeHours < 3 && timeMinutes < 35) {
                    preWashdiv.setAttribute("hidden", "hidden");
                }
                if (timeHours < 2 && timeMinutes < 50) {
                    mainWashdiv.setAttribute("hidden", "hidden");
                }
                if (timeHours == 0 && timeMinutes < 45) {
                    rinsediv.setAttribute("hidden", "hidden");
                }
                if (timeHours == 0 && timeMinutes < 15) {
                    spindiv.setAttribute("hidden", "hidden");
                }
                if (timeHours == 0 && timeMinutes < 15) {
                    draindiv.setAttribute("hidden", "hidden");
                }
            }
            else if (rinseBtn.classList.contains("active") && ecoBtn.classList.contains("active") && shortBtn.classList.contains("active")) {
                if (timeHours < 4 && timeMinutes < 5) {
                    preWashdiv.setAttribute("hidden", "hidden");
                }
                if (timeHours < 3 && timeMinutes < 20) {
                    mainWashdiv.setAttribute("hidden", "hidden");
                }
                if (timeHours == 0 && timeMinutes < 45) {
                    rinsediv.setAttribute("hidden", "hidden");
                }
                if (timeHours == 0 && timeMinutes < 15) {
                    spindiv.setAttribute("hidden", "hidden");
                }
                if (timeHours == 0 && timeMinutes < 15) {
                    draindiv.setAttribute("hidden", "hidden");
                }
            }
            else if (ecoBtn.classList.contains("active")) {
                if (timeHours < 4 && timeMinutes < 15) {
                    preWashdiv.setAttribute("hidden", "hidden");
                }
                if (timeHours < 3 && timeMinutes < 30) {
                    mainWashdiv.setAttribute("hidden", "hidden");
                }
                if (timeHours == 0 && timeMinutes < 25) {
                    rinsediv.setAttribute("hidden", "hidden");
                }
                if (timeHours == 0 && timeMinutes < 15) {
                    spindiv.setAttribute("hidden", "hidden");
                }
                if (timeHours == 0 && timeMinutes < 15) {
                    draindiv.setAttribute("hidden", "hidden");
                }
            }
            else if (ecoBtn.classList.contains("active") && shortBtn.classList.contains("active")) {
                if (timeHours < 3 && timeMinutes < 45) {
                    preWashdiv.setAttribute("hidden", "hidden");
                }
                if (timeHours < 2 && timeMinutes < 60) {
                    mainWashdiv.setAttribute("hidden", "hidden");
                }
                if (timeHours == 0 && timeMinutes < 25) {
                    rinsediv.setAttribute("hidden", "hidden");
                }
                if (timeHours == 0 && timeMinutes < 15) {
                    spindiv.setAttribute("hidden", "hidden");
                }
                if (timeHours == 0 && timeMinutes < 15) {
                    draindiv.setAttribute("hidden", "hidden");
                }
            }
            else if (shortBtn.classList.contains("active")) {
                if (timeHours < 3 && timeMinutes < 15) {
                    preWashdiv.setAttribute("hidden", "hidden");
                }
                if (timeHours < 2 && timeMinutes < 30) {
                    mainWashdiv.setAttribute("hidden", "hidden");
                }
                if (timeHours == 0 && timeMinutes < 25) {
                    rinsediv.setAttribute("hidden", "hidden");
                }
                if (timeHours == 0 && timeMinutes < 15) {
                    spindiv.setAttribute("hidden", "hidden");
                }
                if (timeHours == 0 && timeMinutes < 15) {
                    draindiv.setAttribute("hidden", "hidden");
                }
            }
            else { //no button
                if (timeHours < 3 && timeMinutes < 45) {
                    preWashdiv.setAttribute("hidden", "hidden");
                }
                if (timeHours < 2 && timeMinutes < 60) {
                    mainWashdiv.setAttribute("hidden", "hidden");
                }
                if (timeHours == 0 && timeMinutes < 25) {
                    rinsediv.setAttribute("hidden", "hidden");
                }
                if (timeHours == 0 && timeMinutes < 15) {
                    spindiv.setAttribute("hidden", "hidden");
                }
                if (timeHours == 0 && timeMinutes < 15) {
                    draindiv.setAttribute("hidden", "hidden");
                }
            }
        }
        else {
            clearInterval(washTime);
            finished.classList.add("active");
            endSound.play();
            window.setTimeout(function machineFinished() {
                door.addEventListener("click", handleDoor);
                controlBar.addEventListener("click", handleClick);
                lock.classList.remove("active");
                startBtn.classList.remove("active");
                preWashdiv.removeAttribute("hidden");
                mainWashdiv.removeAttribute("hidden");
                rinsediv.removeAttribute("hidden");
                spindiv.removeAttribute("hidden");
                draindiv.removeAttribute("hidden");
                finished.classList.remove("active");
                handleTime();
            }, 5000);
        }
    } //startWasher
})(SoundDesign || (SoundDesign = {}));
//# sourceMappingURL=main.js.map