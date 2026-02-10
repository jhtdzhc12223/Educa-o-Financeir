document.addEventListener('DOMContentLoaded', function() {
    // Inicializar sistema
    console.log('Sistema Future Finance inicializando...');
    
    // Elementos principais
    const flipbook = document.getElementById('flipbook');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const currentPageSpan = document.getElementById('current-page');
    const totalPagesSpan = document.getElementById('total-pages');
    const hologramSound = document.getElementById('hologram-sound');
    
    // Configuração das páginas
    const pages = [
        'cover', 'page1', 'page2', 'page3', 'page4', 'page5', 'back-cover'
    ];
    
    let currentPageIndex = 0;
    const totalPages = pages.length;
    totalPagesSpan.textContent = '06'; // Páginas de conteúdo
    
    // Sistema de áudio
    function playHologramSound() {
        if (hologramSound) {
            hologramSound.currentTime = 0;
            hologramSound.play().catch(e => console.log("Som automático bloqueado pelo navegador"));
        }
    }
    
    // Sistema de partículas
    function initParticles() {
        if (window.particlesJS) {
            particlesJS('particles-js', {
                particles: {
                    number: { value: 80, density: { enable: true, value_area: 800 } },
                    color: { value: ["#00f3ff", "#ff00ff", "#00ff41"] },
                    shape: { type: "circle" },
                    opacity: { value: 0.5, random: true },
                    size: { value: 3, random: true },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: "#00f3ff",
                        opacity: 0.2,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: "none",
                        random: true,
                        straight: false,
                        out_mode: "out",
                        bounce: false
                    }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: { enable: true, mode: "repulse" },
                        onclick: { enable: true, mode: "push" }
                    }
                },
                retina_detect: true
            });
        }
    }
    
    // Atualizar página atual
    function updatePage() {
        // Esconder todas as páginas
        pages.forEach(pageId => {
            const page = document.getElementById(pageId);
            if (page) {
                page.style.display = 'none';
                page.classList.remove('active');
            }
        });
        
        // Mostrar página atual
        const currentPage = document.getElementById(pages[currentPageIndex]);
        if (currentPage) {
            currentPage.style.display = 'flex';
            currentPage.classList.add('active');
            
            // Efeito de entrada
            currentPage.style.animation = 'none';
            setTimeout(() => {
                currentPage.style.animation = 'slideInUp 0.5s ease-out';
            }, 10);
        }
        
        // Atualizar indicador
        const displayPage = Math.max(1, currentPageIndex);
        currentPageSpan.textContent = displayPage.toString().padStart(2, '0');
        
        // Atualizar botões
        prevBtn.disabled = currentPageIndex === 0;
        nextBtn.disabled = currentPageIndex === totalPages - 1;
        
        // Efeitos visuais para botões
        [prevBtn, nextBtn].forEach(btn => {
            if (btn.disabled) {
                btn.style.opacity = '0.3';
                btn.style.cursor = 'not-allowed';
            } else {
                btn.style.opacity = '1';
                btn.style.cursor = 'pointer';
            }
        });
        
        // Tocar som de transição
        playHologramSound();
        
        // Efeitos especiais por página
        activatePageEffects(currentPageIndex);
        
        console.log(`Página ${displayPage}/${totalPages - 1} ativada`);
    }
    
    // Efeitos específicos por página
    function activatePageEffects(pageIndex) {
        // Resetar todos os efeitos
        document.querySelectorAll('.brain-lobe').forEach(lobe => {
            lobe.style.transform = 'scale(1)';
            lobe.style.boxShadow = 'none';
        });
        
        document.querySelectorAll('.crypto-card').forEach(card => {
            card.style.transform = 'translateY(0)';
        });
        
        // Ativar efeitos baseados na página
        switch(pageIndex) {
            case 2: // Página de Neuroeconomia
                setTimeout(() => {
                    const lobes = document.querySelectorAll('.brain-lobe');
                    lobes.forEach((lobe, i) => {
                        setTimeout(() => {
                            lobe.style.transform = 'scale(1.1)';
                            lobe.style.boxShadow = `0 0 20px ${getLobeColor(lobe.dataset.lobe)}`;
                        }, i * 300);
                    });
                }, 500);
                break;
                
            case 3: // Página de Cripto
                setTimeout(() => {
                    const cryptoCards = document.querySelectorAll('.crypto-card');
                    cryptoCards.forEach((card, i) => {
                        setTimeout(() => {
                            card.style.transform = 'translateY(-10px)';
                        }, i * 200);
                    });
                }, 500);
                break;
                
            case 5: // Página de Conclusão
                setTimeout(() => {
                    const stats = document.querySelectorAll('.stat-cyber');
                    stats.forEach((stat, i) => {
                        setTimeout(() => {
                            stat.style.transform = 'scale(1.1)';
                            setTimeout(() => {
                                stat.style.transform = 'scale(1)';
                            }, 300);
                        }, i * 300);
                    });
                }, 500);
                break;
        }
    }
    
    function getLobeColor(lobeType) {
        switch(lobeType) {
            case 'prefrontal': return '#00f3ff';
            case 'amygdala': return '#ff00ff';
            case 'striatum': return '#00ff41';
            default: return '#ffffff';
        }
    }
    
    // Virar página
    function flipPage(direction) {
        if (direction === 'next' && currentPageIndex < totalPages - 1) {
            currentPageIndex++;
            flipbook.classList.add('flipping');
            setTimeout(() => {
                flipbook.classList.remove('flipping');
                updatePage();
            }, 800);
        } else if (direction === 'prev' && currentPageIndex > 0) {
            currentPageIndex--;
            flipbook.classList.add('flipping');
            setTimeout(() => {
                flipbook.classList.remove('flipping');
                updatePage();
            }, 800);
        }
    }
    
    // Event Listeners
    prevBtn.addEventListener('click', () => flipPage('prev'));
    nextBtn.addEventListener('click', () => flipPage('next'));
    
    // Navegação por teclado
    document.addEventListener('keydown', function(e) {
        switch(e.key) {
            case 'ArrowLeft':
            case 'a':
            case 'A':
                if (currentPageIndex > 0) flipPage('prev');
                break;
            case 'ArrowRight':
            case 'd':
            case 'D':
            case ' ':
                if (currentPageIndex < totalPages - 1) flipPage('next');
                break;
            case 'Home':
                currentPageIndex = 0;
                updatePage();
                break;
            case 'End':
                currentPageIndex = totalPages - 1;
                updatePage();
                break;
        }
    });
    
    // Navegação por swipe (toque)
    let touchStartX = 0;
    let touchStartY = 0;
    
    flipbook.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }, false);
    
    flipbook.addEventListener('touchend', function(e) {
        const touchEndX = e.changedTouches[0].screenX;
        const touchEndY = e.changedTouches[0].screenY;
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;
        
        // Verificar se é um swipe horizontal (não vertical)
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX < 0 && currentPageIndex < totalPages - 1) {
                flipPage('next');
            } else if (diffX > 0 && currentPageIndex > 0) {
                flipPage('prev');
            }
        }
    }, false);
    
    // Interatividade dos elementos
    document.querySelectorAll('.brain-lobe').forEach(lobe => {
        lobe.addEventListener('click', function() {
            const lobeType = this.dataset.lobe;
            alert(`Córtex ${lobeType.toUpperCase()} ativado!\nEsta área controla aspectos importantes da tomada de decisão financeira.`);
            
            // Efeito visual
            this.style.transform = 'scale(1.2)';
            this.style.boxShadow = `0 0 30px ${getLobeColor(lobeType)}`;
            setTimeout(() => {
                this.style.transform = 'scale(1.1)';
                this.style.boxShadow = `0 0 20px ${getLobeColor(lobeType)}`;
            }, 300);
        });
    });
    
    document.querySelectorAll('.crypto-card').forEach(card => {
        card.addEventListener('click', function() {
            const cryptoName = this.querySelector('h5').textContent;
            alert(`${cryptoName} selecionado!\nEsta criptomoeda representa uma nova era de ativos digitais descentralizados.`);
            
            // Efeito visual
            this.style.transform = 'translateY(-5px) scale(1.05)';
            setTimeout(() => {
                this.style.transform = 'translateY(-5px)';
            }, 200);
        });
    });
    
    // Botão AR
    const arButton = document.querySelector('.ar-button');
    if (arButton) {
        arButton.addEventListener('click', function() {
            alert('MODO REALIDADE AUMENTADA ATIVADO!\nVisualize seus ativos financeiros em 3D no seu ambiente. Use óculos VR para experiência completa.');
            
            // Efeito visual
            this.style.background = 'linear-gradient(45deg, #ff00ff, #9d00ff)';
            setTimeout(() => {
                this.style.background = 'linear-gradient(45deg, #9d00ff, #ff00ff)';
            }, 300);
        });
    }
    
    // Reiniciar experiência
    const restartPrompt = document.querySelector('.restart-prompt');
    if (restartPrompt) {
        restartPrompt.addEventListener('click', function() {
            if (confirm('REINICIAR EXPERIÊNCIA HOLOGRÁFICA?\nVoltar para o início do sistema?')) {
                currentPageIndex = 0;
                updatePage();
                alert('SISTEMA REINICIADO\nBem-vindo à Revolução Financeira 5.0!');
            }
        });
    }
    
    // Efeitos de inicialização
    function initEffects() {
        // Sequência de inicialização
        console.log('Inicializando efeitos holográficos...');
        
        // Animar ícones flutuantes
        const floatingIcons = document.querySelectorAll('.floating-icon');
        floatingIcons.forEach((icon, i) => {
            icon.style.animationDelay = `${i * 5}s`;
        });
        
        // Inicializar partículas
        setTimeout(initParticles, 1000);
        
        // Mensagem de boas-vindas
        setTimeout(() => {
            console.log('Sistema Future Finance pronto!');
            console.log('Bem-vindo à revolução financeira!');
        }, 2000);
    }
    
    // Inicializar
    updatePage();
    initEffects();
    
    // Expor funções para debugging
    window.flipPage = flipPage;
    window.goToPage = (index) => {
        if (index >= 0 && index < totalPages) {
            currentPageIndex = index;
            updatePage();
        }
    };
    
    console.log('Sistema Future Finance carregado com sucesso!');
    console.log('Comandos disponíveis: flipPage("next"/"prev"), goToPage(index)');
});
