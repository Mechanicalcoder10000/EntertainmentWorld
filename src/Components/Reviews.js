import React, { useContext, useEffect, useState } from 'react';
import ReactStars from 'react-stars';
import { reviewsRef, db } from './firebase/Firebase';
import { addDoc, doc, updateDoc, query, where, getDocs } from 'firebase/firestore';
import { Vortex, ThreeDots } from 'react-loader-spinner';
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom';
import { Appstate } from '../App';


export default function Reviews({ id, prevRating, userRated }) {
    const useAppState = useContext(Appstate);
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState("");
    const [reviewsLoading, setReviewLoading] = useState(true);
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    useEffect(() => {
        async function getData() {
            setReviewLoading(true);
            let quer = query(reviewsRef, where('movieid', '==', id))
            const querySnapDhot = await getDocs(quer);
            querySnapDhot.forEach((doc) => {
                console.log("docsss", doc)
                setData((prev) => [...prev, doc.data()])
            })

            setReviewLoading(false);
        }
        getData()
    }, [])

    const sendReview = async () => {
        try {

            if (useAppState.login) {
                setLoading(true);
                await addDoc(reviewsRef, {
                    movieid: id,
                    rating: rating,
                    name: useAppState.userName,
                    thought: form,
                    timeStamp: new Date().getTime(),

                })
                const ref = doc(db, "movies", id);
                await updateDoc(ref, {
                    rating: prevRating + rating,
                    rated: userRated + 1,
                })

                swal({
                    title: "Successfully added",
                    icon: "success",
                    buttons: false,
                    timer: 2000,
                })

                setLoading(false);
                setRating(0);
                setForm("");
                navigate('/');
            }
            else {
                navigate("/login")
            }

        } catch (error) {
            swal({
                title: "Error in sending the review",
                icon: "error",
                buttons: false,
                timer: 2000,
            })
        }
    }
    return (
        <div className='mt-4 border-t-2 border-gray-700 w-full'>
            <ReactStars size={30} value={rating} half={true}
                onChange={(rate) => setRating(rate)}>


            </ReactStars>
            <input
                value={form}
                onChange={(e) => setForm(e.target.value)}
                placeholder='Share your thoughts...'
                className='w-full p-2 outline-none header'
            />
            <button className='bg-green-600 w-full p-1 flex justify-center' onClick={sendReview}>{loading ? <Vortex
                visible={true}
                height="30"
                width="80"
                ariaLabel="vortex-loading"
                wrapperStyle={{}}
                wrapperClass="vortex-wrapper"
                colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
            /> : 'Share'}

            </button>


            {reviewsLoading ? <div className='mt-6 flex justify-center'><ThreeDots height={10} color='white'></ThreeDots></div> : <div>
                {data.map((ele, i) => {

                    return (
                        <div key={i} className='p-2 w-full border-b border-gray-600 mt-2 header'>
                            <div className='flex items-center'>
                                <p className='text-blue-500 '>{ele.name}</p>
                                <p className='ml-3 text-xs'>({new Date(ele.timeStamp).toLocaleString()})</p>

                            </div>
                            <ReactStars size={30} value={ele.rating} half={true} edit={false}
                            >


                            </ReactStars>
                            <p>{ele.thought}</p>


                        </div>
                    )
                })}
            </div>}

        </div>
    )
}
