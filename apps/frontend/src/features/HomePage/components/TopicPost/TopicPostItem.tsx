// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { defaultThumbnail } from '@/constants/thumnail';
import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
export interface TopicPostItemProps {
  url: string;
  title: string;
  publishedAt: Date;
  thumbnailURL: string;
  publisherLogo?: string;
  publisherName?: string;
}
export const TopicPostItem: React.FC<TopicPostItemProps> = (props) => {
  const {
    url,
    title,
    publishedAt,
    publisherLogo,
    publisherName,
    thumbnailURL,
  } = props;
  return (
    <div className="item-news-navbar">
      <div className="img-news-navbar">
        <Link to={url}>
          <img src={thumbnailURL || defaultThumbnail} alt="" />
        </Link>
      </div>

      <div className="description-item-news">
        <Link to={url}>
          <span>{title}</span>
        </Link>
        <div className="news-source">
          <Link to={url}>
            <img
              className="logo-source"
              src={
                publisherLogo ||
                'https://baomoi-static.zadn.vn/web/styles/img/logo-baomoi-gray.png'
              }
              alt={publisherName || 'Báo mới'}
            />
          </Link>
          <span className="news-time">
            {moment(publishedAt).locale('vi').fromNow()}
          </span>
        </div>
      </div>
    </div>
  );
};
