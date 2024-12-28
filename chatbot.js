for (let i = 0; i < 100; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot';
    dot.style.width = `${Math.random() * 20}px`;
    dot.style.height = dot.style.width;
    dot.style.top = `${Math.random() * 100}vh`;
    dot.style.left = `${Math.random() * 100}vw`;
    document.body.appendChild(dot);
}