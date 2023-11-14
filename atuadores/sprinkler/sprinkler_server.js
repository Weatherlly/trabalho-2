const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('./sprinkler.proto');
const sprinklerProto = grpc.loadPackageDefinition(packageDefinition).Sprinkler;

let sprinklerLigado = false;
const server = new grpc.Server();

server.addService(sprinklerProto.service, {
  LigarSprinkler: (_, callback) => {
    if (!sprinklerLigado) {
      console.log('Sprinkler ligado');  
      sprinklerLigado = true;
      callback(null, { message: 'Sprinkler ligado' });
    } else {
      callback(null, { message: 'Sprinkler já está ligado' });
    }
  },
  DesligarSprinkler: (_, callback) => {
    if (sprinklerLigado) {
      console.log('Sprinkler desligado');
      sprinklerLigado = false;
      callback(null, { message: 'Sprinkler desligado' });
    } else {
      callback(null, { message: 'Sprinkler já está desligado' });
    }
  },
});

server.bindAsync('0.0.0.0:50052', grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.error('Erro ao iniciar o servidor:', err);
    return;
  }
  console.log(`Servidor rodando em http://0.0.0.0:${port}`);
  server.start();
});
