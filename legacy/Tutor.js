"use strict";

const $=s=>document.querySelector(s);
const ABC=[..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
const ROWS=["QWERTYUIOP","ASDFGHJKLÇ","ZXCVBNM"];
const shuffle=a=>{a=[...a];for(let i=a.length-1;i;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const img=l=>`/sinais/sinal_${String(l.charCodeAt(0)-64).padStart(2,"0")}.png`;
const animate=(el,cls,ms=650)=>{el.classList.remove(cls);void el.offsetWidth;el.classList.add(cls);setTimeout(()=>el.classList.remove(cls),ms);};

const ui={container:$("#tutorialContainer"),bar:$("#barra"),progress:$("#progresso"),sign:$("#sinal"),answer:$("#resposta"),keyboard:$("#teclado"),hint:$("#dica"),check:$("#verificar"),msg:$("#mensagemTutorial")};
const state={order:shuffle(ABC),step:0,upper:true,moving:false};

function makeKeyboard(){
    ui.keyboard.innerHTML=ROWS.map((row,i)=>`<section class="linha-teclado">${i===2?'<button type="button" class="tecla-especial" data-action="shift" aria-label="Maiúsculas">⇧</button>':''}${[...row].map(l=>`<button type="button" data-key="${l}">${l}</button>`).join("")}${i===2?'<button type="button" class="tecla-especial" data-action="erase" aria-label="Apagar resposta">⌫</button>':''}</section>`).join("");
}
const current=()=>state.order[state.step];
function update(){
    const l=current(); ui.sign.src=img(l); ui.sign.alt=`Sinal em Libras correspondente à letra ${l}`; ui.answer.value=""; ui.answer.className=""; ui.msg.textContent="";
    ui.bar.style.width=`${((state.step+1)/state.order.length)*100}%`; ui.progress.textContent=`${state.step+1} / ${state.order.length}`; animate(ui.sign,"sinal-troca",430);
}
function fill(l){ if(state.moving)return; ui.answer.value=state.upper?l.toUpperCase():l.toLowerCase(); ui.answer.className=""; ui.msg.textContent=""; }
function error(text){ ui.msg.textContent=text; ui.answer.classList.add("resposta-erro"); animate(ui.container,"tutorial-erro",620); animate(ui.answer,"input-shake",520); }
function finish(){
    ui.msg.textContent="Parabéns! Você concluiu as 26 etapas do tutorial."; ui.bar.style.width="100%"; ui.progress.textContent="26 / 26";
    ui.check.disabled=ui.hint.disabled=true; ui.keyboard.querySelectorAll("button").forEach(b=>b.disabled=true); animate(ui.container,"tutorial-concluido",950);
}
function verify(){
    if(state.moving||ui.check.disabled)return; if(!ui.answer.value){error("Selecione uma letra antes de verificar.");return;}
    if(ui.answer.value.toUpperCase()!==current()){error("Resposta incorreta. Tente novamente.");return;}
    ui.answer.className="resposta-certa"; ui.msg.textContent="Muito bem! Próximo sinal..."; animate(ui.container,"tutorial-acerto",650); state.moving=true;
    if(state.step===state.order.length-1){setTimeout(finish,450);return;}
    state.step++; setTimeout(()=>{update();state.moving=false;},600);
}

ui.keyboard.addEventListener("click",e=>{
    const key=e.target.closest("[data-key]"),action=e.target.closest("[data-action]");
    if(key)fill(key.dataset.key);
    if(action?.dataset.action==="erase"&&!state.moving){ui.answer.value="";ui.answer.className="";}
    if(action?.dataset.action==="shift"){state.upper=!state.upper;ui.msg.textContent=state.upper?"Modo maiúsculo ativado.":"Modo minúsculo ativado.";animate(action,"tecla-pulse",350);}
});
ui.hint.addEventListener("click",()=>{if(!state.moving){ui.msg.textContent=`Dica: a resposta é a letra ${current()}.`;animate(ui.hint,"tecla-pulse",350);}});
ui.check.addEventListener("click",verify); $("#formTutorial").addEventListener("submit",e=>e.preventDefault());
document.addEventListener("keydown",e=>{if(ui.check.disabled||state.moving)return;const k=e.key.toUpperCase();if(/^[A-Z]$/.test(k))fill(k);else if(e.key==="Backspace")ui.answer.value="";else if(e.key==="Enter"){e.preventDefault();verify();}});

makeKeyboard(); update();
