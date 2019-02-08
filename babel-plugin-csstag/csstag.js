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
  const styles = boundStyles.call(this);
  return styles.splice(0, styles.length);
};

export const styles = [];

export default css;
