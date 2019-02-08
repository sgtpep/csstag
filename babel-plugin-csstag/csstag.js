export const appendStyles = function() {
  const styles = popStyles.call(this).join('\n');
  if (styles) {
    const style = document.createElement('style');
    style.textContent = styles;
    document.head.appendChild(style);
  }
};

const boundStyles = function() {
  return Array.isArray(this) ? this : styles;
};

export const css = function(style, exports) {
  boundStyles.call(this).push(style);
  return exports;
};

export const popStyles = function() {
  const boundStyles = boundStyles.call(this);
  return boundStyles.splice(0, boundStyles.length);
};

export const styles = [];

export default css;
