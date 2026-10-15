# GESTO — Planejamento da migração para Next.js e implementação de API com JSON estático

## 1. Objetivo da mudança

O projeto GESTO foi desenvolvido utilizando HTML, CSS e JavaScript. Nossa proposta é migrá-lo para Next.js com React, mantendo o funcionamento do jogo e do tutorial, mas melhorando a organização, a reutilização dos componentes e a forma de acessar os dados.

Vamos dividir o projeto em três partes principais:

* Frontend: responsável pelas telas e interações do usuário.

* API: responsável por fornecer as informações solicitadas pelas páginas.

* JSON estático: responsável por armazenar palavras, dicas e informações dos sinais de Libras.

## 2. Componentes que vamos criar no Next.js

Em vez de manter todo o conteúdo dentro de páginas HTML, vamos separar a interface em componentes React, cada um com uma responsabilidade.

### Componentes da interface

| Componente      | Responsabilidade                                                   |
| --------------- | ------------------------------------------------------------------ |
| Header          | Exibir o nome e a identidade visual do GESTO.                      |
| MenuPrincipal   | Apresentar as opções Jogar e Tutorial.                             |
| BotaoNavegacao  | Padronizar os botões usados para navegar entre as telas.           |
| LayoutPrincipal | Manter o padrão visual, os espaçamentos e a estrutura das páginas. |

Esses componentes serão reutilizados para evitar repetição de código.

### Componentes do jogo

| Componente         | Responsabilidade                                                 |
| ------------------ | ---------------------------------------------------------------- |
| Jogo               | Coordenar o funcionamento da partida e seus componentes.         |
| PalavraSecreta     | Exibir os espaços correspondentes às letras da palavra sorteada. |
| TecladoLibras      | Mostrar os sinais das letras para o jogador selecionar.          |
| BotaoSinal         | Representar individualmente cada letra e seu sinal.              |
| ContadorTentativas | Mostrar quantas tentativas ainda restam, com limite de seis.     |
| SistemaDicas       | Apresentar a dica correspondente à palavra atual.                |
| Pontuacao          | Exibir a pontuação obtida durante a partida.                     |
| ResultadoPartida   | Informar vitória ou derrota e permitir iniciar outra partida.    |

O componente Jogo será o principal responsável pela lógica. Ele controlará a palavra selecionada, as letras escolhidas, os acertos, os erros e a pontuação.

Os demais componentes receberão as informações necessárias e atualizarão sua apresentação conforme o andamento da partida.

### Componentes do tutorial

| Componente        | Responsabilidade                                                 |
| ----------------- | ---------------------------------------------------------------- |
| TutorialLibras    | Organizar a apresentação do alfabeto em Libras.                  |
| GradeSinais       | Distribuir visualmente os 26 sinais.                             |
| CardSinal         | Exibir uma letra e a imagem correspondente.                      |
| VisualizadorSinal | Permitir visualizar um sinal individualmente com maior destaque. |

O tutorial buscará as informações dos sinais pela API, em vez de manter a lista diretamente na página.

Isso permitirá que os mesmos dados sejam utilizados tanto pelo tutorial quanto pelo teclado do jogo.

## 3. Como os componentes vão se comunicar

Página Jogar

Organiza a tela e carrega o componente Jogo

Componente Jogo

Controla os estados, regras e eventos da partida

PalavraSecreta

TecladoLibras

ContadorTentativas

SistemaDicas

Pontuacao

ResultadoPartida

Por exemplo, quando o usuário selecionar uma letra no TecladoLibras, o componente Jogo receberá essa escolha e verificará se a letra pertence à palavra.

Depois disso, atualizará os componentes PalavraSecreta, ContadorTentativas e Pontuacao, conforme o resultado.

Dessa forma, cada componente terá uma função específica, mas todos trabalharão em conjunto.

## 4. Organização dos dados em JSON estático

Vamos criar dois conjuntos principais de dados.

| Arquivo       | Informações armazenadas                                              | Utilização                                  |
| ------------- | -------------------------------------------------------------------- | ------------------------------------------- |
| sinais.json   | Identificador, letra e caminho da imagem do sinal                    | Tutorial e teclado do jogo                  |
| palavras.json | Identificador, palavra, dica e nível de dificuldade, se implementado | Sorteio de palavras e funcionamento do jogo |

As imagens continuarão armazenadas na pasta pública do projeto. O JSON guardará apenas os caminhos dessas imagens.

Isso facilitará a manutenção: para acrescentar uma palavra, por exemplo, bastará atualizar o arquivo de dados, sem modificar os componentes do jogo.

## 5. Criação da API no Next.js

A API será criada utilizando as Route Handlers do Next.js.

| Endpoint               | Responsabilidade                                |
| ---------------------- | ----------------------------------------------- |
| `GET /api/sinais`      | Retornar todos os sinais cadastrados.           |
| `GET /api/sinais/[id]` | Retornar as informações de um sinal específico. |
| `GET /api/palavras`    | Retornar a lista de palavras disponíveis.       |

Também vamos separar a lógica de comunicação com a API em uma camada de serviços.

Teremos, por exemplo, um serviço de sinais, responsável por solicitar os dados utilizados pelo tutorial e teclado, e um serviço de palavras, responsável por buscar as palavras utilizadas no jogo.

Esses serviços centralizarão as requisições, o tratamento de erros e a interpretação das respostas.

## 6. Como será o consumo da API

O consumo acontecerá quando os componentes precisarem carregar informações.

No tutorial: ao abrir a página, a aplicação fará uma requisição para `/api/sinais`. A API lerá o JSON, retornará a lista de sinais e o componente GradeSinais utilizará esses dados para montar os cartões.

No jogo: ao iniciar a partida, a aplicação buscará as palavras em `/api/palavras` e os sinais em `/api/sinais`. Depois de receber os dados, escolherá uma palavra e apresentará o teclado visual.

Vamos prever três situações importantes para cada carregamento: enquanto os dados estão sendo buscados, quando chegam corretamente e quando ocorre algum erro.

## 7. Etapas práticas do desenvolvimento

1. Preparação do Next.js

   Criar o ambiente no GitHub Codespaces e configurar o projeto com App Router.

2. Migração das páginas

   Transformar Menu, Jogar e Tutorial em páginas Next.js, mantendo o design original.

3. Componentização

   Separar a interface nos componentes descritos e adaptar a lógica JavaScript para os estados e eventos do React.

4. Separação dos dados

   Criar os arquivos JSON e organizar as imagens dos sinais na pasta pública.

5. Implementação da API

   Criar os endpoints que consultarão os arquivos JSON e retornarão as informações.

6. Integração e testes

   Implementar o consumo com `fetch()`, verificar a comunicação com a API e testar as funcionalidades do jogo e tutorial.

7. Documentação

   Registrar no README a estrutura, os componentes, os endpoints, o fluxo dos dados e as instruções para executar no Codespaces.

## 8. Resultado esperado

Ao final, teremos o mesmo GESTO, porém com uma arquitetura mais organizada.

As páginas serão construídas com componentes React reutilizáveis, a lógica do jogo ficará separada da apresentação visual e os dados serão obtidos por requisições HTTP à API do Next.js.

A principal mudança será deixar de trabalhar com páginas e dados diretamente ligados ao JavaScript tradicional e passar a utilizar uma estrutura baseada em componentes, serviços, endpoints e arquivos JSON.

Isso demonstrará, de forma prática, a migração de uma aplicação web tradicional para Next.js e a implementação do consumo de uma API REST com dados estáticos, sem necessidade de banco de dados.
