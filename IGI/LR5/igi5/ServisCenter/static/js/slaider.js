document.addEventListener('DOMContentLoaded', () => {
    console.log('Скрипт начал выполнение');
    const slider = document.querySelector('.slider');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const slides = Array.from(slider.querySelectorAll('img'));
    const indicators = Array.from(document.querySelectorAll('.indicator'));
    const slideCount = slides.length;
    const slideCounter = document.querySelector('.slide-counter');
    const slideText = document.querySelector('.slide-text'); 
    let slideIndex = 1; 
    let slideInterval;
    let delay = 3000;
    let loop = true;
  
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slideCount - 1].cloneNode(true);
  
    slider.appendChild(firstClone);
    slider.insertBefore(lastClone, slides[0]);
  
    const imageWidth = slider.clientWidth;
    slider.style.transform = `translateX(${-imageWidth}px)`;
  
    const slide = () => {
        slider.style.transition = 'transform 0.5s ease-in-out';
        const slideOffset = -slideIndex * imageWidth;
        slider.style.transform = `translateX(${slideOffset}px)`;
  
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === (slideIndex - 1 + slideCount) % slideCount);
        });
  
        let displayIndex = (slideIndex - 1 + slideCount) % slideCount + 1;
        slideCounter.textContent = `${displayIndex}/${slideCount}`;
        
        const currentSlide = slides[displayIndex - 1];
        const text = currentSlide.getAttribute('data-text');
        slideText.textContent = text;
    };
  
    const changeSlide = (direction) => {
        slideIndex += direction;
        if (loop) {
            if (slideIndex < 1) {
                slideIndex = slideCount;
                setTimeout(() => {
                    slider.style.transition = 'none';  // Disable transition for clone
                    slider.style.transform = `translateX(${-slideIndex * imageWidth}px)`;
                }, 500);
            } else if (slideIndex > slideCount) {
                slideIndex = 1;
                setTimeout(() => {
                    slider.style.transition = 'none';  // Disable transition for clone
                    slider.style.transform = `translateX(${-imageWidth}px)`;
                }, 500);
            }
        } else {
            slideIndex = Math.max(1, Math.min(slideCount, slideIndex));  // Clamp index
        }
        slide();
    };

    prevButton.addEventListener('click', () => changeSlide(-1));
    nextButton.addEventListener('click', () => changeSlide(1));
  
    const autoSlide = () => {
        if (loop) {
            changeSlide(1);
        }
    };
  
    const startAutoSlide = (delay) => {
        slideInterval = setInterval(autoSlide, delay);
    };
  
    const stopAutoSlide = () => {
        clearInterval(slideInterval);
    };
    
    slider.addEventListener('mouseenter', stopAutoSlide);
    slider.addEventListener('mouseleave', () => startAutoSlide(delay));
    
    window.addEventListener('load', () => {
        slide();
        startAutoSlide(delay); 
    });
});