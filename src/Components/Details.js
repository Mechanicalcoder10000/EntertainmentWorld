import React, { useEffect, useState } from 'react';
import ReactStars from 'react-stars';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { Bars } from 'react-loader-spinner';
import { db } from './firebase/Firebase';
import Reviews from './Reviews';

const Details = () => {
  const { id } = useParams();
  const [data, setData] = useState({
    title: "",
    image: "",
    Description: "",
    Year: "",
    rating: 0,
    rated: 0,
  })
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getData() {
      setLoading(true)
      const _doc = doc(db, "movies", id);
      const _data = await getDoc(_doc);
      setData(_data.data());
      console.log("cjecll", _data.data())
      setLoading(false)
    }
    getData()
  }, [])
  return (


    <div className='p-4 mt-4 flex flex-col md:flex-row items-center md:items-start w-full justify-center'>

      {loading ? <div className='h-96 flex w-full justify-center items-center'> <Bars height={50} color='white'></Bars></div>
        : <>
          <img src={data.image} className='h-96 block md:sticky top-20' />
          <div className='md:ml-4 ml:0 w-full md:w-1/2'>
            <h1 className='text-3xl font-bold text-gray-400 mb-2'>{data.title} <span className='text-xl'>({data.Year})</span></h1>
            <ReactStars size={20} edit={false} value={data.rating / data.rated} half={true}>

            </ReactStars>
            <p className='mt-2'>{data.Description}</p>
            <Reviews id={id} prevRating={data.rating} userRated={data.rated}></Reviews>
          </div>
        </>}

    </div>
  )
}

export default Details 