# Vila Makunaima Eventos

Sistema web responsivo para cadastro, organizacao e acompanhamento de eventos da Vila Makunaima.

## O que esta pronto

- Login com video de fundo em loop, preenchimento total da tela e visual responsivo.
- Login real com usuarios salvos no PostgreSQL quando publicado no Railway.
- Administrador pode alterar a propria senha e liberar acesso para funcionarios.
- Dashboard com totais, receita prevista, valores pagos, pendencias, alertas e graficos simples.
- Cadastro e edicao de eventos com validacao para impedir conflito de eventos confirmados no mesmo horario.
- Agenda por mes/ano com observacoes por dia.
- Anexos PDF para contrato e varios comprovantes de pagamento no mesmo evento.
- Busca global, exportacao CSV, impressao/PDF pelo navegador, WhatsApp do cliente, copiar resumo e modo escuro.
- Video de fundo em `assets/login-bg.mp4`, poster em `assets/vila-bg-1.png` e logo em `assets/logo-vila.png`.

## Como executar localmente

```bash
npm install
npm start
```

Depois acesse `http://localhost:4173`.

Tambem e possivel abrir `index.html` diretamente no navegador, mas nesse modo os dados ficam somente no armazenamento local do navegador.

## Acesso inicial

- E-mail: `admin@vilamakunaima.com`
- Senha: `admin123`

Depois do primeiro acesso, entre em **Configuracoes** e altere a senha do administrador.

## Railway e PostgreSQL

1. No Railway, conecte o repositorio `caiobrreis-droid/vilamakunaima`.
2. Adicione um banco **PostgreSQL** ao projeto.
3. Garanta que o servico da aplicacao recebeu a variavel `DATABASE_URL`.
4. O Railway usa `npm start`, configurado em `railway.json`.

Com `DATABASE_URL` configurada, o sistema salva eventos, agenda, documentos PDF e usuarios no PostgreSQL. Assim os dados continuam salvos mesmo depois de fechar o navegador ou acessar de outro computador.

## Proximos passos sugeridos

1. Criar niveis de permissao mais detalhados por tela.
2. Separar clientes, pagamentos e eventos em tabelas relacionais proprias.
3. Adicionar recuperacao de senha por e-mail.
