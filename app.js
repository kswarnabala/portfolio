// Project videos
const video1 = document.getElementById('projectVideo1');
const video2 = document.getElementById('projectVideo2');
const video3 = document.getElementById('projectVideo3');
const video4 = document.getElementById('projectVideo4');
const video5 = document.getElementById('projectVideo5');
const video6 = document.getElementById('projectVideo6');

// Sidebar elements
const sideBar = document.querySelector('.sidebar');
const menu = document.querySelector('.menu-icon');
const closeIcon = document.querySelector('.close-icon');

const hoverSign = document.querySelector('.hover-sign');

// Video hover play/pause for existing project videos
const videoList = [video1, video2, video3, video4, video5, video6].filter(v => v !== null);

videoList.forEach(function (video) {
    video.addEventListener("mouseover", function () {
        video.play();
        if (hoverSign) hoverSign.classList.add("active");
    });
    video.addEventListener("mouseout", function () {
        video.pause();
        if (hoverSign) hoverSign.classList.remove("active");
    });
});

// Sidebar toggle
menu.addEventListener("click", function () {
    sideBar.classList.remove("close-sidebar");
    sideBar.classList.add("open-sidebar");
});

closeIcon.addEventListener("click", function () {
    sideBar.classList.remove("open-sidebar");
    sideBar.classList.add("close-sidebar");
});

// Animated counters for LeetCode stats
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            counter.textContent = Math.round(target * eased);

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                counter.textContent = target;
            }
        }
        requestAnimationFrame(update);
    });
}

// Trigger counter animation when LeetCode section is in view
const leetcodeSection = document.querySelector('.leetcode-section');
if (leetcodeSection) {
    let counterAnimated = false;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counterAnimated) {
                counterAnimated = true;
                animateCounters();
            }
        });
    }, { threshold: 0.3 });
    observer.observe(leetcodeSection);
}

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                // Close sidebar on mobile
                if (sideBar.classList.contains('open-sidebar')) {
                    sideBar.classList.remove('open-sidebar');
                    sideBar.classList.add('close-sidebar');
                }
            }
        }
    });
});