import { Outlet } from 'react-router-dom';
import './App.css';
import { Button } from 'flowbite-react';

function App() {
  return (
    <>
      <div className='text-center mt-6'>
        <h1 className='text-xl font-bold'>Course Page</h1>
      </div>
      <div className='flex flex-col items-center mt-3'>
        <Button href='/login'>Login</Button>
      </div>
      <Outlet/>
    </>
  );
}


export default App;
