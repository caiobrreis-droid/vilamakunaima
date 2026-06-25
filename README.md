# Vila Makunaima Eventos

Sistema web responsivo para cadastro, organização e acompanhamento de eventos da Vila Makunaima.

## O que está pronto

- Login com vídeo de fundo em loop, preenchimento total da tela, overlay escurecido/blur e card frosted glass.
- Perfis simulados: Administrador, Funcionário/Equipe e Comercial/Atendimento.
- Dashboard com totais, receita prevista, valores pagos, pendências, alertas e gráficos simples.
- Cadastro de eventos com validação para impedir conflito de eventos confirmados no mesmo horário.
- Módulos de agenda, clientes, financeiro, documentos, relatórios e configurações.
- Agenda por mês/ano com observações por dia, edição de eventos cadastrados e anexos PDF salvos localmente no navegador.
- Busca global, exportação CSV, impressão/PDF pelo navegador, WhatsApp do cliente, copiar resumo e modo escuro.
- Dados simulados em `src/app.js`.
- Schema PostgreSQL/Supabase em `database/schema.sql`.
- Vídeo de fundo da tela de login em `assets/login-bg.mp4`, Full HD vertical 1080x1920, com preenchimento total da tela por `object-fit: cover`.
- Imagem `assets/vila-bg-1.png` usada como poster/fallback do vídeo.
- Logo pública do perfil Instagram `@vilamakunaimarr` salva em `assets/logo-vila.png`.

## Como executar

Sirva a pasta localmente com:

```bash
python -m http.server 4173 --bind 127.0.0.1
```

Depois acesse `http://localhost:4173`.

## Acesso de teste

- E-mail: `admin@vilamakunaima.com`
- Senha: `admin123`

A autenticação desta versão é simulada no navegador com `localStorage`. Para produção, conecte a tela de login a Supabase Auth ou a um backend Node/Express com sessão segura.

## Próximos passos para publicar

### Railway

1. No Railway, clique em **New Project**.
2. Escolha **Deploy from GitHub repo**.
3. Selecione `caiobrreis-droid/vilamakunaima`.
4. Dentro do projeto, clique em **Add** e escolha **Database > PostgreSQL**.
5. O Railway cria a variável `DATABASE_URL` automaticamente para o serviço.
6. O Railway usará `npm start`, configurado em `railway.json`.
7. Após publicar, abra a URL gerada pelo Railway.

Com `DATABASE_URL` configurada, o sistema salva eventos, agenda e documentos PDF no PostgreSQL. Se o app for aberto direto por `file://`, ele usa armazenamento local do navegador apenas como fallback.

### Evolução futura

1. Criar login real com usuários e permissões no banco.
2. Separar clientes, pagamentos e eventos em tabelas relacionais próprias.
3. Otimizar `assets/login-bg.mp4` para publicação online, se necessário.
