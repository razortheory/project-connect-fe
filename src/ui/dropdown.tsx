import React, { useRef, useState } from 'react';
import styled from 'styled-components';

import { useOnClickOutside } from '~/lib/click-outside/use-click-outside';

const ARROW_DOWN =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3E%3Cpath fill='%23ffffff' d='M9.978 11.679l-4.61-4.61c-.284-.284-.744-.285-1.027-.002-.285.285-.282.743.002 1.026l5.121 5.122.001.001c.143.142.328.213.513.213.186-.001.37-.072.512-.213l.001-.001 5.122-5.122c.284-.283.284-.743.001-1.026-.285-.285-.742-.282-1.026.002l-4.61 4.61z'/%3E%3C/svg%3E%0A";
const ARROW_UP =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' transform='rotate(180)' viewBox='0 0 20 20'%3E%3Cpath fill='%23ffffff' d='M9.978 11.679l-4.61-4.61c-.284-.284-.744-.285-1.027-.002-.285.285-.282.743.002 1.026l5.121 5.122.001.001c.143.142.328.213.513.213.186-.001.37-.072.512-.213l.001-.001 5.122-5.122c.284-.283.284-.743.001-1.026-.285-.285-.742-.282-1.026.002l-4.61 4.61z'/%3E%3C/svg%3E%0A";

const DropdownWrapper = styled.div`
  position: relative;
  cursor: pointer;
  appearance: none;

  &::before {
    position: absolute;
    top: 5.2rem;
    right: ($grid-gutter-width-lg / 2);
    left: ($grid-gutter-width-lg / 2);
    display: inline-flex;
    height: 0.1rem;
    background-color: #fff;
    content: '';
  }
`;

const DropdownSelect = styled.div<{ isOpen: boolean }>`
  /* stylelint-disable scss/operator-no-unspaced, value-keyword-case */
  background-image: ${({ isOpen }) =>
    `url("${isOpen ? ARROW_UP : ARROW_DOWN}") `};
  background-repeat: no-repeat;
  background-position: center right 24px;
  background-size: 2rem 2rem;
  outline: none;
`;

const DropdownList = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1;
  width: 100%;
  font-weight: bold;
  font-size: 1.2rem;
  font-family: Cabin, sans-serif;
  letter-spacing: 0.1rem;
  text-transform: uppercase;
  background-color: #121212;
`;

const DropdownListItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 4rem;
  padding-left: 24px;

  &:hover {
    background-color: #232323;
  }
`;

const CurrentValueWrapper = styled.div`
  max-width: calc(100% - 24px);
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Prefix = styled.span`
  margin-right: 0.5rem;
  white-space: nowrap;
`;

const CurrentValue = styled.span`
  white-space: nowrap;
`;

export type DropdownItem<T> = {
  title: string;
  value: T;
};

type DropdownProps<T> = {
  wrapperClassName: string;
  selectClassName: string;
  items: Array<DropdownItem<T>>;
  value: T;
  prefix?: string;
  onChange: (value: T) => void;
};

export const Dropdown = <T,>({
  items,
  wrapperClassName,
  selectClassName,
  value,
  onChange,
  prefix,
}: DropdownProps<T>) => {
  const [isOpenList, setIsOpenList] = useState(false);
  const container = useRef(null);

  const closeList = () => setIsOpenList(false);

  useOnClickOutside(container, closeList);

  return (
    <DropdownWrapper className={wrapperClassName} ref={container}>
      <DropdownSelect
        isOpen={isOpenList}
        onClick={() => setIsOpenList((previousState) => !previousState)}
        className={selectClassName}
      >
        <CurrentValueWrapper>
          {prefix && <Prefix>{prefix}</Prefix>}
          <CurrentValue>
            Sort By: {items.find((item) => item.value === value)?.title}
          </CurrentValue>
        </CurrentValueWrapper>
      </DropdownSelect>

      {isOpenList && (
        <DropdownList>
          {items.map((item) => (
            <DropdownListItem
              key={String(item.value)}
              onClick={() => {
                onChange(item.value);
                closeList();
              }}
            >
              {item?.title}
            </DropdownListItem>
          ))}
        </DropdownList>
      )}
    </DropdownWrapper>
  );
};
