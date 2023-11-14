// homeAssistant.js
const net = require('net');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const amqp = require('amqplib/callback_api');


const lampadaPackageDefinition = protoLoader.loadSync('../atuadores/lampada/lampada.proto', {});
const lampadaProto = grpc.loadPackageDefinition(lampadaPackageDefinition).Lampada;
const lampada = new lampadaProto('localhost:50051', grpc.credentials.createInsecure());

const sprinklerPackageDefinition = protoLoader.loadSync('../atuadores/sprinkler/sprinkler.proto', {});
const sprinklerProto = grpc.loadPackageDefinition(sprinklerPackageDefinition).Sprinkler;
const sprinkler = new sprinklerProto('localhost:50052', grpc.credentials.createInsecure());

const arCondicionadoPackageDefinition = protoLoader.loadSync('../atuadores/arCondicionado/arCondicionado.proto', {});
const arCondicionadoProto = grpc.loadPackageDefinition(arCondicionadoPackageDefinition).ArCondicionado;
const arCondicionado = new arCondicionadoProto('localhost:50053', grpc.credentials.createInsecure());

let sensorData = {};

amqp.connect('amqp://localhost', (error0, connection) => {
    if (error0) {
        throw error0;
    }
    connection.createChannel((error1, channel) => {
        if (error1) {
            throw error1;
        }

        const queues = ['fila_luminosidade', 'fila_temperatura', 'fila_umidade'];

        queues.forEach(queue => {
            channel.assertQueue(queue, {
                durable: false
            });

            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

            channel.consume(queue, (msg) => {
                console.log(" [x] Received %s", msg.content.toString());
                if (!sensorData[queue]) {
                    sensorData[queue] = [];
                }
                sensorData[queue].push(JSON.parse(msg.content.toString()));
                if (sensorData[queue].length > 30) {
                    sensorData[queue].shift();
                }
            }, {
                noAck: true
            });
        });
    });
});

const server = net.createServer((socket) => {
    socket.on('data', (data) => {
        const mensagem = JSON.parse(data.toString());
        console.log('Mensagem recebida do cliente:', mensagem);

        if (mensagem.funcao === 'Obter Status') {
            const sensorQueue = 'fila_' + mensagem.dispositivo.split(' ')[2].toLowerCase();
            socket.write(JSON.stringify(sensorData[sensorQueue]));
        }

        if (mensagem.dispositivo === 'Lampada') {
            if (mensagem.funcao === 'On/Off') {
                if (mensagem.value === 'Ligar') {
                    lampada.LigarLampada({}, (err, response) => {
                        console.log('Resposta do atuador:', response.message);
                        socket.write(response.message);
                    });
                } else if (mensagem.value === 'Desligar') {
                    lampada.DesligarLampada({}, (err, response) => {
                        console.log('Resposta do atuador:', response.message);
                        socket.write(response.message);
                    });
                }
            }
        }
        
        if (mensagem.dispositivo === 'Sprinkler') {
            if (mensagem.funcao === 'On/Off') {
                if (mensagem.value === 'Ligar') {
                    sprinkler.LigarSprinkler({}, (err, response) => {
                        console.log('Resposta do atuador:', response.message);
                        socket.write(response.message);
                    });
                } else if (mensagem.value === 'Desligar') {
                    sprinkler.DesligarSprinkler({}, (err, response) => {
                        console.log('Resposta do atuador:', response.message);
                        socket.write(response.message);
                    });
                }
            }
        }
        
        if (mensagem.dispositivo === 'Ar Condicionado') {
            if (mensagem.funcao === 'On/Off') {
                if (mensagem.value === 'Ligar') {
                    arCondicionado.LigarArCondicionado({}, (err, response) => {
                        console.log('Resposta do atuador:', response.message);
                        socket.write(response.message);
                    });
                } else if (mensagem.value === 'Desligar') {
                    arCondicionado.DesligarArCondicionado({}, (err, response) => {
                        console.log('Resposta do atuador:', response.message);
                        socket.write(response.message);
                    });
                }
            } else if (mensagem.funcao === 'Configurar temperatura' && mensagem.value != null) {
                arCondicionado.ConfigurarTemperatura({ value: mensagem.value }, (err, response) => {
                    console.log('Resposta do atuador:', response.message);
                    socket.write(response.message);
                });
            }
        }
    });

    socket.on('end', () => {
        console.log('Cliente desconectado');
    });

    socket.on('error', (err) => {
        console.error('Ocorreu um erro:', err);
    });
});

server.listen(3001, () => {
    console.log('Servidor rodando na porta 3001');
});

server.on('error', (err) => {
    console.error('Ocorreu um erro no servidor:', err);
});
