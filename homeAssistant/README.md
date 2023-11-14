# Documentação do Home Assistant

## Descrição Geral
O arquivo `homeAssistant.js` cria um servidor TCP que se comunica com um cliente, um servidor RabbitMQ que se inscreve em várias filas para receber mensagens dos sensores, e clientes gRPC para se comunicar com os atuadores.

## Detalhes de Implementação

### Linguagem de Programação Utilizada
O Home Assistant foi implementado usando Node.js.

### Frameworks e Bibliotecas Utilizadas
- **net**: Usado para criar o servidor TCP.
- **amqplib**: Usado para conectar e interagir com o RabbitMQ.
- **@grpc/grpc-js** e **@grpc/proto-loader**: Usados para criar servidores e clientes gRPC e carregar arquivos .proto.

### Formato das Mensagens

#### Cliente -> Home Assistant
As mensagens enviadas do cliente para o Home Assistant são objetos JSON que contêm as seguintes propriedades:
- **dispositivo**: O nome do dispositivo com o qual o cliente deseja interagir.
- **funcao**: A ação que o cliente deseja realizar (por exemplo, 'Obter Status', 'On/Off', 'Configurar temperatura').
- **value**: O valor associado à ação, se houver.

#### Sensores -> Home Assistant
Os sensores publicam mensagens no RabbitMQ a cada 5 segundos. Cada mensagem é um objeto JSON que contém uma única propriedade representando o valor do sensor (por exemplo, { luminosidade: 100 }).

#### Home Assistant -> Atuadores
As mensagens enviadas do Home Assistant para os atuadores são objetos protobuf definidos nos arquivos .proto correspondentes. Cada mensagem contém as informações necessárias para realizar uma ação específica no atuador.