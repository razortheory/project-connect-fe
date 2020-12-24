/* eslint-disable jest/no-mocks-import,no-restricted-imports,
   @typescript-eslint/no-unsafe-assignment,global-require,@typescript-eslint/no-unused-expressions,
   @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,
   @typescript-eslint/ban-ts-comment, @typescript-eslint/ban-ts-comment, @typescript-eslint/no-var-requires
*/

import '../../../__mocks__/match-media';

import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils, { act } from 'react-dom/test-utils';

import { CountryBasic } from '~/api/types';
import { $isMobile } from '~/core/media-query';

import {
  $country,
  $countryHasConnectivity,
  $countryHasCoverage,
} from '@/country/model';
import { $pending, changeMapType } from '@/map/model';
import { $isOpenPopup } from '@/popup/model';
import {
  $isContentTab,
  $isControlsTab,
  $isMapTab,
  $noSearchCountryFound,
  $searchActive,
  $searchText,
  clearSearchText,
  onSearchPressKey,
} from '@/sidebar/model';
import { CountryInfo } from '@/sidebar/ui/country-info';
import { CountryList } from '@/sidebar/ui/country-list';
import { CountryListItem } from '@/sidebar/ui/country-list-item';
import { WorldView } from '@/sidebar/ui/world-view';

let container = (null as unknown) as Element;

describe('sidebar tests', () => {
  beforeEach(() => {
    window.history.pushState({}, 'Default location pathname', '/map');
    container = document.createElement('div');
    document.body.append(container);
  });

  afterEach(() => {
    act(() => {
      // @ts-expect-error
      $isControlsTab.setState(false);
      // @ts-expect-error
      $isContentTab.setState(false);
      // @ts-expect-error
      $pending.setState(false);
      // @ts-expect-error
      $country.setState(null);
    });
    unmountComponentAtNode(container);
    container.remove();
    container = (null as unknown) as Element;
  });
  test('world view component should be rendered, url should be changed on select country button click', () => {
    act(() => {
      render(<WorldView />, container);
    });
    expect(
      document.querySelector('.sidebar__button--select-country')
    ).not.toBeNull();
    expect(window.location.pathname).toEqual('/map');

    act(() => {
      // @ts-expect-error
      document
        .querySelector('.sidebar__button--select-country')
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(window.location.pathname).toEqual(`/map/countries`);
  });

  test('CountryList should be rendered', () => {
    act(() => {
      render(<CountryList />, container);
    });
    expect(document.querySelector('.search-bar-connectivity')).not.toBeNull();
    expect(document.querySelector('.select-white-line')).not.toBeNull();
    expect(document.querySelector('.sidebar__content')).not.toBeNull();
  });

  test('county list item should be rendered if appropriate props were given, url should be changed after country link clicked', () => {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const country = {
      id: 1,
      name: 'Brazil',
      code: 'br',
      flag: 'flag',
      map_preview: 'map_preview',
      description: 'description',
      data_source: 'data_source',
      integration_status: 0,
      date_of_join: 'date_of_join',
      schools_with_data_percentage: 20,
      schools_total: 20,
      connectivity_availability: 'connectivity',
      coverage_availability: 'coverage_availability',
      date_schools_mapped: 'date_schools_mapped',
    } as CountryBasic;

    act(() => {
      render(<CountryListItem country={country} />, container);
    });
    expect(document.querySelector('.list__link')).not.toBeNull();
    expect(window.location.pathname).toEqual('/map');

    act(() => {
      // @ts-expect-error
      document
        .querySelector('.list__link')
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(window.location.pathname).toEqual(`/map/country/${country.code}`);
  });

  test('progress bar should be rendered in CountryInfo if country state equals null', () => {
    expect($pending.getState()).toEqual(false);
    expect($country.getState()).toBeNull();
    act(() => {
      render(<CountryInfo />, container);
    });
    expect(document.querySelector('.search-bar-connectivity')).toBeNull();
    expect(document.querySelector('.horizontal-line')).not.toBeNull();
  });

  test('progress bar should be rendered in CountryInfo if pending state is true', () => {
    expect($pending.getState()).toEqual(false);
    expect($country.getState()).toBeNull();

    act(() => {
      // @ts-expect-error
      $pending.setState(true);
      // @ts-expect-error
      $country.setState({
        id: 1,
        name: 'string',
        code: 'string',
        flag: 'string',
        map_preview: 'string',
        description: 'string',
        data_source: 'string',
        date_schools_mapped: 'string',
        statistics: 'CountryWeeklyStats',
        geometry: 'Geometry',
      });
    });

    expect($pending.getState()).toEqual(true);
    expect($country.getState()).not.toBeNull();

    act(() => {
      render(<CountryInfo />, container);
    });
    expect(document.querySelector('.search-bar-connectivity')).toBeNull();
    expect(document.querySelector('.horizontal-line')).not.toBeNull();
  });

  test("sidebar content should be rendered in CountryInfo if pending state is false and country state isn't null", () => {
    expect($pending.getState()).toEqual(false);
    expect($country.getState()).toBeNull();

    act(() => {
      // @ts-expect-error
      $country.setState({
        id: 1,
        name: 'string',
        code: 'string',
        flag: 'string',
        map_preview: 'string',
        description: 'string',
        data_source: 'string',
        date_schools_mapped: 'string',
        statistics: 'CountryWeeklyStats',
        geometry: 'Geometry',
      });
    });

    expect($pending.getState()).toEqual(false);
    expect($country.getState()).not.toBeNull();

    act(() => {
      render(<CountryInfo />, container);
    });
    expect(document.querySelector('.horizontal-line')).toBeNull();
    expect(document.querySelector('.search-bar-connectivity')).not.toBeNull();
    expect(document.querySelector('.search-bar-connectivity')).not.toBeNull();
    expect(document.querySelector('.sidebar__content')).not.toBeNull();
  });

  test('breadcrumbs should be rendered in CountryInfo if combine breadcrumbs state has corresponding value, url should be changed on change country link click', () => {
    // Show breadCrumbs
    expect($isMobile.getState()).toEqual(true);
    expect($isOpenPopup.getState()).toEqual(false);
    expect($isMapTab.getState()).toEqual(true);

    expect($pending.getState()).toEqual(false);
    expect($country.getState()).toBeNull();

    act(() => {
      // @ts-expect-error
      $country.setState({
        id: 1,
        name: 'string',
        code: 'string',
        flag: 'string',
        map_preview: 'string',
        description: 'string',
        data_source: 'string',
        date_schools_mapped: 'string',
        statistics: 'CountryWeeklyStats',
        geometry: 'Geometry',
      });

      // Show breadCrumbs
      // @ts-expect-error
      $isMobile.setState(false);
      // @ts-expect-error
      $isOpenPopup.setState(false);
      // @ts-expect-error
      $isMapTab.setState(false);
    });

    expect($pending.getState()).toEqual(false);
    expect($country.getState()).not.toBeNull();

    // Show breadCrumbs
    expect($isMobile.getState()).toEqual(false);
    expect($isOpenPopup.getState()).toEqual(false);
    expect($isMapTab.getState()).toEqual(false);

    window.history.pushState(
      {},
      'Default location pathname',
      '/map/country/br'
    );
    expect(window.location.pathname).toEqual(`/map/country/br`);

    act(() => {
      render(<CountryInfo />, container);
    });

    act(() => {
      // @ts-expect-error
      document
        .querySelector('.breadcrumbs__link')
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(window.location.pathname).toEqual(`/map/countries`);
  });

  test("CountryInfoContent shouldn't be rendered in CountryInfo by the reason of $isContentTab state is false", () => {
    expect($pending.getState()).toEqual(false);
    expect($country.getState()).toBeNull();

    act(() => {
      // @ts-expect-error
      $country.setState({
        id: 1,
        name: 'string',
        code: 'string',
        flag: 'string',
        map_preview: 'string',
        description: 'string',
        data_source: 'string',
        date_schools_mapped: 'string',
        statistics: 'CountryWeeklyStats',
        geometry: 'Geometry',
      });
    });

    expect($pending.getState()).toEqual(false);
    expect($country.getState()).not.toBeNull();

    expect($isContentTab.getState()).toEqual(false);
    act(() => {
      render(<CountryInfo />, container);
    });
    expect(document.querySelector('.sidebar__period-picker')).toBeNull();
    expect(document.querySelector('.sidebar__not-found')).toBeNull();
  });

  test("sidebar__period-picker should be rendered in CountryInfo,sidebar__not-found shouldn't be rendered in CountryInfo by the reason of noSearchCountryFound is false", () => {
    expect($pending.getState()).toEqual(false);
    expect($country.getState()).toBeNull();

    act(() => {
      // @ts-expect-error
      $country.setState({
        id: 1,
        name: 'string',
        code: 'string',
        flag: 'string',
        map_preview: 'string',
        description: 'string',
        data_source: 'string',
        date_schools_mapped: 'string',
        statistics: 'CountryWeeklyStats',
        geometry: 'Geometry',
      });
    });

    expect($pending.getState()).toEqual(false);
    expect($country.getState()).not.toBeNull();

    expect($isContentTab.getState()).toEqual(false);
    // @ts-expect-error
    $isContentTab.setState(true);
    expect($isContentTab.getState()).toEqual(true);

    expect($noSearchCountryFound.getState()).toEqual(false);
    act(() => {
      render(<CountryInfo />, container);
    });
    expect(document.querySelector('.sidebar__not-found')).toBeNull();
    expect(document.querySelector('.sidebar__period-picker')).not.toBeNull();
  });

  test("sidebar__period-picker shouldn't be rendered in CountryInfo,sidebar__not-found should be rendered in CountryInfo by the reason of noSearchCountryFound is true", () => {
    expect($pending.getState()).toEqual(false);
    expect($country.getState()).toBeNull();

    act(() => {
      // @ts-expect-error
      $country.setState({
        id: 1,
        name: 'string',
        code: 'string',
        flag: 'string',
        map_preview: 'string',
        description: 'string',
        data_source: 'string',
        date_schools_mapped: 'string',
        statistics: 'CountryWeeklyStats',
        geometry: 'Geometry',
      });
    });

    expect($pending.getState()).toEqual(false);
    expect($country.getState()).not.toBeNull();

    expect($isContentTab.getState()).toEqual(false);
    // @ts-expect-error
    $isContentTab.setState(true);
    expect($isContentTab.getState()).toEqual(true);
    expect($noSearchCountryFound.getState()).toEqual(false);
    // @ts-expect-error
    $noSearchCountryFound.setState(true);
    // $noSearchCountryFound is true
    expect($noSearchCountryFound.getState()).toEqual(true);
    act(() => {
      render(<CountryInfo />, container);
    });
    expect(document.querySelector('.sidebar__not-found')).not.toBeNull();
    expect(document.querySelector('.sidebar__period-picker')).toBeNull();
  });

  test("Controls shouldn't be rendered in CountryInfo by the reason of isControlsTab state is false", () => {
    expect($pending.getState()).toEqual(false);
    expect($country.getState()).toBeNull();

    act(() => {
      // @ts-expect-error
      $country.setState({
        id: 1,
        name: 'string',
        code: 'string',
        flag: 'string',
        map_preview: 'string',
        description: 'string',
        data_source: 'string',
        date_schools_mapped: 'string',
        statistics: 'CountryWeeklyStats',
        geometry: 'Geometry',
      });
    });

    expect($pending.getState()).toEqual(false);
    expect($country.getState()).not.toBeNull();

    expect($isControlsTab.getState()).toEqual(false);
    act(() => {
      render(<CountryInfo />, container);
    });
    expect(document.querySelector('.sidebar__form')).toBeNull();
    expect(document.querySelector('.sidebar__secondary-title')).toBeNull();
  });

  test("sidebar__secondary-title shouldn't be rendered in CountryInfo,sidebar__form-found in CountryInfo should be rendered by the reason of $countryHasConnectivity and $countryHasCoverage are false", () => {
    expect($pending.getState()).toEqual(false);
    expect($country.getState()).toBeNull();

    act(() => {
      // @ts-expect-error
      $country.setState({
        id: 1,
        name: 'string',
        code: 'string',
        flag: 'string',
        map_preview: 'string',
        description: 'string',
        data_source: 'string',
        date_schools_mapped: 'string',
        statistics: 'CountryWeeklyStats',
        geometry: 'Geometry',
      });
    });

    expect($pending.getState()).toEqual(false);
    expect($country.getState()).not.toBeNull();

    expect($isControlsTab.getState()).toEqual(false);
    // @ts-expect-error
    $isControlsTab.setState(true);
    expect($isControlsTab.getState()).toEqual(true);
    expect($countryHasConnectivity.getState()).toEqual(false);
    expect($countryHasCoverage.getState()).toEqual(false);

    act(() => {
      render(<CountryInfo />, container);
    });
    expect(document.querySelector('.sidebar__form')).not.toBeNull();
    expect(document.querySelector('.controls__secondary-title')).toBeNull();
  });

  test('sidebar__form-found and sidebar__secondary-title should be rendered in CountryInfo by the reason of $countryHasConnectivity and $countryHasCoverage are true', () => {
    expect($pending.getState()).toEqual(false);
    expect($country.getState()).toBeNull();

    act(() => {
      // @ts-expect-error
      $country.setState({
        id: 1,
        name: 'string',
        code: 'string',
        flag: 'string',
        map_preview: 'string',
        description: 'string',
        data_source: 'string',
        date_schools_mapped: 'string',
        statistics: 'CountryWeeklyStats',
        geometry: 'Geometry',
      });
    });

    expect($pending.getState()).toEqual(false);
    expect($country.getState()).not.toBeNull();

    expect($isControlsTab.getState()).toEqual(false);
    // @ts-expect-error
    $isControlsTab.setState(true);
    expect($isControlsTab.getState()).toEqual(true);
    expect($countryHasConnectivity.getState()).toEqual(false);
    expect($countryHasCoverage.getState()).toEqual(false);
    // @ts-expect-error
    $countryHasConnectivity.setState(true);
    // @ts-expect-error
    $countryHasCoverage.setState(true);
    expect($countryHasConnectivity.getState()).toEqual(true);
    expect($countryHasCoverage.getState()).toEqual(true);

    act(() => {
      render(<CountryInfo />, container);
    });
    expect(document.querySelector('.sidebar__form')).not.toBeNull();
    expect(document.querySelector('.controls__secondary-title')).not.toBeNull();
  });

  test('onSearchPressKey should be called when enter is clicked in search input', () => {
    const Init = require('@/sidebar/init');
    Init;

    expect($pending.getState()).toEqual(false);
    expect($country.getState()).toBeNull();
    act(() => {
      // @ts-expect-error
      $country.setState({
        id: 1,
        name: 'string',
        code: 'string',
        flag: 'string',
        map_preview: 'string',
        description: 'string',
        data_source: 'string',
        date_schools_mapped: 'string',
        statistics: 'CountryWeeklyStats',
        geometry: 'Geometry',
      });
    });
    expect($pending.getState()).toEqual(false);
    expect($country.getState()).not.toBeNull();
    act(() => {
      render(<CountryInfo />, container);
    });
    const searchInput = document.querySelector(
      '.search-bar-connectivity__input'
    );
    const spy = jest.fn();
    onSearchPressKey.watch(spy);

    act(() => {
      // @ts-expect-error
      $searchText.setState('Brazil');
    });
    // @ts-expect-error
    expect(searchInput.value).toEqual('Brazil');

    act(() => {
      // @ts-expect-error
      ReactTestUtils.Simulate.keyPress(searchInput, {
        key: 'Enter',
        keyCode: 13,
        which: 13,
      });
    });
    expect(spy).toHaveBeenCalled();
  });

  test('onSearchPressEnter and blurInputFx should be called when onSearchPressKey occurred with key=Enter', () => {
    const Model = require('@/sidebar/model');
    Model;
    const Init = require('@/sidebar/init');
    Init;
    const spy = jest.fn();
    const spy2 = jest.fn();
    Model.onSearchPressEnter.watch(spy);
    Model.blurInputFx.watch(spy2);
    act(() => {
      Model.onSearchPressKey({
        key: 'Enter',
        keyCode: 13,
        which: 13,
      });
    });
    expect(spy).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

  test('clear search button should be appeared when $searchActive is true, clearSearchText should be called on clear button click', () => {
    expect($pending.getState()).toEqual(false);
    expect($country.getState()).toBeNull();
    act(() => {
      // @ts-expect-error
      $country.setState({
        id: 1,
        name: 'string',
        code: 'string',
        flag: 'string',
        map_preview: 'string',
        description: 'string',
        data_source: 'string',
        date_schools_mapped: 'string',
        statistics: 'CountryWeeklyStats',
        geometry: 'Geometry',
      });
    });
    expect($pending.getState()).toEqual(false);
    expect($country.getState()).not.toBeNull();
    act(() => {
      render(<CountryInfo />, container);
    });
    const searchInput = document.querySelector(
      '.search-bar-connectivity__input'
    );
    const spy = jest.fn();
    clearSearchText.watch(spy);

    act(() => {
      // @ts-expect-error
      $searchText.setState('Brazil');
    });
    // @ts-expect-error
    expect(searchInput.value).toEqual('Brazil');

    act(() => {
      // @ts-expect-error
      $searchActive.setState(true);
    });

    const clearButton = document.querySelector('.search-bar__close');

    act(() => {
      // @ts-expect-error
      clearButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(spy).toHaveBeenCalled();
  });

  test('$searchText should be cleared when clearSearchText is called', () => {
    const Model = require('@/sidebar/model');
    Model;
    const Init = require('@/sidebar/init');
    Init;
    act(() => {
      Model.$searchText.setState('Brazil');
    });
    Model.clearSearchText();
    expect(Model.$searchText.getState()).toEqual('');
  });

  test('sidebar radiobutton should be changed, changeMapType should be called', () => {
    expect($pending.getState()).toEqual(false);
    expect($country.getState()).toBeNull();
    act(() => {
      // @ts-expect-error
      $country.setState({
        id: 1,
        name: 'string',
        code: 'string',
        flag: 'string',
        map_preview: 'string',
        description: 'string',
        data_source: 'string',
        date_schools_mapped: 'string',
        statistics: 'CountryWeeklyStats',
        geometry: 'Geometry',
      });
    });
    expect($pending.getState()).toEqual(false);
    expect($country.getState()).not.toBeNull();
    act(() => {
      render(<CountryInfo />, container);
    });

    expect(document.querySelector('.select')).not.toBeNull();

    const initialRadioButton = document.querySelector('#connectivity');
    const targetRadioButton = document.querySelector('#coverage');

    // @ts-expect-error
    expect(initialRadioButton.checked).toEqual(true);
    // @ts-expect-error
    expect(targetRadioButton.checked).toEqual(false);

    const spy = jest.fn();
    changeMapType.watch(spy);

    act(() => {
      // @ts-expect-error
      ReactTestUtils.Simulate.change(targetRadioButton, {
        target: { checked: true },
      });
      // @ts-expect-error
      targetRadioButton.checked = true;
    });
    // @ts-expect-error
    expect(initialRadioButton.checked).toEqual(false);
    // @ts-expect-error
    expect(targetRadioButton.checked).toEqual(true);
    expect(spy).toHaveBeenCalled();
  });

  test('infoPopup should be appeared on mouse over,infoPopup should be disappeared on mouse leave', () => {
    expect($pending.getState()).toEqual(false);
    expect($country.getState()).toBeNull();
    act(() => {
      // @ts-expect-error
      $country.setState({
        id: 1,
        name: 'string',
        code: 'string',
        flag: 'string',
        map_preview: 'string',
        description: 'string',
        data_source: 'string',
        date_schools_mapped: 'string',
        statistics: 'CountryWeeklyStats',
        geometry: 'Geometry',
      });
    });
    expect($pending.getState()).toEqual(false);
    expect($country.getState()).not.toBeNull();
    act(() => {
      render(<CountryInfo />, container);
    });
    expect(document.querySelector('.select')).not.toBeNull();
    const iconWrapper = document.querySelector('.icon-wrapper');
    const infoPopup = document.querySelector('.info-popup');
    // @ts-expect-error
    expect(infoPopup.style.visibility).toBeFalsy();

    act(() => {
      // @ts-expect-error
      ReactTestUtils.Simulate.mouseOver(iconWrapper);
    });
    // @ts-expect-error
    expect(infoPopup.style.visibility).toEqual('visible');
    act(() => {
      // @ts-expect-error
      ReactTestUtils.Simulate.mouseLeave(iconWrapper);
    });
    // @ts-expect-error
    expect(infoPopup.style.visibility).toBeFalsy();
  });
});
