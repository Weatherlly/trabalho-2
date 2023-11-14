# Documentação do Atuador Ar Condicionado

## Descrição Geral
O arquivo `arCondicionado.js` cria um servidor gRPC que oferece uma interface de invocação remota para o atuador Ar Condicionado. O servidor pode ligar ou desligar o ar condicionado e configurar a temperatura.

## Detalhes de Implementação

### Linguagem de Programação Utilizada
O atuador Ar Condicionado foi implementado usando Node.js.

### Bibliotecas Utilizadas
- **@grpc/grpc-js** e **@grpc/proto-loader**: Usados para criar o servidor gRPC e carregar o arquivo .proto.

### Formato das Mensagens
As mensagens enviadas e recebidas pelo atuador Ar Condicionado são objetos protobuf definidos no arquivo `arCondicionado.proto`. Cada mensagem contém as informações necessárias para realizar uma ação específica no ar condicionado.

## Arquivo .proto
O arquivo `arCondicionado.proto` define a interface de invocação remota para o atuador Ar Condicionado. A interface inclui três métodos: `LigarArCondicionado`, `DesligarArCondicionado` e `ConfigurarTemperatura`. Os dois primeiros métodos não requerem nenhum argumento e retornam uma mensagem `Response` contendo uma única propriedade `message` do tipo string. O método `ConfigurarTemperatura` requer uma mensagem `Temperatura` contendo uma única propriedade `value` do tipo int32 e retorna uma mensagem `Response`.