/* =========================================================
   Økonomiverktøy – delte hjelpefunksjoner
   Bruk: <script src="kalkulator.js"></script> (før side-scriptet)
   ========================================================= */
window.KalkUtils = (function () {
  const nf = new Intl.NumberFormat('nb-NO', { maximumFractionDigits: 0 });

  // Gjør en streng med mellomrom/tegn om til et rent heltall.
  function parseNum(value) {
    if (typeof value !== 'string') return Math.round(Number(value)) || 0;
    const cleaned = value.replace(/[^\d]/g, '');
    return cleaned === '' ? 0 : parseInt(cleaned, 10);
  }

  // Formaterer et tall med mellomrom som tusenskille, norsk stil: 400000 -> "400 000"
  function formatNum(n) {
    return nf.format(Math.round(n) || 0);
  }

  // Kobler live-formatering på et tekstfelt som representerer et kr-beløp (heltall).
  // Feltet må være type="text" med inputmode="numeric".
  function bindThousands(input) {
    input.addEventListener('input', function () {
      const cursorFromEnd = input.value.length - input.selectionStart;
      const raw = parseNum(input.value);
      const isEmpty = input.value.trim() === '';
      const formatted = isEmpty ? '' : formatNum(raw);
      input.value = formatted;
      const pos = Math.max(0, formatted.length - cursorFromEnd);
      if (input.setSelectionRange) input.setSelectionRange(pos, pos);
    });
  }

  return { parseNum, formatNum, bindThousands };
})();
