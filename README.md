# GESTO — Next.js com interface e lógica JavaScript componentizadas

## O que foi feito

Projeto baseado no ZIP **GESTO_NEXTJS_HTML_CSS_COMPONENTES_FLUXO(3).zip**, com **Menu, Jogar e Tutorial**. Além dos componentes visuais JSX já existentes, o código JavaScript foi migrado para componentes React, hooks e funções de regras de negócio.

- **HTML/JSX:** mantidas as três páginas, as classes CSS e os IDs úteis para a aparência; componentes visuais estão em `src/components/`.
- **CSS:** `Menu.css`, `Jogar.css`, `Tutor.css` e `globals.css` foram preservados sem alterações.
- **JavaScript:** os antigos scripts que inseriam HTML e escutavam eventos manualmente agora são representados por componentes React + `useGame` / `useTutorial` + reducers e bibliotecas.
- **Antigos scripts:** cópias em `legacy/Menu.js`, `legacy/Jogar.js` e `legacy/Tutor.js`, **não executadas**. Os arquivos foram retirados de `public/scripts/` para prevenir execução duplicada e conflitos de variáveis globais.
- **Imagens:** as 26 imagens em `public/sinais/` foram mantidas.
- **API JSON:** ainda **não foi implementada**. Os diagramas rotulam essa camada como futura/proposta.

## Como executar

1. Instale o Node.js.
2. No terminal, abra a pasta `gesto-nextjs` (a que contém `package.json`).
3. Execute `npm install`.
4. Execute `npm run dev`.
5. Abra `http://localhost:3000`.
6. Confira as rotas `/`, `/jogar` e `/tutor`.
7. Opcional: execute `npm test` para testes das regras e `npm run build` para testar a compilação do Next.js.

> Importante: as regras foram testadas com `npm test`. A compilação Next.js precisa ser verificada após a instalação das dependências, caso seu ambiente ainda não tenha os pacotes.

## Organização dos arquivos

```text
gesto-nextjs/
├── src/
│   ├── app/
│   │   ├── layout.jsx             Layout comum
│   │   ├── page.jsx               Rota /  (Menu)
│   │   ├── Menu.css
│   │   ├── globals.css
│   │   ├── jogar/
│   │   │   ├── page.jsx           Rota /jogar
│   │   │   └── Jogar.css
│   │   └── tutor/
│   │       ├── page.jsx           Rota /tutor
│   │       └── Tutor.css
│   ├── components/                Componentes visuais (JSX)
│   ├── hooks/
│   │   ├── useGame.js             Controla ações, temporizadores e teclado do jogo
│   │   └── useTutorial.js         Controla ações, progresso e teclado do tutorial
│   ├── lib/
│   │   ├── game.mjs               Regras puras: palavras, avaliação, dicas, teclas
│   │   ├── gameState.mjs          Reducer e estado do jogo
│   │   ├── tutorialState.mjs      Reducer e estado do tutorial
│   │   └── libras.mjs             Alfabeto, embaralhamento, caminho das imagens
│   └── data/
│       └── menu.mjs               Links e integrantes
├── public/sinais/                26 imagens
├── legacy/                       Scripts JS originais (somente referência)
├── tests/                        Testes automatizados das regras
└── diagramas/                    XMLs editáveis no Draw.io
```

## Árvore dos componentes (composição real)

```text
RootLayout
├── Menu  (src/app/page.jsx)
│   ├── MenuHeader
│   └── MenuContent
│       ├── MenuLinks             ← menu.mjs
│       └── TeamTable             ← menu.mjs
├── Jogar  (src/app/jogar/page.jsx) ← useGame()
│   ├── GameHeader
│   └── GameContent               ← game.state, add, erase, send, hint, toggle
│       ├── GameModeSelector
│       ├── GameTitle
│       ├── GameMainArea
│       │   └── GameAttemptRow (6 linhas)
│       │       └── GameLetterCell (5 por linha)
│       ├── GameKeyboard
│       │   └── GameKeyboardKey (26 teclas)
│       └── GameStatus
└── Tutorial  (src/app/tutor/page.jsx) ← useTutorial()
    ├── TutorialHeader
    ├── TutorialProgress
    ├── TutorialContent
    │   ├── TutorialSign
    │   ├── TutorialAnswer
    │   ├── TutorialKeyboard
    │   └── TutorialActions
    └── TutorialFooter
```

**Atenção:** as setas `←` acima significam que a página chama o hook e repassa seus dados e callbacks aos componentes via propriedades (*props*). O hook não é um componente visual.

## Papel dos módulos JavaScript

| Arquivo | Executa onde | Responsabilidade |
|---|---|---|
| `src/data/menu.mjs` | Importado pela renderização das páginas | Dados dos links e integrantes, sem manipulação do DOM |
| `src/hooks/useGame.js` | Navegador, dentro da página Client Component `/jogar` | Iniciar rodadas, gerenciar ações, temporizadores e bloquear teclado físico durante o jogo |
| `src/lib/gameState.mjs` | Navegador, chamado pelo hook | Estado e transições `NEW_ROUND`, `ADD`, `ERASE`, `SEND`, `HINT`, `TOGGLE` |
| `src/lib/game.mjs` | Navegador, chamado pelo hook/reducer | Sorteio, comparação de 5 letras, cores, dicas, tabuleiro 6×5 |
| `src/hooks/useTutorial.js` | Navegador, dentro da página Client Component `/tutor` | Inicializar ordem aleatória, eventos, temporizadores e avanço |
| `src/lib/tutorialState.mjs` | Navegador, chamado pelo hook | `INIT`, `FILL`, `ERASE`, `SHIFT`, `HINT`, `VERIFY`, `ADVANCE`, `FINISH` |
| `src/lib/libras.mjs` | Módulo compartilhado (usado na interface e regras) | Alfabeto, embaralhamento e mapeamento letra → imagem |

A renderização inicial do Next.js pode gerar HTML no servidor, inclusive para páginas com `"use client"`. A execução de **eventos, estados do jogo, sorteio, verificação e pontuação acontece no cliente** após a hidratação. Não há lógica de pontuação implementada em API do servidor.

## Fluxos do jogo e do tutorial

### Jogar

1. `useGame()` inicializa a rodada com `sortearPalavra()` e `novoTeclado()`.
2. `GameKeyboardKey` chama `add(letra)` e o reducer preenche `state.typed`.
3. `GameAttemptRow` / `GameLetterCell` exibem as letras em sinais ou caracteres conforme `letters`.
4. `Apagar` chama `erase()`; `Enviar` chama `send()` → `avaliarTentativa()`.
5. O reducer compara as letras, atualiza o tabuleiro, as cores, a pontuação e a mensagem.
6. Acerto soma 100 pontos; a rodada termina após acertar ou gastar 6 tentativas.
7. Após cerca de 1,35 segundo, o hook inicia outra rodada preservando os pontos.
8. O botão Dica mostra até três posições distintas por rodada, destacando a tecla correspondente.

### Tutorial

1. `useTutorial()` embaralha as 26 letras e exibe a imagem em `TutorialSign`.
2. `TutorialKeyboard` seleciona a letra (`FILL`), apaga (`ERASE`) ou altera maiúscula/minúscula (`SHIFT`).
3. `TutorialActions` usa `HINT` para mostrar a letra correta ou `VERIFY` para conferir.
4. Resposta incorreta mantém a etapa e mostra erro; resposta correta prepara o avanço.
5. `TutorialProgress` atualiza a barra e o contador, até terminar 26/26.
6. Ao concluir, o teclado e as ações de resposta são bloqueados.

## Rotas existentes

| Tipo | Caminho | Onde está |
|---|---|---|
| Página | `/` | `src/app/page.jsx` |
| Página | `/jogar` | `src/app/jogar/page.jsx` |
| Página | `/tutor` | `src/app/tutor/page.jsx` |
| Recurso estático | `/sinais/sinal_01.png` até `/sinais/sinal_26.png` | `public/sinais/` |

**Não existem** endpoints `/api/*` nesta versão. A página 4 do diagrama é apenas uma proposta de API JSON (palavras, iniciar rodada, verificar tentativa, dica, tutorial e resultados). Não descreva essas rotas como implementadas na apresentação.

## Diagramas XML

- `diagramas/GESTO_Arquitetura_JS_Atualizada_CORRIGIDA.xml` — quatro páginas: arquitetura real, componentes, fluxos JS e API futura.
- `diagramas/GESTO_Componentes_JavaScript_Fluxos_CORRIGIDOS.xml` — duas páginas: componentes e processamento do JS.

Para abrir: entre em https://app.diagrams.net → **Arquivo → Abrir de → Dispositivo** → escolha o `.xml`. Os blocos e conectores são editáveis.

## Testes

```bash
npm test
npm run build
```

Os testes automatizados validam as regras de palavras, letras repetidas, novas rodadas, 6 tentativas, 3 dicas, pontos, imagens de Libras, resposta incorreta e as 26 etapas do tutorial. A compilação, o visual e os cliques devem ser conferidos no navegador após `npm install`.
