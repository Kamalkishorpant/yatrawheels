// Modal Fix Utility - Run this in browser console to fix scrolling issues
function fixModalScrolling() {
  console.log('🔧 Fixing modal scrolling issues...');

  // Reset body overflow
  document.body.style.overflow = '';
  document.body.style.overflowY = 'auto';
  document.body.style.overflowX = 'hidden';

  // Clear modal-related localStorage
  try {
    localStorage.removeItem('inquiryShown');
    console.log('✅ Cleared inquiry modal flag');
  } catch (e) {
    console.log('⚠️ Could not clear localStorage');
  }

  // Force close any modal overlays
  const overlays = document.querySelectorAll('.modal-overlay, .inquiry-modal-overlay');
  overlays.forEach(overlay => {
    overlay.style.display = 'none';
    console.log('✅ Hidden modal overlay');
  });

  // Reset any elements with overflow hidden
  const elements = document.querySelectorAll('[style*="overflow: hidden"]');
  elements.forEach(el => {
    if (el !== document.body) {
      el.style.overflow = '';
    }
  });

  console.log('✅ Scrolling should now work! If modal reappears, use Escape key or click outside to close it.');
  return 'Modal issues fixed!';
}

// Auto-run if in browser
if (typeof window !== 'undefined') {
  fixModalScrolling();
}

module.exports = { fixModalScrolling };