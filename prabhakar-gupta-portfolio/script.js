// Triangle Loader script – plain JavaScript version
// Exposes a global `GeminiLoader` object (kept name for compatibility) that creates a triangle loader.

const GeminiLoader = {
  /**
   * Injects the triangle loader into a specific container
   * @param {HTMLElement} containerElement - The DOM element to put the loader in
   */
  show: function (containerElement) {
    // Prevent duplicate loaders
    if (containerElement.querySelector('.loader-wrapper')) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'loader-wrapper';

    // create 3 dot elements with motion classes
    const dot1 = document.createElement('div');
    dot1.className = 'dot dot1';
    const dot2 = document.createElement('div');
    dot2.className = 'dot dot2';
    const dot3 = document.createElement('div');
    dot3.className = 'dot dot3';

    wrapper.appendChild(dot1);
    wrapper.appendChild(dot2);
    wrapper.appendChild(dot3);
    containerElement.appendChild(wrapper);
  },

  /**
   * Removes the triangle loader from a specific container
   * @param {HTMLElement} containerElement - The DOM element containing the loader
   */
  hide: function (containerElement) {
    const loader = containerElement.querySelector('.loader-wrapper');
    if (!loader) return;
    loader.style.opacity = '0';
    setTimeout(() => loader.remove(), 300);
  }
};

// expose globally for inline onclick handlers
window.GeminiLoader = GeminiLoader;
