export const appendStyles = function() {
  const style = document.createElement('style');
  style.textContent = boundStyles.call(this).join('\n');
  document.head.appendChild(style);
};

const boundStyles = function() {
  return Array.isArray(this) ? this : styles;
};

export const css = function(exports, style) {
  boundStyles.call(this).push(style);
  return exports;
};

export const resetStyles = function() {
  const boundStyles = boundStyles.call(this);
  return boundStyles.splice(0, boundStyles.length);
};

export const styles = [];

export default css;
