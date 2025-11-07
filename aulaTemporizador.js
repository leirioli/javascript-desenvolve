// Passo 0: Configuração Inicial
// Defina a data futura para a contagem regressiva (Exemplo: 1º de Janeiro do próximo ano, ao meio-dia)
const dataFutura = new Date("January 1, 2026 12:00:00").getTime(); 


const displayDias = document.getElementById('dias');
const displayHoras = document.getElementById('horas');
const displayMinutos = document.getElementById('minutos');
const displaySegundos = document.getElementById('segundos');


/**
 * 1. Função para calcular o tempo restante.
 * @param {number} tempoAlvo - O valor em milissegundos da data futura.
 * @returns {Object} Um objeto contendo dias, horas, minutos e segundos restantes.
 */
function calcularTempoRestante(tempoAlvo) {
    // 4. Manipule o objeto Date para calcular a diferença.
    const agora = new Date().getTime();
    const diferenca = tempoAlvo - agora;

    // Se a contagem regressiva terminou
    if (diferenca < 0) {
        return { total: -1, dias: 0, horas: 0, minutos: 0, segundos: 0 };
    }

    // Cálculos de tempo (usando constantes em milissegundos)
    const msEmSegundo = 1000;
    const msEmMinuto = msEmSegundo * 60;
    const msEmHora = msEmMinuto * 60;
    const msEmDia = msEmHora * 24;

    const dias = Math.floor(diferenca / msEmDia);
    
    // O resto da diferença (após remover os dias) é dividido para obter as horas.
    const horas = Math.floor((diferenca % msEmDia) / msEmHora);
    
    // O resto da diferença (após remover as horas) é dividido para obter os minutos.
    const minutos = Math.floor((diferenca % msEmHora) / msEmMinuto);
    
    // O resto da diferença (após remover os minutos) é dividido para obter os segundos.
    const segundos = Math.floor((diferenca % msEmMinuto) / msEmSegundo);

    return {
        total: diferenca,
        dias: dias,
        horas: horas,
        minutos: minutos,
        segundos: segundos
    };
}


/**
 * Função utilitária para adicionar um zero à esquerda para números menores que 10.
 * @param {number} valor
 * @returns {string}
 */
function formatarTempo(valor) {
    return valor < 10 ? '0' + valor : valor;
}


/**
 * 2. Função para atualizar o temporizador na tela.
 */
function atualizarTemporizador() {
    const tempo = calcularTempoRestante(dataFutura);

    // Se a contagem regressiva terminou, pare o temporizador
    if (tempo.total < 0) {
        clearInterval(intervalo);
        // Opcional: Atualizar a exibição para "Contagem Terminada!"
        if (displayDias) displayDias.textContent = '00';
        // ... e o resto dos displays
        console.log("Contagem Regressiva Terminada!");
        return;
    }

    // Exibe os valores formatados (assumindo que os elementos HTML existam)
    if (displayDias) displayDias.textContent = formatarTempo(tempo.dias);
    if (displayHoras) displayHoras.textContent = formatarTempo(tempo.horas);
    if (displayMinutos) displayMinutos.textContent = formatarTempo(tempo.minutos);
    if (displaySegundos) displaySegundos.textContent = formatarTempo(tempo.segundos);
}

// 3. Use setInterval para atualizar o temporizador a cada segundo.
// Execute a função imediatamente para evitar um atraso inicial
atualizarTemporizador();

// Armazene o ID do intervalo para poder cancelá-lo depois
const intervalo = setInterval(atualizarTemporizador, 1000);