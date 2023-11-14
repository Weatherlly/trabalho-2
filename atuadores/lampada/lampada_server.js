const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('./lampada.proto');
const lampadaProto = grpc.loadPackageDefinition(packageDefinition).Lampada;

let lampadaLigada = false;
const server = new grpc.Server();

server.addService(lampadaProto.service, {
  LigarLampada: (_, callback) => {
    if (!lampadaLigada) {
      console.log('Lâmpada ligada');  
      lampadaLigada = true;
      callback(null, { message: 'Lâmpada ligada' });
    } else {
      callback(null, { message: 'Lâmpada já está ligada' });
    }
  },
  DesligarLampada: (_, callback) => {
    if (lampadaLigada) {
      console.log('Lâmpada desligada');
      lampadaLigada = false;
      callback(null, { message: 'Lâmpada desligada' });
    } else {
      callback(null, { message: 'Lâmpada já está desligada' });
    }
  },
});

server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.error('Erro ao iniciar o servidor:', err);
    return;
  }
  console.log(`Servidor rodando em http://0.0.0.0:${port}`);
  server.start();
});
