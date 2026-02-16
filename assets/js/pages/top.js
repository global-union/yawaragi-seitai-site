document.addEventListener('DOMContentLoaded', function () {
    console.log('Top page scripts loaded');

    // Reviews Slider
    const slider = document.querySelector('.reviews-slider');
    const slides = document.querySelectorAll('.review-slide');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;
    const slideInterval = 5000; // 5 seconds
    let autoSlideInterval;

    if (slider && slides.length > 0) {
        function goToSlide(index) {
            if (index < 0) {
                currentIndex = slides.length - 1;
            } else if (index >= slides.length) {
                currentIndex = 0;
            } else {
                currentIndex = index;
            }

            const translateX = -(currentIndex * 100);
            slider.style.transform = `translateX(${translateX}%)`;

            // Update dots
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        }

        function nextSlide() {
            goToSlide(currentIndex + 1);
        }

        // Auto Play
        function startSlideShow() {
            autoSlideInterval = setInterval(nextSlide, slideInterval);
        }

        function stopSlideShow() {
            clearInterval(autoSlideInterval);
        }

        // Initialize
        goToSlide(0);
        startSlideShow();

        // Event Listeners for Dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                stopSlideShow();
                goToSlide(index);
                startSlideShow(); // Restart timer
            });
        });

        // Optional: Pause on hover
        slider.addEventListener('mouseenter', stopSlideShow);
        slider.addEventListener('mouseleave', startSlideShow);
    }
});
