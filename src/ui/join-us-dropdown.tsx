import { useStore } from 'effector-react';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { useOnClickOutside } from '~/lib/click-outside/use-click-outside';

import { $purpose, onDropdownOpenClosed } from '@/project/model';

const ARROW_DOWN =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3E%3Cpath fill='%23b6bbc6' d='M9.978 11.679l-4.61-4.61c-.284-.284-.744-.285-1.027-.002-.285.285-.282.743.002 1.026l5.121 5.122.001.001c.143.142.328.213.513.213.186-.001.37-.072.512-.213l.001-.001 5.122-5.122c.284-.283.284-.743.001-1.026-.285-.285-.742-.282-1.026.002l-4.61 4.61z'/%3E%3C/svg%3E%0A";
const ARROW_UP =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' transform='rotate(180)' viewBox='0 0 20 20'%3E%3Cpath fill='%23b6bbc6' d='M9.978 11.679l-4.61-4.61c-.284-.284-.744-.285-1.027-.002-.285.285-.282.743.002 1.026l5.121 5.122.001.001c.143.142.328.213.513.213.186-.001.37-.072.512-.213l.001-.001 5.122-5.122c.284-.283.284-.743.001-1.026-.285-.285-.742-.282-1.026.002l-4.61 4.61z'/%3E%3C/svg%3E%0A";

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

/* eslint-disable no-nested-ternary */
const DropdownSelect = styled.div<{ isOpen: boolean; isPurposeError: boolean }>`
  /* stylelint-disable scss/operator-no-unspaced, value-keyword-case */
  background-image: ${({ isOpen }) =>
    `url("${isOpen ? ARROW_UP : ARROW_DOWN}") `};
  background-repeat: no-repeat;
  background-position: center right 1.1rem;
  background-size: 2rem 2rem;
  border: ${({ isOpen, isPurposeError }) =>
    isPurposeError
      ? '2px solid #ec0707'
      : isOpen
      ? '2px solid #2779ff'
      : 'solid 1px #b6bbc6'};
  outline: none;
`;

const DropdownList = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1;
  width: 100%;
  margin-top: 1rem;
  font-weight: bold;
  font-size: 1.2rem;
  font-family: Cabin, sans-serif;
  letter-spacing: 0.1rem;
  text-transform: uppercase;
  background-color: #6e737d;
  border-radius: 5px;
`;

const DropdownPlaceholder = styled.span`
  color: #b6bbc6;
  font-weight: normal;
  font-size: 1.9rem;
  font-family: Roboto, sans-serif;
  font-style: normal;
  line-height: 1.42;
  letter-spacing: normal;
  text-transform: none;
`;

const DropdownListItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 4rem;
  padding-left: 1.5rem;
  color: #fff;
  font-weight: normal;
  font-size: 1.9rem;
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.74;
  letter-spacing: normal;
  text-transform: none;

  &:first-child {
    border-radius: 5px 5px 0 0;
  }
  &:last-child {
    border-radius: 0 0 5px 5px;
  }

  &:active {
    background-color: #141923;
  }

  &:hover {
    background-color: #373c46;
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
  color: #2779ff;
  font-weight: normal;
  font-size: 1.9rem;
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.42;
  letter-spacing: normal;
  white-space: nowrap;
  text-transform: none;
`;

export type DropdownPurposeData = {
  value: string;
  title: string;
};

type DropdownProps = {
  // eslint-disable-next-line react/no-unused-prop-types
  id: string;
  // eslint-disable-next-line react/no-unused-prop-types
  name: string;
  onOpenClosePurposeDropdown: (isOpened: boolean) => void;
  isPurposeError: boolean;
  wrapperClassName: string;
  selectClassName: string;
  items: DropdownPurposeData[];
  value: string;
  prefix?: string;
  onChange: (value: string) => void;
};

export const Dropdown = ({
  onOpenClosePurposeDropdown,
  isPurposeError,
  items,
  wrapperClassName,
  selectClassName,
  value,
  onChange,
  prefix,
}: DropdownProps) => {
  const [isOpenList, setIsOpenList] = useState(false);
  const container = useRef(null);
  useEffect(() => {
    onDropdownOpenClosed(isOpenList);
    onOpenClosePurposeDropdown(isOpenList);
  }, [isOpenList, onOpenClosePurposeDropdown]);

  const closeList = () => setIsOpenList(false);

  useOnClickOutside(container, closeList);

  return (
    <DropdownWrapper className={wrapperClassName} ref={container}>
      <DropdownSelect
        isPurposeError={isPurposeError}
        isOpen={isOpenList}
        onClick={() => setIsOpenList((previousState) => !previousState)}
        className={selectClassName}
      >
        <CurrentValueWrapper>
          {prefix && <Prefix>{prefix}</Prefix>}
          <CurrentValue>
            {useStore($purpose) ? (
              items.find((item) => item.value === value)?.title
            ) : (
              <DropdownPlaceholder>
                How would you like to join us
              </DropdownPlaceholder>
            )}
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
