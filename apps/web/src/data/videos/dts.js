// Vídeos da trilha: DTS
export const videos = {
  IwPInvzIZoI: {
    titulo: "DTS 1 - Introdução",
    embed: "https://www.youtube.com/embed/IwPInvzIZoI",
    descricao: `Aula de abertura do DTS com visão geral do módulo de treinamento para operadores.

CONTEÚDO DO VÍDEO

- O que é o DTS e qual o objetivo no contexto de treinamento operacional.
- Estrutura geral da plataforma e como o fluxo de capacitação é organizado.
- Diferença entre ambiente de treinamento e uso operacional.`,
    duracao: "16:05",
  },
  eWzVomS9FtI: {
    titulo: "DTS 2 - Agentes",
    embed: "https://www.youtube.com/embed/eWzVomS9FtI",
    descricao: `Aula focada na lógica de agentes e papéis no DTS.

CONTEÚDO DO VÍDEO

- Separação de ações e interfaces por papel.
- Boas práticas para organizar sessões de treinamento.
- Impacto dessa separação na clareza didática e no controle da operação.`,
    duracao: "1:40",
  },
  "bPhu814NG-A": {
    titulo: "DTS 3 - Cenários",
    embed: "https://www.youtube.com/embed/bPhu814NG-A",
    descricao: `Panorama prático dos cenários de uso no DTS com foco nas funções do modo instrutor.

CONTEÚDO DO VÍDEO

- Visão geral das funções disponíveis para o instrutor.
- Configuração de interfaces e recursos usados durante as sessões.
- Como montar e conduzir cenários de treinamento de forma consistente.`,
    duracao: "6:58",
  },
  "2nN2CXTa9dM": {
    titulo: "DTS 4 - Sequências",
    embed: "https://www.youtube.com/embed/2nN2CXTa9dM",
    descricao: `Apresentação prática do módulo de Sequências do DTS para simular eventos operativos durante o treinamento.

CONTEÚDO DO VÍDEO

- Conceito de sequência e aplicação em proteção, falhas, alarmes e desligamentos.
- Diferença entre sequência real (baseada em condição real do sistema) e sequência de treinamento (forçada pelo instrutor).
- Uso da tela de Sequências para criar, abrir, editar, salvar e excluir sequências.
- Configuração do trigger por expressão lógica, com validação de sintaxe e atraso de disparo.
- Adição de tags para montar a expressão de disparo e filtragem por nome de ponto.
- Montagem da lista de eventos com ação (ligar, desligar, aumentar, diminuir, resetar) e ordem de execução.
- Entendimento do delay entre eventos e do comportamento do primeiro disparo após o atraso inicial.
- Criação de sequência a partir de eventos históricos por janela de data/hora (limite de 24 horas).
- Reaproveitamento de tempos reais de campo para reproduzir o cenário durante o treinamento.`,
    duracao: "8:27",
  },
  UVfac8VKx3I: {
    titulo: "DTS 5 - Curvas Características",
    embed: "https://www.youtube.com/embed/UVfac8VKx3I",
    descricao: `Apresentação do módulo de Curvas Características do DTS para modelar carga e geração ao longo da simulação.

CONTEÚDO DO VÍDEO

- Papel das curvas como entradas variáveis do processo, alteradas a cada passo de simulação.
- Curvas personalizadas por parâmetros nominais e importação por dados reais.
- Horizonte padrão de 75 passos de simulação (aproximadamente 10 minutos de treinamento).
- Selecionar pacote de curvas e visualizar em formato gráfico ou tabular.
- Criação e edição de curva do tipo PD com parâmetros nominais por BE.
- Definição de carga leve, nominal e pesada por percentuais e faixas de tempo.
- Ajuste de ranges, confirmação de alterações e retorno ao modo de visualização.
- Geração de curvas históricas por data e hora em janela de 10 minutos.
- Configuração de tags de sinalização de potência quando o padrão BE_medpa não existir.
- Inclusão e exclusão de BEs na tabela, com parametrização completa de potência e faixas.`,
    duracao: "8:58",
  },
  gs1QfR5emi0: {
    titulo: "DTS 6 - Executar Treinamento",
    embed: "https://www.youtube.com/embed/gs1QfR5emi0",
    descricao: `Demonstração completa do fluxo de execução de um treinamento no modo instrutor do DTS, do reboot inicial até o encerramento da sessão.

CONTEÚDO DO VÍDEO

- Abertura da interface de execução pelo modo instrutor e apresentação dos controles disponíveis.
- Botão de iniciar: reboot da base interna com reinicialização de todos os computadores internos do sistema.
- Cadeado de status: indicador de liberação para treinamento (fechado = bloqueado, aberto = pronto para executar).
- Seleção e carregamento de cenário pré-configurado (modos de operação).
- Seleção e carregamento de curva característica para o cenário escolhido.
- Habilitação da execução e disparo do treinamento com acompanhamento pelo log de eventos.
- Monitoramento do tempo decorrido e dos loops do fluxo de potência durante a sessão ativa.
- Encerramento automático da sessão: reset dos contadores, travamento e reboot da aplicação.
- Habilitação e desabilitação de sequências em tempo real durante o treinamento.
- Fluxo JSON trocado a cada loop entre a máquina de estado e o OpenDSS com as respostas do fluxo de potência.`,
    duracao: "4:50",
  },
};
