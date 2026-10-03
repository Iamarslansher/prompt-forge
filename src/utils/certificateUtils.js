import html2canvas from 'html2canvas';

export function generateCertificateId() {
  const year = new Date().getFullYear();
  const randomChars = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `PM-${year}-${randomChars}`;
}

export function formatDate(dateString) {
  const date = dateString ? new Date(dateString) : new Date();
  return date.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
    day: 'numeric'
  });
}

export async function downloadCertificateAsImage(elementId, filename = 'Prompt_Master_Certificate.png') {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Certificate element with ID #${elementId} not found.`);
    return false;
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 2, // High resolution
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#0B1020',
      logging: false
    });

    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  } catch (err) {
    console.error('Failed to generate image download:', err);
    // Fallback: trigger print
    window.print();
    return false;
  }
}
