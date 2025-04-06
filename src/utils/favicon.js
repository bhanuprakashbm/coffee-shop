/**
 * Dynamic favicon utility for Coffee House
 * Creates a canvas-based favicon with a coffee cup icon
 */

// Function to create and set the favicon
export const setFavicon = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    // Draw background
    ctx.fillStyle = '#c49b63';
    ctx.fillRect(0, 0, 64, 64);

    // Draw coffee cup
    ctx.beginPath();
    ctx.fillStyle = '#333';

    // Cup body
    ctx.roundRect(14, 20, 36, 30, 5);
    ctx.fill();

    // Cup handle
    ctx.beginPath();
    ctx.arc(46, 35, 8, -Math.PI / 2, Math.PI / 2);
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#333';
    ctx.stroke();

    // Coffee liquid
    ctx.beginPath();
    ctx.fillStyle = '#8b5a2b';
    ctx.roundRect(18, 24, 28, 22, 3);
    ctx.fill();

    // Steam
    ctx.beginPath();
    ctx.moveTo(25, 18);
    ctx.bezierCurveTo(25, 12, 30, 12, 30, 8);
    ctx.bezierCurveTo(30, 4, 25, 4, 25, 8);
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'white';
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(35, 18);
    ctx.bezierCurveTo(35, 14, 40, 14, 40, 10);
    ctx.bezierCurveTo(40, 6, 35, 6, 35, 10);
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'white';
    ctx.stroke();

    // Convert canvas to favicon
    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) {
        favicon.href = canvas.toDataURL('image/png');
    } else {
        const newFavicon = document.createElement('link');
        newFavicon.rel = 'icon';
        newFavicon.href = canvas.toDataURL('image/png');
        document.head.appendChild(newFavicon);
    }
};

// Polyfill for roundRect if not supported by browser
if (!CanvasRenderingContext2D.prototype.roundRect) {
    CanvasRenderingContext2D.prototype.roundRect = function (x, y, width, height, radius) {
        if (width < 2 * radius) radius = width / 2;
        if (height < 2 * radius) radius = height / 2;
        this.beginPath();
        this.moveTo(x + radius, y);
        this.arcTo(x + width, y, x + width, y + height, radius);
        this.arcTo(x + width, y + height, x, y + height, radius);
        this.arcTo(x, y + height, x, y, radius);
        this.arcTo(x, y, x + width, y, radius);
        this.closePath();
        return this;
    };
} 