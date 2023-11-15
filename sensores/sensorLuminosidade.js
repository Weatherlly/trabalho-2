// sensorLuminosidade.js
const amqp = require('amqplib/callback_api');

let valorLuminosidade = 100;
let atuadorLigado = false;

function formatarData(data) {
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear();
    const horas = data.getHours().toString().padStart(2, '0');
    const minutos = data.getMinutes().toString().padStart(2, '0');
    const segundos = data.getSeconds().toString().padStart(2, '0');
    return `${dia}/${mes}/${ano} - ${horas}:${minutos}:${segundos}`;
}

amqp.connect('amqp://localhost', (error0, connection) => {
    if (error0) {
        throw error0;
    }
    connection.createChannel((error1, channel) => {
        if (error1) {
            throw error1;
        }

        const queue = 'fila_luminosidade';
        setInterval(() => {
            if (atuadorLigado) {
                valorLuminosidade += 10;
                if (valorLuminosidade >= 100) {
                    // Solicitar ao Home Assistant para desligar o atuador
                    atuadorLigado = false;
                }
            } else {
                valorLuminosidade -= 5;
                if (valorLuminosidade <= 80) {
                    // Solicitar ao Home Assistant para ligar o atuador
                    atuadorLigado = true;
                }
            }
            const msg = JSON.stringify({ luminosidade: valorLuminosidade, horario: formatarData(new Date()) });

            channel.assertQueue(queue, {
                durable: false
            });

            channel.sendToQueue(queue, Buffer.from(msg));
            console.log(" [x] Sent %s", msg);
        }, 5000);
    });
});
