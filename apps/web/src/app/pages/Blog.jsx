export default function Blog() {
  return (
    <main className="features">
      <div className="container" style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem 1rem" }}>
        {/* Header */}
        <header style={{ marginBottom: "2rem" }}>
          <h1 style={{ 
            color: "#004080", 
            fontSize: "2rem", 
            marginBottom: "0.5rem",
            textAlign: "center"
          }}>
            Onboarding Spin Engenharia
          </h1>
          <p style={{ 
            lineHeight: "1.6", 
            color: "#333",
            textAlign: "center",
            marginBottom: "2rem"
          }}>
            Bem‑vindo(a) ao onboarding da Spin Engenharia! Este guia foi criado para
            orientar novos colaboradores sobre a história da empresa, suas áreas de
            atuação, benefícios oferecidos e instruções práticas para utilização do
            sistema Artia. Sinta‑se à vontade para explorar as seções abaixo.
          </p>
          
          {/* Índice */}
          <nav style={{
            backgroundColor: "#eef4fa",
            padding: "1rem",
            borderRadius: "8px",
            marginBottom: "2rem"
          }}>
            <strong style={{ display: "block", marginBottom: "0.75rem", color: "#004080" }}>Índice</strong>
            <ul style={{ listStyleType: "none", paddingLeft: 0, margin: 0 }}>
              <li style={{ marginBottom: "0.5rem" }}>
                <a href="#origem" style={{ color: "#0066cc", textDecoration: "none" }}>
                  A origem da Spin
                </a>
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                <a href="#areas" style={{ color: "#0066cc", textDecoration: "none" }}>
                  Áreas da Spin e representantes
                </a>
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                <a href="#empresa" style={{ color: "#0066cc", textDecoration: "none" }}>
                  Conheça a empresa
                </a>
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                <a href="#beneficios" style={{ color: "#0066cc", textDecoration: "none" }}>
                  Benefícios
                </a>
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                <a href="#despesas" style={{ color: "#0066cc", textDecoration: "none" }}>
                  Manual: como declarar despesas no Artia
                </a>
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                <a href="#horas" style={{ color: "#0066cc", textDecoration: "none" }}>
                  Manual: como declarar horas no Artia
                </a>
              </li>
            </ul>
          </nav>
        </header>

        {/* A origem da Spin */}
        <section id="origem" style={{ marginBottom: "3rem", scrollMarginTop: "100px" }}>
          <h2 style={{ color: "#004080", fontSize: "1.5rem", marginTop: "1.5rem", marginBottom: "1rem" }}>
            A origem da Spin
          </h2>
          <p style={{ lineHeight: "1.6", margin: "0.75rem 0", color: "#333" }}>
            A Spin Engenharia nasceu em 1992. Diante de uma crise no setor que
            afetou a Themag Engenharia, os fundadores Porto e Simões transformaram
            um momento de incerteza em oportunidade ao visitarem a incubadora de
            empresas da Universidade de Brasília (UnB). Ao descobrirem que um
            concurso para incubação encerrava no dia seguinte, viraram a noite
            desenvolvendo o projeto de um software SCADA orientado a nichos de
            mercado. Essa dedicação imediata garantiu a aprovação no concurso e
            marcou o início oficial da história da Spin.
          </p>
          <p style={{ lineHeight: "1.6", margin: "0.75rem 0", color: "#333" }}>
            Os primeiros anos foram definidos pela colaboração estratégica e
            sobrevivência técnica. Enquanto desenvolviam o software que viria a
            ser o <em>ActionView</em>, a empresa se consolidou atuando em
            consultoria de automação predial e de aeroportos, apoiada por uma
            rede de confiança que incluía parceiros da Eletronorte e do Aeroporto
            de Brasília. Essa base sólida permitiu que a Spin entregasse projetos
            críticos desde o início, como a automação da subestação SE Inhumas
            na CELG e sistemas para o Ministério das Relações Exteriores. A
            vocação internacional da Spin despertou cedo, levando nossas
            soluções para mercados exigentes como Alemanha, EUA e Grécia através
            de parcerias pioneiras. Essa trajetória de
            expansão atingiu um novo patamar em 2010, quando foi firmada a
            parceria estratégica com a Tatsoft. A partir dessa união foram
            desenvolvidos os algoritmos essenciais que hoje impulsionam o
            <em>Action.NET</em>, transformando aquele projeto inicial em uma
            referência tecnológica global.
          </p>
        </section>

        {/* Áreas da Spin */}
        <section id="areas" style={{ marginBottom: "3rem", scrollMarginTop: "100px" }}>
          <h2 style={{ color: "#004080", fontSize: "1.5rem", marginTop: "1.5rem", marginBottom: "1rem" }}>
            Áreas da Spin e seus representantes
          </h2>
          <p style={{ lineHeight: "1.6", margin: "0.75rem 0", color: "#333" }}>
            Para visualizar as áreas da Spin Engenharia e seus respectivos
            representantes, acesse o material visual elaborado no Canva clicando
            no link abaixo. Esse material apresenta um organograma interativo com
            as equipes e responsáveis.
          </p>
          <p style={{ lineHeight: "1.6", margin: "0.75rem 0" }}>
            <a 
              href="https://www.canva.com/design/DAG5pJuIsHI/MgAEnjBTDzcOTDi-0bqxDg/edit?utm_content=DAG5pJuIsHI&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: "#0066cc", textDecoration: "none", fontWeight: "500" }}
            >
              Abrir organograma das áreas da Spin →
            </a>
          </p>
        </section>

        {/* Conheça a empresa */}
        <section id="empresa" style={{ marginBottom: "3rem", scrollMarginTop: "100px" }}>
          <h2 style={{ color: "#004080", fontSize: "1.5rem", marginTop: "1.5rem", marginBottom: "1rem" }}>
            Conheça a empresa
          </h2>
          <p style={{ lineHeight: "1.6", margin: "0.75rem 0", color: "#333" }}>
            A Spin Engenharia é uma empresa de engenharia de automação que se
            dedica ao mercado elétrico, atuando como aceleradora na gestão de
            energia. Seu foco principal é o desenvolvimento e aplicação de
            soluções de software inovadoras, incluindo sistemas SCADA e ADMEMS
            (Energy Management System) para os segmentos de Geração,
            Transmissão e Distribuição (GTD). Utilizando conceitos da
            Indústria 4.0 e a metodologia Lean Automation, a Spin visa
            melhorar o desempenho das operações de energia, promovendo a
            transformação digital e garantindo aos clientes a redução de
            gastos e o aumento do retorno sobre o investimento.
          </p>
          
          <h3 style={{ color: "#004080", fontSize: "1.25rem", marginTop: "1.5rem", marginBottom: "0.75rem" }}>
            Produtos e links institucionais
          </h3>
          <p style={{ lineHeight: "1.6", margin: "0.75rem 0", color: "#333" }}>
            Confira os produtos da Spin e seus respectivos links:
          </p>
          <ul style={{ listStyleType: "disc", margin: "0.75rem 0 0.75rem 1.5rem", lineHeight: "1.8" }}>
            <li style={{ marginBottom: "1rem" }}>
              <img 
                src="/action_net_logo.png" 
                alt="Logo Action.NET" 
                style={{ maxWidth: "200px", height: "auto", display: "block", marginBottom: "0.5rem" }} 
              />
              <strong>Action.NET:</strong>{" "}
              <a 
                href="https://spineng.atlassian.net/wiki/spaces/ANUG/overview" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: "#0066cc", textDecoration: "none" }}
              >
                saiba mais
              </a>
            </li>
            <li style={{ marginBottom: "1rem" }}>
              <img 
                src="/action_sun_logo.png" 
                alt="Logo Action.Sun" 
                style={{ maxWidth: "200px", height: "auto", display: "block", marginBottom: "0.5rem" }} 
              />
              <strong>Action.Sun:</strong>{" "}
              <a 
                href="https://spineng.atlassian.net/wiki/spaces/PrdBlq/pages/349831169/Action.Sun" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: "#0066cc", textDecoration: "none" }}
              >
                saiba mais
              </a>
            </li>
            <li style={{ marginBottom: "1rem" }}>
              <strong>Action.View:</strong> logo não encontrada
            </li>
            <li style={{ marginBottom: "1rem" }}>
              <img 
                src="/action_wind_logo.png" 
                alt="Logo Action.Wind" 
                style={{ maxWidth: "200px", height: "auto", display: "block", marginBottom: "0.5rem" }} 
              />
              <strong>Action.Wind:</strong> não encontrado no Confluence
            </li>
            <li style={{ marginBottom: "1rem" }}>
              <strong>Action.Wise:</strong> logo não encontrada
            </li>
            <li style={{ marginBottom: "1rem" }}>
              <img 
                src="/action_operations_logo.png" 
                alt="Logo Action Operations" 
                style={{ maxWidth: "200px", height: "auto", display: "block", marginBottom: "0.5rem" }} 
              />
              <strong>Action Operations:</strong> não encontrado no Confluence
            </li>
            <li style={{ marginBottom: "1rem" }}>
              <img 
                src="/action_asset_logo.png" 
                alt="Logo Action Asset" 
                style={{ maxWidth: "200px", height: "auto", display: "block", marginBottom: "0.5rem" }} 
              />
              <strong>Action Asset:</strong> não encontrado no Confluence
            </li>
            <li style={{ marginBottom: "1rem" }}>
              <img 
                src="/grid_net_logo.png" 
                alt="Logo Grid.NET" 
                style={{ maxWidth: "200px", height: "auto", display: "block", marginBottom: "0.5rem" }} 
              />
              <strong>Grid.NET:</strong> não encontrado no Confluence
            </li>
          </ul>

          <h3 style={{ color: "#004080", fontSize: "1.25rem", marginTop: "1.5rem", marginBottom: "0.75rem" }}>
            Canal geral no Microsoft Teams
          </h3>
          <p style={{ lineHeight: "1.6", margin: "0.75rem 0", color: "#333" }}>
            A Spin também mantém um canal oficial no Microsoft Teams, onde
            toda a equipe pode se comunicar de forma rápida e centralizada. Esse
            chat geral funciona como um espaço único para avisos, orientações,
            alinhamentos e troca de informações do dia a dia, garantindo que
            todos estejam sempre atualizados e conectados.
          </p>
          <p style={{ marginTop: "1rem" }}>
            <img 
              src="/screenshoot_logo.png" 
              alt="Canal geral Teams – exemplo de interface" 
              style={{ maxWidth: "100%", height: "auto", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }} 
            />
          </p>
        </section>

        {/* Benefícios */}
        <section id="beneficios" style={{ marginBottom: "3rem", scrollMarginTop: "100px" }}>
          <h2 style={{ color: "#004080", fontSize: "1.5rem", marginTop: "1.5rem", marginBottom: "1rem" }}>
            Benefícios
          </h2>
          <p style={{ lineHeight: "1.6", margin: "0.75rem 0", color: "#333" }}>
            A Spin mantém uma política de benefícios alinhada diretamente à
            Convenção Coletiva firmada entre o SITIMMME (Sindicato Interestadual
            dos Trabalhadores nas Indústrias Metalúrgicas, Mecânicas e de
            Material Elétrico e Eletrônico) e o sindicato patronal SINFOR. É essa
            parceria que define o reajuste salarial anual dos colaboradores e
            orienta benefícios como o auxílio-funeral, o auxílio-alimentação com
            coparticipação prevista em acordo, o auxílio-transporte subsidiado e
            o direito às férias, que podem ser divididas em até três períodos
            conforme a legislação.
          </p>
          <p style={{ lineHeight: "1.6", margin: "0.75rem 0", color: "#333" }}>
            A empresa também oferece seguro de vida coletivo e plano
            odontológico completo, sem custos adicionais para colaboradores e
            dependentes. Além disso, disponibiliza plano de saúde empresarial da
            Bradesco Saúde, com cobertura nacional e coparticipação dividida
            entre empresa e colaborador. Outro benefício importante é o <em>day
              off</em> no aniversário, que pode ser utilizado no dia útil seguinte
            quando a data cair em feriado ou final de semana, mediante
            alinhamento com a liderança. Essas
            iniciativas reforçam o compromisso da empresa em oferecer um ambiente
            de trabalho cuidadoso, equilibrado e alinhado às normas definidas por
            SITIMMME e SINFOR.
          </p>
        </section>

        {/* Manual de despesas */}
        <section id="despesas" style={{ marginBottom: "3rem", scrollMarginTop: "100px" }}>
          <h2 style={{ color: "#004080", fontSize: "1.5rem", marginTop: "1.5rem", marginBottom: "1rem" }}>
            Manual: como declarar despesas no Artia
          </h2>
          <p style={{ lineHeight: "1.6", margin: "0.75rem 0", color: "#333" }}>
            O Artia é o sistema utilizado para controle de projetos e despesas.
            Siga os passos abaixo para declarar suas despesas de forma correta:
          </p>
          <ol style={{ margin: "0.75rem 0 0.75rem 1.5rem", lineHeight: "1.8" }}>
            <li style={{ marginBottom: "1rem" }}>
              <strong>Acessar a área do projeto:</strong>
              <p style={{ margin: "0.5rem 0", color: "#555" }}>
                No menu lateral esquerdo, clique no projeto para criar o
                relatório de despesas. Para despesas não vinculadas a projeto,
                utilize o projeto criado especialmente para estas, localizado na
                Comunidade "Spin", pasta "Administração", projeto "DESPESAS PARA
                REEMBOLSO".
              </p>
            </li>
            <li style={{ marginBottom: "1rem" }}>
              <strong>Navegar até "Reporte de Despesa":</strong>
              <p style={{ margin: "0.5rem 0", color: "#555" }}>
                No menu superior da tela do projeto, posicione o mouse sobre a
                opção "Financeiro" e, no menu que aparecer, clique em
                "Reportes de Despesa".
              </p>
            </li>
            <li style={{ marginBottom: "1rem" }}>
              <strong>Criar um relatório:</strong>
              <p style={{ margin: "0.5rem 0", color: "#555" }}>
                Na tela de "Reportes de Despesa", clique no botão verde "Novo".
              </p>
            </li>
            <li style={{ marginBottom: "1rem" }}>
              <strong>Preencher os dados iniciais do relatório:</strong>
              <ul style={{ margin: "0.5rem 0 0.5rem 1.5rem", listStyleType: "disc", lineHeight: "1.6" }}>
                <li style={{ marginBottom: "0.5rem" }}>
                  <strong>Título:</strong> dê um nome para o seu relatório de
                  despesas, relacionado ao evento (ex.: "Comissionamento SE
                  Oeste").
                </li>
                <li style={{ marginBottom: "0.5rem" }}>
                  <strong>Descrição:</strong> identifique se a despesa foi paga
                  pela "SPIN" ou pelo "COLABORADOR".
                </li>
                <li style={{ marginBottom: "0.5rem" }}>
                  <strong>Adiantamento:</strong> some o valor total de todas as
                  despesas pagas pela Spin.
                </li>
                <li style={{ marginBottom: "0.5rem" }}>
                  <strong>Período:</strong> defina a data de início e fim do
                  período das despesas.
                </li>
              </ul>
              <p style={{ margin: "0.5rem 0", color: "#555" }}>
                Após preencher essas informações, clique em "Salvar".
              </p>
            </li>
            <li style={{ marginBottom: "1rem" }}>
              <strong>Lançar as despesas individuais:</strong>
              <p style={{ margin: "0.5rem 0", color: "#555" }}>
                Após salvar, na parte inferior da tela, clique no botão verde
                "Novo lançamento". Uma nova janela se abrirá para adicionar cada
                despesa.
              </p>
            </li>
            <li style={{ marginBottom: "1rem" }}>
              <strong>Preencher os detalhes de cada lançamento:</strong>
              <ul style={{ margin: "0.5rem 0 0.5rem 1.5rem", listStyleType: "disc", lineHeight: "1.6" }}>
                <li style={{ marginBottom: "0.5rem" }}>
                  <strong>Título:</strong> descreva a despesa (ex.: aluguel de
                  carro, refeição etc.).
                </li>
                <li style={{ marginBottom: "0.5rem" }}>
                  <strong>Categoria:</strong> selecione a categoria apropriada
                  (ex.: Hospedagem, Alimentação, Transporte); classificação
                  "Despesa", tipo "Realizado".
                </li>
                <li style={{ marginBottom: "0.5rem" }}>
                  <strong>Unidade:</strong> especifique a unidade da despesa (ex.:
                  diária, litro, corrida).
                </li>
                <li style={{ marginBottom: "0.5rem" }}>
                  <strong>Valor unitário e quantidade:</strong> insira o valor por
                  unidade e a quantidade. Ao terminar de preencher uma despesa,
                  clique em "Salvar e Novo" para adicionar a próxima, ou
                  apenas "Salvar" se for a última.
                </li>
              </ul>
            </li>
            <li style={{ marginBottom: "1rem" }}>
              <strong>Gerar o relatório final para impressão:</strong>
              <p style={{ margin: "0.5rem 0", color: "#555" }}>
                Depois de lançar todas as despesas, volte para a tela principal
                do relatório. No menu de opções na parte superior, clique no
                ícone da impressora.
              </p>
            </li>
            <li style={{ marginBottom: "1rem" }}>
              <strong>Entender o relatório:</strong>
              <p style={{ margin: "0.5rem 0", color: "#555" }}>
                O sistema gerará um relatório final em formato de tabela,
                mostrando todas as despesas. O total corresponde ao valor gasto;
                no quadro final, aparece o valor pago pela Spin (adiantamento).
              </p>
            </li>
            <li style={{ marginBottom: "1rem" }}>
              <strong>Encaminhar o relatório:</strong>
              <p style={{ margin: "0.5rem 0", color: "#555" }}>
                Após gerar o relatório, envie‑o para a Gerência de Administração,
                via e‑mail (<a href="mailto:administracao@spinengenharia.com.br" style={{ color: "#0066cc" }}>administracao@spinengenharia.com.br</a>),
                anexando as notas fiscais de despesas. Use como assunto do e‑mail:
                "Reembolso das despesas do projeto XXXX".
              </p>
            </li>
          </ol>
        </section>

        {/* Manual de horas */}
        <section id="horas" style={{ marginBottom: "3rem", scrollMarginTop: "100px" }}>
          <h2 style={{ color: "#004080", fontSize: "1.5rem", marginTop: "1.5rem", marginBottom: "1rem" }}>
            Manual: como declarar horas no Artia
          </h2>
          <p style={{ lineHeight: "1.6", margin: "0.75rem 0", color: "#333" }}>
            O controle de horas no Artia é fundamental para a gestão eficiente dos
            projetos. Veja como registrar corretamente seu tempo de trabalho:
          </p>
          <ol style={{ margin: "0.75rem 0 0.75rem 1.5rem", lineHeight: "1.8" }}>
            <li style={{ marginBottom: "1rem" }}>
              <strong>Acessar a lista de atividades:</strong>
              <p style={{ margin: "0.5rem 0", color: "#555" }}>
                Entre no Artia, vá até o menu onde aparece "Atividades" e abra a
                lista de atividades atribuídas a você.
              </p>
            </li>
            <li style={{ marginBottom: "1rem" }}>
              <strong>Selecionar a atividade que deseja registrar:</strong>
              <p style={{ margin: "0.5rem 0", color: "#555" }}>
                Clique na atividade em que você está trabalhando e confira o título
                da atividade na parte superior da tela para saber exatamente o que
                você está apontando.
              </p>
            </li>
            <li style={{ marginBottom: "1rem" }}>
              <strong>Abrir o menu de apontamentos:</strong>
              <p style={{ margin: "0.5rem 0", color: "#555" }}>
                Dentro da atividade, procure o ícone de relógio e clique em
                "Apontamentos".
              </p>
            </li>
            <li style={{ marginBottom: "1rem" }}>
              <strong>Preencher o registro de horas:</strong>
              <p style={{ margin: "0.5rem 0", color: "#555" }}>
                Selecione o dia trabalhado, informe o horário de início e o horário
                de fim. Opcionalmente, adicione um comentário descrevendo o que
                foi feito naquele dia. Por exemplo: "Hoje atualizei documentos,
                revisei o fluxograma e fiz ajustes na automação".
              </p>
            </li>
            <li style={{ marginBottom: "1rem" }}>
              <strong>Salvar o apontamento:</strong>
              <p style={{ margin: "0.5rem 0", color: "#555" }}>
                Clique em "Salvar e continuar" para gravar o registro e seguir para
                o próximo.
              </p>
            </li>
            <li style={{ marginBottom: "1rem" }}>
              <strong>Repetir o processo para todos os dias trabalhados:</strong>
              <p style={{ margin: "0.5rem 0", color: "#555" }}>
                Depois de salvar o dia atual, repita o processo para os dias
                seguintes em que trabalhou na mesma atividade.
              </p>
            </li>
            <li style={{ marginBottom: "1rem" }}>
              <strong>Dicas gerais:</strong>
              <p style={{ margin: "0.5rem 0", color: "#555" }}>
                É melhor apontar no mesmo dia para lembrar com precisão; sempre
                confira se o horário não está invertido (fim menor que início);
                use os comentários para registrar brevemente o que foi feito — isso
                ajuda você e o gestor.
              </p>
            </li>
          </ol>
        </section>

        {/* Footer */}
        <footer style={{
          fontSize: "0.875rem",
          color: "#777",
          borderTop: "1px solid #ddd",
          marginTop: "3rem",
          paddingTop: "1.5rem",
          textAlign: "center"
        }}>
          <p style={{ margin: 0 }}>
            © 2026 Spin Engenharia. Este material faz parte do projeto
            Unispin e destina‑se exclusivamente ao uso interno pelos
            colaboradores.
          </p>
        </footer>
      </div>
    </main>
  );
}
