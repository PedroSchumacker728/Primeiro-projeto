"use strict";

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const WORDS = ["GESTO","LIBRA","SINAL","AMIGO","ALUNO","FALAR","LIVRO","VIDEO","TEXTO","APOIO","LUGAR","AULAS"];
const ABC = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
const MAX = 6, SIZE = 5, MAX_HINTS = 3;
const ui = {
    board: $("#board"), attempts: $("#attempts"), keyboard: $("#keyboard"), panel: $("#keyboardPanel"),
    send: $("#enviar"), erase: $("#apagar"), count: $("#contador"), left: $("#restantes"),
    score: $("#pontuacao"), hint: $("#dica"), hints: $("#dicas"), msg: $("#mensagem"),
    toggle: $("#modoVisual"), signsLabel: $("#labelSinais"), lettersLabel: $("#labelLetras")
};
const state = { word:"", prev:"", row:0, typed:[], points:0, hints:MAX_HINTS, used:new Set(), locked:false, letters:false, timer:null };

const img = l => `/sinais/sinal_${String(l.charCodeAt(0)-64).padStart(2,"0")}.png`;
const shuffle = a => { a=[...a]; for(let i=a.length-1;i;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; };
const animate = (el, cls, ms=650) => { if(!el)return; el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); setTimeout(()=>el.classList.remove(cls),ms); };
const message = (text,type="") => { ui.msg.textContent=text; ui.msg.className=type?`mensagem-${type}`:""; };

function makeBoard(){
    ui.attempts.innerHTML = Array.from({length:MAX},()=>`<section class="attempt">${'<span class="letter"></span>'.repeat(SIZE)}</section>`).join("");
}
function makeKeyboard(){
    ui.keyboard.innerHTML = shuffle(ABC).map(l=>`<button type="button" data-letter="${l}" aria-label="Sinal da letra ${l}"><img src="${img(l)}" alt="" aria-hidden="true"></button>`).join("");
}
function cells(row=state.row){ return $$(".attempt")[row]?.querySelectorAll(".letter") || []; }
function drawCell(cell,letter){
    cell.innerHTML=""; cell.classList.remove("modo-letras");
    if(!letter){ delete cell.dataset.letter; return; }
    cell.dataset.letter=letter;
    if(state.letters){ cell.textContent=letter; cell.classList.add("modo-letras"); }
    else cell.innerHTML=`<img src="${img(letter)}" alt="Sinal da letra ${letter}">`;
}
function refreshCurrent(){ [...cells()].forEach((c,i)=>{ const l=state.typed[i]; c.classList.toggle("filled",!!l); drawCell(c,l); }); }
function refreshAllFilled(){ $$(".letter[data-letter]").forEach(c=>drawCell(c,c.dataset.letter)); }
function counters(){
    ui.count.textContent=`${state.row}/${MAX}`; ui.left.textContent=MAX-state.row; ui.hints.textContent=state.hints;
    ui.hint.disabled=state.hints<=0||state.locked;
}
function pickWord(){ let w; do w=WORDS[Math.floor(Math.random()*WORDS.length)]; while(WORDS.length>1&&w===state.prev); state.prev=w; return w; }
function resetRound(){
    clearTimeout(state.timer); state.word=pickWord(); state.row=0; state.typed=[]; state.hints=MAX_HINTS; state.used.clear(); state.locked=false;
    makeBoard(); makeKeyboard(); ui.send.disabled=ui.erase.disabled=false; counters(); message("Nova palavra sorteada. Boa sorte!"); animate(ui.board,"round-enter",520);
}
function add(letter){ if(state.locked||state.typed.length>=SIZE)return; state.typed.push(letter); refreshCurrent(); message(""); }
function erase(){ if(state.locked||!state.typed.length)return; state.typed.pop(); refreshCurrent(); }
function evaluate(guess,word){
    const out=Array(SIZE).fill("wrong"), rest=[...word];
    guess.forEach((l,i)=>{ if(l===word[i]){out[i]="correct";rest[i]=null;} });
    guess.forEach((l,i)=>{ if(out[i]==="correct")return; const p=rest.indexOf(l); if(p>-1){out[i]="present";rest[p]=null;} });
    return out;
}
function paintKeyboard(guess,result){
    guess.forEach((l,i)=>{ const b=ui.keyboard.querySelector(`[data-letter="${l}"]`); if(!b)return; const r=result[i];
        if(r==="correct") {
            b.classList.remove("present","wrong");
            b.classList.add("correct");
        } else if(r==="present"&&!b.classList.contains("correct")) {
            b.classList.remove("wrong");
            b.classList.add("present");
        } else if(!b.classList.contains("correct")&&!b.classList.contains("present")) {
            b.classList.add("wrong");
        }
    });
}
function nextRound(text,success=false){
    state.locked=true; $$("#keyboard button").forEach(b=>b.disabled=true); ui.send.disabled=ui.erase.disabled=ui.hint.disabled=true;
    message(text,success?"sucesso":""); if(success)animate(ui.board,"board-success",850); state.timer=setTimeout(resetRound,1350);
}
function send(){
    if(state.locked)return;
    if(state.typed.length<SIZE){ message("Selecione 5 sinais antes de enviar.","erro"); animate(ui.panel,"feedback-error",520); return; }
    const guess=state.typed.join(""), result=evaluate(state.typed,state.word), row=[...cells()];
    row.forEach((c,i)=>setTimeout(()=>c.classList.add(result[i],"reveal"),i*85)); paintKeyboard(state.typed,result);
    if(guess===state.word){ state.points+=100; ui.score.textContent=state.points; ui.count.textContent=`${state.row+1}/${MAX}`; ui.left.textContent=MAX-state.row-1; nextRound("Muito bem! Palavra correta! Sorteando a próxima...",true); return; }
    state.row++; state.typed=[]; counters();
    if(state.row>=MAX){ nextRound(`Fim das tentativas! A palavra era ${state.word}. Sorteando outra...`); return; }
    message("Continue tentando!"); refreshCurrent();
}
function useHint(){
    if(state.locked||!state.hints)return;
    const options=[0,1,2,3,4].filter(i=>!state.used.has(i)), pos=options[Math.floor(Math.random()*options.length)], letter=state.word[pos];
    state.used.add(pos); state.hints--; const b=ui.keyboard.querySelector(`[data-letter="${letter}"]`); if(b){ animate(b,"hinted",1700); b.scrollIntoView({behavior:"smooth",block:"nearest",inline:"nearest"}); }
    message(`Dica: o sinal correspondente à posição ${pos+1} foi destacado no teclado.`,"dica"); counters(); animate(ui.hint,"hint-card-pulse",600);
}

ui.keyboard.addEventListener("click",e=>{ const b=e.target.closest("button[data-letter]"); if(b)add(b.dataset.letter); });
ui.erase.addEventListener("click",erase); ui.send.addEventListener("click",send); ui.hint.addEventListener("click",useHint);
ui.toggle.addEventListener("change",()=>{ state.letters=ui.toggle.checked; ui.signsLabel.classList.toggle("ativo",!state.letters); ui.lettersLabel.classList.toggle("ativo",state.letters); refreshAllFilled(); });
document.addEventListener("keydown",e=>{ if(/^[A-Za-z]$/.test(e.key)||["Enter","Backspace"].includes(e.key)){ e.preventDefault(); if(!state.locked){message("Use o teclado de sinais do próprio jogo.","erro");animate(ui.panel,"feedback-error",520);} } });

resetRound();
