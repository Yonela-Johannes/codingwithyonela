import React from 'react';
import HorizontalLine from '../HorizontalLine/HorizontalLine';
import './Card.styles.css';

const Card = ({
  imageUrl,
  title,
  description,
  lastUpdated,
  url,
  source,
}) =>
{
  return (
    <>
      <HorizontalLine color={'#EEEEEE'} height={1} />
      <div className='card'>
        <div className='card-content'>
          <div className='card-source'>{source}</div>
          <h1 className='card-title'>
            <a href={url} target='_blank'>
              {title}
            </a>
          </h1>
          {description && (
            <p className='card-description'>
              {description}
              <a href={url} target='_blank'>
                read more
              </a>
            </p>
          )}
          <p className='card-last-updated'>{lastUpdated}</p>
        </div>
        <img src={imageUrl} alt={title} className='card-image' />
      </div>
    </>
  );
};

export default Card;
