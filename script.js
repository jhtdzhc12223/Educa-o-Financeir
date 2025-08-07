document.addEventListener('DOMContentLoaded', function() {
    const capa = document.querySelector('.capa');
    const paginas = document.querySelectorAll('.pagina:not(.frente)');
    const btnAnterior = document.getElementById('anterior');
    const btnProximo = document.getElementById('proximo');
    const indicador = document.getElementById('indicador');
    
    let paginaAtual = 1;
    const totalPaginas = paginas.length + 1; // Incluindo a capa
    
    // Função para atualizar a exibição
    function atualizarPagina(direcao) {
        // Animação da capa (só na primeira virada)
        if (paginaAtual === 1 && direcao === 'proximo') {
            capa.classList.add('virada');
            setTimeout(() => {
                capa.style.display = 'none';
                document.getElementById('pagina1').classList.add('visivel');
            }, 600);
        } else if (paginaAtual === 2 && direcao === 'anterior') {
            capa.style.display = 'flex';
            setTimeout(() => {
                capa.classList.remove('virada');
                document.getElementById('pagina1').classList.remove('visivel');
            }, 50);
        }
        
        // Animação das páginas internas
        if (paginaAtual > 1 && paginaAtual < totalPaginas) {
            const paginaAtualElement = document.getElementById(`pagina${paginaAtual}`);
            paginaAtualElement.classList.remove('visivel');
            
            setTimeout(() => {
                if (direcao === 'proximo' && paginaAtual < totalPaginas - 1) {
                    document.getElementById(`pagina${paginaAtual + 1}`).classList.add('visivel');
                } else if (direcao === 'anterior' && paginaAtual > 2) {
                    document.getElementById(`pagina${paginaAtual - 1}`).classList.add('visivel');
                }
            }, 300);
        }
        
        // Atualizar indicador
        if (direcao === 'proximo' && paginaAtual < totalPaginas) {
            paginaAtual++;
        } else if (direcao === 'anterior' && paginaAtual > 1) {
            paginaAtual--;
        }
        
        indicador.textContent = `Página ${Math.max(1, paginaAtual - 1)} de ${totalPaginas - 1}`;
        
        // Controlar visibilidade dos botões
        btnAnterior.style.visibility = paginaAtual > 2 ? 'visible' : 'hidden';
        btnProximo.style.visibility = paginaAtual < totalPaginas ? 'visible' : 'hidden';
    }
    
    // Event listeners
    btnProximo.addEventListener('click', () => atualizarPagina('proximo'));
    btnAnterior.addEventListener('click', () => atualizarPagina('anterior'));
    
    // Inicialização
    btnAnterior.style.visibility = 'hidden';
    indicador.textContent = `Página 1 de ${totalPaginas - 1}`;
    
    // Suporte para teclado
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') {
            if (paginaAtual < totalPaginas) {
                atualizarPagina('proximo');
            }
        } else if (e.key === 'ArrowLeft') {
            if (paginaAtual > 1) {
                atualizarPagina('anterior');
            }
        }
    });
});
