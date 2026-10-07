// Lazy-loads the self-hosted jsPDF (UMD) and returns its constructor.
let p = null;
export function loadPDF() {
  if (window.jspdf && window.jspdf.jsPDF) return Promise.resolve(window.jspdf.jsPDF);
  if (p) return p;
  p = new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = new URL('../../vendor/jspdf.umd.min.js', import.meta.url).href;
    s.onload = () => resolve(window.jspdf.jsPDF);
    s.onerror = () => { p = null; reject(new Error('Could not load the PDF tool.')); };
    document.head.appendChild(s);
  });
  return p;
}
