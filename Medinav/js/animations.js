// Animation utilities using anime.js

const Animations = {
    // Animate elements on page load
    animatePageLoad: () => {
        anime({
            targets: '.fade-in-up',
            translateY: [20, 0],
            opacity: [0, 1],
            easing: 'easeOutExpo',
            duration: 1000,
            delay: anime.stagger(100)
        });
    },

    // Animate list items or grid items
    animateStagger: (selector) => {
        anime({
            targets: selector,
            translateX: [-20, 0],
            opacity: [0, 1],
            easing: 'easeOutExpo',
            duration: 800,
            delay: anime.stagger(100)
        });
    },

    // Button hover/click effect
    animateButton: (btn) => {
        anime({
            targets: btn,
            scale: [1, 0.95, 1],
            duration: 200,
            easing: 'easeInOutQuad'
        });
    },

    // Input focus animation
    animateInputFocus: (input) => {
        anime({
            targets: input,
            borderColor: ['#cbd5e1', '#2563eb'],
            duration: 300,
            easing: 'easeOutQuad'
        });
    },

    // Text reveal animation
    animateTextReveal: (selector) => {
        const textWrapper = document.querySelector(selector);
        if (textWrapper) {
            textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
            anime({
                targets: `${selector} .letter`,
                opacity: [0, 1],
                easing: "easeInOutQuad",
                duration: 2250,
                delay: (el, i) => 150 * (i + 1)
            });
        }
    }
};

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    Animations.animatePageLoad();

    // Attach button click animations
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', () => Animations.animateButton(btn));
    });

    // Attach input focus animations
    document.querySelectorAll('.form-input').forEach(input => {
        input.addEventListener('focus', () => Animations.animateInputFocus(input));
    });
});
