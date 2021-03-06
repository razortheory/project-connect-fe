/* eslint-disable react/jsx-props-no-spreading */

import { useStore } from 'effector-react';
import React, { useMemo, useRef } from 'react';

import { LinkProps, ObjectAny, Params, RouteProps, UseRoute } from './types';
import { shouldUpdate } from './utils';

export const useRoute: UseRoute = (route) => useStore(route.visible);

export const Route = ({
  of: route,
  component: Component,
  children,
}: RouteProps) => {
  const element = children ?? (Component && <Component />);
  return <>{useStore(route.visible) && element}</>;
};

const useShouldUpdateRef = (dep: ObjectAny | undefined) => {
  const ref = useRef(dep);
  if (dep && ref.current) {
    if (shouldUpdate(ref.current, dep)) ref.current = dep;
  }
  return ref;
};

export const Link = <P extends Params>({
  to,
  children,
  params,
  query,
  hash,
  compileOptions,
  onClick,
  ...props
}: LinkProps<P>) => {
  const paramsRef = useShouldUpdateRef(params);
  const compileOptionsRef = useShouldUpdateRef(compileOptions);

  const compileFactory = () => {
    return to.compile({
      params,
      query,
      hash,
      options: compileOptions,
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const href = useMemo(compileFactory, [
    to,
    query,
    hash,
    paramsRef.current,
    compileOptionsRef.current,
  ]);

  return (
    <a
      href={href}
      onClick={(event) => {
        event.preventDefault();
        if (onClick) onClick(event);
        to.router.navigate(href);
      }}
      {...props}
    >
      {children}
    </a>
  );
};
