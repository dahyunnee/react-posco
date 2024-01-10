import { Route, Routes } from 'react-router-dom';
import EmotionResult from '../../pages/EmotionResult';
import MainPage from '../../pages/MainPage';
import CalendarPage from '../../pages/CalendarPage'; 
import LoginPage from '../../pages/LoginPage';

function Router() {
    return (
        <Routes>
            <Route path='/' element={<LoginPage />}></Route>
            <Route path='/result/:diaryId' element={<EmotionResult/>}></Route>
            <Route path='/calendar' element={<CalendarPage/>}></Route>
        </Routes>
    )
}

export default Router;