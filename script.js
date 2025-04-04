// Função para alternar o formulário do WhatsApp
function toggleForm() {
  const form = document.getElementById('whatsappForm');
  if (form.style.display === 'flex') {
    form.style.display = 'none';
  } else {
    form.style.display = 'flex';
  }
}

// Formatador de telefone
function formatarTelefone(input) {
  // Remove tudo que não é número
  let value = input.value.replace(/\D/g, '');
  
  // Limita a 11 dígitos (máximo para celular brasileiro)
  value = value.substring(0, 11);
  
  // Formata o número
  if (value.length > 0) {
    value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
    if (value.length > 10) {
      value = value.replace(/(\d{5})(\d)/, "$1-$2");
    }
  }
  
  input.value = value;
}

// Adiciona o evento de formatação aos campos de telefone
document.addEventListener('DOMContentLoaded', function() {
  // Formatação para o campo de telefone do WhatsApp
  const telefoneWhatsApp = document.getElementById('telefone');
  if (telefoneWhatsApp) {
    telefoneWhatsApp.addEventListener('input', function(e) {
      formatarTelefone(this);
    });
  }
  
  // Formatação para o campo de telefone do formulário principal
  const telefoneContato = document.querySelector('input[name="telefone"]');
  if (telefoneContato) {
    telefoneContato.addEventListener('input', function(e) {
      formatarTelefone(this);
    });
  }
});

// Função para enviar mensagem via WhatsApp
function enviarWhatsApp() {
  const nome = document.getElementById('nome').value.trim();
  const telefone = document.getElementById('telefone').value.replace(/\D/g, '');
  const mensagem = document.getElementById('mensagem').value.trim();

  if (!nome || !telefone || !mensagem) {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  if (telefone.length < 10 || telefone.length > 11) {
    alert('Por favor, insira um número de telefone válido.');
    return;
  }

  const texto = `Olá, meu nome é ${nome}. Meu telefone é ${telefone}. Mensagem: ${mensagem}`;
  const url = `https://wa.me/55${telefone}?text=${encodeURIComponent(texto)}`;
  window.open(url, '_blank');
}

// Função para lidar com o envio do formulário de contato
function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  
  // Aqui você pode adicionar o código para enviar o formulário para seu backend
  console.log('Dados do formulário:', Object.fromEntries(formData));
  
  alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
  form.reset();
  return false;
} 