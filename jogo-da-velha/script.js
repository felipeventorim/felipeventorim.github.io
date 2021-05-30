function createDiv() {
  const div = document.createElement('div');
  return div;
}

function getTabuleiro() {
  return document.querySelector('.tabuleiro');
}

function createCasas(pos) {
  const casa = createDiv();
  const posicao = 'pos' + pos;
  casa.classList.add('casa');
  casa.classList.add(posicao);
  casa.addEventListener('click', addMarcacao);
  casa.addEventListener('mouseover', verificaQuemGanhou);
  return casa;
}

function addCasas() {
  const tabuleiro = getTabuleiro();
  for (let index = 0; index < 9; index += 1) {
    tabuleiro.children[1].appendChild(createCasas(index));
  }
}

function escolheXOuO(marca) {
  let ultimaDiv = getTabuleiro();
  ultimaDiv = ultimaDiv.lastElementChild.lastElementChild;
  const letra = ultimaDiv.classList[0];
  if (letra === 'x') {
    marca.classList.add('o');
    marca.innerText = 'O';
  } else {
    marca.classList.add('x');
    marca.innerText = 'X';
  }
  return marca;
}

function getPosicao(casaMarcada) {
  let intPosicao = [];
  for (let index = 0; index < casaMarcada.length; index += 1) {
    intPosicao[index] = parseInt(casaMarcada[index].classList[1][3]);
  }
  return intPosicao;
}

function addMarcacao(event) {
  const classePosicao = event.target.classList[1];
  const tabuleiro = getTabuleiro();
  let marca = createDiv();
  marca = escolheXOuO(marca);
  marca.classList.add(classePosicao);
  tabuleiro.lastElementChild.appendChild(marca);
}

function reset() {
  const marcados = document.querySelector('.marcados');
  while (marcados.children.length > 1) {
    marcados.removeChild(marcados.lastElementChild);
  }
}

function horizontal(letra) {
  const classeDaLetra = '.' + letra;
  const string1 = classeDaLetra + '.pos0, ' + classeDaLetra + '.pos1, ' + classeDaLetra + '.pos2';
  const string2 = classeDaLetra + '.pos3, ' + classeDaLetra + '.pos4, ' + classeDaLetra + '.pos5';
  const string3 = classeDaLetra + '.pos6, ' + classeDaLetra + '.pos7, ' + classeDaLetra + '.pos8';

  const linha1 = document.querySelectorAll(string1);
  const linha2 = document.querySelectorAll(string2);
  const linha3 = document.querySelectorAll(string3);

  if (linha1.length === 3 || linha2.length === 3 || linha3.length === 3) {
    ganhador(letra);
  }
}

function vertical(letra) {
  const classeDaLetra = '.' + letra;
  const string1 = classeDaLetra + '.pos0, ' + classeDaLetra + '.pos3, ' + classeDaLetra + '.pos6';
  const string2 = classeDaLetra + '.pos1, ' + classeDaLetra + '.pos4, ' + classeDaLetra + '.pos7';
  const string3 = classeDaLetra + '.pos2, ' + classeDaLetra + '.pos5, ' + classeDaLetra + '.pos8';

  const linha1 = document.querySelectorAll(string1);
  const linha2 = document.querySelectorAll(string2);
  const linha3 = document.querySelectorAll(string3);

  if (linha1.length === 3 || linha2.length === 3 || linha3.length === 3) {
    ganhador(letra);
  }
}

function diagonal(letra) {
  const classeDaLetra = '.' + letra;
  const string1 = classeDaLetra + '.pos0, ' + classeDaLetra + '.pos4, ' + classeDaLetra + '.pos8';
  const string2 = classeDaLetra + '.pos2, ' + classeDaLetra + '.pos4, ' + classeDaLetra + '.pos6';

  const linha1 = document.querySelectorAll(string1);
  const linha2 = document.querySelectorAll(string2);

  if (linha1.length === 3 || linha2.length === 3) {
    ganhador(letra);
  }
}

function ganhador(letra) {
  window.alert('Vitória do ' + letra.toUpperCase() + '!\nComeçar de novo?');
  reset();
}

function test(letra) {
  horizontal(letra);
  vertical(letra);
  diagonal(letra);
}

function verificaQuemGanhou() {
  const marcados = document.querySelectorAll(".x, .o");
  const x = 'x';
  const o = 'o';
  if (marcados.length > 4 ) {
    test(x);
    test(o);
  }
  if (marcados.length === 9) {
    reset();
    window.alert('Fim de jogo!\nComeçar de novo?');
  }
}

function inicio() {
  addCasas();
}

window.onload = inicio;