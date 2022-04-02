// Updates the year
const copyrightYearEl = document.querySelector('.year');
const currentYear = new Date().getFullYear();
copyrightYearEl.textContent = currentYear;

// Toggles the nav on mobile
const navBtnEl = document.querySelector('.btn-mobile-nav');
const headerEl = document.querySelector('.header');

navBtnEl.addEventListener('click', () => {
    headerEl.classList.toggle('nav-open');
});

// Smooths the scroll
const allLinks = document.querySelectorAll('a:link');

for (const link of allLinks) {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');

        if (href === '#') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        } else if (href.startsWith('#')) {
            const sectionEl = document.querySelector(href);
            sectionEl.scrollIntoView({ behavior: 'smooth' });

            if (link.classList.contains('main-nav-link'))
                headerEl.classList.toggle('nav-open');
        }
    });
}

// Stickies the nav
const sectionHeroEl = document.querySelector('.section-hero');
const observer = new IntersectionObserver(
    (entries) => {
        const entry = entries[0];
        document.body.classList.toggle('sticky', !entry.isIntersecting);
    },
    {
        threshold: 0,
        rootMargin: '-80px',
    }
);
observer.observe(sectionHeroEl);

// Fixes flexbox gap property missing in some Safari version
(() => {
    const flexContainer = document.createElement('div');
    flexContainer.style.display = 'flex';
    flexContainer.style.flexDirection = 'column';
    flexContainer.style.rowGap = '1px';

    flexContainer.appendChild(document.createElement('div'));
    flexContainer.appendChild(document.createElement('div'));

    document.body.appendChild(flexContainer);
    const isFlexGapSupported = flexContainer.scrollHeight === 1;
    flexContainer.parentNode.removeChild(flexContainer);

    document.body.classList.toggle('no-flexbox-gap', !isFlexGapSupported);
})();
