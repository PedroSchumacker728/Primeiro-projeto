"use strict";

const menu=[
    ["/jogar","▶️","Jogar"],
    ["/tutor","▢","Tutorial"]
];
const pessoas=[
    ["Pedro Schumacker","10771366"],
    ["Rafael Jardim","10771392"],
    ["Gabriel Jardim","10771388"],
    ["Guilherme Tavora","10771396"]
];

document.querySelector("#menu").innerHTML=menu.map(([href,icone,texto],i)=>`<a class="menu-entrada" href="${href}" style="--delay:${i*90}ms"><span class="icone" aria-hidden="true">${icone}</span><span>${texto}</span></a>`).join("");
document.querySelector("#integrantes").innerHTML=`<header class="linha-integrante cabecalho-integrantes"><span class="nome-integrante">Nome</span><span class="ra-integrante">RA</span></header>${pessoas.map(([nome,ra],i)=>`<article class="linha-integrante integrante-entrada" style="--delay:${180+i*70}ms"><span class="nome-integrante">${nome}</span><span class="ra-integrante">${ra}</span></article>`).join("")}`;
