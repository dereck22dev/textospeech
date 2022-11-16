/**VARIABLE DECLARATION */
let formContainer = document.querySelector('form');
let textInput = document.querySelector('#text');
let voiceInput = document.querySelector('select');
let volumeInput = document.querySelector('#volume');
let pitchInput = document.querySelector('#pitch');
let speedInput = document.querySelector('#speed');
let availableVoices = [];

/**speechSynthesis instanciation */
let synthesis = window.speechSynthesis;

/**
 * voiceConfig: allow to get available language and sort it then config a interface voice input
 */
function voiceConfig() {
    availableVoices = synthesis.getVoices().sort(
        function (prev, next) {
            const preval = prev.name.toUpperCase(), nextval = next.name.toUpperCase();
            if (preval < nextval) return -1;
            else if (preval == nextval) return 0;
            else return +1
        }
    );

    let choice = voiceInput.selectedIndex < 0 ? 0 : voiceInput.selectedIndex;

    voiceInput.innerHTML = '';

    for (let i = 0; i < availableVoices.length; i++) {
        let option = document.createElement('option');

        option.textContent = availableVoices[i].name + ' (' + availableVoices[i].lang + ')';
        option.setAttribute('data-lang', availableVoices[i].lang);
        option.setAttribute('data-name', availableVoices[i].name);

        voiceInput.appendChild(option);
    };
    voiceInput.choice = choice;
} voiceConfig();

if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = voiceConfig;
}

formContainer.onsubmit = e => {
    e.preventDefault();
    talk();
    text.blur();
}

/**
 * talk: allow when user click on listen button to listen text input values
 */
function talk() {

    if (text.value) {
        let utterance = new SpeechSynthesisUtterance(text.value);

        utterance.volume = volumeInput.value;
        utterance.pitch = pitchInput.value
        utterance.rate = speedInput.value;

        let choice = voiceInput.selectedOptions[0].getAttribute('data-name');

        for (let i = 0; i < availableVoices.length; i++) {
            if (availableVoices[i].name === choice) {
                utterance.voice = availableVoices[i];
                break;
            }
        }

        synthesis.speak(utterance);

        document.querySelector('.animcontainer').style = 'display:flex !important';
        utterance.onend = () => {
            document.querySelector('.animcontainer').style = 'display:none !important';
        }
    }
}

/**start listen if text input values change */
voiceInput.onchange = () => talk();