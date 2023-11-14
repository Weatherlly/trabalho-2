# Documentação dos Sensores

## Descrição Geral
Os arquivos `sensorLuminosidade.js`, `sensorTemperatura.js` e `sensorUmidade.js` criam sensores que se conectam a um servidor RabbitMQ e publicam mensagens periodicamente em uma fila específica.

## Detalhes de Implementação

### Linguagem de Programação Utilizada
Os sensores foram implementados usando Node.js.

### Bibliotecas Utilizadas
- **amqplib**: Usado para conectar e interagir com o RabbitMQ.

### Formato das Mensagens
Os sensores publicam mensagens no RabbitMQ a cada 5 segundos. Cada mensagem é um objeto JSON que contém uma única propriedade representando o valor do sensor (por exemplo, { luminosidade: 100 }).