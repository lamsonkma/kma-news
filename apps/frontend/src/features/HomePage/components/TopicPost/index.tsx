import React from 'react';
import { Link } from 'react-router-dom';
import { PostByChannelResponse } from '@kma-news/api-interface';
import { TopicPostItem } from './TopicPostItem';

export const TopicPost: React.FC<Omit<PostByChannelResponse, 'id'>> = (
  props
) => {
  const { name, contents, url } = props;
  return (
    <div className="section">
      <div>
        <div className="title-news-navbar">{name}</div>
        <div className="list-news-navbar">
          {contents.map((content, index) => (
            <TopicPostItem
              key={index}
              url={content.url}
              title={content.title}
              publishedAt={
                content.publishedAt ? new Date(content.publishedAt) : new Date()
              }
              thumbnailURL={content.thumbnailURL}
              publisherLogo={content.publisher.logo}
              publisherName={content.publisher.name}
            />
          ))}
        </div>
        <div className="btn-list-posts">
          <Link to={url}>Xem thêm</Link>
        </div>
      </div>
    </div>
  );
};

// export const NewsHorizontal: React.FC = () => {
//     return (
//       <div className="news-horizontal">
//         <div className="title-news-other-horizontal">
//           <Link to="/">
//             <h3>{dataArrayHorizontal[0].title}</h3>
//           </Link>
//         </div>
//         <div className="list-news-other">
//           {dataArrayHorizontal[0].img?.map((imgItem, index) => (
//             <div className="item-news-other" key={index}>
//               <Link to="/">
//                 <img src={imgItem} alt="" />
//               </Link>
//             </div>
//           ))}
//         </div>
//         <div className="news-source">
//           <Link to="/">
//             <img className="logo-source" src={dataArrayHorizontal[0].newsSource?.img} alt="" />
//           </Link>
//           <span className="news-time">{dataArrayHorizontal[0].newsSource?.time}</span>
//           <span className="number-news-other">
//             <Link to="/">{dataArrayHorizontal[0].newsSource?.numberNewsOther}</Link>
//           </span>
//         </div>
//       </div>
//     )
//   }
