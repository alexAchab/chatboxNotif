const chatboxElt = document.getElementById("chatbox");
const inputElt = document.getElementById("message");
const notificationSound = new Audio("https://alexachab.github.io/cssTemplate/medias/notification.mp3");
document.addEventListener("visibilitychange", handleVisibilityChange);

//Fenêtres autorisées
const windowsURL = [
    "https://ashes-arise.forumactif.com/chatbox/",
    "https://ashes-arise.forumactif.com/chatbox/index.php?archives"
];

function handleVisibilityChange() {
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
                }
            });
        });
        //Paramètres à observer
        observer.observe(chatboxElt, {
            childList: true
        });

    } else {
        //Réinitialise la chatbox si active
        document.title = "ChatBox";
    }
}

const easterEggSounds = {
    "/PUISSANCE": new Audio("https://alexachab.github.io/cssTemplate/medias/puissance-et-gloire.mp3"),
    "/WIZ": new Audio("https://alexachab.github.io/cssTemplate/medias/msn-wizz-sound.mp3"),
    "/HAHA": new Audio("https://alexachab.github.io/cssTemplate/medias/the-simpsons-nelsons-haha.mp3"),
    "/COIN": new Audio("https://alexachab.github.io/cssTemplate/medias/couin.mp3"),
    "/CHUT": new Audio("https://alexachab.github.io/cssTemplate/medias/ta-gueule_6iavH8Q.mp3"),
    "/EVENT": new Audio("https://alexachab.github.io/cssTemplate/medias/wilhelmscream.mp3")
};

function playSound(sound) {
    try {
        sound.play();
    } catch (error) {
        console.error("ChatboxNotif.Erreur lors de la lecture du son :", error);
    }
}

inputElt.addEventListener("change", () => {
    const inputValue = inputElt.value;
    if (inputValue in easterEggSounds) {
        playSound(easterEggSounds[inputValue]);
    }
});

