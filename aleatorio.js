const nomes = [
    "Fernanda",
    "Giuliana",
    "Maria Eduarda",
    "Marcelo",
    "Amanda",
    "Gustavo",
    "Gabriel",
    "Rafaela",
    "Lucas",
    "Beatriz"
];

export function aleatorio(lista) {
    const posicao = Math.floor(Math.random() * lista.length);
    return lista[posicao];
}

export const nome = aleatorio(nomes);