const menu = document.querySelector('.menu');
const NavMenu = document.querySelector('.menu-list');

menu.addEventListener('click', () => {
    menu.classList.toggle('ativo');
    NavMenu.classList.toggle('ativo');
})


let currentIndex = 0;
const cards = document.querySelectorAll('.card');
const totalCards = cards.length;
let interval; // Para armazenar o intervalo

// Função para inicializar a exibição do(s) card(s)
function showCards(isMobileView) {
    // Se for mobile, mostra apenas um card
    for (let i = 0; i < totalCards; i++) {
        cards[i].classList.remove('active', 'inactive'); // Remove as classes de estado

        if (isMobileView) {
            // Exibe apenas um card por vez no mobile
            if (i === currentIndex) {
                cards[i].classList.add('active'); // Exibe o card ativo
            } else {
                cards[i].classList.add('inactive'); // Esconde os outros cards
            }
        } else {
            // No desktop, mostra três cards
            if (i >= currentIndex && i < currentIndex + 3) {
                cards[i].classList.add('active'); // Exibe os cards no intervalo
            } else {
                cards[i].classList.add('inactive'); // Esconde os outros cards
            }
        }
    }
}

// Função para rotacionar os cards 
function rotateCards(isMobileView) {
    if (isMobileView) {
        currentIndex = (currentIndex + 1) % totalCards; // Avança um card no mobile
    } else {
        currentIndex = (currentIndex + 3) % totalCards; // Avança três cards no desktop
    }

    showCards(isMobileView); // Exibe os cards com base na rotação
}

// Função de clique para avançar os cards
function clickRotateCards() {
    const isMobileView = window.innerWidth <= 768; // Verifica se a tela é mobile
    rotateCards(isMobileView); // Chama a função de rotação com a largura da tela
}

// Função para iniciar a rotação automática
function startRotation() {
    interval = setInterval(() => {
        const isMobileView = window.innerWidth <= 768; // Verifica se a tela é mobile
        rotateCards(isMobileView); // Rotaciona os cards com a largura da tela
    }, 3000); // Troca a cada 3 segundos
}

// Função para parar a rotação automática
function stopRotation() {
    clearInterval(interval); // Para a rotação automática
}

// Inicializa a exibição dos cards (verifica a largura da tela na inicialização)
const isMobileView = window.innerWidth <= 768;
showCards(isMobileView);

// Adiciona eventos de mouse para iniciar e parar a rotação automática
const slider = document.querySelector('.slider');
slider.addEventListener('mouseenter', startRotation);
slider.addEventListener('mouseleave', stopRotation);

// Adiciona evento de clique para rotacionar os cards manualmente
slider.addEventListener('click', clickRotateCards);


// Obter o formulário, o campo de email e a tag <small> para mostrar a mensagem
const form = document.getElementById('email-form');
const emailInput = document.getElementById('email');
const errorMessage = form.querySelector('small');

// Função para validar o email
function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/; // Regex simples para email
  return regex.test(email);
}

// Evento de envio do formulário
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Previne o envio do formulário para verificar o email
  
  // Limpar a mensagem de erro anterior
  errorMessage.textContent = '';
  
  const emailValue = emailInput.value.trim();

  // Verificar se o email é válido
  if (!validateEmail(emailValue)) {
    // Se inválido, exibe a mensagem de erro
    errorMessage.textContent = 'Please insert a valid email.';
    emailInput.classList.add('invalid'); 
  } else {
    emailInput.value = ''; 
    errorMessage.textContent = 'Thanks for you subscribing!'; 
    emailInput.classList.remove('invalid'); // Remover a classe 'invalid' caso tenha
  }
});