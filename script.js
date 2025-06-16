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
    const itemsPerLoad = 3; // 한 번에 3개씩 추가

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

// Copy address functionality
function copyAddress() {
    const address = document.querySelector('.address').textContent;
    const copyBtn = document.querySelector('.copy-btn');
    
    // Copy to clipboard
    navigator.clipboard.writeText(address).then(() => {
        // Change button text and style
        copyBtn.textContent = '복사됨';
        copyBtn.classList.add('copied');
        
        // Reset button after 2 seconds
        setTimeout(() => {
            copyBtn.textContent = '복사';
            copyBtn.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
        alert('주소 복사에 실패했습니다.');
    });
}

// Initialize calendar when the page loads
document.addEventListener('DOMContentLoaded', generateCalendar);

// 계좌번호 드롭다운 기능
document.addEventListener('DOMContentLoaded', function() {
    const dropdownBtns = document.querySelectorAll('.dropdown-btn');
    const dropdownContents = document.querySelectorAll('.dropdown-content');

    dropdownBtns.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            const content = dropdownContents[index];
            content.classList.toggle('show');
            this.textContent = content.classList.contains('show') ? '계좌번호 숨기기 ▲' : '계좌번호 보기 ▼';
        });
    });

    // 드롭다운 외부 클릭시 닫기
    document.addEventListener('click', function(event) {
        if (!event.target.matches('.dropdown-btn')) {
            dropdownContents.forEach((content, index) => {
                if (content.classList.contains('show')) {
                    content.classList.remove('show');
                    dropdownBtns[index].textContent = '계좌번호 보기 ▼';
                }
            });
        }
    });
}); 