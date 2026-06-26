const demo = {
  users: [
    { name: "Admin Vila", email: "admin@vilamakunaima.com", role: "Administrador" },
    { name: "Equipe Operacional", email: "equipe@vilamakunaima.com", role: "Funcionário/Equipe" },
    { name: "Atendimento", email: "comercial@vilamakunaima.com", role: "Comercial/Atendimento" }
  ],
  events: [
    {
      id: 1,
      name: "Casamento Ana & Rafael",
      type: "Casamento",
      date: "2026-07-04",
      start: "16:00",
      end: "23:00",
      guests: 180,
      status: "Confirmado",
      client: "Ana Carolina Moraes",
      document: "822.445.219-10",
      phone: "559599984-2140",
      email: "ana@email.com",
      address: "Boa Vista - RR",
      contractResponsible: "Rafael Andrade",
      total: 28000,
      entry: 8400,
      paid: 16800,
      payment: "Pix + parcelas",
      due: "2026-06-30",
      paymentStatus: "Parcial",
      services: ["Locação do espaço", "Buffet", "Decoração", "Som", "Iluminação", "Limpeza", "Segurança"],
      checklist: ["Contrato assinado", "Entrada paga", "Decoração definida", "Buffet confirmado", "Limpeza agendada"],
      notes: "Cerimônia no fim da tarde, jantar completo e pista de dança.",
      documents: ["contrato-assinado.pdf", "comprovante-entrada.pdf"]
    },
    {
      id: 2,
      name: "Treinamento Grupo Norte",
      type: "Treinamento",
      date: "2026-07-12",
      start: "08:00",
      end: "17:00",
      guests: 64,
      status: "Pré-reserva",
      client: "Grupo Norte Energia",
      document: "18.883.992/0001-02",
      phone: "559598112-8800",
      email: "rh@gruponorte.com",
      address: "Centro, Boa Vista - RR",
      contractResponsible: "Marina Teixeira",
      total: 12600,
      entry: 2500,
      paid: 2500,
      payment: "Transferência",
      due: "2026-07-01",
      paymentStatus: "Parcial",
      services: ["Locação do espaço", "Cozinha", "Recepção", "Mesas e cadeiras"],
      checklist: ["Entrada paga", "Estrutura conferida"],
      notes: "Precisa de projetor, café de boas-vindas e salas em formato escola.",
      documents: ["proposta-comercial.pdf"]
    },
    {
      id: 3,
      name: "Aniversário Helena 60",
      type: "Aniversário",
      date: "2026-06-28",
      start: "11:00",
      end: "18:00",
      guests: 95,
      status: "Confirmado",
      client: "Paulo Nascimento",
      document: "031.992.214-45",
      phone: "559599912-4466",
      email: "paulo@email.com",
      address: "Paraviana, Boa Vista - RR",
      contractResponsible: "Paulo Nascimento",
      total: 14800,
      entry: 5000,
      paid: 14800,
      payment: "Cartão",
      due: "2026-06-20",
      paymentStatus: "Pago",
      services: ["Locação do espaço", "Piscina/lazer", "Buffet", "Limpeza", "Mesas e cadeiras"],
      checklist: ["Contrato assinado", "Entrada paga", "Buffet confirmado", "Equipe escalada", "Pagamento final recebido"],
      notes: "Almoço familiar, mesa de doces e área de lazer liberada.",
      documents: ["contrato.pdf", "comprovante-final.pdf"]
    },
    {
      id: 4,
      name: "Confraternização Clínica Vida",
      type: "Confraternização",
      date: "2026-08-02",
      start: "10:00",
      end: "16:00",
      guests: 120,
      status: "Orçamento",
      client: "Clínica Vida Plena",
      document: "11.457.200/0001-88",
      phone: "559598822-1022",
      email: "eventos@vidaplena.com",
      address: "Mecejana, Boa Vista - RR",
      contractResponsible: "Dra. Camila Rocha",
      total: 18500,
      entry: 0,
      paid: 0,
      payment: "A definir",
      due: "2026-07-10",
      paymentStatus: "Pendente",
      services: ["Locação do espaço", "Piscina/lazer", "Som", "Segurança"],
      checklist: ["Estrutura conferida"],
      notes: "Cliente avaliando pacote com buffet e recreação.",
      documents: []
    },
    {
      id: 5,
      name: "Formatura Turma Agro",
      type: "Formatura",
      date: "2026-06-18",
      start: "19:00",
      end: "02:00",
      guests: 240,
      status: "Realizado",
      client: "Comissão Agro 2026",
      document: "009.441.332-80",
      phone: "559599755-0090",
      email: "comissao.agro@email.com",
      address: "UFRR, Boa Vista - RR",
      contractResponsible: "Bruno Lima",
      total: 32000,
      entry: 12000,
      paid: 32000,
      payment: "Pix",
      due: "2026-06-10",
      paymentStatus: "Pago",
      services: ["Locação do espaço", "Decoração", "Buffet", "Som", "Iluminação", "Limpeza", "Segurança", "Recepção"],
      checklist: ["Contrato assinado", "Entrada paga", "Decoração definida", "Buffet confirmado", "Equipe escalada", "Pagamento final recebido", "Evento finalizado"],
      notes: "Evento concluído sem pendências.",
      documents: ["ordem-servico.pdf", "recibo.pdf"]
    }
  ],
  blockedDates: [
    { date: "2026-07-20", reason: "Manutenção da piscina" },
    { date: "2026-07-21", reason: "Jardinagem e dedetização" }
  ],
  settings: {
    venueName: "Vila Makunaima",
    whatsapp: "559599999-0000",
    address: "Região próxima a Boa Vista - RR",
    colors: "Verde natureza, dourado suave, branco e tons terra"
  }
};

const state = {
  logged: localStorage.getItem("vm_session") === "active",
  role: localStorage.getItem("vm_role") || "Administrador",
  user: JSON.parse(localStorage.getItem("vm_user") || "null"),
  users: JSON.parse(localStorage.getItem("vm_users") || "null") || demo.users.map((user, index) => ({
    ...user,
    id: index + 1,
    active: true,
    password: index === 0 ? "admin123" : "123456"
  })),
  view: "dashboard",
  search: "",
  calendarMonth: Number(localStorage.getItem("vm_calendar_month") || "6"),
  calendarYear: Number(localStorage.getItem("vm_calendar_year") || "2026"),
  calendarNotes: JSON.parse(localStorage.getItem("vm_calendar_notes") || "{}"),
  editEventId: null,
  printEventId: null,
  reportMonth: localStorage.getItem("vm_report_month") || "2026-06",
  reportEventId: localStorage.getItem("vm_report_event") || "all",
  printReportMonth: null,
  printReportEventId: "all",
  saveStatus: "",
  calendarMode: "Mês",
  dark: localStorage.getItem("vm_theme") === "dark",
  events: normalizeEvents(JSON.parse(localStorage.getItem("vm_events") || "null") || demo.events)
};

const api = {
  available: false,
  storage: "local"
};

let searchTimer;
const app = document.querySelector("#app");
const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const dateFmt = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", year: "numeric" });

const navItems = [
  ["dashboard", "Painel"],
  ["events", "Eventos"],
  ["calendar", "Agenda"],
  ["clients", "Clientes"],
  ["finance", "Financeiro"],
  ["docs", "Documentos"],
  ["reports", "Relatórios"],
  ["settings", "Configurações"]
];
const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function optionList(options, selected) {
  return options.map(option => "<option " + (option === selected ? "selected" : "") + ">" + option + "</option>").join("");
}

function paymentInfo(event) {
  const total = Number(event.total || 0);
  const paid = Number(event.paid || 0);
  const open = Math.max(total - paid, 0);
  const paidOff = total > 0 && paid >= total;
  return { total, paid, open, paidOff };
}

async function requestJson(url, options = {}) {
  const response = await fetch(url, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options
  });
  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  return response.json();
}

async function loadServerState() {
  if (location.protocol === "file:") {
    if (state.logged && !state.user) state.user = state.users[0];
    return;
  }
  try {
    const data = await requestJson("/api/state");
    if (data.storage !== "postgres") return;
    api.available = true;
    api.storage = "postgres";
    if (Array.isArray(data.events)) {
      state.events = normalizeEvents(data.events);
      localStorage.setItem("vm_events", JSON.stringify(state.events));
    } else {
      await saveEvents();
    }
    if (data.calendarNotes && typeof data.calendarNotes === "object") {
      state.calendarNotes = data.calendarNotes;
      localStorage.setItem("vm_calendar_notes", JSON.stringify(state.calendarNotes));
    } else {
      await saveCalendarNotes();
    }
    await refreshUsers();
  } catch (error) {
    console.warn("Usando armazenamento local; API indisponível.", error);
  }
}

async function refreshUsers() {
  if (!api.available) return;
  const data = await requestJson("/api/users");
  state.users = data.users || [];
  localStorage.setItem("vm_users", JSON.stringify(state.users));
}

function saveLocalUsers() {
  localStorage.setItem("vm_users", JSON.stringify(state.users));
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1] || "");
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function normalizeText(value) {
  if (typeof value !== "string") return value;
  const fixes = {
    "Funcionário": "Funcionário",
    "Locação": "Locação",
    "espaço": "espaço",
    "Decoração": "Decoração",
    "Iluminação": "Iluminação",
    "Segurança": "Segurança",
    "Cerimônia": "Cerimônia",
    "dança": "dança",
    "Pré-reserva": "Pré-reserva",
    "Transferência": "Transferência",
    "Recepção": "Recepção",
    "café": "café",
    "Aniversário": "Aniversário",
    "Cartão": "Cartão",
    "Almoço": "Almoço",
    "área": "área",
    "Confraternização": "Confraternização",
    "Clínica": "Clínica",
    "Orçamento": "Orçamento",
    "recreação": "recreação",
    "Comissão": "Comissão",
    "concluído": "concluído",
    "pendências": "pendências",
    "Manutenção": "Manutenção",
    "dedetização": "dedetização",
    "Região": "Região",
    "Mês": "Mês",
    "às": "às",
    "crítico": "crítico",
    "área de transferência": "área de transferência",
    "·": "·"
  };
  return Object.entries(fixes).reduce((text, [bad, good]) => text.replaceAll(bad, good), value);
}

function normalizeValue(value) {
  if (Array.isArray(value)) return value.map(normalizeValue);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, normalizeValue(item)]));
  }
  return normalizeText(value);
}

function normalizeEvents(events) {
  return events.map(normalizeValue);
}

function documentList(event) {
  const docs = event.documents || [];
  if (!docs.length) return "";
  return `
    <div class="document-list">
      ${docs.map(doc => {
        const item = typeof doc === "string" ? { name: doc, type: "Documento" } : doc;
        return `
          <button data-action="download-contract" data-event-id="${event.id}" data-file-name="${escapeHtml(item.name)}">${escapeHtml(item.type || "Documento")}: ${escapeHtml(item.name)}</button>
        `;
      }).join("")}
    </div>
  `;
}

function documentNames(documents = []) {
  return documents.map(doc => {
    const item = typeof doc === "string" ? { name: doc, type: "Documento" } : doc;
    return `${item.type || "Documento"}: ${item.name}`;
  }).join(", ");
}

function printEventSheet() {
  const event = state.events.find(item => String(item.id) === String(state.printEventId));
  if (!event) return "";
  const docs = event.documents?.length ? documentNames(event.documents) : "Sem contrato anexado";
  const payment = paymentInfo(event);
  return `
    <section class="print-only">
      <header class="print-header">
        ${brandLogo("small")}
        <div>
          <strong>Vila Makunaima Eventos</strong>
          <span>Resumo do evento</span>
        </div>
      </header>
      <h1>${escapeHtml(event.name)}</h1>
      <p class="print-status">${escapeHtml(event.status)} · ${escapeHtml(event.type)} · ${event.guests} convidados</p>
      <div class="print-grid">
        <section>
          <h2>Dados do evento</h2>
          <p><b>Data:</b> ${dateFmt.format(new Date(event.date))}</p>
          <p><b>Horário:</b> ${event.start} às ${event.end}</p>
          <p><b>Responsável pelo contrato:</b> ${escapeHtml(event.contractResponsible || "Não informado")}</p>
          <p><b>Observações:</b> ${escapeHtml(event.notes || "Sem observações adicionais.")}</p>
        </section>
        <section>
          <h2>Cliente</h2>
          <p><b>Nome:</b> ${escapeHtml(event.client || "")}</p>
          <p><b>CPF/CNPJ:</b> ${escapeHtml(event.document || "")}</p>
          <p><b>Telefone:</b> ${escapeHtml(event.phone || "")}</p>
          <p><b>E-mail:</b> ${escapeHtml(event.email || "")}</p>
          <p><b>Endereço:</b> ${escapeHtml(event.address || "")}</p>
        </section>
        <section>
          <h2>Financeiro</h2>
          <p><b>Valor total:</b> ${brl.format(event.total)}</p>
          <p><b>Entrada:</b> ${brl.format(event.entry || 0)}</p>
          <p><b>Pago:</b> ${brl.format(event.paid || 0)}</p>
          <p><b>Restante:</b> ${brl.format(payment.open)}</p>
          <p><b>Status:</b> ${escapeHtml(event.paymentStatus || "")}</p>
          ${payment.paidOff ? `<p><b>Situação:</b> Quitado</p>` : `<p><b>Situação:</b> Resto do pagamento pendente</p>`}
        </section>
        <section>
          <h2>Serviços e documentos</h2>
          <p><b>Serviços:</b> ${(event.services || []).map(escapeHtml).join(", ")}</p>
          <p><b>Checklist:</b> ${(event.checklist || []).map(escapeHtml).join(", ")}</p>
          <p><b>Contratos/documentos:</b> ${escapeHtml(docs)}</p>
        </section>
      </div>
    </section>
  `;
}

function reportMonthOptions() {
  const months = [...new Set(state.events.map(event => String(event.date || "").slice(0, 7)).filter(Boolean))].sort();
  if (!months.includes(state.reportMonth)) months.push(state.reportMonth);
  return months.sort().map(month => `<option value="${month}" ${month === state.reportMonth ? "selected" : ""}>${monthLabel(month)}</option>`).join("");
}

function reportEventOptions(month = state.reportMonth) {
  const events = eventsByMonth(month);
  const selectedExists = events.some(event => String(event.id) === String(state.reportEventId));
  if (!selectedExists && state.reportEventId !== "all") {
    state.reportEventId = "all";
    localStorage.setItem("vm_report_event", "all");
  }
  return `
    <option value="all" ${state.reportEventId === "all" ? "selected" : ""}>Todos os eventos do mês</option>
    ${events.map(event => `<option value="${event.id}" ${String(event.id) === String(state.reportEventId) ? "selected" : ""}>${escapeHtml(event.name)} · ${escapeHtml(event.client)}</option>`).join("")}
  `;
}

function monthLabel(month) {
  const [year, monthNumber] = String(month).split("-");
  const index = Number(monthNumber) - 1;
  return `${monthNames[index] || monthNumber}/${year}`;
}

function eventsByMonth(month = state.reportMonth) {
  return state.events
    .filter(event => String(event.date || "").startsWith(month))
    .sort((a, b) => `${a.date}${a.start}`.localeCompare(`${b.date}${b.start}`));
}

function reportEvents(month = state.reportMonth, eventId = state.reportEventId) {
  const list = eventsByMonth(month);
  if (!eventId || eventId === "all") return list;
  return list.filter(event => String(event.id) === String(eventId));
}

function monthlySummary(month = state.reportMonth, eventId = state.reportEventId) {
  const list = reportEvents(month, eventId);
  const total = list.reduce((sum, event) => sum + Number(event.total || 0), 0);
  const entry = list.reduce((sum, event) => sum + Number(event.entry || 0), 0);
  const paid = list.reduce((sum, event) => sum + Number(event.paid || 0), 0);
  const open = Math.max(total - paid, 0);
  return {
    list,
    total,
    entry,
    paid,
    open,
    confirmed: list.filter(event => event.status === "Confirmado").length,
    done: list.filter(event => event.status === "Realizado").length,
    pendingPayment: list.filter(event => !paymentInfo(event).paidOff).length
  };
}

function printMonthlyReport() {
  if (!state.printReportMonth) return "";
  const summary = monthlySummary(state.printReportMonth, state.printReportEventId);
  const selectedEvent = state.printReportEventId === "all" ? null : state.events.find(event => String(event.id) === String(state.printReportEventId));
  const reportTitle = selectedEvent ? `Relatório do evento ${selectedEvent.name}` : `Relatório de ${monthLabel(state.printReportMonth)}`;
  const rows = summary.list.map(event => `
    <tr>
      <td>${dateFmt.format(new Date(event.date))}</td>
      <td>${escapeHtml(event.name)}</td>
      <td>${escapeHtml(event.client)}</td>
      <td>${escapeHtml(event.status)}</td>
      <td>${brl.format(event.total || 0)}</td>
      <td>${brl.format(event.entry || 0)}</td>
      <td>${brl.format(event.paid || 0)}</td>
      <td>${brl.format(paymentInfo(event).open)}</td>
    </tr>
  `).join("");
  return `
    <section class="print-only monthly-print">
      <header class="print-header">
        ${brandLogo("small")}
        <div>
          <strong>Vila Makunaima Eventos</strong>
          <span>Relatório mensal financeiro</span>
        </div>
      </header>
      <h1>${escapeHtml(reportTitle)}</h1>
      <p class="print-status">${monthLabel(state.printReportMonth)} · Emitido em ${new Date().toLocaleString("pt-BR")} · ${summary.list.length} evento(s)</p>
      <div class="print-grid">
        <section><h2>Faturamento contratado</h2><p>${brl.format(summary.total)}</p></section>
        <section><h2>Entradas</h2><p>${brl.format(summary.entry)}</p></section>
        <section><h2>Valores pagos</h2><p>${brl.format(summary.paid)}</p></section>
        <section><h2>Saldo pendente</h2><p>${brl.format(summary.open)}</p></section>
      </div>
      <table class="print-table">
        <thead>
          <tr><th>Data</th><th>Evento</th><th>Cliente</th><th>Status</th><th>Total</th><th>Entrada</th><th>Pago</th><th>Pendente</th></tr>
        </thead>
        <tbody>${rows || `<tr><td colspan="8">Nenhum evento cadastrado neste mês.</td></tr>`}</tbody>
      </table>
      <section class="print-notes">
        <h2>Resumo</h2>
        <p>Confirmados: ${summary.confirmed} · Realizados: ${summary.done} · Com pagamento pendente: ${summary.pendingPayment}</p>
      </section>
    </section>
  `;
}

function openContractDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("vila-makunaima-documents", 1);
    request.onupgradeneeded = () => request.result.createObjectStore("contracts");
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function saveContractFile(eventId, file, docType = "Documento") {
  if (api.available) {
    await requestJson("/api/documents", {
      method: "POST",
      body: JSON.stringify({
        eventId,
        fileName: file.name,
        docType,
        contentType: file.type || "application/pdf",
        base64: await fileToBase64(file)
      })
    });
    return;
  }
  const db = await openContractDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("contracts", "readwrite");
    tx.objectStore("contracts").put(file, `${eventId}:${file.name}`);
    tx.oncomplete = resolve;
    tx.onerror = () => reject(tx.error);
  });
}

async function getContractFile(eventId, fileName) {
  if (api.available) {
    const response = await fetch(`/api/documents/${encodeURIComponent(eventId)}/${encodeURIComponent(fileName)}`);
    if (!response.ok) return null;
    return response.blob();
  }
  const db = await openContractDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("contracts", "readonly");
    const request = tx.objectStore("contracts").get(`${eventId}:${fileName}`);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}


function brandLogo(size = "large") {
  return `
    <div class="brand-mark logo-img ${size}">
      <img src="./assets/logo-vila.png" alt="Logo Vila Makunaima" />
    </div>
  `;
}

const statusClass = status => status.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replaceAll(" ", "-");
const upcoming = () => state.events.filter(e => new Date(`${e.date}T${e.start}`) >= new Date()).sort((a, b) => a.date.localeCompare(b.date));
const totals = () => {
  const list = state.events;
  const revenue = list.reduce((sum, e) => sum + e.total, 0);
  const paid = list.reduce((sum, e) => sum + e.paid, 0);
  return {
    total: list.length,
    confirmed: list.filter(e => e.status === "Confirmado").length,
    pending: list.filter(e => ["Orçamento", "Pré-reserva"].includes(e.status)).length,
    canceled: list.filter(e => e.status === "Cancelado").length,
    month: list.filter(e => e.date.startsWith("2026-06")).length,
    revenue,
    paid,
    open: revenue - paid
  };
};

async function saveEvents() {
  state.events = normalizeEvents(state.events);
  localStorage.setItem("vm_events", JSON.stringify(state.events));
  if (api.available) {
    try {
      await requestJson("/api/events", {
        method: "PUT",
        body: JSON.stringify(state.events)
      });
      state.saveStatus = `Última alteração salva às ${new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`;
    } catch (error) {
      state.saveStatus = "Falha ao salvar. Tente novamente.";
      throw error;
    }
  } else {
    state.saveStatus = "Alteração salva somente neste navegador.";
  }
}

function markSaved() {
  state.saveStatus = `Última alteração salva às ${new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`;
}

async function saveEventRecord(eventRecord) {
  if (api.available) {
    try {
      const data = await requestJson("/api/events/upsert", {
        method: "POST",
        body: JSON.stringify(eventRecord)
      });
      state.events = normalizeEvents(data.events || state.events);
      localStorage.setItem("vm_events", JSON.stringify(state.events));
      markSaved();
      return;
    } catch (error) {
      state.saveStatus = "Falha ao salvar. Tente novamente.";
      throw error;
    }
  }
  const exists = state.events.some(event => String(event.id) === String(eventRecord.id));
  state.events = exists
    ? state.events.map(event => String(event.id) === String(eventRecord.id) ? eventRecord : event)
    : [eventRecord, ...state.events];
  await saveEvents();
}

async function deleteEventRecord(eventId) {
  if (api.available) {
    try {
      const data = await requestJson(`/api/events/${encodeURIComponent(eventId)}`, { method: "DELETE" });
      state.events = normalizeEvents(data.events || state.events.filter(event => String(event.id) !== String(eventId)));
      localStorage.setItem("vm_events", JSON.stringify(state.events));
      markSaved();
      return;
    } catch (error) {
      state.saveStatus = "Falha ao salvar. Tente novamente.";
      throw error;
    }
  }
  state.events = state.events.filter(event => String(event.id) !== String(eventId));
  await saveEvents();
}

async function saveCalendarNotes() {
  localStorage.setItem("vm_calendar_notes", JSON.stringify(state.calendarNotes));
  if (api.available) {
    await requestJson("/api/calendar-notes", {
      method: "PUT",
      body: JSON.stringify(state.calendarNotes)
    });
  }
}

function render() {
  state.events = normalizeEvents(state.events);
  document.body.classList.toggle("dark", state.dark);
  app.innerHTML = state.logged ? layout() : login();
  bind();
}

function login() {
  return `
    <main class="login-screen">
      <video class="login-video" autoplay muted loop playsinline preload="auto" poster="./assets/vila-bg-1.png">
        <source src="./assets/login-bg.mp4" type="video/mp4" />
      </video>
      <div class="login-video-shade" aria-hidden="true"></div>
      <section class="login-card">
        ${brandLogo("large")}
        <p class="eyebrow">Vila Makunaima Eventos</p>
        <h1>Bem-vindo ao sistema de eventos da Vila Makunaima</h1>
        <p class="login-subtitle">Agenda, contratos, clientes e financeiro em um ambiente privado para a equipe.</p>
        <form id="loginForm" class="form-stack">
          <label>E-mail<input name="email" type="email" value="admin@vilamakunaima.com" required /></label>
          <label>Senha<input name="password" type="password" value="admin123" required /></label>
          <button class="primary" type="submit">Entrar</button>
          <a href="#" class="muted-link">Esqueci minha senha</a>
        </form>
      </section>
      <footer class="login-credit">
        Desenvolvido por <a href="https://www.instagram.com/sier_caio/" target="_blank" rel="noreferrer">Caio Reis</a>
      </footer>
    </main>
  `;
}

function layout() {
  return `
    <div class="shell">
      <aside class="sidebar">
        <div class="logo-row">${brandLogo("small")}<div><strong>Vila Makunaima</strong><span>Eventos</span></div></div>
        <nav>${navItems.map(([id, label]) => `<button class="${state.view === id ? "active" : ""}" data-view="${id}">${label}</button>`).join("")}</nav>
        <div class="profile">
          <strong>${escapeHtml(state.user?.name || state.role)}</strong>
          <span>${escapeHtml(state.role)}${api.available ? " · sessão online" : " · sessão local"}</span>
          ${state.saveStatus ? `<span class="save-status">${escapeHtml(state.saveStatus)}</span>` : ""}
          <button data-action="logout">Sair</button>
        </div>
      </aside>
      <main class="content">
        <header class="topbar">
          <div>
            <p class="eyebrow">Gestão premium de eventos</p>
            <h2>${title()}</h2>
          </div>
          <div class="top-actions">
            <input id="globalSearch" placeholder="Buscar evento, cliente, CPF ou telefone" value="${state.search}" />
            <button title="Alternar tema" data-action="theme">${state.dark ? "Claro" : "Escuro"}</button>
          </div>
        </header>
        ${view()}
        <footer class="site-credit">
          Desenvolvido por <a href="https://www.instagram.com/sier_caio/" target="_blank" rel="noreferrer">Caio Reis</a>
        </footer>
        ${printEventSheet()}
        ${printMonthlyReport()}
      </main>
    </div>
  `;
}

function title() {
  return navItems.find(([id]) => id === state.view)?.[1] || "Painel";
}

function filteredEvents() {
  const q = state.search.trim().toLowerCase();
  if (!q) return state.events;
  return state.events.filter(e => [e.name, e.type, e.status, e.client, e.document, e.phone, e.email].join(" ").toLowerCase().includes(q));
}

function view() {
  return {
    dashboard,
    events,
    calendar,
    clients,
    finance,
    docs,
    reports,
    settings
  }[state.view]();
}

function metric(label, value, note) {
  return `<article class="metric"><span>${label}</span><strong>${value}</strong><small>${note || ""}</small></article>`;
}

function dashboard() {
  const t = totals();
  return `
    <section class="metrics-grid">
      ${metric("Eventos cadastrados", t.total, "Base ativa")}
      ${metric("Confirmados", t.confirmed, "Agenda garantida")}
      ${metric("Pendentes", t.pending, "Orçamentos e pré-reservas")}
      ${metric("Eventos do mês", t.month, "Junho/2026")}
      ${metric("Receita prevista", brl.format(t.revenue), "Contratos totais")}
      ${metric("Valores pagos", brl.format(t.paid), "Recebido")}
      ${metric("Em aberto", brl.format(t.open), "A receber")}
      ${metric("Cancelados", t.canceled, "Monitoramento")}
    </section>
    <section class="dashboard-grid">
      <div class="panel wide">
        <div class="panel-head"><h3>Próximos eventos</h3><button data-view="events">Ver todos</button></div>
        <div class="event-list">${upcoming().slice(0, 4).map(eventRow).join("")}</div>
      </div>
      <div class="panel">
        <div class="panel-head"><h3>Alertas</h3></div>
        ${alerts()}
      </div>
      <div class="panel">
        <div class="panel-head"><h3>Receita por tipo</h3></div>
        ${bars(groupByType())}
      </div>
      <div class="panel">
        <div class="panel-head"><h3>Status da agenda</h3></div>
        ${bars(groupByStatus())}
      </div>
    </section>
  `;
}

function alerts() {
  const late = state.events.filter(e => e.paymentStatus !== "Pago" && new Date(e.due) < new Date("2026-06-25"));
  const next = upcoming().slice(0, 2);
  return [
    ...next.map(e => `<div class="alert"><strong>${e.name}</strong><span>${dateFmt.format(new Date(e.date))} às ${e.start}</span></div>`),
    ...late.map(e => `<div class="alert danger"><strong>Pagamento pendente</strong><span>${e.client} vence em ${dateFmt.format(new Date(e.due))}</span></div>`)
  ].join("") || `<div class="empty">Nenhum alerta crítico.</div>`;
}

function groupByType() {
  return state.events.reduce((acc, e) => ({ ...acc, [e.type]: (acc[e.type] || 0) + e.total }), {});
}

function groupByStatus() {
  return state.events.reduce((acc, e) => ({ ...acc, [e.status]: (acc[e.status] || 0) + 1 }), {});
}

function bars(data) {
  const max = Math.max(...Object.values(data), 1);
  return Object.entries(data).map(([label, value]) => `
    <div class="bar-row"><span>${label}</span><div><i style="width:${(value / max) * 100}%"></i></div><strong>${typeof value === "number" && value > 100 ? brl.format(value) : value}</strong></div>
  `).join("");
}

function splitList(value) {
  return String(value || "")
    .split(/\n|,/)
    .map(item => item.trim())
    .filter(Boolean);
}

function eventRow(e) {
  return `
    <article class="event-row">
      <div><strong>${e.name}</strong><span>${e.client} · ${dateFmt.format(new Date(e.date))} · ${e.start}-${e.end}</span></div>
      <mark class="${statusClass(e.status)}">${e.status}</mark>
    </article>
  `;
}

function events() {
  const editing = state.events.find(e => String(e.id) === String(state.editEventId));
  const eventTypes = ["Casamento", "Aniversário", "Confraternização", "Corporativo", "Treinamento", "Chá revelação", "Formatura", "Outro"];
  const statuses = ["Orçamento", "Pré-reserva", "Confirmado", "Realizado", "Cancelado"];
  const paymentStatuses = ["Pendente", "Parcial", "Pago/Quitado"];
  const value = key => escapeHtml(editing?.[key] ?? "");
  return `
    <section class="split">
      <div class="panel">
        <div class="panel-head">
          <h3>${editing ? "Editar evento" : "Novo evento"}</h3>
          ${editing ? `<button data-action="cancel-edit">Cancelar edição</button>` : ""}
        </div>
        <form id="eventForm" class="event-form">
          <input type="hidden" name="editId" value="${editing ? editing.id : ""}" />
          <input name="name" placeholder="Nome do evento" value="${value("name")}" required />
          <select name="type">${optionList(eventTypes, editing?.type || "Casamento")}</select>
          <input name="date" type="date" value="${value("date")}" required />
          <input name="start" type="time" value="${value("start")}" required />
          <input name="end" type="time" value="${value("end")}" required />
          <input name="guests" type="number" placeholder="Convidados" value="${editing?.guests ?? ""}" required />
          <select name="status">${optionList(statuses, editing?.status || "Orçamento")}</select>
          <input name="client" placeholder="Cliente" value="${value("client")}" required />
          <input name="document" placeholder="CPF/CNPJ" value="${value("document")}" />
          <input name="phone" placeholder="Telefone/WhatsApp" value="${value("phone")}" />
          <input name="email" type="email" placeholder="E-mail" value="${value("email")}" />
          <input name="address" placeholder="Endereço" value="${value("address")}" />
          <input name="contractResponsible" placeholder="Responsável pelo contrato" value="${value("contractResponsible")}" />
          <input name="total" type="number" placeholder="Valor total" value="${editing?.total ?? ""}" required />
          <input name="entry" type="number" placeholder="Entrada" value="${editing?.entry ?? ""}" />
          <input name="paid" type="number" placeholder="Valor pago" value="${editing?.paid ?? ""}" />
          <select name="paymentStatus">${optionList(paymentStatuses, editing?.paymentStatus || "Pendente")}</select>
          <label class="check-field">
            <input type="checkbox" name="paidOff" ${editing && paymentInfo(editing).paidOff ? "checked" : ""} />
            Marcar como totalmente quitado
          </label>
          <p class="form-hint">Se ainda existir saldo, o evento exibirá o alerta "resto do pagamento pendente".</p>
          <input name="due" type="date" value="${value("due")}" />
          <textarea name="servicesText" placeholder="Serviços do evento: buffet, decoração, som, iluminação...">${escapeHtml((editing?.services || []).join("\n"))}</textarea>
          <p class="form-hint">Digite um serviço por linha ou separe por vírgulas. Exemplo: buffet, decoração, segurança.</p>
          <textarea name="notes" placeholder="Observações gerais">${escapeHtml(editing?.notes || "")}</textarea>
          <div class="form-actions">
            <button class="primary" type="submit">${editing ? "Salvar alterações" : "Cadastrar evento"}</button>
            <small>As alterações só ficam gravadas depois de clicar neste botão.</small>
          </div>
        </form>
      </div>
      <div class="panel wide">
        <div class="panel-head"><h3>Eventos cadastrados</h3><button data-action="copy-summary">Copiar resumo</button></div>
        <div class="event-list">${filteredEvents().map(eventCard).join("")}</div>
      </div>
    </section>
  `;
}
function eventCard(e) {
  const docs = e.documents?.length ? e.documents : [];
  const realized = e.status === "Realizado";
  const payment = paymentInfo(e);
  return `
    <article class="event-card ${realized ? "realizado-card" : ""}">
      <div class="event-card-head">
        <div><strong>${escapeHtml(e.name)}</strong><span>${escapeHtml(e.type)} · ${e.guests} convidados</span></div>
        <mark class="${statusClass(e.status)}">${escapeHtml(e.status)}</mark>
      </div>
      <dl>
        <div><dt>Data</dt><dd>${dateFmt.format(new Date(e.date))}, ${e.start}-${e.end}</dd></div>
        <div><dt>Cliente</dt><dd>${escapeHtml(e.client)}</dd></div>
        <div><dt>Financeiro</dt><dd>${brl.format(payment.paid)} pagos de ${brl.format(payment.total)}</dd></div>
        <div><dt>Saldo restante</dt><dd>${brl.format(payment.open)}</dd></div>
        <div><dt>Serviços</dt><dd>${(e.services || []).map(escapeHtml).join(", ")}</dd></div>
        <div><dt>Responsável</dt><dd>${escapeHtml(e.contractResponsible || "Não informado")}</dd></div>
        <div><dt>Documentos</dt><dd>${docs.length ? escapeHtml(documentNames(docs)) : "Sem contrato anexado"}</dd></div>
      </dl>
      <div class="pdf-summary">
        <strong>Resumo para PDF</strong>
        <p>${escapeHtml(e.notes || "Sem observações adicionais.")}</p>
      </div>
      <div class="payment-alert ${payment.paidOff ? "paid-off" : "pending"}">
        ${payment.paidOff ? "Pagamento quitado" : `Resto do pagamento pendente: ${brl.format(payment.open)}`}
      </div>
      ${documentList(e)}
      <div class="chips">${(e.checklist || []).map(item => `<span>${escapeHtml(item)}</span>`).join("")}</div>
      <div class="row-actions">
        <a href="https://wa.me/${String(e.phone || "").replace(/\D/g, "")}" target="_blank" rel="noreferrer">WhatsApp</a>
        <button data-event-id="${e.id}" data-action="edit-event">Editar</button>
        <button class="danger-action" data-event-id="${e.id}" data-action="delete-event">Excluir</button>
        <button data-event-id="${e.id}" data-action="print-event">PDF/Imprimir</button>
        <label class="file-action">Salvar contrato PDF<input type="file" accept="application/pdf" data-event-id="${e.id}" data-action="upload-contract" /></label>
        <label class="file-action">Adicionar comprovantes PDF<input type="file" accept="application/pdf" multiple data-event-id="${e.id}" data-action="upload-receipts" /></label>
      </div>
    </article>
  `;
}
function calendar() {
  const firstDay = new Date(state.calendarYear, state.calendarMonth, 1).getDay();
  const daysInMonth = new Date(state.calendarYear, state.calendarMonth + 1, 0).getDate();
  const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
  const years = [2025, 2026, 2027, 2028];
  const cells = Array.from({ length: totalCells }, (_, i) => {
    const day = i - firstDay + 1;
    if (day < 1 || day > daysInMonth) return `<button class="day empty-day" disabled></button>`;
    const date = `${state.calendarYear}-${String(state.calendarMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const items = state.events.filter(e => e.date === date);
    const block = demo.blockedDates.find(b => b.date === date);
    const note = state.calendarNotes[date];
    return `<button class="day ${items.length ? "has-event" : ""} ${block ? "blocked" : ""} ${note ? "has-note" : ""}" data-date="${date}">
      <b>${day}</b>
      ${items.map(e => `<span class="${statusClass(e.status)}">${escapeHtml(e.name)}</span>`).join("")}
      ${block ? `<span class="blocked-label">${escapeHtml(block.reason)}</span>` : ""}
      ${note ? `<em>${escapeHtml(note)}</em>` : ""}
    </button>`;
  }).join("");
  return `
    <section class="panel">
      <div class="panel-head calendar-head">
        <h3>Calendário ${monthNames[state.calendarMonth]}/${state.calendarYear}</h3>
        <div class="calendar-controls">
          <button data-action="prev-month">Anterior</button>
          <select id="calendarMonth">${monthNames.map((month, index) => `<option value="${index}" ${index === state.calendarMonth ? "selected" : ""}>${month}</option>`).join("")}</select>
          <select id="calendarYear">${years.map(year => `<option value="${year}" ${year === state.calendarYear ? "selected" : ""}>${year}</option>`).join("")}</select>
          <button data-action="next-month">Próximo</button>
        </div>
      </div>
      <p class="calendar-help">Clique em um dia para escrever ou editar uma observação da agenda.</p>
      <div class="calendar">${["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map(d => `<strong>${d}</strong>`).join("")}${cells}</div>
    </section>
  `;
}
function clients() {
  const clients = filteredEvents().map(e => ({
    name: e.client,
    phone: e.phone,
    document: e.document,
    email: e.email,
    events: state.events.filter(x => x.client === e.client).length,
    paid: state.events.filter(x => x.client === e.client).reduce((s, x) => s + x.paid, 0)
  }));
  return tablePanel("Clientes", ["Cliente", "CPF/CNPJ", "Telefone", "E-mail", "Eventos", "Valores pagos"], clients.map(c => [c.name, c.document, c.phone, c.email, c.events, brl.format(c.paid)]));
}

function finance() {
  const rows = filteredEvents().map(e => [e.name, e.client, e.paymentStatus, brl.format(e.total), brl.format(e.paid), brl.format(e.total - e.paid), dateFmt.format(new Date(e.due))]);
  return `
    <section class="metrics-grid compact">
      ${metric("Receitas previstas", brl.format(totals().revenue))}
      ${metric("Recebido", brl.format(totals().paid))}
      ${metric("Pendente", brl.format(totals().open))}
      ${metric("Atrasados", state.events.filter(e => e.paymentStatus !== "Pago" && new Date(e.due) < new Date("2026-06-25")).length)}
    </section>
    ${tablePanel("Financeiro", ["Evento", "Cliente", "Status", "Total", "Pago", "Saldo", "Vencimento"], rows, true)}
  `;
}

function docs() {
  const rows = filteredEvents().map(e => [e.name, e.client, (e.documents || []).length ? documentNames(e.documents) : "Sem anexos", "Resumo PDF", "Ordem de serviço"]);
  return tablePanel("Contratos e documentos", ["Evento", "Cliente", "Arquivos", "Resumo", "Interno"], rows, true);
}

function reports() {
  const summary = monthlySummary(state.reportMonth, state.reportEventId);
  const rows = summary.list.map(event => [
    dateFmt.format(new Date(event.date)),
    event.name,
    event.client,
    event.status,
    brl.format(event.total || 0),
    brl.format(event.entry || 0),
    brl.format(event.paid || 0),
    brl.format(paymentInfo(event).open)
  ]);
  return `
    <section class="panel monthly-report">
      <div class="panel-head">
        <h3>Relatório mensal</h3>
        <div class="report-controls">
          <select id="reportMonth">${reportMonthOptions()}</select>
          <select id="reportEvent">${reportEventOptions()}</select>
          <button data-action="print-month-report">Imprimir relatório</button>
        </div>
      </div>
      <section class="metrics-grid compact">
        ${metric("Eventos no mês", summary.list.length)}
        ${metric("Faturamento contratado", brl.format(summary.total))}
        ${metric("Entradas", brl.format(summary.entry))}
        ${metric("Valores pagos", brl.format(summary.paid))}
        ${metric("Saldo pendente", brl.format(summary.open))}
        ${metric("Confirmados", summary.confirmed)}
        ${metric("Realizados", summary.done)}
        ${metric("Com pendência", summary.pendingPayment)}
      </section>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Data</th><th>Evento</th><th>Cliente</th><th>Status</th><th>Total</th><th>Entrada</th><th>Pago</th><th>Pendente</th></tr></thead>
          <tbody>${rows.length ? rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join("")}</tr>`).join("") : `<tr><td colspan="8">Nenhum evento cadastrado neste mês.</td></tr>`}</tbody>
        </table>
      </div>
    </section>
    <section class="dashboard-grid">
      <div class="panel"><div class="panel-head"><h3>Eventos por tipo</h3></div>${bars(groupByType())}</div>
      <div class="panel"><div class="panel-head"><h3>Eventos por status</h3></div>${bars(groupByStatus())}</div>
      <div class="panel"><div class="panel-head"><h3>Serviços mais contratados</h3></div>${bars(serviceRanking())}</div>
      <div class="panel"><div class="panel-head"><h3>Ocupação da agenda</h3></div>${metric("Taxa estimada", "18%", "Eventos + bloqueios no mês")}${metric("Clientes cadastrados", new Set(state.events.map(e => e.client)).size)}</div>
    </section>
  `;
}

function serviceRanking() {
  return state.events.flatMap(e => e.services).reduce((acc, s) => ({ ...acc, [s]: (acc[s] || 0) + 1 }), {});
}

function settings() {
  const isAdmin = state.role === "Administrador";
  const userCards = state.users.map(u => `
    <article class="mini-card">
      <strong>${escapeHtml(u.name)}</strong>
      <span>${escapeHtml(u.email)}</span>
      <mark>${escapeHtml(u.role)}</mark>
      ${u.active === false ? `<small>Sem acesso ativo</small>` : `<small>Acesso liberado</small>`}
    </article>
  `).join("");
  return `
    <section class="settings-grid">
      <div class="panel">
        <div class="panel-head"><h3>Configurações gerais</h3></div>
        <form class="event-form">
          <input value="${demo.settings.venueName}" />
          <input value="${demo.settings.whatsapp}" />
          <input value="${demo.settings.address}" />
          <input value="${demo.settings.colors}" />
          <button class="primary" type="button">Salvar configurações</button>
        </form>
      </div>
      <div class="panel">
        <div class="panel-head"><h3>Alterar minha senha</h3></div>
        <form id="passwordForm" class="event-form">
          <input name="password" type="password" placeholder="Nova senha" minlength="4" required />
          <input name="confirm" type="password" placeholder="Confirmar nova senha" minlength="4" required />
          <p class="form-hint">Essa senha será usada no próximo login do usuário atual.</p>
          <button class="primary" type="submit">Salvar nova senha</button>
        </form>
      </div>
      ${isAdmin ? `
        <div class="panel">
          <div class="panel-head"><h3>Liberar acesso para funcionário</h3></div>
          <form id="userForm" class="event-form">
            <input name="name" placeholder="Nome da pessoa" required />
            <input name="email" type="email" placeholder="E-mail de login" required />
            <select name="role">
              <option>Funcionário/Equipe</option>
              <option>Comercial/Atendimento</option>
              <option>Administrador</option>
            </select>
            <input name="password" type="password" placeholder="Senha inicial" minlength="4" required />
            <p class="form-hint">Depois de entrar, o funcionário também pode trocar a própria senha.</p>
            <button class="primary" type="submit">Criar acesso</button>
          </form>
        </div>
      ` : ""}
      <div class="panel wide">
        <div class="panel-head"><h3>Usuários e permissões</h3></div>
        <div class="cards-3">${userCards}</div>
      </div>
    </section>
  `;
}

function tablePanel(title, headers, rows, exportButtons = false) {
  return `
    <section class="panel">
      <div class="panel-head"><h3>${title}</h3>${exportButtons ? `<div><button data-action="export-csv">Excel/CSV</button><button data-action="print-page">PDF/Imprimir</button></div>` : ""}</div>
      <div class="table-wrap"><table><thead><tr>${headers.map(h => `<th>${h}</th>`).join("")}</tr></thead><tbody>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>
    </section>
  `;
}

function bind() {
  document.querySelector("#loginForm")?.addEventListener("submit", loginUser);
  document.querySelectorAll("[data-view]").forEach(btn => btn.addEventListener("click", () => {
    state.view = btn.dataset.view;
    render();
  }));
  document.querySelector("#globalSearch")?.addEventListener("input", event => {
    state.search = event.target.value;
    clearTimeout(searchTimer);
    searchTimer = setTimeout(render, 220);
  });
  document.querySelector("#calendarMonth")?.addEventListener("change", event => {
    state.calendarMonth = Number(event.target.value);
    localStorage.setItem("vm_calendar_month", String(state.calendarMonth));
    render();
  });
  document.querySelector("#calendarYear")?.addEventListener("change", event => {
    state.calendarYear = Number(event.target.value);
    localStorage.setItem("vm_calendar_year", String(state.calendarYear));
    render();
  });
  document.querySelector("#reportMonth")?.addEventListener("change", event => {
    state.reportMonth = event.target.value;
    state.reportEventId = "all";
    localStorage.setItem("vm_report_month", state.reportMonth);
    localStorage.setItem("vm_report_event", state.reportEventId);
    render();
  });
  document.querySelector("#reportEvent")?.addEventListener("change", event => {
    state.reportEventId = event.target.value;
    localStorage.setItem("vm_report_event", state.reportEventId);
    render();
  });
  document.querySelectorAll(".day[data-date]").forEach(day => day.addEventListener("click", () => editCalendarNote(day.dataset.date)));
  document.querySelectorAll("[data-action]").forEach(btn => btn.addEventListener("click", () => handleAction(btn.dataset.action, btn)));
  document.querySelectorAll('input[data-action="upload-contract"]').forEach(input => input.addEventListener("change", () => uploadContract(input)));
  document.querySelectorAll('input[data-action="upload-receipts"]').forEach(input => input.addEventListener("change", () => uploadReceipts(input)));
  document.querySelector("#eventForm")?.addEventListener("submit", createEvent);
  document.querySelector("#passwordForm")?.addEventListener("submit", changePassword);
  document.querySelector("#userForm")?.addEventListener("submit", createUser);
}

async function loginUser(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget).entries());
  const email = String(data.email || "").trim().toLowerCase();
  const password = String(data.password || "");
  try {
    let user;
    if (api.available) {
      const response = await requestJson("/api/login", {
        method: "POST",
        body: JSON.stringify({ email, password })
      });
      user = response.user;
    } else {
      user = state.users.find(item => item.active !== false && item.email.toLowerCase() === email && item.password === password);
    }
    if (!user) throw new Error("Login inválido");
    state.user = user;
    state.role = user.role;
    state.logged = true;
    localStorage.setItem("vm_session", "active");
    localStorage.setItem("vm_role", state.role);
    localStorage.setItem("vm_user", JSON.stringify(user));
    render();
  } catch (error) {
    alert("E-mail ou senha inválidos.");
  }
}

async function changePassword(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget).entries());
  const password = String(data.password || "");
  const confirm = String(data.confirm || "");
  if (password.length < 4) {
    alert("A senha precisa ter pelo menos 4 caracteres.");
    return;
  }
  if (password !== confirm) {
    alert("As senhas digitadas não conferem.");
    return;
  }
  const currentUser = state.user || state.users[0];
  if (!currentUser) return;
  if (api.available) {
    const response = await requestJson(`/api/users/${currentUser.id}/password`, {
      method: "PUT",
      body: JSON.stringify({ password })
    });
    state.user = response.user;
    localStorage.setItem("vm_user", JSON.stringify(state.user));
    await refreshUsers();
  } else {
    state.users = state.users.map(user => String(user.id) === String(currentUser.id) ? { ...user, password } : user);
    state.user = { ...currentUser, password };
    localStorage.setItem("vm_user", JSON.stringify(state.user));
    saveLocalUsers();
  }
  event.currentTarget.reset();
  alert("Senha alterada com sucesso.");
  render();
}

async function createUser(event) {
  event.preventDefault();
  if (state.role !== "Administrador") {
    alert("Somente o administrador pode liberar novos acessos.");
    return;
  }
  const data = Object.fromEntries(new FormData(event.currentTarget).entries());
  const payload = {
    name: String(data.name || "").trim(),
    email: String(data.email || "").trim().toLowerCase(),
    role: String(data.role || "Funcionário/Equipe"),
    password: String(data.password || "")
  };
  if (!payload.name || !payload.email || payload.password.length < 4) {
    alert("Preencha nome, e-mail e uma senha com pelo menos 4 caracteres.");
    return;
  }
  try {
    if (api.available) {
      await requestJson("/api/users", {
        method: "POST",
        body: JSON.stringify(payload)
      });
      await refreshUsers();
    } else {
      const exists = state.users.some(user => user.email.toLowerCase() === payload.email);
      if (exists) {
        alert("Já existe um usuário com esse e-mail.");
        return;
      }
      state.users = [...state.users, { ...payload, id: Date.now(), active: true }];
      saveLocalUsers();
    }
    event.currentTarget.reset();
    alert("Acesso criado com sucesso.");
    render();
  } catch (error) {
    alert(error.message.includes("409") ? "Já existe um usuário com esse e-mail." : "Não foi possível criar o acesso agora.");
  }
}
async function createEvent(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget).entries());
  const editingId = data.editId;
  const conflict = state.events.some(e => String(e.id) !== String(editingId) && e.status === "Confirmado" && data.status === "Confirmado" && e.date === data.date && data.start < e.end && data.end > e.start);
  if (conflict) {
    alert("Já existe um evento confirmado nessa data e horário.");
    return;
  }
  const total = Number(data.total || 0);
  let paid = Number(data.paid || 0);
  const paidOff = data.paidOff === "on";
  if (paidOff) paid = total;
  const paymentStatus = paidOff || (total > 0 && paid >= total) ? "Pago/Quitado" : paid > 0 ? "Parcial" : "Pendente";
  const services = splitList(data.servicesText);
  const payload = {
    ...data,
    id: editingId ? Number(editingId) || editingId : Date.now(),
    guests: Number(data.guests),
    total,
    entry: Number(data.entry || 0),
    paid,
    paymentStatus,
    payment: "A definir",
    services: services.length ? services : ["Locação do espaço"]
  };
  delete payload.editId;
  delete payload.paidOff;
  delete payload.servicesText;
  const currentEvent = state.events.find(e => String(e.id) === String(editingId));
  const nextEvent = editingId ? {
    ...currentEvent,
    ...payload,
    checklist: currentEvent?.checklist || ["Estrutura conferida"],
    documents: currentEvent?.documents || []
  } : {
    ...payload,
    checklist: ["Estrutura conferida"],
    documents: []
  };
  try {
    await saveEventRecord(nextEvent);
  } catch (error) {
    alert("Não consegui salvar essa alteração. Verifique a conexão e tente clicar em salvar novamente.");
    render();
    return;
  }
  state.editEventId = null;
  render();
}

async function editCalendarNote(date) {
  const current = state.calendarNotes[date] || "";
  const text = prompt(`Observação para ${date}. Deixe vazio para limpar:`, current);
  if (text === null) return;
  const clean = text.trim();
  if (clean) state.calendarNotes[date] = clean;
  else delete state.calendarNotes[date];
  await saveCalendarNotes();
  render();
}

async function uploadContract(input) {
  const file = input.files?.[0];
  if (!file) return;
  if (file.type && file.type !== "application/pdf") {
    alert("Selecione um arquivo PDF.");
    input.value = "";
    return;
  }
  await saveContractFile(input.dataset.eventId, file, "Contrato assinado");
  state.events = state.events.map(event => {
    if (String(event.id) !== String(input.dataset.eventId)) return event;
    const docs = event.documents || [];
    const exists = docs.some(doc => (typeof doc === "string" ? doc : doc.name) === file.name);
    return { ...event, documents: exists ? docs : [...docs, { name: file.name, type: "Contrato assinado" }] };
  });
  await saveEvents();
  render();
}

async function uploadReceipts(input) {
  const files = Array.from(input.files || []);
  if (!files.length) return;
  const invalid = files.find(file => file.type && file.type !== "application/pdf");
  if (invalid) {
    alert("Selecione apenas arquivos PDF.");
    input.value = "";
    return;
  }
  await Promise.all(files.map(file => saveContractFile(input.dataset.eventId, file, "Comprovante de pagamento")));
  state.events = state.events.map(event => {
    if (String(event.id) !== String(input.dataset.eventId)) return event;
    const docs = event.documents || [];
    const next = [...docs];
    files.forEach(file => {
      const exists = next.some(doc => (typeof doc === "string" ? doc : doc.name) === file.name);
      if (!exists) next.push({ name: file.name, type: "Comprovante de pagamento" });
    });
    return { ...event, documents: next };
  });
  await saveEvents();
  render();
}
async function handleAction(action, btn) {
  if (action === "logout") {
    localStorage.removeItem("vm_session");
    localStorage.removeItem("vm_user");
    state.logged = false;
    state.user = null;
    render();
  }
  if (action === "theme") {
    state.dark = !state.dark;
    localStorage.setItem("vm_theme", state.dark ? "dark" : "light");
    render();
  }
  if (action === "prev-month") {
    state.calendarMonth -= 1;
    if (state.calendarMonth < 0) {
      state.calendarMonth = 11;
      state.calendarYear -= 1;
    }
    localStorage.setItem("vm_calendar_month", String(state.calendarMonth));
    localStorage.setItem("vm_calendar_year", String(state.calendarYear));
    render();
  }
  if (action === "next-month") {
    state.calendarMonth += 1;
    if (state.calendarMonth > 11) {
      state.calendarMonth = 0;
      state.calendarYear += 1;
    }
    localStorage.setItem("vm_calendar_month", String(state.calendarMonth));
    localStorage.setItem("vm_calendar_year", String(state.calendarYear));
    render();
  }
  if (action === "edit-event") {
    state.editEventId = btn.dataset.eventId;
    state.view = "events";
    window.scrollTo({ top: 0, behavior: "smooth" });
    render();
  }
  if (action === "delete-event") {
    const event = state.events.find(item => String(item.id) === String(btn.dataset.eventId));
    if (!event) return;
    const ok = confirm(`Excluir o evento "${event.name}"? Essa ação remove o exemplo da lista.`);
    if (!ok) return;
    try {
      await deleteEventRecord(btn.dataset.eventId);
    } catch (error) {
      alert("Não consegui excluir esse evento. Verifique a conexão e tente novamente.");
      render();
      return;
    }
    if (String(state.editEventId) === String(btn.dataset.eventId)) state.editEventId = null;
    render();
  }
  if (action === "cancel-edit") {
    state.editEventId = null;
    render();
  }
  if (action === "download-contract") {
    getContractFile(btn.dataset.eventId, btn.dataset.fileName).then(file => {
      if (!file) {
        alert("Arquivo não encontrado neste navegador. Anexe o PDF novamente.");
        return;
      }
      const url = URL.createObjectURL(file);
      const link = document.createElement("a");
      link.href = url;
      link.download = btn.dataset.fileName;
      link.click();
      URL.revokeObjectURL(url);
    });
  }
  if (action === "copy-summary") {
    const text = filteredEvents().map(e => `${e.name} | ${e.client} | ${e.date} ${e.start}-${e.end} | ${e.status} | ${brl.format(e.total)}`).join("\n");
    navigator.clipboard?.writeText(text);
    alert("Resumo copiado para a área de transferência.");
  }
  if (action === "print-event") {
    state.printEventId = btn.dataset.eventId;
    render();
    setTimeout(() => window.print(), 80);
  }
  if (action === "print-month-report") {
    state.printReportMonth = state.reportMonth;
    state.printReportEventId = state.reportEventId;
    render();
    setTimeout(() => window.print(), 80);
  }
  if (action === "print-page") window.print();
  if (action === "export-csv") exportCsv();
}

window.addEventListener("afterprint", () => {
  if (!state.printEventId && !state.printReportMonth) return;
  state.printEventId = null;
  state.printReportMonth = null;
  state.printReportEventId = "all";
  render();
});

function exportCsv() {
  const lines = [["Evento", "Cliente", "Data", "Status", "Total", "Pago"], ...state.events.map(e => [e.name, e.client, e.date, e.status, e.total, e.paid])];
  const csv = lines.map(row => row.map(value => `"${String(value).replaceAll('"', '""')}"`).join(";")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "vila-makunaima-financeiro.csv";
  link.click();
  URL.revokeObjectURL(url);
}

async function boot() {
  await loadServerState();
  render();
}

boot();



