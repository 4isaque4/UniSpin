// Videos da trilha: DTS
export const videos = {
  IwPInvzIZoI: {
    titulo: "DTS 1 - Introducao",
    embed: "https://www.youtube.com/embed/IwPInvzIZoI",
    descricao: `Aula de abertura do DTS com visao geral do modulo de treinamento para operadores.

CONTEUDO DO VIDEO

- O que e o DTS e qual o objetivo no contexto de treinamento operacional.
- Estrutura geral da plataforma e como o fluxo de capacitacao e organizado.
- Diferenca entre ambiente de treinamento e uso operacional.`,
    duracao: "16:05",
  },
  eWzVomS9FtI: {
    titulo: "DTS 2 - Agentes",
    embed: "https://www.youtube.com/embed/eWzVomS9FtI",
    descricao: `Aula focada na logica de agentes e papeis no DTS.

CONTEUDO DO VIDEO

- Separacao de acoes e interfaces por papel.
- Boas praticas para organizar sessoes de treinamento.
- Impacto dessa separacao na clareza didatica e no controle da operacao.`,
    duracao: "1:40",
  },
  "bPhu814NG-A": {
    titulo: "DTS 3 - Cenarios",
    embed: "https://www.youtube.com/embed/bPhu814NG-A",
    descricao: `Panorama pratico dos cenarios de uso no DTS com foco nas funcoes do modo instrutor.

CONTEUDO DO VIDEO

- Visao geral das funcoes disponiveis para o instrutor.
- Configuracao de interfaces e recursos usados durante as sessoes.
- Como montar e conduzir cenarios de treinamento de forma consistente.`,
    duracao: "6:58",
  },
  "2nN2CXTa9dM": {
    titulo: "DTS 4 - Sequencias",
    embed: "https://www.youtube.com/embed/2nN2CXTa9dM",
    descricao: `Apresentacao pratica do modulo de Sequencias do DTS para simular eventos operativos durante o treinamento.

CONTEUDO DO VIDEO

- Conceito de sequencia e aplicacao em protecao, falhas, alarmes e desligamentos.
- Diferenca entre sequencia real (baseada em condicao real do sistema) e sequencia de treinamento (forcada pelo instrutor).
- Uso da tela de Sequencias para criar, abrir, editar, salvar e excluir sequencias.
- Configuracao do trigger por expressao logica, com validacao de sintaxe e atraso de disparo.
- Adicao de tags para montar a expressao de disparo e filtragem por nome de ponto.
- Montagem da lista de eventos com acao (ligar, desligar, aumentar, diminuir, resetar) e ordem de execucao.
- Entendimento do delay entre eventos e do comportamento do primeiro disparo apos o atraso inicial.
- Criacao de sequencia a partir de eventos historicos por janela de data/hora (limite de 24 horas).
- Reaproveitamento de tempos reais de campo para reproduzir o cenario durante o treinamento.`,
    duracao: "8:27",
  },
  UVfac8VKx3I: {
    titulo: "DTS 5 - Curvas Caracteristicas",
    embed: "https://www.youtube.com/embed/UVfac8VKx3I",
    descricao: `Apresentacao do modulo de Curvas Caracteristicas do DTS para modelar carga e geracao ao longo da simulacao.

CONTEUDO DO VIDEO

- Papel das curvas como entradas variaveis do processo, alteradas a cada passo de simulacao.
- Curvas personalizadas por parametros nominais e importacao por dados reais.
- Horizonte padrao de 75 passos de simulacao (aproximadamente 10 minutos de treinamento).
- Selecionar pacote de curvas e visualizar em formato grafico ou tabular.
- Criacao e edicao de curva do tipo PD com parametros nominais por BE.
- Definicao de carga leve, nominal e pesada por percentuais e faixas de tempo.
- Ajuste de ranges, confirmacao de alteracoes e retorno ao modo de visualizacao.
- Geracao de curvas historicas por data e hora em janela de 10 minutos.
- Configuracao de tags de sinalizacao de potencia quando o padrao BE_medpa nao existir.
- Inclusao e exclusao de BEs na tabela, com parametrizacao completa de potencia e faixas.`,
    duracao: "8:58",
  },
};
