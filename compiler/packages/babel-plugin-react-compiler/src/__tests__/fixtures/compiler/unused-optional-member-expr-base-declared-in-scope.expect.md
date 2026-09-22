
## Input

```javascript
import {identity, makeArray} from 'shared-runtime';

/**
 * Repro for https://github.com/facebook/react/issues/37540
 *
 * `x?.icon` is unused, but the optional chain is preserved as a statement
 * because a property load may have side effects (getters). Previously the
 * compiler emitted `x?.icon;` *after* the reactive scope that declares `x`,
 * without recording `x` as an output of that scope, producing a
 * ReferenceError at runtime.
 */
function Component({a}) {
  const x = a ? identity({slug: a, icon: 'icon'}) : null;
  const y = x ? makeArray(x.slug) : [];
  const unused = x?.icon;
  return <div>{y.length}</div>;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{a: 'a'}],
  sequentialRenders: [{a: 'a'}, {a: null}, {a: 'b'}],
};

```

## Code

```javascript
import { c as _c } from "react/compiler-runtime";
import { identity, makeArray } from "shared-runtime";

/**
 * Repro for https://github.com/facebook/react/issues/37540
 *
 * `x?.icon` is unused, but the optional chain is preserved as a statement
 * because a property load may have side effects (getters). Previously the
 * compiler emitted `x?.icon;` *after* the reactive scope that declares `x`,
 * without recording `x` as an output of that scope, producing a
 * ReferenceError at runtime.
 */
function Component(t0) {
  const $ = _c(5);
  const { a } = t0;
  let t1;
  let x;
  if ($[0] !== a) {
    x = a ? identity({ slug: a, icon: "icon" }) : null;
    t1 = x ? makeArray(x.slug) : [];
    $[0] = a;
    $[1] = t1;
    $[2] = x;
  } else {
    t1 = $[1];
    x = $[2];
  }
  const y = t1;
  x?.icon;
  let t2;
  if ($[3] !== y.length) {
    t2 = <div>{y.length}</div>;
    $[3] = y.length;
    $[4] = t2;
  } else {
    t2 = $[4];
  }
  return t2;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{ a: "a" }],
  sequentialRenders: [{ a: "a" }, { a: null }, { a: "b" }],
};

```
      
### Eval output
(kind: ok) <div>1</div>
<div>0</div>
<div>1</div>