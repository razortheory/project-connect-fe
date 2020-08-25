import React from 'react';
import unicef from './assets/images/unicef-logo-footer.svg';
import giga from './assets/images/giga-logo-footer.svg';
// import mapWithHand from './assets/images/map-with-hand.svg';
// import chevron from './assets/images/chevron.svg';
import './App.scss';

function App() {
    return (
        <div className="App App--inner">
            <header className="header">
                <div className="container-fluid">
                    <a href="/" className="header__logo logo">Project&nbsp;connect</a>
                    {/* header__nav--mobile-visible on menu button click */}
                    <nav className="header__nav">
                        <ul className="menu">
                            <li className="menu__item">
                                <a href="/" className="menu__link">About</a>
                                <ul className="menu">
                                    <li className="menu__item">
                                        <a href="/" className="menu__link">Second level</a>
                                    </li>
                                    <li className="menu__item">
                                        <a href="/" className="menu__link">Second level 2</a>
                                    </li>
                                </ul>
                            </li>
                            <li className="menu__item">
                                <a href="/" className="menu__link">Country progress</a>
                            </li>
                            <li className="menu__item">
                                <a href="/" className="menu__link">Data sharing & privacy</a>
                            </li>
                            <li className="menu__item">
                                <a href="/" className="menu__link">Media</a>
                            </li>
                            <li className="menu__item">
                                <a href="/" className="menu__link">Join us</a>
                            </li>
                        </ul>
                    </nav>
                    <a href="/" className="header__button button button--primary">Project info</a>
                </div>
            </header>
            <main className="content">
                <section className="section">
                    <div className="container">
                        <div className="page-heading">
                            <h2 className="page-heading__title">Countries have been listed below with real-time updates on their progress with school mapping. The key metric that is used to evaluate project progress is the stage of mapping and the percentage of schools mapped. </h2>
                            <div className="page-heading__media">
                                <div className="page-heading__image-wrapper">
                                    <img className="page-heading__image" src="http://placehold.it/624x408.jpg" alt="" />
                                </div>
                                <div className="page-heading__info">
                                    <ul className="info-list info-list--heading">
                                        <li className="info-list__item">
                                            <h3 className="info-list__title">30%</h3>
                                            <p className="info-list__description">Countries with real time connectivity data</p>
                                        </li>
                                        <li className="info-list__item">
                                            <h3 className="info-list__title">78.2%</h3>
                                            <p className="info-list__description">Countries committed to Project Connect</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="section section--inverted">
                    <h2 className="visually-hidden">Partner with us</h2>
                    <div className="container partnership">
                        <div className="partnership__row">
                            <div className="partnership__tabs-list">
                                <button className="partnership__button button button--large button--tertiary">Government</button>
                                <button className="partnership__button button button--large button--tertiary">Non-profit or similar</button>
                                <button className="partnership__button button button--large button--tertiary">International organization</button>
                                <button className="partnership__button button button--large button--tertiary">Development bank</button>
                                <button className="partnership__button button button--large button--tertiary">ISP or Network provider</button>
                                <button className="partnership__button button button--large button--tertiary">tech company</button>
                                <button className="partnership__button button button--large button--tertiary">research institute</button>
                            </div>
                            <div className="partnership__tab-content">
                                <h3 className="partnership__title">Share your data</h3>
                                <p className="partnership__description">We are looking for information on locations of schools and their level of online connectivity. However, any piece of information about schools that you are interested in sharing, no matter how small, is extremely useful.</p>
                                <h3 className="partnership__title">Share your data</h3>
                                <p className="partnership__description">We are looking for information on locations of schools and their level of online connectivity. However, any piece of information about schools that you are interested in sharing, no matter how small, is extremely useful.</p>
                                <h3 className="partnership__title">Share your data</h3>
                                <p className="partnership__description">We are looking for information on locations of schools and their level of online connectivity. However, any piece of information about schools that you are interested in sharing, no matter how small, is extremely useful.</p>
                                <h3 className="partnership__title">Share your data</h3>
                                <p className="partnership__description">We are looking for information on locations of schools and their level of online connectivity. However, any piece of information about schools that you are interested in sharing, no matter how small, is extremely useful.</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="section">
                    <h2 className="visually-hidden">Blog posts</h2>
                    <div className="container">
                        <div className="posts-row">
                            <article className="post">
                                <div className="post__image-wrapper">
                                    <img className="post__image" src="http://placehold.it/500x300.jpg" alt=""/>
                                </div>
                                <div className="post__info">
                                    <div className="post__metadata">
                                        <div className="post__author">
                                            Unicef
                                        </div>
                                        <div className="post__date">
                                            21 july 2020
                                        </div>
                                    </div>
                                    <h3 className="post__title">
                                        Educating children during the times of a pandemic: how can we work together to connect schools to the internet
                                    </h3>
                                </div>
                            </article>
                            <article className="post">
                                <div className="post__image-wrapper">
                                    <img className="post__image" src="http://placehold.it/500x300.jpg" alt=""/>
                                </div>
                                <div className="post__info">
                                    <div className="post__metadata">
                                        <div className="post__author">
                                            Unicef
                                        </div>
                                        <div className="post__date">
                                            21 july 2020
                                        </div>
                                    </div>
                                    <h3 className="post__title">
                                        Educating children during the times of a pandemic: how can we work together to connect schools to the internet
                                    </h3>
                                </div>
                            </article>
                            <article className="post">
                                <div className="post__image-wrapper">
                                    <img className="post__image" src="http://placehold.it/500x300.jpg" alt=""/>
                                </div>
                                <div className="post__info">
                                    <div className="post__metadata">
                                        <div className="post__author">
                                            Unicef
                                        </div>
                                        <div className="post__date">
                                            21 july 2020
                                        </div>
                                    </div>
                                    <h3 className="post__title">
                                        Educating children during the times of a pandemic: how can we work together to connect schools to the internet
                                    </h3>
                                </div>
                            </article>
                            <article className="post">
                                <div className="post__image-wrapper">
                                    <img className="post__image" src="http://placehold.it/500x300.jpg" alt=""/>
                                </div>
                                <div className="post__info">
                                    <div className="post__metadata">
                                        <div className="post__author">
                                            Unicef
                                        </div>
                                        <div className="post__date">
                                            21 july 2020
                                        </div>
                                    </div>
                                    <h3 className="post__title">
                                        Educating children during the times of a pandemic: how can we work together to connect schools to the internet
                                    </h3>
                                </div>
                            </article>
                        </div>
                    </div>
                </section>
                <section className="section section--inverted">
                    <div className="container progress-dashboard">
                        <div className="progress-dashboard__row">
                            <div className="progress-dashboard__legend-col">
                                <h2 className="progress-dashboard__title">Country progress dashboard</h2>
                                <p className="progress-dashboard__description">This view allows the Project Connect partners and the public to view the progress of the nations that are a part of this initiative. This aligns with the values of transparency by real time monitoring of schools connected to the internet.</p>
                                <div className="progress-dashboard__legend">
                                    <h3 className="progress-dashboard__status-title">Progress status legend</h3>
                                    <ul className="progress-dashboard__status-list status-list">
                                        <li className="status-list__item">
                                            <div className="status-list__country-progress country-progress">
                                                <div className="country-progress__bubbles country-progress__bubbles--joined">
                                                    <div className="country-progress__bubble"></div>
                                                    <div className="country-progress__bubble"></div>
                                                    <div className="country-progress__bubble"></div>
                                                    <div className="country-progress__bubble"></div>
                                                </div>
                                                <h4 className="country-progress__title">Country Joined Project Connect</h4>
                                            </div>
                                        </li>
                                        <li className="status-list__item">
                                            <div className="status-list__country-progress country-progress">
                                                <div className="country-progress__bubbles country-progress__bubbles--locations-mapped">
                                                    <div className="country-progress__bubble"></div>
                                                    <div className="country-progress__bubble"></div>
                                                    <div className="country-progress__bubble"></div>
                                                    <div className="country-progress__bubble"></div>
                                                </div>
                                                <h4 className="country-progress__title">School locations mapped</h4>
                                            </div>
                                        </li>
                                        <li className="status-list__item">
                                            <div className="status-list__country-progress country-progress">
                                                <div className="country-progress__bubbles country-progress__bubbles--connectivity-mapped">
                                                    <div className="country-progress__bubble"></div>
                                                    <div className="country-progress__bubble"></div>
                                                    <div className="country-progress__bubble"></div>
                                                    <div className="country-progress__bubble"></div>
                                                </div>
                                                <h4 className="country-progress__title">Static connectivity mapped</h4>
                                            </div>
                                        </li>
                                        <li className="status-list__item">
                                            <div className="status-list__country-progress country-progress">
                                                <div className="country-progress__bubbles country-progress__bubbles--real-time-data">
                                                    <div className="country-progress__bubble"></div>
                                                    <div className="country-progress__bubble"></div>
                                                    <div className="country-progress__bubble"></div>
                                                    <div className="country-progress__bubble"></div>
                                                </div>
                                                <h4 className="country-progress__title">Real time connectivity mapped</h4>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="progress-dashboard__countries-col">
                                <div className="progress-dashboard__controls-bar controls-bar">
                                    <div className="controls-bar__search search-bar">
                                        <div className="search-bar__icon">
                                          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M0 5.91986C0 2.65975 2.65978 0 5.91987 0C9.17994 0 11.8397 2.65975 11.8397 5.91986C11.8397 7.2663 11.3872 8.51222 10.6249 9.50877L14.7688 13.6527C15.0771 13.9609 15.0771 14.4606 14.7688 14.7688C14.4606 15.0771 13.9547 15.077 13.6465 14.7688L9.50878 10.6249C8.51213 11.3875 7.26659 11.8397 5.91987 11.8397C2.65978 11.8397 0 9.17994 0 5.91986ZM10.2611 5.91986C10.2611 3.51292 8.32676 1.57863 5.91987 1.57863C3.51294 1.57863 1.57863 3.51292 1.57863 5.91986C1.57863 8.32675 3.51294 10.2611 5.91987 10.2611C8.32676 10.2611 10.2611 8.32675 10.2611 5.91986Z" fill="white"/>
                                          </svg>
                                        </div>
                                        <input className="search-bar__input" type="text" placeholder="Search for a country" />
                                        <button className="search-bar__close">+</button>
                                    </div>
                                    <div className="controls-bar__sort">
                                        Sort by: Country progress
                                    </div>
                                    <div className="controls-bar__view-changer">
                                        <button className="view-changer__button">
                                          <svg className="view-changer__icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2.8 5.5H17.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M2.8 10.5H17.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M2.8 15.5H17.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                          </svg>
                                          List
                                        </button>
                                        <button className="view-changer__button view-changer__button--active">
                                          <svg className="view-changer__icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="2.75" y="2.75" width="5.5" height="5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            <rect x="2.75" y="11.75" width="5.5" height="5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            <rect x="11.75" y="2.75" width="5.5" height="5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            <rect x="11.75" y="11.75" width="5.5" height="5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                          </svg>
                                          Tile
                                        </button>
                                    </div>
                                </div>
                                {/*countries-list--grid-view and countries-list--list-view for layout switching*/}
                                <div className="progress-dashboard__countries-list countries-list countries-list--grid-view">
                                    <div className="countries-list__grid-header">
                                        <div className="countries-list__grid-row">
                                            <div className="countries-list__grid-col countries-list__grid-col--country">
                                                Country name
                                            </div>
                                            <div className="countries-list__grid-col countries-list__grid-col--date">
                                                Date of joining
                                            </div>
                                            <div className="countries-list__grid-col countries-list__grid-col--progress">
                                                Progress
                                            </div>
                                            <div className="countries-list__grid-col countries-list__grid-col--schools">
                                                Schools with connectivity
                                            </div>
                                            <div className="countries-list__grid-col countries-list__grid-col--link">

                                            </div>
                                        </div>
                                    </div>
                                    <div className="countries-list__row">
                                        <div className="countries-list__item">
                                            <div className="country">
                                                <div className="country__inner">
                                                    <div className="country__meta-wrapper">
                                                        <div className="country__flag-wrapper">
                                                            <img className="country__flag" src="http://placehold.it/140x78.png" alt=""/>
                                                        </div>
                                                        <h3 className="country__name">Democratic Republic of Congo</h3>
                                                        <div className="country__date">19 Aug 2019</div>
                                                    </div>
                                                    <div className="country__progress country-progress">
                                                        <h4 className="country__subtitle">Progress</h4>
                                                        <div className="country-progress__bubbles country-progress__bubbles--real-time-data">
                                                          <div className="country-progress__bubble"></div>
                                                          <div className="country-progress__bubble"></div>
                                                          <div className="country-progress__bubble"></div>
                                                          <div className="country-progress__bubble"></div>
                                                        </div>
                                                        <h5 className="country-progress__title">Real time connectivity mapped</h5>
                                                    </div>
                                                    <div className="country__schools-connectivity schools-connectivity">
                                                        <h4 className="country__subtitle">Schools with connectivity</h4>
                                                        <div className="schools-connectivity__bar">
                                                            <div className="schools-connectivity__filler"></div>
                                                        </div>
                                                        <div className="schools-connectivity__percentage-connected">67.5%</div>
                                                    </div>
                                                    <div className="country__separator">

                                                    </div>
                                                    <p className="country__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin fermentum urna tortor, eget laoreet arcu fermentum sit amet. Sed aliquet, turpis vel fermentum elementum.</p>
                                                    <div className="country__view-on-map view-on-map">

                                                    </div>
                                                    <div className="country__link">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                                                            <path fill="#2779FF" d="M11.679 10.022l-4.61 4.61c-.284.284-.285.744-.002 1.027.285.285.743.282 1.026-.002l5.122-5.121.001-.001c.142-.143.213-.328.213-.513-.001-.186-.072-.37-.213-.512l-.001-.001-5.122-5.122c-.283-.284-.743-.284-1.026-.001-.285.285-.282.742.002 1.026l4.61 4.61z"/>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="countries-list__item">
                                            <div className="country">
                                                <div className="country__inner">
                                                    <div className="country__meta-wrapper">
                                                        <div className="country__flag-wrapper">
                                                            <img className="country__flag" src="http://placehold.it/140x78.png" alt=""/>
                                                        </div>
                                                        <h3 className="country__name">Colombia</h3>
                                                        <div className="country__date">19 Aug 2019</div>
                                                    </div>
                                                    <div className="country__progress country-progress">
                                                        <h4 className="country__subtitle">Progress</h4>
                                                        <div className="country-progress__bubbles country-progress__bubbles--joined">
                                                          <div className="country-progress__bubble"></div>
                                                          <div className="country-progress__bubble"></div>
                                                          <div className="country-progress__bubble"></div>
                                                          <div className="country-progress__bubble"></div>
                                                        </div>
                                                        <h5 className="country-progress__title">Real time connectivity mapped</h5>
                                                    </div>
                                                    <div className="country__schools-connectivity schools-connectivity">
                                                        <h4 className="country__subtitle">Schools with connectivity</h4>
                                                        <div className="schools-connectivity__bar">
                                                            <div className="schools-connectivity__filler"></div>
                                                        </div>
                                                        <div className="schools-connectivity__percentage-connected">67.5%</div>
                                                    </div>
                                                    <div className="country__separator">

                                                    </div>
                                                    <p className="country__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin fermentum urna tortor, eget laoreet arcu fermentum sit amet. Sed aliquet, turpis vel fermentum elementum.</p>
                                                    <div className="country__view-on-map view-on-map">

                                                    </div>
                                                    <div className="country__link">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                                                            <path fill="#2779FF" d="M11.679 10.022l-4.61 4.61c-.284.284-.285.744-.002 1.027.285.285.743.282 1.026-.002l5.122-5.121.001-.001c.142-.143.213-.328.213-.513-.001-.186-.072-.37-.213-.512l-.001-.001-5.122-5.122c-.283-.284-.743-.284-1.026-.001-.285.285-.282.742.002 1.026l4.61 4.61z"/>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="countries-list__item">
                                            <div className="country">
                                                <div className="country__inner">
                                                    <div className="country__meta-wrapper">
                                                        <div className="country__flag-wrapper">
                                                            <img className="country__flag" src="http://placehold.it/140x78.png" alt=""/>
                                                        </div>
                                                        <h3 className="country__name">Brazil</h3>
                                                        <div className="country__date">19 Aug 2019</div>
                                                    </div>
                                                    <div className="country__progress country-progress">
                                                        <h4 className="country__subtitle">Progress</h4>
                                                        <div className="country-progress__bubbles country-progress__bubbles--locations-mapped">
                                                          <div className="country-progress__bubble"></div>
                                                          <div className="country-progress__bubble"></div>
                                                          <div className="country-progress__bubble"></div>
                                                          <div className="country-progress__bubble"></div>
                                                        </div>
                                                        <h5 className="country-progress__title">Real time connectivity mapped</h5>
                                                    </div>
                                                    <div className="country__schools-connectivity schools-connectivity">
                                                        <h4 className="country__subtitle">Schools with connectivity</h4>
                                                        <div className="schools-connectivity__bar">
                                                            <div className="schools-connectivity__filler"></div>
                                                        </div>
                                                        <div className="schools-connectivity__percentage-connected">67.5%</div>
                                                    </div>
                                                    <div className="country__separator">

                                                    </div>
                                                    <p className="country__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin fermentum urna tortor, eget laoreet arcu fermentum sit amet. Sed aliquet, turpis vel fermentum elementum.</p>
                                                    <div className="country__view-on-map view-on-map">

                                                    </div>
                                                    <div className="country__link">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                                                            <path fill="#2779FF" d="M11.679 10.022l-4.61 4.61c-.284.284-.285.744-.002 1.027.285.285.743.282 1.026-.002l5.122-5.121.001-.001c.142-.143.213-.328.213-.513-.001-.186-.072-.37-.213-.512l-.001-.001-5.122-5.122c-.283-.284-.743-.284-1.026-.001-.285.285-.282.742.002 1.026l4.61 4.61z"/>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="countries-list__item">
                                            <div className="country">
                                                <div className="country__inner">
                                                    <div className="country__meta-wrapper">
                                                        <div className="country__flag-wrapper">
                                                            <img className="country__flag" src="http://placehold.it/140x78.png" alt=""/>
                                                        </div>
                                                        <h3 className="country__name">Kenya</h3>
                                                        <div className="country__date">19 Aug 2019</div>
                                                    </div>
                                                    <div className="country__progress country-progress">
                                                        <h4 className="country__subtitle">Progress</h4>
                                                        <div className="country-progress__bubbles country-progress__bubbles--connectivity-mapped">
                                                          <div className="country-progress__bubble"></div>
                                                          <div className="country-progress__bubble"></div>
                                                          <div className="country-progress__bubble"></div>
                                                          <div className="country-progress__bubble"></div>
                                                        </div>
                                                        <h5 className="country-progress__title">Real time connectivity mapped</h5>
                                                    </div>
                                                    <div className="country__schools-connectivity schools-connectivity">
                                                        <h4 className="country__subtitle">Schools with connectivity</h4>
                                                        <div className="schools-connectivity__bar">
                                                            <div className="schools-connectivity__filler"></div>
                                                        </div>
                                                        <div className="schools-connectivity__percentage-connected">67.5%</div>
                                                    </div>
                                                    <div className="country__separator">

                                                    </div>
                                                    <p className="country__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin fermentum urna tortor, eget laoreet arcu fermentum sit amet. Sed aliquet, turpis vel fermentum elementum.</p>
                                                    <div className="country__view-on-map view-on-map">

                                                    </div>
                                                    <div className="country__link">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                                                            <path fill="#2779FF" d="M11.679 10.022l-4.61 4.61c-.284.284-.285.744-.002 1.027.285.285.743.282 1.026-.002l5.122-5.121.001-.001c.142-.143.213-.328.213-.513-.001-.186-.072-.37-.213-.512l-.001-.001-5.122-5.122c-.283-.284-.743-.284-1.026-.001-.285.285-.282.742.002 1.026l4.61 4.61z"/>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/*<div className="sidebar">*/}
                {/*    <div className="sidebar__container">*/}
                {/*        <div className="sidebar__search-bar search-bar">*/}
                {/*            <div className="search-bar__icon"></div>*/}
                {/*            <input className="search-bar__input" type="text" placeholder="Search for a country" />*/}
                {/*            <button className="search-bar__close">+</button>*/}
                {/*        </div>*/}
                {/*        <ul className="sidebar__tabs tabs">*/}
                {/*            <li className="tabs__item">*/}
                {/*                <button className="tabs__button">Map</button>*/}
                {/*            </li>*/}
                {/*            <li className="tabs__item">*/}
                {/*                <button className="tabs__button tabs__button--active">Info</button>*/}
                {/*            </li>*/}
                {/*            <li className="tabs__item">*/}
                {/*                <button className="tabs__button">Controls</button>*/}
                {/*            </li>*/}
                {/*        </ul>*/}
                {/*        <h2 className="sidebar__title">Connecting every young person to information, opportunity and choice.</h2>*/}
                {/*        <div className="sidebar__content">*/}
                {/*            <p className="sidebar__paragraph">Project Connect aims to map real-time connectivity of every school in the world. This will serve as foundation to work with governments and service providers to connect every school to the internet.</p>*/}
                {/*            <ul className="sidebar__list info-list">*/}
                {/*                <li className="info-list__item">*/}
                {/*                    <h3 className="info-list__title">0.8M / 6M</h3>*/}
                {/*                    <p className="info-list__description">Schools mapped</p>*/}
                {/*                </li>*/}
                {/*                <li className="info-list__item">*/}
                {/*                    <h3 className="info-list__title">87%</h3>*/}
                {/*                    <p className="info-list__description">Schools without connectivity</p>*/}
                {/*                </li>*/}
                {/*                <li className="info-list__item">*/}
                {/*                    <h3 className="info-list__title">43</h3>*/}
                {/*                    <p className="info-list__description">Countries joined Project Connect</p>*/}
                {/*                </li>*/}
                {/*            </ul>*/}
                {/*            <button className="button button--primary">Select a country</button>*/}
                {/*        </div>*/}
                {/*        <div className="sidebar__content">*/}
                {/*            <div className="map-hint">*/}
                {/*                <img className="map-hint__image" src={mapWithHand} alt={"Unicef logo"} />*/}
                {/*                <p className="map-hint__text">Click on the country of interest to view the connectivity and location of schools.</p>*/}
                {/*            </div>*/}
                {/*            <ul className="list">*/}
                {/*                <li className="list__item list__item--connected">Brazil</li>*/}
                {/*                <li className="list__item list__item--connected">Colombia</li>*/}
                {/*                <li className="list__item list__item--connected">Kazakhstan</li>*/}
                {/*                <li className="list__item list__item--connected">Kyrgyzstan</li>*/}
                {/*                <li className="list__item list__item--connected">Democratic Republic of Congo</li>*/}

                {/*                <li className="list__item list__item--verified">Dominican Republic</li>*/}
                {/*                <li className="list__item list__item--verified">Guadeloupe</li>*/}
                {/*                <li className="list__item list__item--verified">Honduras</li>*/}
                {/*                <li className="list__item list__item--verified">Liberia</li>*/}
                {/*                <li className="list__item list__item--verified">Mauritania</li>*/}
                {/*                <li className="list__item list__item--verified">Philippines</li>*/}

                {/*                <li className="list__item list__item--not-verified">Puerto Rico</li>*/}
                {/*                <li className="list__item list__item--not-verified">Saint Maarten</li>*/}
                {/*                <li className="list__item list__item--not-verified">Virgin Islands</li>*/}
                {/*                <li className="list__item list__item--not-verified">Sierra Leone</li>*/}
                {/*                <li className="list__item list__item--not-verified">Australia</li>*/}
                {/*                <li className="list__item list__item--not-verified">Austria</li>*/}
                {/*            </ul>*/}
                {/*        </div>*/}
                {/*        <div className="sidebar__content">*/}
                {/*            <h3 className="sidebar__secondary-title">Daily speed graph (download)</h3>*/}
                {/*            <div className="week-graph">*/}
                {/*                <div className="week-graph__item">*/}
                {/*                    <div className="week-graph__pillar">*/}
                {/*                        <div className="week-graph__filler week-graph__filler--good"></div>*/}
                {/*                    </div>*/}
                {/*                    <span className="week-graph__day">F</span>*/}
                {/*                </div>*/}
                {/*                <div className="week-graph__item">*/}
                {/*                    <div className="week-graph__pillar">*/}
                {/*                        <div className="week-graph__filler week-graph__filler--bad"></div>*/}
                {/*                    </div>*/}
                {/*                    <span className="week-graph__day">Sa</span>*/}
                {/*                </div>*/}
                {/*                <div className="week-graph__item">*/}
                {/*                    <div className="week-graph__pillar">*/}
                {/*                        <div className="week-graph__filler week-graph__filler--middle"></div>*/}
                {/*                    </div>*/}
                {/*                    <span className="week-graph__day">Su</span>*/}
                {/*                </div>*/}
                {/*                <div className="week-graph__item">*/}
                {/*                    <div className="week-graph__pillar">*/}
                {/*                        <div className="week-graph__filler week-graph__filler--middle"></div>*/}
                {/*                    </div>*/}
                {/*                    <span className="week-graph__day">M</span>*/}
                {/*                </div>*/}
                {/*                <div className="week-graph__item">*/}
                {/*                    <div className="week-graph__pillar">*/}
                {/*                        <div className="week-graph__filler week-graph__filler--good"></div>*/}
                {/*                    </div>*/}
                {/*                    <span className="week-graph__day">Tu</span>*/}
                {/*                </div>*/}
                {/*                <div className="week-graph__item">*/}
                {/*                    <div className="week-graph__pillar">*/}
                {/*                        <div className="week-graph__filler week-graph__filler--bad"></div>*/}
                {/*                    </div>*/}
                {/*                    <span className="week-graph__day">W</span>*/}
                {/*                </div>*/}
                {/*                <div className="week-graph__item">*/}
                {/*                    <div className="week-graph__pillar">*/}
                {/*                        <div className="week-graph__filler week-graph__filler--middle"></div>*/}
                {/*                    </div>*/}
                {/*                    <span className="week-graph__day">Th</span>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <button className="sidebar__expander">*/}
                {/*        <img src={chevron} alt={"Expand/collapse sidebar"} />*/}
                {/*    </button>*/}
                {/*</div>*/}
            </main>
            <footer className="footer">
                <img className="footer__logo" src={unicef} alt={"Unicef logo"} />
                <img className="footer__logo" src={giga} alt={"Giga logo"} />
                {/*<ul className="footer__map-legend map-legend">*/}
                {/*    <li className="map-legend__item map-legend__item--unavailable">Data unavailable</li>*/}
                {/*    <li className="map-legend__item map-legend__item--no-connectivity">No connectivity</li>*/}
                {/*    <li className="map-legend__item map-legend__item--moderate">Moderate</li>*/}
                {/*    <li className="map-legend__item map-legend__item--good">Good</li>*/}
                {/*</ul>*/}
                {/*<ul className="footer__map-legend map-legend">*/}
                {/*    <li className="map-legend__item map-legend__item--connected">School location +connectivity</li>*/}
                {/*    <li className="map-legend__item map-legend__item--verified">School location (verified)</li>*/}
                {/*    <li className="map-legend__item map-legend__item--not-verified">School location (not&nbsp;verified)</li>*/}
                {/*</ul>*/}
                {/*<ul className="footer__map-switcher map-switcher">*/}
                {/*    <li className="map-switcher__item map-switcher__item--active">*/}
                {/*        Dark*/}
                {/*    </li>*/}
                {/*    <li className="map-switcher__item">*/}
                {/*        Light*/}
                {/*    </li>*/}
                {/*    <li className="map-switcher__item">*/}
                {/*        Satellite*/}
                {/*    </li>*/}
                {/*    <li className="map-switcher__item">*/}
                {/*        Accessible*/}
                {/*    </li>*/}
                {/*</ul>*/}
                {/*<div className="footer__map-resizer map-resizer">*/}
                {/*    <button className="map-resizer__button">*/}
                {/*        <span className="map-resizer__line"></span>*/}
                {/*    </button>*/}
                {/*    <button className="map-resizer__button">*/}
                {/*        <span className="map-resizer__line"></span>*/}
                {/*        <span className="map-resizer__line map-resizer__line--vertical"></span>*/}
                {/*    </button>*/}
                {/*</div>*/}
            </footer>
            {/*<div className="map-placeholder"></div>*/}
        </div>
    );
}

export default App;
