import { default as React, useContext, useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryHeader from '../../components/CategoryHeader/Header';
import Loader from '../../components/Loader/Loader';
import Card from '../../components/Card/Card';
import './Home.styles.css';
import { Technology, Business, Health } from '../../data/data';

const DreamsPage = () =>
{
  const [dreams, setDreams] = useState([])
  const loading = false
  const navigate = useNavigate();
  return (
    <>
      <h1
        className="text-xl md:text-2xl xl:text-3xl font-bold
      tracking-tight mb-12"
      >
        <span className="capitalize">Bring creative projects to life on</span>
        <br />
        <span className="uppercase text-green-600">Daily Dreams</span>
      </h1>
      <div className='grid grid-cols-3'>
        <div className=''>
          <CategoryHeader
            title={'Technology'}
          // onClick={() => categoryDetailPage('business', businessState)}
          />
          {/* <HorizontalLine color={'#EEEEEE'} height={2} /> */}

          {loading ? (
            <Loader />
          ) : (
            Technology?.length && Technology.map(
              (article, index) => (
                <Card
                  key={index}
                  source={article.source.name}
                  url={article.url}
                  imageUrl={article.urlToImage}
                  title={article.title}
                  lastUpdated={article.publishedAt}
                />
              )
            )
          )}
        </div>
        <div className=''>
          <CategoryHeader
            title={'Bussiness'}
          // onClick={() => categoryDetailPage('business', businessState)}
          />
          {/* <HorizontalLine color={'#EEEEEE'} height={2} /> */}

          {loading ? (
            <Loader />
          ) : (
            Business?.length && Business.map(
              (article, index) => (
                <Card
                  key={index}
                  source={article.source.name}
                  url={article.url}
                  imageUrl={article.urlToImage}
                  title={article.title}
                  lastUpdated={article.publishedAt}
                />
              )
            )
          )}
        </div>
        <div className=''>
          <CategoryHeader
            title={'Health'}
          // onClick={() => categoryDetailPage('business', businessState)}
          />
          {/* <HorizontalLine color={'#EEEEEE'} height={2} /> */}

          {loading ? (
            <Loader />
          ) : (
            Health?.length && Health.map(
              (article, index) => (
                <Card
                  key={index}
                  source={article.source.name}
                  url={article.url}
                  imageUrl={article.urlToImage}
                  title={article.title}
                  lastUpdated={article.publishedAt}
                />
              )
            )
          )}
        </div>
      </div>
    </>
  );
};

export default DreamsPage;
