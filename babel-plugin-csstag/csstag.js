export const appendStyles = function() {
  const style = document.createElement('style');
  style.textContent = (this || styles).join('\n');
  document.head.appendChild(style);
};

export const css = (exports, style) => {
  (this || styles).push(style);
  return exports;
};

export const resetStyles = function() {
  return (this || styles).splice(0, (this || styles).length);
};

export const styles = [];

export default css;
