// script.js

const canvas = document.getElementById("wordCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight * 0.8;

const words = []; // Aqui guardaremos as palavras cognatas
const numWords = 10; // Número de palavras que aparecerão
const waveAmplitude = 20; // Intensidade das ondas
const waveSpeed = 0.05; // Velocidade das ondas
let time = 0;

// Função que simula as ondas
function updateWave() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    time += waveSpeed;

    words.forEach((word, index) => {
        // Movimento de "flutuação"
        const wave = Math.sin(time + index) * waveAmplitude;
        word.y += wave;

        // Desenhar as palavras
        ctx.font = "20px Arial";
        ctx.fillStyle = "#ffffff";
        ctx.fillText(word.text, word.x, word.y);

        // Conexões entre as palavras
        if (index > 0) {
            ctx.beginPath();
            ctx.moveTo(words[index - 1].x, words[index - 1].y);
            ctx.lineTo(word.x, word.y);
            ctx.strokeStyle = "#ffffff";
            ctx.stroke();
        }
    });

    requestAnimationFrame(updateWave);
}

// Função para criar palavras com posição aleatória
function createWords(searchQuery) {
    words.length = 0; // Limpar as palavras anteriores
    const cognateWords = getCognates(searchQuery);

    cognateWords.forEach((word, i) => {
        const x = Math.random() * (canvas.width - 100) + 50;
        const y = Math.random() * (canvas.height - 100) + 50;
        words.push({ text: word, x, y });
    });
}

// Simular busca de palavras cognatas
function getCognates(query) {
    // Exemplos de palavras relacionadas para simular
    const wordMap = {
        "água": ["oceano", "mar", "rio", "chuva", "lago"],
        "fogo": ["chama", "incêndio", "calor", "luz", "brasas"],
        "terra": ["solo", "planeta", "areia", "rocha", "pó"],
        "vento": ["brisa", "tempestade", "furacão", "sopro", "corrente"]
    };
    
    return wordMap[query.toLowerCase()] || ["palavra não encontrada"];
}

// Função para pesquisar a palavra
function searchWord() {
    const searchQuery = document.getElementById("search").value;
    if (searchQuery.length > 0) {
        createWords(searchQuery);
    }
}

// Iniciar a animação
updateWave();
