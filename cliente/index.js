// client.js
const net = require('net');
const readlineSync = require('readline-sync');

const client = new net.Socket();

function enviarMensagem() {
    const dispositivos = ['Sensor de Luminosidade', 'Sensor de Temperatura', 'Sensor de Umidade', 'Lampada', 'Ar Condicionado', 'Sprinkler'];
    const dispositivo = readlineSync.keyInSelect(dispositivos, 'Qual dispositivo voce quer controlar?');
    if (dispositivo === -1) {
        console.log('Nenhuma opcao selecionada.');
        client.end();
        return;
    }

    const mensagem = {
        dispositivo: dispositivos[dispositivo],
        funcao: null,
        value: null
    };

    if (dispositivo <= 2) { // Se o dispositivo for um sensor
        mensagem.funcao = 'Obter Status';
    } else {
        switch (dispositivo) {
            case 3: // Lampada
                const opcoesLampada = ['Ligar', 'Desligar'];
                const opcaoLampada = readlineSync.keyInSelect(opcoesLampada, 'O que voce quer fazer com a lampada?');
                if (opcaoLampada === -1) {
                    console.log('Nenhuma opcao selecionada.');
                    client.end();
                    return;
                }
                mensagem.funcao = 'On/Off'
                mensagem.value = opcoesLampada[opcaoLampada];
                break;
            case 4: // Ar Condicionado
                const opcoesAr = ['Ligar', 'Desligar', 'Alterar temperatura'];
                const opcaoAr = readlineSync.keyInSelect(opcoesAr, 'O que voce quer fazer com o Ar condicionado?')
                if (opcaoAr === 2) {
                    const temperatura = readlineSync.questionInt('Qual a temperatura desejada? ');
                    mensagem.funcao = `Configurar temperatura`;
                    mensagem.value = temperatura;
                } else {
                    mensagem.funcao = 'On/Off'
                    mensagem.value = opcoesAr[opcaoAr];
                }
                if (opcaoAr === -1) {
                    console.log('Nenhuma opcao selecionada.');
                    client.end();
                    return;
                }
                break;
            case 5: // Sprinkler
                const opcoesSprinkler = ['Ligar', 'Desligar'];
                const opcaoSprinkler = readlineSync.keyInSelect(opcoesSprinkler, 'O que voce quer fazer com o sprinkler?');
                if (opcaoSprinkler === -1) {
                    console.log('Nenhuma opcao selecionada.');
                    client.end();
                    return;
                }
                mensagem.funcao = 'On/Off'
                mensagem.value = opcoesSprinkler[opcaoSprinkler];
                break;
        }
    }

    client.write(JSON.stringify(mensagem));
}

client.connect(3001, 'localhost', () => {
    console.log('Conectado ao servidor!');
    enviarMensagem();
});

client.on('data', (data) => {
    console.log('Resposta do servidor:', data.toString());
    const continuar = readlineSync.keyInYN('Deseja enviar outra mensagem?');
    if (continuar) {
        enviarMensagem();
    } else {
        client.end();
    }
});
