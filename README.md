# csstag

[![Build Status](https://travis-ci.org/sgtpep/csstag.svg?branch=master)](https://travis-ci.org/sgtpep/csstag)

[Tagged template](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_templates) for [CSS Modules](https://github.com/css-modules/css-modules):

```
import css from 'csstag';
const styles = css`.root { color: red; }`;
<div class={styles.root}></div>
```

Demo: https://sgtpep.github.io/csstag/demo/.
