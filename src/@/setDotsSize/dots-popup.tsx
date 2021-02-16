import React, { FormEvent, useState } from 'react';
import styled from 'styled-components';

import { mapCircleSizes } from '@/map/constants';
import { setIsOpenDotsPopup } from '@/setDotsSize/model';

const PopupWrap = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 102;
  width: 100%;
  height: 100%;
  margin: auto;
  background-color: rgb(0 0 0 / 0.5);
`;

const PopupBody = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 50rem;
  padding: 1rem;
  overflow: hidden;
  background: #232832;
  border-radius: 0.5rem;
  transform: translate(-50%, -50%);
  font-size: 1.2rem;
`;

const Button = styled.button`
  width: 10rem;
  height: 5rem;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.1rem;
`;

const Label = styled.div`
  width: 5rem;
  margin-right: 1rem;
`;

export const LS_DOTS_KEY = 'dots_sizes';

const SizesForm = () => {
  const lsSizes: string | null = localStorage.getItem(LS_DOTS_KEY);
  let sizes: number[][] | null = lsSizes
    ? (JSON.parse(lsSizes) as number[][])
    : null;

  if (!sizes) {
    sizes = mapCircleSizes;
    localStorage.setItem(LS_DOTS_KEY, JSON.stringify(sizes));
  }

  const [formValue, setFormValue] = useState(sizes);

  const onSubmit = (e: FormEvent): void => {
    e.preventDefault();
    const currentFormValue = formValue.map(([zoom, value]) => [
      zoom,
      Number(value),
    ]);

    localStorage.setItem(LS_DOTS_KEY, JSON.stringify(currentFormValue));

    window.location.reload();
  };

  const copyText = () => {
    const element = document.createElement('textarea');
    element.value = JSON.stringify(formValue, null, 4);
    document.body.append(element);
    element.select();
    document.execCommand('copy');
    element.remove();
  };

  const onChange = (key: number, value: string): void => {
    const index: number = formValue.findIndex(([zoom]) => zoom === key);
    const currentValue: number[][] = formValue;
    currentValue[index][1] = value;
    console.log(currentValue);
    setFormValue([...currentValue]);
  };

  const getFormValue = (key: number): string => {
    return formValue.find(([zoom]) => zoom === key)[1].toString();
  };

  return (
    <>
      <Row>
        <Label>Zoom</Label>
        <span>Size</span>
      </Row>
      <form onSubmit={onSubmit}>
        {sizes.map((size) => {
          return (
            <Row key={size[0]}>
              <Label>{size[0]}</Label>
              <input
                style={{
                  backgroundColor: !Number(getFormValue(size[0]))
                    ? 'red'
                    : 'white',
                }}
                value={getFormValue(size[0])}
                onChange={(e) => {
                  onChange(size[0], e.target.value);
                }}
              />
            </Row>
          );
        })}
        <Button type="submit" className="button--primary">
          submit
        </Button>
        <Button
          type="button"
          className="button--primary"
          onClick={() => copyText()}
        >
          Copy
        </Button>
      </form>
    </>
  );
};

export const DotsPopup = () => {
  return (
    <PopupWrap>
      <PopupBody>
        <SizesForm />
        <Button
          type="button"
          className="button--secondary"
          onClick={() => {
            setIsOpenDotsPopup(false);
          }}
        >
          close
        </Button>
      </PopupBody>
    </PopupWrap>
  );
};
