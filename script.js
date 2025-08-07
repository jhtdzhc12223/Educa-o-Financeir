document.addEventListener('DOMContentLoaded', function() {
    const book = document.getElementById('book');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const pages = document.querySelectorAll('.page');
    let currentPage = 1;
    const totalPages = pages.length;
    
    function showPage(pageNumber) {
        pages.forEach(page => page.style.display = 'none');
        document.getElementById(`page${pageNumber}`).style.display = 'block';
    }
    
    function turnPage(direction) {
        book.classList.add('turning');
        
        setTimeout(() => {
            if (direction === 'next' && currentPage < totalPages) {
                currentPage++;
            } else if (direction === 'prev' && currentPage > 1) {
                currentPage--;
            }
            
            showPage(currentPage);
            book.classList.remove('turning');
        }, 500);
    }
    
    prevBtn.addEventListener('click', () => turnPage('prev'));
    nextBtn.addEventListener('click', () => turnPage('next'));
    
    // Inicializa mostrando a primeira página
    showPage(1);
});
