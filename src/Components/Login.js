import React, { useContext, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import Signup from './Signup';
import { Link, useNavigate } from 'react-router-dom';
import { query, where, getDocs } from 'firebase/firestore';
import { usersRef } from './firebase/Firebase';
import { Appstate } from "../App";
import bcrypt from 'bcryptjs'
import swal from "sweetalert";


export default function Login() {

  const navigate = useNavigate();
  const useAppstate = useContext(Appstate);
  const [form, setForm] = useState({
    mobile: "",
    password: "",
  })
  const [loading, setLoading] = useState(false);


  const login = async () => {
    setLoading(true);
    try {
      const quer = query(usersRef, where('mobile', '==', form.mobile))
      const querySnapshot = await getDocs(quer);

      querySnapshot.forEach((doc) => {
        const _data = doc.data();
        const isUser = bcrypt.compareSync(form.password, _data.password);
        if (isUser) {
          useAppstate.setLogin(true);
          useAppstate.setUserName(_data.name);
          swal({
            title: "Logged In",
            icon: "success",
            buttons: false,
            timer: 3000
          })
          navigate('/')
        } else {
          swal({
            title: "Invalid Credentials",
            icon: "error",
            buttons: false,
            timer: 3000
          })
        }
      })
    } catch (error) {
      swal({
        title: error.message,
        icon: "error",
        buttons: false,
        timer: 3000
      })
    }
    setLoading(false);
  }

  return (
    <div className='w-full flex flex-col items-center justify-center mt-4'><h1 className='text-lg font-bold'>
      Login
    </h1>

      <div class="p-2 w-full md:w-1/4">
        <div class="relative">
          <label for="message" class="leading-7 text-sm ">Mobile No.</label>
          <textarea id="message" name="message" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-10 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} ></textarea>
        </div>
      </div>
      <div class="p-2 w-full md:w-1/4">
        <div class="relative">
          <label for="message" class="leading-7 text-sm ">Password</label>
          <textarea id="message" name="message" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-10 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} ></textarea>
        </div>
      </div>

      <button class="flex mx-auto text-white bg-green-600 border-0 py-2 mt-3 px-8 focus:outline-none hover:bg-green-900 rounded text-lg" onClick={login} >{loading ? <TailSpin height={20} color='white'></TailSpin> : 'Login'}</button>


      <p className='mt-2'>Do not have account <span className='text-blue-500'> <Link to={'/signup'}>Signup</Link></span></p>
    </div>
  )
}
