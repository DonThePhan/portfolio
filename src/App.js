import { Route, Routes, Navigate } from 'react-router-dom';

import NotFound from './components/NotFound';
import Main from './components/Main';

function App() {
  return (
    <div className='flex flex-col items-center w-full'>
      <div className='w-full md:w-4/5 lg:w-2/3 xl:w-1/2'>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
