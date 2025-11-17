// Exporta todas as trilhas
import { trilha as actionNetCertificacao } from './action-net-certificacao.js';
import { trilha as actionNetXCompleto } from './action-net-x-completo.js';
import { trilha as cursoSolarFotovoltaico } from './curso-solar-fotovoltaico.js';
import { trilha as sageTreinamento } from './sage-treinamento.js';
import { trilha as falconBi40 } from './falcon-bi-40.js';
import { trilha as cursoBasicoCsharp } from './curso-basico-csharp.js';
import { trilha as cursoSqlCompleto } from './curso-sql-completo.js';
import { trilha as cursoPythonCompleto } from './curso-python-completo.js';

export const TRILHAS = [
  actionNetCertificacao,
  actionNetXCompleto,
  cursoSolarFotovoltaico,
  sageTreinamento,
  falconBi40,
  cursoBasicoCsharp,
  cursoSqlCompleto,
  cursoPythonCompleto
];

// Função para obter trilha por ID
export const getTrilhaById = (id) => {
  return TRILHAS.find(trilha => trilha.id === id);
};

