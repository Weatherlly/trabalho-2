const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('./arCondicionado.proto', {});
const arCondicionadoProto = grpc.loadPackageDefinition(packageDefinition).ArCondicionado;

let arCondicionadoLigado = false;
let temperatura = 24;
const server = new grpc.Server();

server.addService(arCondicionadoProto.service, {
  LigarArCondicionado: (_, callback) => {
    if (!arCondicionadoLigado) {
      console.log('Ar condicionado ligado');
      arCondicionadoLigado = true;
      callback(null, { message: 'Ar condicionado ligado' });
    } else {
      callback(null, { message: 'Ar condicionado já está ligado' });
    }
  },
  DesligarArCondicionado: (_, callback) => {
    if (arCondicionadoLigado) {
      console.log('Ar condicionado desligado');
      arCondicionadoLigado = false;
      callback(null, { message: 'Ar condicionado desligado' });
    } else {
      callback(null, { message: 'Ar condicionado já está desligado' });
    }
  },
  ConfigurarTemperatura: (call, callback) => {
    if (arCondicionadoLigado) {
      temperatura = call.request.value;
      console.log('Temperatura configurada para', temperatura);
      callback(null, { message: 'Temperatura configurada para ' + temperatura });
    } else {
      callback(null, { message: 'Ar condicionado está desligado, não é possível configurar a temperatura' });
    }
  },
});

server.bindAsync('0.0.0.0:50053', grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.error('Erro ao iniciar o servidor:', err);
    return;
  }
  console.log(`Servidor rodando em http://0.0.0.0:${port}`);
  server.start();
});
