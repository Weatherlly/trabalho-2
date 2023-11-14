# Documentação do Cliente

## Descrição Geral
O arquivo `client.js` cria um cliente TCP que se conecta ao Home Assistant. O cliente pode interagir com vários dispositivos em um ambiente inteligente, como sensores e atuadores. O usuário pode escolher o dispositivo com o qual deseja interagir e a ação que deseja realizar (por exemplo, ligar ou desligar um atuador). As mensagens são enviadas ao servidor como strings JSON.

## Detalhes de Implementação

### Linguagem de Programação Utilizada
O cliente foi implementado usando Node.js.

### Bibliotecas Utilizadas
- **net**: Usado para criar o cliente TCP.
- **readline-sync**: Usado para interagir com o usuário através do terminal.

### Formato das Mensagens
As mensagens enviadas do cliente para o Home Assistant são objetos JSON que contêm as seguintes propriedades:
- **dispositivo**: O nome do dispositivo com o qual o cliente deseja interagir.
- **funcao**: A ação que o cliente deseja realizar (por exemplo, 'Obter Status', 'On/Off', 'Configurar temperatura').
- **value**: O valor associado à ação, se houver.