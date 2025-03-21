// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const nav = document.querySelector('.navbar');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    hamburger.classList.toggle('active');
});

// Sample project data
const projects = [
    {
        title: 'Proje Yönetim Uygulaması',
        description: 'Gerçek zamanlı güncellemelerle tam kapsamlı proje yönetim aracı',
        image: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        tech: ['React', 'Node.js', 'MongoDB']
    },
    {
        title: 'Yapay Zeka Sohbet Botu',
        description: 'Makine öğrenimi ile güçlendirilmiş akıllı sohbet robotu',
        image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        tech: ['Python', 'TensorFlow', 'Flask']
    },
    {
        title: 'E-Ticaret Platformu',
        description: 'Modern ödeme entegrasyonlu e-ticaret çözümü',
        image: 'https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        tech: ['Vue.js', 'Express', 'PostgreSQL']
    }
];

// Sample team data
const team = [
    {
        name: 'Ahmet Yılmaz',
        role: 'Kulüp Başkanı',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        github: '#'
    },
    {
        name: 'Ayşe Demir',
        role: 'Teknik Lider',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        github: '#'
    },
    {
        name: 'Mehmet Kaya',
        role: 'Full Stack Geliştirici',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        github: '#'
    }
];

// Add scroll animation to elements
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add fade-in class to elements we want to animate
document.querySelectorAll('section:not(.hero)').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

// Populate projects with animation
const projectGrid = document.querySelector('.project-grid');
projects.forEach((project, index) => {
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card';
    projectCard.style.animationDelay = `${index * 0.2}s`;
    projectCard.innerHTML = `
        <img src="${project.image}" alt="${project.title}">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="tech-stack">
            ${project.tech.map(tech => `<span>${tech}</span>`).join('')}
        </div>
    `;
    projectGrid.appendChild(projectCard);
});

// Populate team members with animation
const teamGrid = document.querySelector('.team-grid');
team.forEach((member, index) => {
    const memberCard = document.createElement('div');
    memberCard.className = 'team-card';
    memberCard.style.animationDelay = `${index * 0.2}s`;
    memberCard.innerHTML = `
        <img src="${member.image}" alt="${member.name}">
        <h3>${member.name}</h3>
        <p>${member.role}</p>
        <a href="${member.github}" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-github"></i>
        </a>
    `;
    teamGrid.appendChild(memberCard);
});

// Add scroll-based navbar background
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Form submission with animation
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('.submit-btn');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Gönderiliyor...';
    
    // Simulate form submission delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    console.log('Form gönderildi:', data);
    
    // Show success message with animation
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Gönderildi!';
    submitBtn.style.background = '#10B981';
    
    setTimeout(() => {
        submitBtn.innerHTML = 'Mesaj Gönder';
        submitBtn.style.background = '';
        contactForm.reset();
    }, 2000);
});

// Smooth scrolling with offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            navLinks.style.display = 'none';
            hamburger.classList.remove('active');
        }
    });
});

// Add some additional styles for project and team cards
const style = document.createElement('style');
style.textContent = `
    .project-card {
        background: white;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease;
    }

    .project-card:hover {
        transform: translateY(-5px);
    }

    .project-card img {
        width: 100%;
        height: 200px;
        object-fit: cover;
    }

    .project-card h3 {
        padding: 1.5rem 1.5rem 0.5rem;
        font-size: 1.25rem;
    }

    .project-card p {
        padding: 0 1.5rem 1rem;
        color: #666;
    }

    .tech-stack {
        padding: 0 1.5rem 1.5rem;
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }

    .tech-stack span {
        background: var(--light-bg);
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        font-size: 0.875rem;
        color: var(--primary-color);
    }

    .team-card {
        background: white;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        text-align: center;
        padding: 2rem;
        transition: transform 0.3s ease;
    }

    .team-card:hover {
        transform: translateY(-5px);
    }

    .team-card img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        margin-bottom: 1rem;
    }

    .team-card h3 {
        margin-bottom: 0.5rem;
    }

    .team-card p {
        color: #666;
        margin-bottom: 1rem;
    }

    .team-card a {
        color: var(--primary-color);
        font-size: 1.5rem;
        transition: color 0.3s ease;
    }

    .team-card a:hover {
        color: var(--secondary-color);
    }
`;
document.head.appendChild(style); 