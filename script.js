const closeBtn = document.getElementById('close-btn');
const okBtn = document.getElementById('ok-btn');
const noBtn = document.getElementById('no-btn');
const alertBox = document.getElementById('critical-alert');
const finalMessage = document.getElementById('final-message');
const floatingHeart = document.getElementById('floating-heart'); // O novo coração quicante

let attempts = 0;
const MAX_ATTEMPTS = 7;

// === LÓGICA DO CORAÇÃO QUICANTE ===
let heartX = 100; // Posição X inicial
let heartY = 100; // Posição Y inicial
let dx = 3;       // Velocidade X (direção)
let dy = 2;       // Velocidade Y (direção)
const heartSize = 250; // Aproximação do tamanho do coração (largura + paddings)

function moveHeart() {
    // Atualiza a posição
    heartX += dx;
    heartY += dy;

    // Pega as dimensões da janela
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Bateu na borda horizontal?
    if (heartX + heartSize > screenWidth || heartX < 0) {
        dx = -dx; // Inverte a direção X
    }

    // Bateu na borda vertical?
    if (heartY + heartSize > screenHeight || heartY < 0) {
        dy = -dy; // Inverte a direção Y
    }

    // Aplica a nova posição via CSS (usando 'px')
    floatingHeart.style.left = heartX + 'px';
    floatingHeart.style.top = heartY + 'px';

    // Chama a função novamente para criar o loop de animação
    requestAnimationFrame(moveHeart);
}

// Inicia o movimento
requestAnimationFrame(moveHeart);

// === LÓGICA DOS BOTÕES FUGITIVOS (MANTIDA) ===

// Adiciona o evento de fuga ao passar o mouse em todos os botões "fugitivos"
closeBtn.addEventListener('mouseover', fleeButton);
okBtn.addEventListener('mouseover', fleeButton);
noBtn.addEventListener('mouseover', fleeButton);

function fleeButton(event) {
    if (attempts < MAX_ATTEMPTS) {
        const button = event.target;
        const x = Math.random() * 25 - 12;
        const y = Math.random() * 25 - 12;
        button.style.transform = `translate(${x}px, ${y}px) rotate(${Math.random() * 6 - 3}deg)`;
    }
}

function attemptClose() {
    attempts++;

    if (attempts >= MAX_ATTEMPTS) {
        // SUCESSO! Mostra a mensagem final emocionante
        alertBox.style.display = 'none';
        finalMessage.style.display = 'block';

        // Para de mover o coração quicante ao final!
        // (Isso é um pouco mais complexo de parar com requestAnimationFrame, mas o foco é a mensagem)
        // Você pode remover o coração da tela aqui se quiser: floatingHeart.style.display = 'none';

        // Remove os eventos de fuga
        closeBtn.removeEventListener('mouseover', fleeButton);
        okBtn.removeEventListener('mouseover', fleeButton);
        noBtn.removeEventListener('mouseover', fleeButton);
        
    } else {
        // FALHA! Continua fugindo e dá um feedback DRAMÁTICO
        
        const remaining = MAX_ATTEMPTS - attempts;
        const feedbackMessages = [
            `💔 ERRO FATAL: O Agibank recusa-se a funcionar sem você. Tente novamente (${remaining} chances).`,
            `😭 ALERTA DE RISCO! Seu clique não é forte o suficiente para superar a saudade! ${remaining} tentativas restantes.`,
            `😢 SEU CORAÇÃO TEM QUE ACEITAR! Não clique! Não cliiiiique! Restam apenas ${remaining} tentativas...`,
            `😥 O botão está CHORANDO! Ele não quer ir embora! Pressione com mais FORÇA... 💔`,
            `🚨 SISTEMA EM LUTO MÁXIMO! Clique falhou!`,
            `🥺 Por favor, não vá! O botão está fugindo!`,
        ];

        alert(feedbackMessages[Math.floor(Math.random() * feedbackMessages.length)]);
        
        // Garante que o botão volte à posição original para fugir novamente com o mouseover
        closeBtn.style.transform = `translate(0, 0) rotate(0deg)`;
        okBtn.style.transform = `translate(0, 0) rotate(0deg)`;
        noBtn.style.transform = `translate(0, 0) rotate(0deg)`;
    }
}