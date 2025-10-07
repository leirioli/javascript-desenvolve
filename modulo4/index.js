let estoque = [
    { titulo: 'O Senhor dos Anéis', autor: 'J.R.R. Tolkien', quantidade: 10 },
    { titulo: '1984', autor: 'George Orwell', quantidade: 5 },
    { titulo: 'Dom Quixote', autor: 'Miguel de Cervantes', quantidade: 3 }
];

function adicionarLivro(titulo, autor, quantidade) {
    const livroExistente = estoque.find(livro => livro.titulo === titulo);

    if (livroExistente) {
        console.log(`Erro: O livro "${titulo}" já existe no estoque.`);
    } else {
        const novoLivro = { titulo, autor, quantidade };
        estoque.push(novoLivro);
        console.log(`Sucesso: O livro "${titulo}" foi adicionado ao estoque.`);
    }
}

function removerLivro(titulo) {
    const tamanhoOriginal = estoque.length;
    estoque = estoque.filter(livro => livro.titulo !== titulo);

    if (estoque.length < tamanhoOriginal) {
        console.log(`Sucesso: O livro "${titulo}" foi removido do estoque.`);
    } else {
        console.log(`Erro: O livro "${titulo}" não foi encontrado no estoque.`);
    }
}

function atualizarQuantidade(titulo, novaQuantidade) {
    const livroParaAtualizar = estoque.find(livro => livro.titulo === titulo);

    if (livroParaAtualizar) {
        livroParaAtualizar.quantidade = novaQuantidade;
        console.log(`Sucesso: A quantidade do livro "${titulo}" foi atualizada para ${novaQuantidade}.`);
    } else {
        console.log(`Erro: O livro "${titulo}" não foi encontrado no estoque.`);
    }
}

function listarLivros() {
    console.log("\n--- Lista de Livros no Estoque ---");

    if (estoque.length === 0) {
        console.log("O estoque está vazio.");
        return;
    }

    estoque.forEach(livro => {
        console.log(`- Título: ${livro.titulo}, Autor: ${livro.autor}, Quantidade: ${livro.quantidade}`);
    });
    console.log("----------------------------------\n");
}

// demo

console.log("## ESTADO INICIAL ##");
listarLivros();

console.log("## ADICIONANDO LIVROS ##");
adicionarLivro('O Hobbit', 'J.R.R. Tolkien', 15);
adicionarLivro('1984', 'George Orwell', 10);
listarLivros();

console.log("## ATUALIZANDO QUANTIDADE ##");
atualizarQuantidade('O Senhor dos Anéis', 8);
atualizarQuantidade('A Revolução dos Bichos', 5);
listarLivros();

console.log("## REMOVENDO LIVROS ##");
removerLivro('Dom Quixote');
removerLivro('O Pequeno Príncipe');
listarLivros();