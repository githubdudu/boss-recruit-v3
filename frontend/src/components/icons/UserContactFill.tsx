import type { SVGProps } from 'react';

/**
 * Filled counterpart to antd-mobile-icons' UserContactOutline.
 *
 * Same artwork, same 48x48 grid: the outline icon draws the person as an outer
 * silhouette plus an inner counter that punches the hole. Dropping that inner
 * subpath leaves the solid shape, so the two icons stay pixel-aligned as an
 * outline/fill pair. The three contact bars are unchanged.
 *
 * Keeps the .antd-mobile-icon class because index.css resets its display.
 */
function UserContactFill(props: SVGProps<SVGSVGElement>) {
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
        d="M24.5,4 C30.0112644,4 34.479027,8.46775399 34.479027,13.9790078 L34.479027,18.0209922 C34.479027,21.7144498 32.4724515,24.9392476 29.4899594,26.6647285 L29.4895135,27 L40.4649873,32.8658886 C42.8766161,34.1547938 44.2604463,36.7822067 43.9591026,39.5 C43.6750656,42.0617054 41.5099747,44 38.9325658,44 L10.0674342,44 C7.49002529,44 5.32493441,42.0617054 5.04089744,39.5 C4.73955374,36.7822067 6.12338392,34.1547938 8.53501271,32.8658886 L19.5104865,27 L19.5100406,26.6647285 C16.5275485,24.9392476 14.520973,21.7144498 14.520973,18.0209922 L14.520973,13.9790078 C14.520973,8.46775399 18.9887356,4 24.5,4 Z M43.6,23 C43.8209139,23 44,23.1790861 44,23.4 L44,25.6 C44,25.8209139 43.8209139,26 43.6,26 L40.4,26 C40.1790861,26 40,25.8209139 40,25.6 L40,23.4 C40,23.1790861 40.1790861,23 40.4,23 L43.6,23 Z M43.6,17 C43.8209139,17 44,17.1790861 44,17.4 L44,19.6 C44,19.8209139 43.8209139,20 43.6,20 L37.4,20 C37.1790861,20 37,19.8209139 37,19.6 L37,17.4 C37,17.1790861 37.1790861,17 37.4,17 L43.6,17 Z M43.6,11 C43.8209139,11 44,11.1790861 44,11.4 L44,13.6 C44,13.8209139 43.8209139,14 43.6,14 L37.4,14 C37.1790861,14 37,13.8209139 37,13.6 L37,11.4 C37,11.1790861 37.1790861,11 37.4,11 L43.6,11 Z"
        fill="currentColor"
        fillRule="nonzero"
      />
    </svg>
  );
}

export default UserContactFill;
