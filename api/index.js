const { Resend } = require('resend');

// Lista de origens permitidas
const allowedOrigins = [
  'https://300hub.com.br',
  'https://www.300hub.com.br',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:5000'
];

// Inicializa o Resend com a chave de API
const resend = new Resend(process.env.RESEND_API_KEY);

// Função para verificar se a origem é permitida
function isOriginAllowed(origin) {
  return allowedOrigins.includes(origin);
}

// Função para configurar os headers CORS
function setCorsHeaders(res, origin) {
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

module.exports = async (req, res) => {
  console.log('Requisição recebida:', {
    method: req.method,
    origin: req.headers.origin,
    body: req.body
  });

  // Verifica a origem da requisição
  const origin = req.headers.origin;
  
  // Se a origem não for permitida, retorna erro 403
  if (!isOriginAllowed(origin)) {
    console.error('Origem não permitida:', origin);
    return res.status(403).json({ error: 'Acesso não autorizado' });
  }

  // Configura os headers CORS
  setCorsHeaders(res, origin);

  // Se for uma requisição OPTIONS, retorna 200
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Verifica se é uma requisição POST
  if (req.method !== 'POST') {
    console.error('Método não permitido:', req.method);
    return res.status(405).json({ error: 'Método não permitido' });
  }

  // Verifica se os campos obrigatórios estão presentes
  const { nome, email, telefone, empresa, mensagem, origem } = req.body;
  if (!nome || !mensagem) {
    console.error('Campos obrigatórios faltando:', { nome, mensagem });
    return res.status(400).json({ error: 'Nome e mensagem são obrigatórios' });
  }

  try {
    // Prepara os dados do e-mail
    const emailData = {
      from: process.env.VERIFIED_DOMAIN ? `contato@${process.env.VERIFIED_DOMAIN}` : 'onboarding@resend.dev',
      to: process.env.CONTACT_EMAIL,
      subject: `Nova mensagem de contato - ${origem || 'Site'}`,
      html: `
        <h2>Nova mensagem de contato</h2>
        <p><strong>Nome:</strong> ${nome}</p>
        ${email ? `<p><strong>E-mail:</strong> ${email}</p>` : ''}
        ${telefone ? `<p><strong>Telefone:</strong> ${telefone}</p>` : ''}
        ${empresa ? `<p><strong>Empresa:</strong> ${empresa}</p>` : ''}
        <p><strong>Origem:</strong> ${origem || 'Site'}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${mensagem}</p>
      `
    };

    console.log('Enviando e-mail com dados:', emailData);

    // Envia o e-mail
    const data = await resend.emails.send(emailData);
    console.log('E-mail enviado com sucesso:', data);
    return res.status(200).json(data);
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    return res.status(500).json({ 
      error: 'Erro ao enviar e-mail',
      details: error.message 
    });
  }
}; 