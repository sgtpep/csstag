export const append = function() {
  const style = document.createElement('style');
  style.textContent = (this || styles).join('\n');
  document.head.appendChild(style);
};

export const css = (exports, style) => {
  (this || styles).push(style);
  return exports;
};

export const reset = function() {
  return (this || styles).splice(0, (this || styles).length);
};

export const styles = [];

export default css;
