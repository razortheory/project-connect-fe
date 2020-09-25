import React from 'react';

import postImage1 from '~/assets/images/media-post-1.jpg';
import postImage2 from '~/assets/images/media-post-2.jpg';
import postImage3 from '~/assets/images/media-post-3.jpg';
import postImage4 from '~/assets/images/media-post-4.jpg';

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
              <div className="post__author">Unicef</div>
              <div className="post__date">21 july 2020</div>
            </div>
            <h3 className="post__title">
              Educating children during the times of a pandemic: how can we work
              together to connect schools to the internet
            </h3>
          </div>
        </article>
        <article className="post">
          <div className="post__image-wrapper">
            <img className="post__image" src={postImage2} alt="" />
          </div>
          <div className="post__info">
            <div className="post__metadata">
              <div className="post__author">Unicef</div>
              <div className="post__date">21 july 2020</div>
            </div>
            <h3 className="post__title">
              Educating children during the times of a pandemic: how can we work
              together to connect schools to the internet
            </h3>
          </div>
        </article>
        <article className="post">
          <div className="post__image-wrapper">
            <img className="post__image" src={postImage3} alt="" />
          </div>
          <div className="post__info">
            <div className="post__metadata">
              <div className="post__author">Unicef</div>
              <div className="post__date">21 july 2020</div>
            </div>
            <h3 className="post__title">
              Educating children during the times of a pandemic: how can we work
              together to connect schools to the internet
            </h3>
          </div>
        </article>
        <article className="post">
          <div className="post__image-wrapper">
            <img className="post__image" src={postImage4} alt="" />
          </div>
          <div className="post__info">
            <div className="post__metadata">
              <div className="post__author">Unicef</div>
              <div className="post__date">21 july 2020</div>
            </div>
            <h3 className="post__title">
              Educating children during the times of a pandemic: how can we work
              together to connect schools to the internet
            </h3>
          </div>
        </article>
      </div>
    </div>
  </section>
);
