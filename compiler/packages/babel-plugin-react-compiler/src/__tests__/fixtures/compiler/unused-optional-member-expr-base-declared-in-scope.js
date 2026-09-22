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
