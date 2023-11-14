# Documentação do Atuador Lâmpada

## Descrição Geral
O arquivo `lampada.js` cria um servidor gRPC que oferece uma interface de invocação remota para o atuador Lâmpada. O servidor pode ligar ou desligar a lâmpada.

## Detalhes de Implementação

### Linguagem de Programação Utilizada
O atuador Lâmpada foi implementado usando Node.js.

### Bibliotecas Utilizadas
- **@grpc/grpc-js** e **@grpc/proto-loader**: Usados para criar o servidor gRPC e carregar o arquivo .proto.

### Formato das Mensagens
As mensagens enviadas e recebidas pelo atuador Lâmpada são objetos protobuf definidos no arquivo `lampada.proto`. Cada mensagem contém as informações necessárias para realizar uma ação específica na lâmpada.

## Arquivo .proto
O arquivo `lampada.proto` define a interface de invocação remota para o atuador Lâmpada. A interface inclui dois métodos, `LigarLampada` e `DesligarLampada`, que não requerem nenhum argumento e retornam uma mensagem `Response` contendo uma única propriedade `message` do tipo string.