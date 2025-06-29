// Calendar generation
function generateCalendar() {
    const calendarGrid = document.querySelector('.calendar-grid');
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const weddingDate = new Date(2025, 8, 6); // September 6, 2025 (month is 0-based)
    
    // Add day headers
    days.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-day-header';
        dayHeader.textContent = day;
        calendarGrid.appendChild(dayHeader);
    });
    
    // Get first day of the month
    const firstDay = new Date(2025, 8, 1);
    const startingDay = firstDay.getDay();
    
    // Add empty cells for days before the first of the month
    for (let i = 0; i < startingDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'calendar-day empty';
        calendarGrid.appendChild(emptyCell);
    }
    
    // Add days of the month
    const daysInMonth = new Date(2025, 9, 0).getDate();
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div');
        dayCell.className = 'calendar-day';
        
        if (day === 6) {
            dayCell.className += ' wedding-day';
            dayCell.innerHTML = `<span>${day}</span>`;
        } else {
            dayCell.textContent = day;
        }
        
        calendarGrid.appendChild(dayCell);
    }
}


// Gallery load more functionality
document.addEventListener('DOMContentLoaded', function() {
    const loadMoreBtn = document.getElementById('load-more');
    const hiddenItems = document.querySelectorAll('.gallery-item.hidden');
    let currentIndex = 0;
    const itemsPerLoad = 4; // 한 번에 4개씩 추가

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // 다음 3개의 숨겨진 이미지를 표시
            for (let i = 0; i < itemsPerLoad; i++) {
                if (currentIndex < hiddenItems.length) {
                    hiddenItems[currentIndex].classList.remove('hidden');
                    currentIndex++;
                }
            }

            // 모든 이미지가 표시되면 버튼 숨기기
            if (currentIndex >= hiddenItems.length) {
                loadMoreBtn.style.display = 'none';
            }
        });
    }
});

function copy(accountNumber, button) {
    navigator.clipboard.writeText(accountNumber).then(() => {
        // Use the passed button element
        const originalText = button.textContent;
        
        // Change button text and style
        button.textContent = '복사됨';
        button.classList.add('copied');
        
        // Reset button after 2 seconds
        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy account number: ', err);
        alert('계좌번호 복사에 실패했습니다.');
    });
}

// Initialize calendar when the page loads
document.addEventListener('DOMContentLoaded', generateCalendar);

// 계좌번호 섹션 토글 기능
document.addEventListener('DOMContentLoaded', function() {
    const sectionToggles = document.querySelectorAll('.section-toggle');
    const sectionContents = document.querySelectorAll('.section-content');

    sectionToggles.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            const content = sectionContents[index];
            const section = this.closest('.account-section');
            
            // 다른 섹션들을 모두 닫기
            sectionContents.forEach((otherContent, otherIndex) => {
                if (otherIndex !== index && otherContent.classList.contains('show')) {
                    otherContent.classList.remove('show');
                    const otherBtnText = sectionToggles[otherIndex].textContent;
                    sectionToggles[otherIndex].textContent = otherBtnText.replace('숨기기 ▲', '보기 ▼');
                    sectionToggles[otherIndex].closest('.account-section').classList.remove('expanded');
                }
            });
            
            // 현재 섹션 토글
            content.classList.toggle('show');
            const isShowing = content.classList.contains('show');
            
            if (isShowing) {
                section.classList.add('expanded');
            } else {
                section.classList.remove('expanded');
            }
            
            this.textContent = this.textContent.replace(
                isShowing ? '보기 ▼' : '숨기기 ▲',
                isShowing ? '숨기기 ▲' : '보기 ▼'
            );
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('galleryModal');
    const modalImg = document.getElementById('modalImage');
    const galleryImages = document.querySelectorAll('.gallery-grid .gallery-item img');
    const closeBtn = document.querySelector('.close-modal');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');

    let currentIndex = 0;
    const imageSources = Array.from(galleryImages).map(img => img.src);

    function openModal(index) {
        currentIndex = index;
        modalImg.src = imageSources[currentIndex];
        modal.style.display = 'flex';
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % imageSources.length;
        modalImg.src = imageSources[currentIndex];
    }

    function showPrevImage() {
        currentIndex = (currentIndex - 1 + imageSources.length) % imageSources.length;
        modalImg.src = imageSources[currentIndex];
    }

    galleryImages.forEach((img, index) => {
        img.addEventListener('click', () => {
            openModal(index);
        });
    });

    closeBtn.addEventListener('click', closeModal);
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);

    // 모달 외부 클릭 시 닫기
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // 키보드(Esc, 화살표)로 제어
    document.addEventListener('keydown', (event) => {
        if (modal.style.display === 'flex') {
            if (event.key === 'Escape') {
                closeModal();
            } else if (event.key === 'ArrowLeft') {
                showPrevImage();
            } else if (event.key === 'ArrowRight') {
                showNextImage();
            }
        }
    });
}); 