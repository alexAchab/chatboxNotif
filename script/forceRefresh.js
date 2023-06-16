const chatboxOptions = document.getElementById("chatbox_main_options");

const labelElt = document.createElement("label");
const selectElt = document.createElement("select");

const options = [
    { value: "none", text: "Aucune" },
    { value: 5, text: "5 secondes" },
    { value: 10, text: "10 secondes" },
    { value: 15, text: "15 secondes" },
    { value: 20, text: "20 secondes" }
];

options.forEach(option => {
    const optionElt = document.createElement("option");
    optionElt.value = option.value;
    optionElt.text = option.text;
    selectElt.add(optionElt);
});

selectElt.style.cursor = "pointer";
selectElt.style.marginRight = "1rem";
labelElt.textContent = "Auto Actualisation";
labelElt.style.marginRight = "4px";

chatboxOptions.insertBefore(selectElt, chatboxOptions.firstChild);
chatboxOptions.insertBefore(labelElt, chatboxOptions.firstChild);

function createCookie(name, value, hours, sameSite) {
    try {
        let expires = "";
        if (hours) {
            let date = new Date();
            date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        let cookieString = name + "=" + value + expires + "; path=/";
        if (sameSite) {
            cookieString += "; SameSite=" + sameSite;
        }
        document.cookie = cookieString;
    } catch (error) {
        console.error("ChatboxNotif.Erreur lors de la création du cookie:", error);
    }
}

function countdown(seconds) {
    if (seconds >= 0) {
        document.title = "Chatbox (Actualisation : " + seconds + "s)";
        setTimeout(function () {
            countdown(seconds - 1);
        }, 1000);
    } else {
        location.reload();
    }
}

function getCookieValue(cookieName) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.indexOf(cookieName + '=') === 0) {
            return cookie.substring(cookieName.length + 1, cookie.length);
        }
    }
    return null;
}

const checkboxState = getCookieValue("checkboxState");

if (checkboxState !== null) {
    selectElt.value = checkboxState;
}

if (checkboxState !== null
    && checkboxState !== "none") {
    countdown(checkboxState);
}

selectElt.addEventListener("change", () => {
    createCookie("checkboxState", selectElt.value, 3, "Lax");
    location.reload();
});
