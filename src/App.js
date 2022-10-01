import { Route, Routes } from "react-router-dom";

import NotFound from "./components/NotFound";
import Main from "./components/Main";

function App() {
  return (
    <div className='flex flex-col items-center w-full bg-bg-base-1'>
      <div className='w-full md:w-4/5 lg:w-2/3 xl:w-3/5 text-text'>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
