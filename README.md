# 300HUB - Site Institucional

Site institucional da 300HUB, uma consultoria tech especializada em integrações, sistemas, dados e soluções digitais.

## Características

- Design moderno e responsivo
- Animações suaves
- Formulário de contato
- Integração com WhatsApp
- Otimizado para SEO
- Acessível (WCAG 2.1)
- Proteção CORS para segurança
- Deploy automático no Vercel

## Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript
- SVG
- Vercel para hospedagem e funções serverless
- Resend para envio de e-mails

## Estrutura do Projeto

- `index.html` - Página principal do site
- `styles.css` - Estilos CSS
- `script.js` - Funcionalidades JavaScript
- `images/` - Diretório com imagens do site
- `api/` - Diretório com funções serverless do Vercel

## Como Executar Localmente

1. Clone o repositório
2. Instale as dependências: `npm install`
3. Execute o servidor local: `npm start`
4. Abra o navegador em `http://localhost:3000`

## Deploy

O site é automaticamente implantado no Vercel quando alterações são enviadas para a branch `main`.

## Domínio Personalizado

O site está configurado para usar o domínio personalizado `300hub.com.br` através do Vercel.

## Personalização

### Cores

As cores principais do site podem ser alteradas no arquivo `styles.css` através das variáveis CSS:

```css
:root {
  --primary: #0A192F;    /* Cor principal */
  --secondary: #00B894;  /* Cor de destaque */
  --light: #F8F9FA;      /* Cor clara */
  --dark: #1C1C1C;       /* Cor escura */
  --gray: #8892B0;       /* Cor cinza */
}
```

### WhatsApp

Para alterar o número do WhatsApp, modifique a URL no arquivo `script.js`:

```javascript
const url = `https://wa.me/5599999999999?text=${encodeURIComponent(texto)}`;
```

## Configuração do Vercel e Resend

Para que o formulário de contato e o WhatsApp funcionem corretamente, é necessário configurar o Vercel e o Resend. Siga os passos abaixo:

### 1. Criar uma conta no Vercel

1. Acesse [Vercel](https://vercel.com/) e crie uma conta gratuita.
2. Conecte sua conta do GitHub ao Vercel.
3. Importe o repositório do site para o Vercel.

### 2. Criar uma conta no Resend

1. Acesse [Resend](https://resend.com/) e crie uma conta gratuita.
2. O plano gratuito permite até 100 e-mails por dia (3.000 por mês).

### 3. Obter a chave de API do Resend

1. No painel do Resend, vá para "API Keys" e clique em "Create API Key".
2. Copie a chave de API gerada.

### 4. Configurar um domínio no Resend (opcional, mas recomendado)

1. No painel do Resend, vá para "Domains" e clique em "Add Domain".
2. Siga as instruções para verificar seu domínio.
3. Após a verificação, você poderá usar seu domínio para enviar e-mails.

### 5. Configurar as variáveis de ambiente no Vercel

1. No painel do Vercel, vá para o seu projeto.
2. Clique em "Settings" > "Environment Variables".
3. Adicione as seguintes variáveis:
   - `RESEND_API_KEY`: Sua chave de API do Resend
   - `CONTACT_EMAIL`: E-mail para onde você quer receber as mensagens (ex: contato@300hub.com.br)
   - `VERIFIED_DOMAIN`: Seu domínio verificado no Resend (ex: 300hub.com.br)

### 6. Configurar o domínio personalizado no Vercel

1. No painel do Vercel, vá para o seu projeto.
2. Clique em "Settings" > "Domains".
3. Adicione seu domínio personalizado (ex: 300hub.com.br).
4. Siga as instruções para configurar os registros DNS.

## Segurança

### Proteção CORS

O site implementa proteção CORS para garantir que apenas requisições do domínio 300hub.com.br possam enviar e-mails através da API. Isso evita que terceiros mal-intencionados usem sua API para enviar e-mails não autorizados.

Os domínios permitidos são:
- https://300hub.com.br
- https://www.300hub.com.br
- http://localhost:3000 (para desenvolvimento local)
- http://localhost:5000 (para desenvolvimento local)

Se você precisar adicionar mais domínios permitidos, edite o arquivo `api/send-email.js` e adicione-os à lista `allowedOrigins`.

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes. 