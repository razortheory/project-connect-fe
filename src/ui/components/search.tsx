import React from 'react';

export const Search = () => (
  <div className="sidebar__search-bar search-bar">
    <div className="search-bar__icon" />
    <input
      className="search-bar__input"
      type="text"
      placeholder="Search for a country"
    />
    <button className="search-bar__close" type="button">
      +
    </button>
  </div>
);
