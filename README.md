# Documentação do Projeto de Sistema Distribuído

## Descrição Geral
Este projeto simula um ambiente inteligente com sensores e atuadores, onde a comunicação entre os sensores e o Home Assistant ocorre via RabbitMQ, e a comunicação entre o Home Assistant e os atuadores ocorre via gRPC. Além disso, o Home Assistant se comunica com um cliente via socket TCP/UDP.

## Detalhes de Implementação

### Linguagens de Programação Utilizadas
O projeto foi implementado usando Node.js.

### Frameworks e Bibliotecas Utilizadas
- **RabbitMQ**: Usado para a comunicação entre os sensores e o Home Assistant.
- **gRPC**: Usado para a comunicação entre o Home Assistant e os atuadores.
- **net**: Usado para a comunicação entre o cliente e o Home Assistant.
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

## Arquivos de Código
O projeto consiste nos seguintes arquivos de código:
- **client.js**: Cria um cliente TCP que se conecta ao Home Assistant.
- **homeAssistant.js**: Cria um servidor TCP que se comunica com o cliente, um servidor RabbitMQ que se inscreve em várias filas para receber mensagens dos sensores, e clientes gRPC para se comunicar com os atuadores.
- **sensorLuminosidade.js**, **sensorTemperatura.js**, **sensorUmidade.js**: Cada um desses scripts cria um sensor que se conecta a um servidor RabbitMQ e publica mensagens periodicamente em uma fila específica.
- **lampada.js**, **sprinkler.js**, **arCondicionado.js**: Cada um desses scripts cria um servidor gRPC que oferece uma interface de invocação remota para um atuador específico. O servidor pode ligar ou desligar o atuador e, no caso do ar condicionado, também pode configurar a temperatura. As mensagens são enviadas e recebidas como objetos protobuf, conforme definido nos arquivos .proto correspondentes. 