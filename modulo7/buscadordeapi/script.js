document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const usernameInput = document.getElementById('username-input');
    const resultsContainer = document.getElementById('results-container');
    const errorMessage = document.getElementById('error-message');

    // Adiciona o evento de clique no botão de busca
    searchButton.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        if (username) {
            searchUser(username);
        } else {
            // Limpa resultados anteriores e mostra uma mensagem se o campo estiver vazio
            resultsContainer.innerHTML = '';
            errorMessage.textContent = 'Por favor, digite um nome de usuário.';
            errorMessage.classList.remove('hidden');
        }
    });

    /**
     * Função para buscar o usuário na API do GitHub.
     * @param {string} username - O nome de usuário a ser buscado.
     */
    async function searchUser(username) {
        // Oculta a mensagem de erro e limpa os resultados anteriores
        errorMessage.classList.add('hidden');
        resultsContainer.innerHTML = 'Carregando...';

        try {
            // Constrói a URL da API do GitHub para buscar um único usuário
            const url = `https://api.github.com/users/${username}`;
            
            // Faz a requisição à API
            const response = await fetch(url);

            // Verifica se a resposta foi bem-sucedida (status 200)
            if (response.ok) {
                const userData = await response.json();
                displayUser(userData);
            } else if (response.status === 404) {
                // Usuário não encontrado
                resultsContainer.innerHTML = ''; // Limpa "Carregando..."
                errorMessage.textContent = 'Não foram encontrados usuários para esta pesquisa.';
                errorMessage.classList.remove('hidden');
            } else {
                // Outro erro de API
                throw new Error(`Erro na API: ${response.status}`);
            }

        } catch (error) {
            console.error('Erro ao buscar o usuário:', error);
            resultsContainer.innerHTML = '';
            errorMessage.textContent = 'Ocorreu um erro ao conectar-se à API. Tente novamente mais tarde.';
            errorMessage.classList.remove('hidden');
        }
    }

    /**
     * Função para exibir os dados do usuário na interface.
     * @param {object} user - O objeto de dados do usuário retornado pela API.
     */
    function displayUser(user) {
        // Limpa a área de resultados
        resultsContainer.innerHTML = '';

        // Cria o card do usuário
        const userCard = document.createElement('div');
        userCard.classList.add('user-card');

        // Cria a imagem do avatar
        const avatar = document.createElement('img');
        avatar.classList.add('user-avatar');
        avatar.src = user.avatar_url;
        avatar.alt = `Avatar de ${user.login}`;

        // Cria o bloco de informações
        const infoBlock = document.createElement('div');
        infoBlock.classList.add('user-info');
        
        infoBlock.innerHTML = `
            <h2>${user.name || user.login}</h2>
            <p><strong>Usuário:</strong> <a href="${user.html_url}" target="_blank">@${user.login}</a></p>
            <p><strong>Seguidores:</strong> ${user.followers}</p>
            <p><strong>Repositórios Públicos:</strong> ${user.public_repos}</p>
            <p><strong>Localização:</strong> ${user.location || 'Não informada'}</p>
            ${user.bio ? `<p><strong>Bio:</strong> ${user.bio}</p>` : ''}
        `;

        // Adiciona os elementos ao container
        userCard.appendChild(avatar);
        userCard.appendChild(infoBlock);
        resultsContainer.appendChild(userCard);
    }
});