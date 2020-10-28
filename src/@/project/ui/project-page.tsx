import React from 'react';

import { about, countryProgress, joinUs, media, privacy } from '~/core/routes';
import { useRoute } from '~/lib/router';

import { About } from './about';
import { CountryProgress } from './country-progress';
import { Footer } from './footer';
import { Header } from './header';
import { JoinUs } from './join-us';
import { Media } from './media';
import { Privacy } from './privacy';

export const ProjectPage = () => {
  return (
    <div className="app app--inner">
      <Header />
      <main className="content">
        {useRoute(about) && <About />}
        {useRoute(countryProgress) && <CountryProgress />}
        {useRoute(privacy) && <Privacy />}
        {useRoute(media) && <Media />}
        {useRoute(joinUs) && <JoinUs />}
      </main>
      <Footer />
    </div>
  );
};
