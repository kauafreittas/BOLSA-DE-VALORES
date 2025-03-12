document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();
    
    // Coletando os dados do login
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validação simples
    if (email && password) {
        alert('Login bem-sucedido!');
        getStockData();  // Chama a função para buscar dados de ações
    } else {
        alert('Por favor, preencha todos os campos!');
    }
});

// Função para buscar dados da API do Azure Durable Function
function getStockData() {
    fetch('https://<SEU_FUNCTION_APP_URL>/api/yourDurableFunction')  // URL do seu Durable Function
        .then(response => response.json())
        .then(data => {
            // Exibir os dados de ações no site
            const stockData = document.getElementById('stock-data');
            let htmlContent = '<ul>';
            for (let time in data) {
                htmlContent += `<li>${time}: ${data[time]['1. open']}</li>`;
            }
            htmlContent += '</ul>';
            stockData.innerHTML = htmlContent;
        })
        .catch(error => {
            console.error('Erro ao obter dados:', error);
            document.getElementById('stock-data').innerHTML = 'Erro ao carregar os dados.';
        });
}


