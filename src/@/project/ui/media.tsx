import React from 'react';

import postImage1 from '~/assets/images/media-post-1.jpg';
import postImage2 from '~/assets/images/media-post-2.jpg';
import postImage3 from '~/assets/images/media-post-3.jpg';
import postImage4 from '~/assets/images/media-post-4.jpg';
import postImage5 from '~/assets/images/media-post-5.gif';
import postImage6 from '~/assets/images/media-post-6.jpg';
import postImage7 from '~/assets/images/media-post-7.png';
import postImage8 from '~/assets/images/media-post-8.png';

export const Media = () => (
  <section className="section">
    <h2 className="visually-hidden">Blog posts</h2>
    <div className="container">
      <div className="posts-row">
        <article className="post">
          <div className="post__image-wrapper">
            <img className="post__image" src={postImage1} alt="" />
          </div>
          <div className="post__info">
            <div className="post__metadata">
              <div className="post__author">CNN Business</div>
              <div className="post__date">April 4, 2019</div>
            </div>
            <a
              href="https://edition.cnn.com/2019/04/04/perspectives/unicef-schools-internet-access/index.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3 className="post__title">
                Without Internet, 364 million children are falling behind
              </h3>
            </a>
          </div>
        </article>
        <article className="post">
          <div className="post__image-wrapper">
            <img className="post__image" src={postImage8} alt="" />
          </div>
          <div className="post__info">
            <div className="post__metadata">
              <div className="post__author">DEVELOPMENT SEED</div>
              <div className="post__date">Mart 18, 2021</div>
            </div>
            <a
              href="https://developmentseed.org/blog/2021-03-18-ai-enabling-school-mapping"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3 className="post__title">
                Scaling AI to map every school on the planet
              </h3>
            </a>
          </div>
        </article>
        <article className="post">
          <div className="post__image-wrapper">
            <img className="post__image" src={postImage7} alt="" />
          </div>
          <div className="post__info">
            <div className="post__metadata">
              <div className="post__author">tryo labs</div>
              <div className="post__date">December 29, 2020</div>
            </div>
            <a
              href="https://tryolabs.com/blog/2020/12/29/using-ai-to-connect-every-school-with-the-internet/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3 className="post__title">
                Using AI to connect every school with the internet
              </h3>
            </a>
          </div>
        </article>
        <article className="post">
          <div className="post__image-wrapper">
            <img className="post__image" src={postImage2} alt="" />
          </div>
          <div className="post__info">
            <div className="post__metadata">
              <div className="post__author">ITU News</div>
              <div className="post__date">January 15, 2020</div>
            </div>
            <a
              href="https://news.itu.int/mapping-schools-worldwide-to-bring-internet-connectivity-the-giga-initiative-gets-going"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3 className="post__title">
                Mapping schools worldwide to bring Internet connectivity. The
                Giga initiative gets going
              </h3>
            </a>
          </div>
        </article>
        <article className="post">
          <div className="post__image-wrapper">
            <img className="post__image" src={postImage3} alt="" />
          </div>
          <div className="post__info">
            <div className="post__metadata">
              <div className="post__author">CNET</div>
              <div className="post__date">Aug 26, 2020</div>
            </div>
            <a
              href="https://www.cnet.com/news/ericsson-unicef-partner-to-map-school-connectivity-and-bridge-digital-divide"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3 className="post__title">
                Ericsson, UNICEF partner to map school connectivity and bridge
                digital divide
              </h3>
            </a>
          </div>
        </article>
        <article className="post">
          <div className="post__image-wrapper">
            <img className="post__image" src={postImage4} alt="" />
          </div>
          <div className="post__info">
            <div className="post__metadata">
              <div className="post__author">GIGA CONNECT</div>
              <div className="post__date">October 7, 2020</div>
            </div>
            <a
              href="https://gigaconnect.org/nic-br-and-unicef-to-measure-school-connectivity/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3 className="post__title">
                International agreement between NIC.br and UNICEF contributes to
                measure the connectivity of schools
              </h3>
            </a>
          </div>
        </article>
        <article className="post">
          <div className="post__image-wrapper">
            <img className="post__image" src={postImage5} alt="" height="292" />
          </div>
          <div className="post__info">
            <div className="post__metadata">
              <div className="post__author">medium</div>
              <div className="post__date">May 20, 2019</div>
            </div>
            <a
              href="https://medium.com/devseed/finding-unmapped-schools-from-space-with-ai-28459f68c2f3"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3 className="post__title">
                Finding unmapped schools from space with AI
              </h3>
            </a>
          </div>
        </article>
        <article className="post">
          <div className="post__image-wrapper">
            <img className="post__image" src={postImage6} alt="" height="292" />
          </div>
          <div className="post__info">
            <div className="post__metadata">
              <div className="post__author">cfr</div>
              <div className="post__date">September 25, 2017</div>
            </div>
            <a
              href="https://www.cfr.org/blog/challenge-connecting-schools-internet-developing-world"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3 className="post__title">
                The challenge of connecting schools to the Internet in the
                developing world
              </h3>
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
);
