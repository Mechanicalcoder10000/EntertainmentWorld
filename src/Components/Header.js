import React, { useContext } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Appstate } from '../App';

const Header = () => {
  const useAppState = useContext(Appstate);
  return (

    <div className='sticky top-0 z-10 header text-3xl text-red-500 font-bold p-3 border-b-4 border-gray-600 flex justify-between items-center'>
      <Link to={'/'}>
        <span>
          Filmy <span className='text-white'>World</span>
        </span>
      </Link>

      {useAppState.login ?   <Link to={'/addmovie'}>
        <h1 className='text-lg text-white flex items-center cursor-pointer'>
          <Button>
            <AddIcon className='mr1' color='inherit'>
            </AddIcon>
            <span className='text-white'> Add new
            </span>
          </Button>

        </h1>
      </Link> :    <Link to={'/login'}>
        <h1 className='text-lg text-white flex items-center cursor-pointer bg-green-500'>
          <Button>
            <span className='text-white font-medium capitalize'> Login
            </span>
          </Button>

        </h1>
      </Link> }

    </div>


  )
}

export default Header