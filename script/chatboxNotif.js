const chatboxElt = document.getElementById("chatbox");
const inputElt = document.getElementById("message");
//Fichiers MP3
const notificationSound = new Audio("https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3");
const puissanceEE = new Audio("https://www.myinstants.com/media/sounds/puissance-et-gloire.mp3");
const wizzEE = new Audio("https://www.myinstants.com/media/sounds/msn-wizz-sound.mp3");
const hahaEE = new Audio("https://www.myinstants.com/media/sounds/the-simpsons-nelsons-haha.mp3");
const coinEE = new Audio("https://www.myinstants.com/media/sounds/couin.mp3");
const chutEE = new Audio("https://www.myinstants.com/media/sounds/ta-gueule_6iavH8Q.mp3");
//Fenêtres autorisées
const windowsURL = [
    "https://ashes-arise.forumactif.com/chatbox/",
    "https://ashes-arise.forumactif.com/chatbox/index.php?archives"
];

//Vérifie le statut de la fenêtre chatbox
document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
        //Créé un objet observant la chatbox
        let observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                //Vérifie si des enfants sont générés
                if (mutation.addedNodes
                    && document.visibilityState === "hidden"
                    && windowsURL.includes(window.location.href)) {
                    document.title = "NOUVEAUX MESSAGES";
                    notificationSound.play();
                };
            });
        });
        //Paramètres à observer
        observer.observe(chatboxElt, {
            childList: true
        });

    } else {
        //Réinitialise la chatbox si active
        document.title = "ChatBox";
        delete MutationObserver;
    };
});

//Easter Egg
inputElt.addEventListener("change", () => {
    if (inputElt.value == "/PUISSANCE") {
        puissanceEE.play();
    } else if (inputElt.value == "/WIZ") {
        wizzEE.play();
    } else if (inputElt.value == "/HAHA") {
        hahaEE.play();
    } else if (inputElt.value == "/COIN") {
        coinEE.play();
    } else if (inputElt.value == "/CHUT") {
        chutEE.play();
    }
});
