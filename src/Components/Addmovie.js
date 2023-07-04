import React, { useContext, useState } from 'react'
import { TailSpin } from 'react-loader-spinner'
import { addDoc } from 'firebase/firestore'
import { movieRef } from './firebase/Firebase'
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom';
import { Appstate } from "../App";

const Addmovie = () => {
  const navigate = useNavigate();
  const useAppstate = useContext(Appstate)
  const [form, setForm] = useState({
    title: "",
    Year: "",
    Description: "",
    image: "",
    rating: 0,
    rated: 0,
  })
  const [loading, setLoading] = useState(false);
  const addMovie = async () => {
    if (useAppstate.login) {
      setLoading(true);
      await addDoc(movieRef, form);
      swal({
        title: "Successfully added",
        icon: "success",
        buttons: false,
        timer: 2000,
      })
      setLoading(false);
      setForm({
        title: "",
        Year: "",
        Description: "",
        image: "",
        rating: 0,
        rated: 0,
      })
      navigate('/');
    }
    else {
      swal({
        title: "Please login to add movie",
        icon: "note",
        buttons: false,
        timer: 2000,
      })
      navigate('/login')
    }


  }
  return (
    <div>
      <section class="text-gray-600 body-font relative">
        <div class="container px-5 py-8 mx-auto md:w-2/3">
          <div class="flex flex-col text-center w-full mb-4">
            <h1 class="sm:text-3xl text-xl font-medium title-font mb-4 text-white">Add movie</h1>
          </div>
          <div class="lg:w-1/2 md:w-1/2 mx-auto">
            <div class="flex flex-wrap -m-2">
              <div class="p-2 w-1/2">
                <div class="relative">
                  <label for="name" class="leading-7 text-sm text-gray-300">Name</label>
                  <input type="text" id="name" name="name" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                </div>
              </div>
              <div class="p-2 w-1/2">
                <div class="relative">
                  <label for="email" class="leading-7 text-sm text-gray-300">Year</label>
                  <input type="email" id="email" name="email" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" value={form.Year} onChange={(e) => setForm({ ...form, Year: e.target.value })} />
                </div>
              </div>
              <div class="p-2 w-full">
                <div class="relative">
                  <label for="message" class="leading-7 text-sm text-gray-600">Image Link</label>
                  <textarea id="message" name="message" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-20 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} ></textarea>
                </div>
              </div>
              <div class="p-2 w-full">
                <div class="relative">
                  <label for="message" class="leading-7 text-sm text-gray-600">Description</label>
                  <textarea id="message" name="message" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" value={form.Description} onChange={(e) => setForm({ ...form, Description: e.target.value })} ></textarea>
                </div>
              </div>
              <div class="p-2 w-full">
                <button class="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-900 rounded text-lg" onClick={addMovie} >{loading ? <TailSpin height={20} color='white'></TailSpin> : 'Submit'}</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Addmovie