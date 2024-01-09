import { Route, Routes } from 'react-router-dom';
import EmotionResult from '../../pages/EmotionResult';
import MainPage from '../../pages/MainPage'; 

function Router() {
    return(
        <Routes>
            <Route path='/' element={<MainPage />}></Route>
            <Route path='/result/:diaryId' element={<EmotionResult/>}></Route>
        </Routes>
    )
}

export default Router;