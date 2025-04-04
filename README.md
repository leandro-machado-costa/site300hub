# 300HUB - Site Institucional

Site institucional da 300HUB, uma consultoria de tecnologia especializada em integrações, sistemas, dados e soluções digitais.

## Características

- Design moderno e responsivo
- Animações suaves
- Formulário de contato
- Integração com WhatsApp
- Otimizado para SEO
- Acessível (WCAG 2.1)

## Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript
- SVG

## Estrutura do Projeto

```
.
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── favicon.svg         # Ícone do site
└── README.md           # Documentação
```

## Como Executar

1. Clone o repositório
2. Abra o arquivo `index.html` em seu navegador

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

Para alterar o número do WhatsApp, modifique a URL no arquivo `index.html`:

```javascript
const url = `https://wa.me/5599999999999?text=${encodeURIComponent(texto)}`;
```

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes. 