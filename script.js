// Função para mostrar/esconder o formulário do WhatsApp
function toggleForm() {
  const form = document.getElementById('whatsappForm');
  if (form.style.display === 'none' || form.style.display === '') {
    form.style.display = 'block';
    form.style.opacity = '1';
    form.style.transform = 'translateY(0)';
  } else {
    form.style.opacity = '0';
    form.style.transform = 'translateY(20px)';
    setTimeout(() => {
      form.style.display = 'none';
    }, 300);
  }
}

// Função para formatar o número de telefone
function formatarTelefone(input) {
  let valor = input.value.replace(/\D/g, '');
  if (valor.length <= 11) {
    valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2');
    valor = valor.replace(/(\d)(\d{4})$/, '$1-$2');
    input.value = valor;
  }
}

// Inicialização
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

  // Fecha o formulário quando clicar fora dele
  document.addEventListener('click', function(e) {
    const form = document.getElementById('whatsappForm');
    const button = document.querySelector('.whatsapp-button');
    if (!form.contains(e.target) && !button.contains(e.target) && form.style.display === 'flex') {
      form.style.opacity = '0';
      form.style.transform = 'translateY(20px)';
      setTimeout(() => {
        form.style.display = 'none';
      }, 300);
    }
  });
});

// Função para enviar e-mail
async function handleSubmit(event) {
  event.preventDefault();
  
  const form = event.target;
  const submitButton = form.querySelector('input[type="submit"]');
  const originalButtonText = submitButton.value;
  
  try {
    // Desabilita o botão e mostra loading
    submitButton.disabled = true;
    submitButton.value = 'Enviando...';
    
    // Coleta os dados do formulário
    const formData = {
      nome: form.nome.value,
      email: form.email.value,
      telefone: form.telefone.value,
      empresa: form.empresa.value,
      mensagem: form.mensagem.value,
      origem: window.location.origin
    };
    
    console.log('Enviando dados:', formData); // Log para debug
    
    // Envia os dados para a API
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    
    // Verifica se a resposta é JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Resposta não é JSON:', await response.text());
      throw new Error('Resposta do servidor não é JSON válido');
    }
    
    const data = await response.json();
    console.log('Resposta da API:', data); // Log para debug
    
    if (!response.ok) {
      throw new Error(data.error?.message || data.error || 'Erro ao enviar mensagem');
    }
    
    // Limpa o formulário e mostra mensagem de sucesso
    form.reset();
    alert('Mensagem enviada com sucesso!');
    
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    alert('Erro ao enviar mensagem. Por favor, tente novamente.');
  } finally {
    // Restaura o botão
    submitButton.disabled = false;
    submitButton.value = originalButtonText;
  }
}

// Função para enviar mensagem via WhatsApp
async function enviarWhatsApp() {
  const nome = document.getElementById('nome').value;
  const telefone = document.getElementById('telefone').value;
  const mensagem = document.getElementById('mensagem').value;
  
  if (!nome || !telefone || !mensagem) {
    alert('Por favor, preencha todos os campos');
    return;
  }
  
  try {
    // Prepara os dados para a API
    const formData = {
      nome: nome,
      telefone: telefone,
      mensagem: mensagem,
      origem: 'WhatsApp'
    };
    
    console.log('Enviando dados para API:', formData);
    
    // Envia os dados para a API
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    
    // Verifica se a resposta é JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Resposta não é JSON:', await response.text());
      throw new Error('Resposta do servidor não é JSON válido');
    }
    
    const data = await response.json();
    console.log('Resposta da API:', data);
    
    if (!response.ok) {
      throw new Error(data.error?.message || data.error || 'Erro ao enviar mensagem');
    }
    
    // Se o e-mail foi enviado com sucesso, redireciona para o WhatsApp
    const texto = `Olá! Me chamo ${nome}.\n${mensagem}`;
    const url = `https://wa.me/5549999135370?text=${encodeURIComponent(texto)}`;
    
    // Limpa os campos e fecha o formulário
    document.getElementById('nome').value = '';
    document.getElementById('telefone').value = '';
    document.getElementById('mensagem').value = '';
    
    const form = document.getElementById('whatsappForm');
    form.style.opacity = '0';
    form.style.transform = 'translateY(20px)';
    setTimeout(() => {
      form.style.display = 'none';
    }, 300);
    
    // Abre o WhatsApp em uma nova aba
    window.open(url, '_blank');
    
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    alert('Erro ao enviar mensagem. Por favor, tente novamente.');
  }
} 