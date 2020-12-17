/* eslint-disable jest/no-mocks-import,no-restricted-imports,
   @typescript-eslint/no-unsafe-assignment,global-require,@typescript-eslint/no-unused-expressions,
   @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,
   @typescript-eslint/ban-ts-comment, @typescript-eslint/ban-ts-comment
*/

import '../../../__mocks__/match-media';

import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import { CountryBasic } from '~/api/types';
import { mapCountries } from '~/core/routes';
import { Link } from '~/lib/router';

import { selectMapTab } from '@/sidebar/model';
import { CountryListItem } from '@/sidebar/ui/country-list-item';
import { WorldView } from '@/sidebar/ui/world-view';

let container = (null as unknown) as Element;

describe('map tests', () => {
  window.URL.createObjectURL = jest.fn();

  beforeEach(() => {
    window.history.pushState({}, 'Default location pathname', '/map');
    jest.resetModules();
    container = document.createElement('div');
    document.body.append(container);
  });

  afterEach(() => {
    // @ts-expect-error
    window.URL.createObjectURL.mockReset();

    unmountComponentAtNode(container);
    container.remove();
    container = (null as unknown) as Element;
  });
  it('world view component should be rendered, url should be changed on select country button click', () => {
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

  it('county list item should be rendered if appropriate props were given, url should be changed after country link clicked', () => {
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

  it('url should be changed on change country link click', () => {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions

    window.history.pushState(
      {},
      'Default location pathname',
      '/map/country/br'
    );
    expect(window.location.pathname).toEqual(`/map/country/br`);

    act(() => {
      render(
        <Link
          to={mapCountries}
          className="breadcrumbs__link"
          onClick={() => selectMapTab()}
        >
          change country
        </Link>,
        container
      );
    });

    act(() => {
      // @ts-expect-error
      document
        .querySelector('.breadcrumbs__link')
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(window.location.pathname).toEqual(`/map/countries`);
  });
});
