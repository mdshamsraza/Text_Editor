let optionsButtons = document.querySelectorAll(".option-button");
let advancedOptionButton = document.querySelectorAll(".adv-option-button");
let fontName = document.getElementById("fontName");
let fontSizeRef = document.getElementById("fontSize");
let writingArea = document.getElementById("text-input");
let linkButton = document.getElementById("createLink");
let alignButtons = document.querySelectorAll(".align");
let spacingButtons = document.querySelectorAll(".spacing");
let formatButtons = document.querySelectorAll(".format");
let scriptButtons = document.querySelectorAll(".script");

// link  for fontlist

let fontList = [
    "Arial",
    "Verdana",
    "Times New Roman",
    "Garamond",
    "Courier",
    "cursive",
];

//initial setting

const initializer = () => {
    //function calls for highlighting button 
    //no highlight for link, unlink , undo,redo since they are one time oparator
    highlighter(alignButtons, true);
    highlighter(spacingButtons, true);
    highlighter(formatButtons, false);
    highlighter(scriptButtons, true);

    //create option for font name
    fontList.map((value) => {
        let option = document.createElement("option");
        option.value = value;
        option.innerHTML = value;
        fontName.appendChild(option);
    });

    //fontsize allow only till 7
    for (let i = 1; i <= 7; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.innerHTML = i;
        fontSizeRef.appendChild(option);
    }

    //default size 
    fontSizeRef.value = 3;

};

//main logic
const modifyText = (command, defaultUi, value) => {
    //execCommand executes command on selected text
    document.execCommand(command, defaultUi, value);
};

//for basic operational wchich don't need value paramenter
optionsButtons.forEach((button) => {
    button.addEventListener("click", () => {
        modifyText(button.id, false, null);
    });
});

//option that required value parameter( colors, fonts)
advancedOptionButton.forEach((button) => {
    button.addEventListener("change", () => {
        modifyText(button.id, false, button.value);
    })
});

//link
linkButton.addEventListener("click", () => {
    let userLink = prompt("enter a URL");
    //if link has http then directly else add http
    if (/http/i.test(userLink)) {
        modifyText(linkButton, false, userLink);
    } else {
        userLink = "http://" + userLink;
        modifyText(linkButton.id, false, userLink);
    }
});

//highlight clicked button  
const highlighter = (className, needsRemoval) => {
    className.forEach((button) => {
        button.addEventListener("click", () => {
            //needRemoal = true means only one button should be highlight and othe would be normal
            if (needsRemoval) {
                let alreadyActive = false;

                //is currentl clicked button is already active
                if (button.classList.contains("active")) {
                    alreadyActive = true;
                }
                //Remove highlight from other button 
                highlighterRemover(className);
                if (!alreadyActive) {
                    //highlight clicked button 
                    button.classList.add("active");
                }
            } else {
                button.classList.toggle("active");
            }

        });

    });
};

const highlighterRemover = (className) => {
    className.forEach((button) => {
        button.classList.remove("active");
    });
};


window.onload = initializer();