document.addEventListener('DOMContentLoaded', function() {
    const flipbook = document.getElementById('flipbook');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const currentPageSpan = document.getElementById('current-page');
    const totalPagesSpan = document.getElementById('total-pages');
    
    const pages = [
        'cover', 'page1', 'page2', 'page3', 'page4', 'page5', 'back-cover'
    ];
    
    let currentPageIndex = 0;
    const totalPages = pages.length;
    totalPagesSpan.textContent = totalPages - 1;
    
    function updatePage() {
        pages.forEach(pageId => {
            document.getElementById(pageId).style.display = 'none';
        });
        
        document.getElementById(pages[currentPageIndex]).style.display = 'flex';
        currentPageSpan.textContent = Math.max(1, currentPageIndex);
        
        prevBtn.disabled = currentPageIndex === 0;
        nextBtn.disabled = currentPageIndex === totalPages - 1;
    }
    
    function flipPage(direction) {
        flipbook.classList.add('flipping');
        
        setTimeout(() => {
            if (direction === 'next' && currentPageIndex < totalPages - 1) {
                currentPageIndex++;
            } else if (direction === 'prev' && currentPageIndex > 0) {
                currentPageIndex--;
            }
            
            updatePage();
            flipbook.classList.remove('flipping');
        }, 500);
    }
    
    prevBtn.addEventListener('click', () => flipPage('prev'));
    nextBtn.addEventListener('click', () => flipPage('next'));
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft' && currentPageIndex > 0) {
            flipPage('prev');
        } else if (e.key === 'ArrowRight' && currentPageIndex < totalPages - 1) {
            flipPage('next');
        }
    });
    
    let touchStartX = 0;
    
    flipbook.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    flipbook.addEventListener('touchend', function(e) {
        const touchEndX = e.changedTouches[0].screenX;
        const diff = touchEndX - touchStartX;
        
        if (Math.abs(diff) > 50) {
            if (diff < 0 && currentPageIndex < totalPages - 1) {
                flipPage('next');
            } else if (diff > 0 && currentPageIndex > 0) {
                flipPage('prev');
            }
        }
    }, false);
    
    updatePage();
});
