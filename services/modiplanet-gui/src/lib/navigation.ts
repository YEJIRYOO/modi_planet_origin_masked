import type { NavigateFunction, NavigateOptions, To } from 'react-router-dom';

let navigate: NavigateFunction | undefined;

function toHref(to: To) {
  if (typeof to === 'string') return to;
  return `${to.pathname ?? window.location.pathname}${to.search ?? ''}${
    to.hash ?? ''
  }`;
}

export function setNavigator(navigator: NavigateFunction) {
  navigate = navigator;
}

export function clearNavigator(navigator: NavigateFunction) {
  if (navigate === navigator) {
    navigate = undefined;
  }
}

export function navigateTo(to: To, options?: NavigateOptions) {
  if (navigate) {
    navigate(to, options);
    return;
  }

  if (options?.replace) {
    window.location.replace(toHref(to));
    return;
  }

  window.location.assign(toHref(to));
}
