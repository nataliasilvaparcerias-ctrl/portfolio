/* Valores do portfólio: só a versão valores.html carrega este arquivo.
   O portfólio público (index.html) não tem nenhum preço. */
(function () {
  /* ===================== VALORES (edite aqui) ===================== */
  const WHATS = "5563999417642";

  /* Pacotes UGC · por: preço em reais · de: preço riscado (opcional) · destaque: o pacote recomendado */
  const etapasUGC = ["Triagem", "Roteiro", "Gravação", "Edição", "Pós-venda", "Entrega em até 7 dias após o recebimento do produto"];
  const pacotesUGC = [
    { nome: "Bronze", para: "1 vídeo", por: 650,
      itens: ["2 fotos bônus", ...etapasUGC, "2 meses de direito de imagem"] },
    { nome: "Prata", para: "2 vídeos + 3 fotos", por: 1100, destaque: true,
      itens: ["2 fotos bônus", ...etapasUGC, "4 meses de direito de imagem"] },
    { nome: "Ouro", para: "4 vídeos + 8 fotos", por: 2180,
      itens: ["2 fotos bônus", ...etapasUGC, "6 meses de direito de imagem"] }
  ];

  /* Influenciadora e Diário da Noiva · o título precisa ser igual ao do cartão no portfólio
     preco: valor "a partir de" · unidade: o que o valor cobre */
  const precos = {
    "Reels no meu perfil":     { preco: 900,  unidade: "por reels" },
    "Sequência de stories":    { preco: 350,  unidade: "3 stories" },
    "Collab no feed":          { preco: 1100, unidade: "por publicação" },
    "Cobertura de evento":     { preco: 1200, unidade: "por evento, deslocamento à parte" },
    "Lançamento":              { preco: 2390, unidade: "2 reels + 3 sequências de stories" },
    "Embaixadora da marca":    { preco: 2500, unidade: "por mês, mínimo 3 meses" },
    "Fornecedora oficial":     { preco: 3000, unidade: "até o casamento" },
    "Episódio patrocinado":    { preco: 950,  unidade: "por episódio" },
    "Beleza da noiva":         { preco: 1800, unidade: "testes e o dia" },
    "Conteúdo em casal":       { preco: 1000, unidade: "por vídeo" },
    "Contagem regressiva":     { preco: 1500, unidade: "1 reels + 3 sequências de stories" },
    "Cobertura do grande dia": { preco: 2500, unidade: "stories ao vivo, 1 reels e fotos" }
  };

  /* Black Friday · de: preço normal · por: preço da Black · bonus: o que a Black dá a mais · vagas: opcional */
  const planosBlack = [
    { nome: "Bronze", para: "1 vídeo", de: 650, por: 590,
      itens: ["2 fotos bônus", ...etapasUGC, "2 meses de direito de imagem"],
      bonus: ["+1 variação de gancho"] },
    { nome: "Prata", para: "2 vídeos + 3 fotos", de: 1100, por: 950, destaque: true,
      itens: ["2 fotos bônus", ...etapasUGC],
      bonus: ["+2 variações de gancho", "5 meses de direito de imagem (1 a mais)"] },
    { nome: "Ouro", para: "4 vídeos + 8 fotos", de: 2180, por: 1790, vagas: 3,
      itens: ["2 fotos bônus", ...etapasUGC],
      bonus: ["+4 variações de gancho", "8 meses de direito de imagem (2 a mais)", "Prioridade na agenda"] }
  ];
  /* ================================================================ */

  const q = (s) => document.querySelector(s);
  const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reais = (v) => "R$ " + v.toLocaleString("pt-BR");
  const whats = (msg) => `https://wa.me/${WHATS}?text=${encodeURIComponent(msg)}`;

  /* Estilos dos preços e pacotes (mesma identidade do portfólio) */
  const css = document.createElement("style");
  css.textContent = `
.servico .preco{margin-top:auto;padding-top:20px;border-top:1px solid rgba(251,247,238,.2);display:flex;align-items:baseline;flex-wrap:wrap;gap:4px 8px}
.servico .preco small{font-family:var(--mono);font-size:.66rem;letter-spacing:.12em;text-transform:uppercase;color:var(--nude)}
.servico .preco b{font-family:var(--display);font-weight:400;font-size:2.3rem;line-height:1;color:var(--marfim)}
.servico .preco + .pedir{margin-top:12px;padding-top:0}
.painel-subtitulo{font-family:var(--mono);font-size:.72rem;letter-spacing:.14em;text-transform:uppercase;color:var(--nude);margin:clamp(40px,6vw,56px) 0 16px}
.para-quem{display:inline-block;margin-top:14px;background:var(--marfim);color:var(--vinho);font-family:var(--ui);font-weight:600;font-size:.88rem;padding:8px 16px;border-radius:999px}
.planos{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;list-style:none;margin:14px 0 0;padding:0;align-items:stretch}
.plano{position:relative;height:100%;box-sizing:border-box;display:flex;flex-direction:column;background:rgba(251,247,238,.06);border:1px solid rgba(251,247,238,.22);border-radius:var(--raio-m);padding:30px 26px 26px;color:var(--marfim)}
.plano--destaque{background:var(--marfim);color:var(--tinta);border-color:var(--marfim)}
.plano-faixa{position:absolute;top:-13px;left:26px;background:var(--vinho);color:var(--marfim);font-family:var(--ui);font-weight:700;font-size:.7rem;letter-spacing:.16em;text-transform:uppercase;padding:6px 12px;border-radius:999px}
.plano h4{font-family:var(--display);font-weight:400;font-size:1.9rem;line-height:.95;text-transform:uppercase;margin:0 0 6px;color:var(--marfim)}
.plano--destaque h4{color:var(--vinho)}
.plano .para{font-family:var(--mono);font-size:.74rem;line-height:1.6;color:#e6dccf;margin:0 0 20px}
.plano--destaque .para{color:var(--tinta-suave)}
.plano .de{font-family:var(--mono);font-size:.74rem;color:#cfc3b4;margin:0}
.plano--destaque .de{color:var(--tinta-suave)}
.plano .por{display:flex;align-items:baseline;gap:10px;flex-wrap:wrap;margin:4px 0 20px}
.plano .por b{font-family:var(--display);font-weight:400;font-size:clamp(2.8rem,4vw,3.4rem);line-height:1;color:var(--marfim)}
.plano--destaque .por b{color:var(--vinho)}
.plano .off{background:var(--vinho-medio);color:var(--marfim);font-family:var(--ui);font-weight:700;font-size:.74rem;padding:4px 9px;border-radius:8px}
.plano--destaque .off{background:var(--vinho)}
.plano ul{list-style:none;margin:0 0 24px;padding:18px 0 0;border-top:1px solid rgba(251,247,238,.2);display:grid;gap:10px}
.plano--destaque ul{border-color:rgba(42,26,21,.15)}
.plano li{font-family:var(--ui);font-size:.9rem;line-height:1.4;padding-left:22px;position:relative}
.plano li::before{content:"✦";position:absolute;left:0;top:0;font-size:.75rem;color:var(--nude)}
.plano--destaque li::before{color:var(--vinho)}
.plano .bonus{background:var(--vinho-medio);color:var(--marfim);border-radius:16px;padding:14px 16px;margin:-8px 0 20px}
.plano .bonus span{display:block;font-family:var(--mono);font-size:.66rem;letter-spacing:.16em;text-transform:uppercase;color:var(--nude);margin-bottom:8px}
.plano .bonus ul{border:0;padding:0;margin:0;gap:6px}
.plano .bonus li::before{color:var(--nude)}
.plano--destaque .bonus{background:var(--vinho)}
.plano .vagas{font-family:var(--ui);font-weight:700;font-size:.8rem;letter-spacing:.06em;text-transform:uppercase;color:var(--nude-claro);margin:-6px 0 16px}
.plano--destaque .vagas{color:var(--vinho)}
.plano .botao{margin-top:auto;width:100%;box-sizing:border-box}
.plano:not(.plano--destaque) .botao{background:var(--marfim);color:var(--vinho)}
.plano:not(.plano--destaque) .botao:hover{background:var(--nude)}
.black{margin-top:clamp(56px,8vw,96px);padding-top:clamp(40px,6vw,64px);border-top:1px solid rgba(251,247,238,.18)}
.black-topo{display:flex;justify-content:space-between;align-items:flex-end;gap:16px 40px;flex-wrap:wrap;margin-bottom:28px}
.black-topo .bf-selo{display:inline-block;margin-bottom:14px}
.black-topo h3{font-size:clamp(2.2rem,5vw,3.8rem);text-transform:uppercase;color:var(--marfim)}
.black-topo h3 em{font-style:italic;text-transform:none}
.black-topo p{font-family:var(--mono);font-size:.84rem;line-height:1.7;color:#e6dccf;max-width:44ch;margin:0}
.black-topo p b{color:var(--nude-claro)}
@media (max-width:900px){ .planos{grid-template-columns:1fr;max-width:460px;margin-inline:auto;gap:26px} }`;
  document.head.appendChild(css);

  const cartaoPlano = (p, selo, msg) => `
    <li><article class="plano${p.destaque ? " plano--destaque" : ""}">
      ${p.destaque ? `<span class="plano-faixa">${selo}</span>` : ""}
      <h4>${esc(p.nome)}</h4>
      <p class="para">${esc(p.para)}</p>
      ${p.de ? `<p class="de">de <s>${reais(p.de)}</s> por</p>` : ""}
      <div class="por"><b>${reais(p.por)}</b>${p.de ? `<span class="off">-${Math.round((1 - p.por / p.de) * 100)}%</span>` : ""}</div>
      <ul>${p.itens.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>
      ${p.bonus ? `<div class="bonus"><span>Bônus Black</span><ul>${p.bonus.map((item) => `<li>${esc(item)}</li>`).join("")}</ul></div>` : ""}
      ${p.vagas ? `<p class="vagas">Só ${p.vagas} vagas</p>` : ""}
      <a class="botao botao--vinho" href="${whats(msg(p))}" target="_blank" rel="noopener">Quero este pacote</a>
    </article></li>`;

  /* Aba UGC: pacotes antes dos cartões */
  q("#grade-ugc").insertAdjacentHTML("beforebegin",
    `<ul class="planos">${pacotesUGC.map((p) => cartaoPlano(p, "Recomendado",
      (p) => `Oi, Natalia! Recebi seu portfólio com valores e quero o pacote UGC ${p.nome} (${reais(p.por)}).`)).join("")}</ul>
     <p class="painel-subtitulo">O que eu crio para a sua marca</p>`);

  /* Influenciadora e Diário da Noiva: preço em cada cartão */
  document.querySelectorAll("#grade-infl .servico, #grade-noiva .servico").forEach((cartao) => {
    const titulo = cartao.querySelector("h3").textContent.trim();
    const v = precos[titulo];
    if (!v) return;
    cartao.querySelector(".pedir").insertAdjacentHTML("beforebegin",
      `<div class="preco"><small>a partir de</small><b>${reais(v.preco)}</b><small>${esc(v.unidade)}</small></div>`);
    const pedir = cartao.querySelector(".pedir");
    pedir.href = whats(`Oi, Natalia! Recebi seu portfólio com valores e quero fechar ${titulo} (a partir de ${reais(v.preco)}).`);
    pedir.firstChild.textContent = "Quero este ";
  });

  /* Nota embaixo das abas */
  const nota = q(".painel-nota");
  if (nota) nota.textContent = "O orçamento final pode mudar conforme o roteiro, o prazo e o tempo de uso do conteúdo em anúncios.";

  /* Black Friday: mesma data da faixa (a sexta depois da 4ª quinta de novembro), some depois */
  const blackFriday = (ano) => {
    const d = new Date(ano, 10, 1);
    return new Date(ano, 10, 1 + ((4 - d.getDay() + 7) % 7) + 22);
  };
  const hoje = new Date(); hoje.setHours(0, 0, 0, 0);
  const bf = blackFriday(hoje.getFullYear());
  if (hoje <= bf) {
    const data = bf.toLocaleDateString("pt-BR", { day: "numeric", month: "long" });
    const prazo = hoje.getTime() === bf.getTime()
      ? "Último dia: pague hoje e agende a gravação até dezembro"
      : `Pague até ${data} e agende a gravação até dezembro`;
    q("#servicos .container").insertAdjacentHTML("beforeend", `
      <div class="black" id="black">
        <div class="black-topo">
          <div>
            <span class="bf-selo">Black Friday</span>
            <h3>Pacotes <em>da</em> Black</h3>
          </div>
          <p>Os pacotes UGC com preço especial e bônus. <b>${prazo}</b>. Vagas limitadas.</p>
        </div>
        <ul class="planos">${planosBlack.map((p) => cartaoPlano(p, "Mais escolhido",
          (p) => `Oi, Natalia! Recebi seu portfólio com valores e quero o pacote ${p.nome} da Black Friday (${reais(p.por)}).`)).join("")}</ul>
      </div>`);
    // na faixa do topo, "Garantir vaga" leva para os pacotes da Black
    document.querySelectorAll(".bf-botao").forEach((a) => {
      a.href = "#black";
      a.removeAttribute("target");
    });
  }

  /* Link para cada marca: valores.html?marca=Nome&aba=noiva
     marca: aparece "Preparado para Nome" na seção de serviços
     aba: ugc, influenciadora, noiva ou black (abre direto nessa parte) */
  const params = new URLSearchParams(location.search);
  const marca = (params.get("marca") || "").trim();
  if (marca) {
    q("#servicos .cabeca > div").insertAdjacentHTML("beforeend", `<span class="para-quem">Preparado para ${esc(marca)}</span>`);
    document.title = `Natalia Silva · Portfólio para ${marca}`;
  }
  const aba = (params.get("aba") || "").toLowerCase();
  const abaId = { ugc: "aba-ugc", influenciadora: "aba-infl", noiva: "aba-noiva" }[aba];
  if (abaId) q("#" + abaId).click();
  const destino = aba === "black" && q("#black") ? q("#black") : (abaId || aba === "valores") ? q("#servicos") : null;
  if (destino) setTimeout(() => destino.scrollIntoView(), 300);
})();
