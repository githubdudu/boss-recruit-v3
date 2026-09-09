import type { SVGProps } from 'react';

/**
 * Filled counterpart to antd-mobile-icons' UserOutline.
 *
 * Same artwork, same 48x48 grid: the outline icon draws the person as an outer
 * silhouette plus an inner counter that punches the hole. Dropping that inner
 * subpath leaves the solid shape, so the two icons stay pixel-aligned as an
 * outline/fill pair.
 *
 * Keeps the .antd-mobile-icon class because index.css resets its display.
 */
function UserFill(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      style={{ verticalAlign: '-0.125em', ...props.style }}
      className={['antd-mobile-icon', props.className]
        .filter(Boolean)
        .join(' ')}
    >
      <path
        d="M24.5,4 C30.0112644,4 34.479027,8.46775399 34.479027,13.9790078 L34.479027,18.0209922 C34.479027,21.7144498 32.4724515,24.9392476 29.4899594,26.6647285 L29.4895135,27 L40.4649873,32.8658886 C42.8766161,34.1547938 44.2604463,36.7822067 43.9591026,39.5 C43.6750656,42.0617054 41.5099747,44 38.9325658,44 L10.0674342,44 C7.49002529,44 5.32493441,42.0617054 5.04089744,39.5 C4.73955374,36.7822067 6.12338392,34.1547938 8.53501271,32.8658886 L19.5104865,27 L19.5100406,26.6647285 C16.5275485,24.9392476 14.520973,21.7144498 14.520973,18.0209922 L14.520973,13.9790078 C14.520973,8.46775399 18.9887356,4 24.5,4 Z"
        fill="currentColor"
        fillRule="nonzero"
      />
    </svg>
  );
}

export default UserFill;
