// Exporta todos os vídeos de todas as trilhas
import { videos as actionNetCertificacao } from './action-net-certificacao.js';
import { videos as actionNetXCompleto } from './action-net-x-completo.js';
import { videos as cursoSolarFotovoltaico } from './curso-solar-fotovoltaico.js';
import { videos as sageTreinamento } from './sage-treinamento.js';
import { videos as falconBi40 } from './falcon-bi-40.js';
import { videos as cursoBasicoCsharp } from './curso-basico-csharp.js';
import { videos as cursoSqlCompleto } from './curso-sql-completo.js';
import { videos as cursoPythonCompleto } from './curso-python-completo.js';

// Combinar todos os vídeos em um único objeto
export const MOCK = {
  ...actionNetCertificacao,
  ...actionNetXCompleto,
  ...cursoSolarFotovoltaico,
  ...sageTreinamento,
  ...falconBi40,
  ...cursoBasicoCsharp,
  ...cursoSqlCompleto,
  ...cursoPythonCompleto
};
