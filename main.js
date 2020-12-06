// bot-stand-by
// bot-happy
// bot-sad
// bot-surprised

(() => {
  var botPos = document.querySelector('.page');
  var d_btn = document.querySelector('.search');
  var speakBtn = document.querySelector('#speakbt');
  var bg = document.querySelector('.bg');

  if(localStorage.getItem('modo') == 'escuro'){
    botPos.style.background = '#2a2f40';
  }

  if(localStorage.getItem('init') == 'sim'){
    d_btn.style.visibility = 'visible';
    d_btn.style.opacity = 1;
    botPos.classList.replace("bot-stand-by", "bot-happy");
  } else {
    document.querySelector('.bot-stand-by').addEventListener('click', () => {
      d_btn.style.visibility = 'visible';
      d_btn.style.opacity = 1;
      botPos.classList.replace("bot-stand-by", "bot-happy");
      localStorage.setItem('init', 'sim');
    });
  }

  var oi = ["olá", "oi", "e aí"];
  var obg = ["obrigado", "muito obrigado", "valeu"];
  var whatsapp = ["whatsapp", "abrir whatsapp", "abrir o whatsapp", "abra o whatsapp"];
  var spotify = ["spotify", "abrir spotify", "abrir o spotify", "abra o spotify"];
  var assis_elogio = ["você é uma ótima assistente", "você é incrível", "você é uma assistente incrível"];
  var oi_td = ["olá tudo bem", "oi tudo bem", "oi tudo", "e aí tudo bem", "e aí tudo", "olá como vai"];
  var td = ["também", "estou bem", "estou bem também", "tudo bem", "eu estou bem", "tô bem", "eu tô bem", "que bom comigo também", "que bom eu também", "tudo ótimo", "perfeito", "bem", "tudo certo"];
  var mal = ["nem tanto", "mais ou menos", "mal", "estou mal", "eu tô mal", "eu estou mal", "não muito bem", "poderia estar melhor", "tudo péssimo", "não estou muito bem", "não muito"];

  if (window.SpeechRecognition || window.webkitSpeechRecognition){
    var recognition = new webkitSpeechRecognition();
    var synth = window.speechSynthesis;

    recognition.lang = 'pt-BR';
    recognition.continuous = true;
    recognition.interimResults = false;

    let utter = new SpeechSynthesisUtterance("Teste");
    utter.lang = 'pt-BR';
    utter.rate = 2;
    utter.onend = () => {
      setTimeout(() => {recognition.start();}, 150);
    }

    speakBtn.addEventListener('click', () => {
      recognition.start();
    });

    function say(txt){
      recognition.stop();
      utter.text = txt;
      synth.speak(utter);
    }

    recognition.onresult = (evt) => {
      var r = evt.results[evt.results.length - 1][0].transcript.toLowerCase();
      botPos.classList.replace("bot-surprised", "bot-happy");
      bg.style.background = '#fff';

      if(oi.indexOf(r) >= 0){
        say("Olá, como vai?");

      } else if (oi_td.indexOf(r) >= 0){
        say("Olá, tudo sim. E com você?");

      } else if (td.indexOf(r) >= 0){
        say("Que ótima notícia!");

      } else if (mal.indexOf(r) >= 0){
        botPos.classList.replace("bot-happy", "bot-surprised");
        bg.style.background = '#2a2f40';
        say("Poxa. Que pena...");

      } else if (obg.indexOf(r) >= 0){
        say("Não tem de quê");

      } else if (assis_elogio.indexOf(r) >= 0){
        botPos.classList.replace("bot-happy", "bot-surprised");
        bg.style.background = '#2a2f40';
        say("Muito obrigada. A cada dia estou me superando.");

      } else if (whatsapp.indexOf(r) >= 0){
        say("Abrindo");
        window.location.href = 'https://api.whatsapp.com/send/?phone=555189582215';

      } else if (spotify.indexOf(r) >= 0){
        say("Abrindo");
        window.location.href = 'spotify:playlist:6xGLprv9fmlMgeAMpW0x51&rtd=1';

      } else if(r == 'modo escuro' || r == 'modo noturno'){
        say("Alterando.");
        botPos.style.background = '#2a2f40';
        localStorage.setItem('modo', 'escuro');

      } else if(r == 'modo claro'){
        say("Alterando.");
        botPos.style.background = '#fff';
        localStorage.setItem('modo', 'claro');

      } else if(r.match(/pesquisar por/)){
        say("Redirecionando");
        var resultado = r.split('pesquisar por');
        window.location.href = 'https://www.google.com.br/search?q=' + resultado[1];

      } else if(r.match(/procurar por/)){
        say("Redirecionando");
        var resultado = r.split('procurar por');
        window.location.href = 'https://www.google.com.br/search?q=' + resultado[1];

      } else {
        say("Ainda não consigo fazer isso.");
      }
    }

    recognition.onerror = () => {
      say("Se você disse alguma coisa, não ouvi muito bem!");
    }

  } else {
    alert("Seu navegador não suporta essa tecnoligia!");
  }
})();