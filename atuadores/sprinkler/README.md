# Documentação do Atuador Sprinkler

## Descrição Geral
O arquivo `sprinkler.js` cria um servidor gRPC que oferece uma interface de invocação remota para o atuador Sprinkler. O servidor pode ligar ou desligar o Sprinkler.

## Detalhes de Implementação

### Linguagem de Programação Utilizada
O atuador Sprinkler foi implementado usando Node.js.

### Bibliotecas Utilizadas
- **@grpc/grpc-js** e **@grpc/proto-loader**: Usados para criar o servidor gRPC e carregar o arquivo .proto.

### Formato das Mensagens
As mensagens enviadas e recebidas pelo atuador Sprinkler são objetos protobuf definidos no arquivo `sprinkler.proto`. Cada mensagem contém as informações necessárias para realizar uma ação específica no Sprinkler.

## Arquivo .proto
O arquivo `sprinkler.proto` define a interface de invocação remota para o atuador Sprinkler. A interface inclui dois métodos, `LigarSprinkler` e `DesligarSprinkler`, que não requerem nenhum argumento e retornam uma mensagem `Response` contendo uma única propriedade `message` do tipo string.