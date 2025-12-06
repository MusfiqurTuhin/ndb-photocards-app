
import html2canvas from 'html2canvas';

export const downloadImage = async (elementId, filename) => {
    const element = document.getElementById(elementId);
    if (!element) return;

    try {
        const canvas = await html2canvas(element, {
            scale: 3, // High Res
            useCORS: true,
            allowTaint: true,
            backgroundColor: null,
        });
        const link = document.createElement('a');
        link.download = `${filename}-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    } catch (err) {
        console.error("Download failed", err);
        alert("Download failed. Please try again.");
    }
};

export const getThemeStyles = (theme) => {
    if (theme === 'classic') return {
        bgColor: '#E5E6DA',
        headlineColor: '#B31D31',
        bodyColor: '#000000',
        authorColor: '#B31D31',
        footerColor: '#4B5563',
        showBorder: true,
    };
    if (theme === 'modern') return {
        bgColor: '#FFFFFF',
        headlineColor: '#B31D31',
        bodyColor: '#1a1a1a',
        authorColor: '#B31D31',
        footerColor: '#4B5563',
        showBorder: false,
    };
    if (theme === 'bold') return {
        bgColor: '#B31D31',
        headlineColor: '#FFFFFF',
        bodyColor: '#FFFFFF',
        authorColor: '#FFFFFF',
        footerColor: '#E5E7EB',
        showBorder: true,
    };
    if (theme === 'dark') return {
        bgColor: '#121212',
        headlineColor: '#FFD700',
        bodyColor: '#E0E0E0',
        authorColor: '#FFD700',
        footerColor: '#FFD700',
        showBorder: true,
    };
    if (theme === 'oborodh') return {
        bgColor: '#0a0a0a',
        headlineColor: '#D4AF37',
        bodyColor: '#ffffff',
        authorColor: '#D4AF37',
        footerColor: '#9CA3AF',
        showBorder: false,
    };
    return {
        bgColor: '#E5E6DA',
        headlineColor: '#B31D31',
        bodyColor: '#000000',
        authorColor: '#B31D31',
        footerColor: '#4B5563',
        showBorder: true,
    };
};
