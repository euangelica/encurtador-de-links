const urlInput = document.getElementById('urlInput');
const shortenBtn = document.getElementById('shortenBtn');
const resultContainer = document.getElementById('resultContainer');
const shortUrlInput = document.getElementById('shortUrl');
const copyBtn = document.getElementById('copyBtn');

shortenBtn.addEventListener('click', async () => {
    const longUrl = urlInput.value.trim();

    if (!longUrl) {
        alert('Por favor, insira uma URL válida!');
        return;
    }

    shortenBtn.textContent = 'Encurtando...';
    shortenBtn.disabled = true;

    try {
        // Usando a API do TinyURL
        const apiUrl = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`;
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error('Erro na resposta da rede');
        }

        const shortUrl = await response.text();

        if (shortUrl) {
            shortUrlInput.value = shortUrl;
            resultContainer.classList.remove('hidden');
        } else {
            alert('Não foi possível encurtar o link.');
        }
    } catch (error) {
        console.error('Erro ao conectar com a API:', error);
        alert('Ocorreu um erro ao encurtar o link. Tente novamente.');
    } finally {
        shortenBtn.textContent = 'Encurtar';
        shortenBtn.disabled = false;
    }
});

copyBtn.addEventListener('click', () => {
    shortUrlInput.select();
    shortUrlInput.setSelectionRange(0, 9999);

    navigator.clipboard.writeText(shortUrlInput.value);

    copyBtn.textContent = 'Copiado!';
    setTimeout(() => {
        copyBtn.textContent = 'Copiar';
    }, 2000);
});