import { aleatorio, nome } from './aleatorio.js';
import { perguntas } from './perguntas.js';

const caixaPrincipal = document.querySelector(".caixa-principal");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");
const tituloResultado = document.querySelector(".caixa-resultado h2");

const botaoIniciar = document.querySelector(".iniciar-btn");
const botaoJogarNovamente = document.querySelector(".novamente-btn");
const telaInicial = document.querySelector(".tela-inicial");

let atual = 0;
let historiaFinal = "";

botaoIniciar.addEventListener("click", iniciaJogo);
botaoJogarNovamente.addEventListener("click", jogaNovamente);

function iniciaJogo() {
    atual = 0;
    historiaFinal = "";

    telaInicial.style.display = "none";
    caixaResultado.classList.remove("mostrar");

    mostraPergunta();
}

function mostraPergunta() {
    if (atual < 0 || atual >= perguntas.length) {
        mostraResultado();
        return;
    }

    const perguntaAtual = perguntas[atual];

    caixaResultado.classList.remove("mostrar");
    caixaPerguntas.classList.add("mostrar");
    caixaAlternativas.classList.add("mostrar");

    caixaPerguntas.textContent = perguntaAtual.enunciado;
    caixaAlternativas.textContent = "";

    for (const alternativa of perguntaAtual.alternativas) {
        const botao = document.createElement("button");

        botao.textContent = alternativa.texto;

        botao.addEventListener("click", () => {
            respostaSelecionada(alternativa);
        });

        caixaAlternativas.appendChild(botao);
    }
}

function respostaSelecionada(opcaoSelecionada) {
    const afirmacao = aleatorio(opcaoSelecionada.afirmacao);

    historiaFinal += afirmacao + "\n\n";

    if (opcaoSelecionada.proxima !== undefined) {
        atual = opcaoSelecionada.proxima;
    } else {
        mostraResultado();
        return;
    }

    mostraPergunta();
}

function mostraResultado() {
    caixaPerguntas.classList.remove("mostrar");
    caixaAlternativas.classList.remove("mostrar");

    tituloResultado.textContent = `Em 2049, ${nome}...`;
    textoResultado.textContent = historiaFinal.trim();

    caixaResultado.classList.add("mostrar");
}

function jogaNovamente() {
    atual = 0;
    historiaFinal = "";

    caixaResultado.classList.remove("mostrar");
    caixaPerguntas.classList.remove("mostrar");
    caixaAlternativas.classList.remove("mostrar");

    telaInicial.style.display = "block";
}

function substituiNome() {
    for (const pergunta of perguntas) {
        pergunta.enunciado = pergunta.enunciado.replace(/você/gi, nome);
    }
}

substituiNome();