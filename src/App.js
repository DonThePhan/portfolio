import { Route, Routes } from 'react-router-dom';

import NotFound from './components/NotFound';
import Main from './components/Main';

function App() {
  const h1Size = 'text-4xl lg:text-5xl font-bold leading-tight mb-6';

  return (
    <div className='flex flex-col items-center w-full bg-bg-base-1'>
      <div className='w-full md:w-4/5 lg:w-2/3 xl:w-3/5 text-text'>
        <Routes>
          <Route path='/' element={<Main h1Size={h1Size} />} />
          <Route path='*' element={<NotFound h1Size={h1Size} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
