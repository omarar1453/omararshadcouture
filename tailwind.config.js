/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'maroon-deep': '#4A0404',
                'maroon-muted': '#3a0000',
                'gold-champagne': '#C5A059',
                'gold-light': '#e2c08d',
                'cream-soft': '#FFFDD0',
                'cream-paper': '#f9f6e5',
                'text-primary': '#1a1a1a', // Charcoal
                'text-secondary': '#5a5a5a', // Grey
                'black-rich': '#1a1a1a', // Re-mapped to charcoal for softer darks
                'ivory-luxury': '#FCF9F2', // New Main Background
                'gold-luxury': '#D4AF37', // Reflective Gold
                'gold-champagne': '#C5A059', // Muted Gold
                'white-pure': '#FFFFFF',
            }
        },
    },
    plugins: [],
}
