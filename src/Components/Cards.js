import React, { useEffect, useState } from 'react';
import ReactStars from 'react-stars';
import { ThreeDots } from 'react-loader-spinner';
import { movieRef } from './firebase/Firebase';
import { getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const Cards = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        async function getData() {
            setLoading(true);
            const data = await getDocs(movieRef);
            data.forEach((doc) => {
                setData((prv) => [...prv, { ...(doc.data()), id: doc.id }])
            })
            setLoading(false);
        }
        getData();
    }, [])


    return (
        <div className='flex flex-wrap justify-between p-3 mt-2 px-20'>
            {loading ? <div className='w-full flex justify-center items-center h-96'><ThreeDots></ThreeDots></div> :
                data.map((Element, index) => {
                    console.log("u", Element);
                    return (
                        <Link to={`/details/${Element.id}`}>
                            <div key={index} className='card shadow-lg p-2 hover:-translate-y-3 cursor-pointer font-medium mt-4 trasitiom-all duration-500'>
                                <img className='h-60 md:h-72 w-full dummy_class' src={Element.image} />
                                <h1>
                                    <span className='text-gray-500'>Name:</span> {Element.title}
                                </h1>
                                <h1 className='flex items-center'>
                                    <span className='text-gray-500 mr-1'>Rating:
                                    </span>
                                    <ReactStars size={20} edit={false} value={Element.rating / Element.rated} half={true}>

                                    </ReactStars>

                                </h1>
                                <h1 >
                                    <span className='text-gray-500'>
                                        Year: </span>
                                    {Element.Year}

                                </h1>

                            </div>
                        </Link>
                    )
                })

            }



        </div>
    )
}

export  {Cards};