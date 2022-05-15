
    let formBx=document.querySelector('form');
    let text=document.querySelector('#text');
    let voicedispo=[];
    let Fvoice=document.querySelector('select');
    let Fvolume=document.querySelector('#volume');
    let Fpitch=document.querySelector('#pitch');
    let Fvitesse=document.querySelector('#vitesse');
    
    let synt=window.speechSynthesis;
    
    function voiceConfig() {
        voicedispo=synt.getVoices().sort(
            function(a,b) {
                const valA=a.name.toUpperCase(), valB=b.name.toUpperCase();
                if (valA<valB) return -1;
                else if (valA==valB) return 0;
                else return +1
            }
        );
        let choix=Fvoice.selectedIndex < 0 ? 0:Fvoice.selectedIndex;
        Fvoice.innerHTML='';
       for (let i=0; i < voicedispo.length; i++) {
            let option=document.createElement('option');

            option.textContent=voicedispo[i].name + ' (' + voicedispo[i].lang + ')';
            option.setAttribute('data-lang',voicedispo[i].lang);
            option.setAttribute('data-name',voicedispo[i].name);

            Fvoice.appendChild(option);
        };
        Fvoice.choix=choix;
    }voiceConfig();

    if (speechSynthesis.onvoiceschanged !==undefined) {
        speechSynthesis.onvoiceschanged=voiceConfig;
    }

    formBx.onsubmit=function(e){
        e.preventDefault();
        talk();
        text.blur();
    }
    function talk() {
        console.log(text.value);
        if (text.value !== '') {
            let utterance=new SpeechSynthesisUtterance(text.value);

            utterance.volume=Fvolume.value;
            utterance.pitch=Fpitch.value
            utterance.rate=Fvitesse.value;

            let choix=Fvoice.selectedOptions[0].getAttribute('data-name');
            for (let i = 0; i < voicedispo.length; i++) {
                if (voicedispo[i].name===choix) {
                   utterance.voice=voicedispo[i];
                   break;
                }
            }
            synt.speak(utterance);

            document.querySelector('#animcontainer').style='display:flex !important';
            
            utterance.onend=()=>{
                document.querySelector('#animcontainer').style='display:none !important';
            }
        }
    }
    Fvoice.onchange=()=>{talk();}