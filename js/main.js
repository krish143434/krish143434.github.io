(() => {
    const nav = document.getElementById('nav');
    const hamburger = document.getElementById('hamburger');
    const links = document.getElementById('nav-links');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ---- Mobile menu ----
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        links.classList.remove('open');
    }));

    // ---- Nav: background on scroll, hide on scroll down ----
    let lastY = 0;
    window.addEventListener('scroll', () => {
        const y = window.scrollY;
        nav.classList.toggle('scrolled', y > 20);
        nav.classList.toggle('hidden', y > lastY && y > 400 && !links.classList.contains('open'));
        lastY = y;
    }, { passive: true });

    // ---- Active section link ----
    const navAnchors = [...links.querySelectorAll('a')];
    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
            }
        });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('section[id]').forEach(s => sectionObserver.observe(s));

    // ---- Reveal on scroll (staggered within a parent) ----
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            const siblings = [...e.target.parentElement.children].filter(c => c.classList.contains('reveal'));
            const i = Math.max(0, siblings.indexOf(e.target));
            e.target.style.transitionDelay = `${Math.min(i * 70, 420)}ms`;
            e.target.classList.add('in');
            revealObserver.unobserve(e.target);
        });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // ---- Typing roles ----
    const roles = ['DevOps Engineer', 'MLOps Engineer', 'Platform Engineer', 'Kubernetes Operator Author', 'CI/CD Automation Nerd'];
    const typed = document.getElementById('typed');
    if (reduce) {
        typed.textContent = 'DevOps | MLOps | Platform Engineer';
    } else {
        let r = 0, c = 0, deleting = false;
        const tick = () => {
            const word = roles[r];
            typed.textContent = word.slice(0, c);
            if (!deleting && c < word.length) { c++; setTimeout(tick, 70); }
            else if (!deleting) { deleting = true; setTimeout(tick, 1600); }
            else if (c > 0) { c--; setTimeout(tick, 35); }
            else { deleting = false; r = (r + 1) % roles.length; setTimeout(tick, 300); }
        };
        setTimeout(tick, 600);
    }

    // ---- Count-up stats ----
    const counters = document.querySelectorAll('[data-count]');
    const countObserver = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            const el = e.target, target = +el.dataset.count;
            if (reduce) { el.textContent = target; return; }
            const start = performance.now(), dur = 1400;
            const step = now => {
                const p = Math.min((now - start) / dur, 1);
                el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
                if (p < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
            countObserver.unobserve(el);
        });
    }, { threshold: 0.6 });
    counters.forEach(c => countObserver.observe(c));

    // ---- Cursor glow + card spotlight ----
    const glow = document.querySelector('.cursor-glow');
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (fine && !reduce) {
        window.addEventListener('pointermove', e => {
            glow.style.left = e.clientX + 'px';
            glow.style.top = e.clientY + 'px';
        }, { passive: true });
        document.querySelectorAll('.x-card, .d-card, .stack-group, .commit').forEach(card => {
            card.addEventListener('pointermove', e => {
                const r = card.getBoundingClientRect();
                card.style.setProperty('--mx', `${e.clientX - r.left}px`);
                card.style.setProperty('--my', `${e.clientY - r.top}px`);
            });
        });
    } else {
        glow.style.display = 'none';
    }

    // ---- Copy email ----
    const copyBtn = document.getElementById('copy-email');
    copyBtn.addEventListener('click', async () => {
        const email = document.getElementById('email').textContent.trim();
        try { await navigator.clipboard.writeText(email); } catch (_) { /* ignore */ }
        copyBtn.classList.add('done');
        copyBtn.querySelector('span').textContent = 'copied!';
        setTimeout(() => {
            copyBtn.classList.remove('done');
            copyBtn.querySelector('span').textContent = 'copy';
        }, 1800);
    });

    // ---- Footer year ----
    document.getElementById('year').textContent = new Date().getFullYear();
})();
