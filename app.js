
// --- Elementos DOM ---
const passwordOutput = document.getElementById('passwordOutput');
const copyButton = document.getElementById('copyButton');
const randomButton = document.getElementById('randomButton');
const memorableButton = document.getElementById('memorableButton');
const generateButton = document.getElementById('generateButton');
const lengthSlider = document.getElementById('lengthSlider');
const lengthDisplay = document.getElementById('lengthDisplay');
const uppercaseCheck = document.getElementById('uppercaseCheck');
const numbersCheck = document.getElementById('numbersCheck');
const symbolsCheck = document.getElementById('symbolsCheck');
const strengthBar = document.querySelector('.strength-bar');
const strengthLabel = document.querySelector('.strength-label');

// --- Estado da Aplicação ---
let currentMode = 'random'; // 'random' ou 'memorable'

// --- Palavras para o modo memorável ---
const palavras = [
    'casa', 'carro', 'livro', 'sol', 'lua', 'gato', 'cão', 'flor', 'amor', 'vida',
    'tempo', 'feliz', 'triste', 'forte', 'fraco', 'água', 'fogo', 'terra', 'vento',
    'amigo', 'família', 'escola', 'trabalho', 'cidade', 'campo', 'viagem', 'sonho',
    'cor', 'luz', 'sombra', 'estrela', 'planeta', 'universo', 'mente', 'corpo',
    'alma', 'espírito', 'razão', 'emoção', 'sentimento', 'pensamento', 'ideia',
    'arte', 'ciência', 'música', 'dança', 'poesia', 'história', 'futuro', 'passado'
];

// --- Funções de Geração de Senha ---

/**
  Gera uma senha memorável com base nas opções do usuário.
  @returns {string} A senha gerada.
 */
function generateMemorablePassword() {
    const length = parseInt(lengthSlider.value, 10);
    const useUppercase = uppercaseCheck.checked;
    const useNumbers = numbersCheck.checked;
    const useSymbols = symbolsCheck.checked;

    let password = '';
    const wordCount = Math.max(2, Math.ceil(length / 5)); // Pelo menos 2 palavras

    for (let i = 0; i < wordCount; i++) {
        let word = palavras[Math.floor(Math.random() * palavras.length)];
        if (useUppercase && Math.random() > 0.5) {
            word = word.charAt(0).toUpperCase() + word.slice(1);
        }
        password += word;
    }

    if (useNumbers) {
        const numCount = Math.floor(Math.random() * 3) + 1; // 1 a 3 números
        for (let i = 0; i < numCount; i++) {
            password += Math.floor(Math.random() * 10);
        }
    }

    if (useSymbols) {
        const symbolChars = '!@#$%&*';
        const symCount = Math.floor(Math.random() * 2) + 1; // 1 a 2 símbolos
        for (let i = 0; i < symCount; i++) {
            password += symbolChars[Math.floor(Math.random() * symbolChars.length)];
        }
    }

    return password.slice(0, length);
}

/**
 * Gera uma senha aleatória usando a função do utilitário.
 * @returns {string} A senha gerada.
 */
function generateRandomPassword() {
    return generatePassword(
        lengthSlider.value,
        uppercaseCheck.checked,
        numbersCheck.checked,
        symbolsCheck.checked
    );
}

/**
 * Função principal para gerar e exibir a senha.
 */
function generateAndDisplayPassword() {
    let newPassword;
    if (currentMode === 'random') {
        newPassword = generateRandomPassword();
    } else {
        newPassword = generateMemorablePassword();
    }
    passwordOutput.value = newPassword;
    updateStrengthIndicator();
}

// --- Validação e Indicador de Força ---

/**
 * Avalia a força da senha e atualiza o indicador visual.
 */
function updateStrengthIndicator() {
    const password = passwordOutput.value;
    const isValid = validatePassword(password);
    let score = 0;

    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

    let strength = 'Fraca';
    let strengthColor = '#ff4d4d'; // Vermelho
    let strengthWidth = '20%';

    if (isValid) {
        if (score >= 5) {
            strength = 'Forte';
            strengthColor = '#4caf50'; // Verde
            strengthWidth = '100%';
        } else if (score >= 3) {
            strength = 'Média';
            strengthColor = '#ffc107'; // Amarelo
            strengthWidth = '60%';
        }
    }

    strengthBar.style.width = strengthWidth;
    strengthBar.style.backgroundColor = strengthColor;
    strengthLabel.textContent = `Classificação de segurança: ${strength}`;
}


// --- Funções Auxiliares ---

/**
 * Copia a senha para a área de transferência.
 */
function copyToClipboard() {
    passwordOutput.select();
    document.execCommand('copy');
    copyButton.textContent = 'Copiado!';
    setTimeout(() => {
        copyButton.textContent = 'Copiar';
    }, 2000);
}

/**
 * Atualiza a exibição do comprimento da senha.
 */
function updateLengthDisplay() {
    lengthDisplay.textContent = `${lengthSlider.value} caracteres`;
}

// --- Event Listeners ---

function setupEventListeners() {
    generateButton.addEventListener('click', generateAndDisplayPassword);
    copyButton.addEventListener('click', copyToClipboard);
    lengthSlider.addEventListener('input', () => {
        updateLengthDisplay();
        generateAndDisplayPassword();
    });
    uppercaseCheck.addEventListener('change', generateAndDisplayPassword);
    numbersCheck.addEventListener('change', generateAndDisplayPassword);
    symbolsCheck.addEventListener('change', generateAndDisplayPassword);

    randomButton.addEventListener('click', () => {
        currentMode = 'random';
        randomButton.classList.add('primary-button');
        randomButton.classList.remove('secondary-button');
        memorableButton.classList.add('secondary-button');
        memorableButton.classList.remove('primary-button');
        generateAndDisplayPassword();
    });

    memorableButton.addEventListener('click', () => {
        currentMode = 'memorable';
        memorableButton.classList.add('primary-button');
        memorableButton.classList.remove('secondary-button');
        randomButton.classList.add('secondary-button');
        randomButton.classList.remove('primary-button');
        generateAndDisplayPassword();
    });
}

// --- Inicialização ---

function init() {
    updateLengthDisplay();
    setupEventListeners();
    generateAndDisplayPassword();
}

// Inicia a aplicação assim que o DOM estiver pronto.
document.addEventListener('DOMContentLoaded', init);
