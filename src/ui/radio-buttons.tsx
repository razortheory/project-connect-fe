import React, { useState } from 'react';
import styled from 'styled-components';

import IconMoreInfo from '~/assets/images/icon-more-info-white-copy.svg';

const RadioWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
  outline: none;

  @media (max-width: 767px) {
    display: none;
  }
`;

const Label = styled.label`
  /* stylelint-disable scss/operator-no-unspaced */
  margin-right: 2rem;
  font-size: 0.9rem;
  font-family: Cabin, sans-serif;
  letter-spacing: 1px;
`;

const IconWrapper = styled.div`
  margin-left: 1.4rem;
  cursor: pointer;
`;
// Styles for sticky popup info
// Position: absolute;
// Top: 7.3rem;
// Left: 32rem;
const InfoPopup = styled.div`
  position: fixed;
  top: 14.3rem;
  left: 35rem;
  z-index: 1000;
  width: 23.386rem;
  height: 16rem;
  padding: 1rem 1.086rem 1rem 1.6rem;
  background-color: #6e737d;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 0.23);
  visibility: hidden;

  &::after {
    position: absolute;
    top: 6.3rem;
    left: -20px;
    border: 10px solid transparent;
    border-right: 10px solid #6e737d;
    content: '';
  }
`;

const PopupSubtitle = styled.h2`
  margin: 0 12.8rem 0 0;
  padding: 0;
  color: #fff;
  font-weight: bold;
  font-size: 1rem;
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.7;
  letter-spacing: normal;
`;
const PopupSubContent = styled.div`
  margin-bottom: 0.7rem;
  padding: 0;
  color: #fff;
  font-weight: normal;
  font-size: 1rem;
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.7;
  letter-spacing: normal;
`;

const RadioButton = styled.input`
  width: 1rem;
  height: 1rem;
  margin: 0.1rem 0.6rem 0 0;
  border: solid 1.5px #fff;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};

  &::after {
    position: relative;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    background-color: #232832;
    border: solid 1.5px ${(props) => (props.disabled ? '#9f9f9f' : '#fff')};
    border-radius: 50%;
    outline: none;
    content: '';
  }
  &:checked::after {
    position: relative;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    background-color: #2779ff;
    border: solid 1.5px #fff;
    border-radius: 50%;
    outline: none;
    content: '';
  }
`;

export type DropdownItem<T> = {
  title: string;
  value: T;
};

type DropdownProps<T> = {
  wrapperClassName: string;
  radioBtnClassName: string;
  items: Array<DropdownItem<T>>;
  value: T;
  onChange: (value: T) => void;
  disabled: boolean;
};

export const RadioButtons = <T,>({
  items,
  value,
  onChange,
  wrapperClassName,
  radioBtnClassName,
  disabled,
}: DropdownProps<T>) => {
  const [isInfoPopupAppeared, setInfoPopupAppeared] = useState(false);
  return (
    <RadioWrapper className={wrapperClassName}>
      {items.map((item) => (
        <React.Fragment key={String(item.value)}>
          <RadioButton
            style={disabled ? { border: 'solid 1.5px #9f9f9f' } : {}}
            id={String(item.value)}
            className={radioBtnClassName}
            type="radio"
            name="group1"
            checked={value === item.value}
            value={String(item.value)}
            onChange={() => {
              onChange(item.value);
            }}
            disabled={disabled}
          />
          <Label
            style={
              disabled && value !== item.value
                ? {
                    color: '#9f9f9f',
                    cursor: 'not-allowed',
                  }
                : { cursor: 'pointer' }
            }
            htmlFor={String(item.value)}
          >
            {item?.title.toUpperCase()}
          </Label>
        </React.Fragment>
      ))}

      <IconWrapper
        className="icon-wrapper"
        onMouseOver={() => {
          setInfoPopupAppeared(true);
        }}
        onMouseLeave={() => {
          setInfoPopupAppeared(false);
        }}
      >
        <IconMoreInfo />
        <InfoPopup
          className="info-popup"
          style={isInfoPopupAppeared ? { visibility: 'visible' } : {}}
        >
          <div>
            <PopupSubtitle>Connectivity map</PopupSubtitle>
            <PopupSubContent>
              This view shows the current internet connectivity at school level.
            </PopupSubContent>
            <PopupSubtitle>Coverage map</PopupSubtitle>
            <PopupSubContent>
              This view shows internet coverage that is available at school
              level. It illustrates the potential of a school point getting
              connectivity.
            </PopupSubContent>
          </div>
        </InfoPopup>
      </IconWrapper>
    </RadioWrapper>
  );
};
