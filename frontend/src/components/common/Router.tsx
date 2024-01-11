import { Route, Routes } from 'react-router-dom';
import EmotionResult from '../../pages/EmotionResult';
import MainPage from '../../pages/MainPage';
import CalendarPage from '../../pages/CalendarPage'; 
import LoginPage from '../../pages/LoginPage';
import RegisterBox from '../user/RegisterBox';
import ChatPage from '../../pages/ChatPage';
import DiaryPage from '../../pages/DiaryPage';


function Router() {
    return (
        <Routes>
            <Route path='/' element={<LoginPage />}></Route>
            <Route path='/main' element={<MainPage />}></Route>
            <Route path='/result/:diaryId' element={<EmotionResult/>}></Route>
            <Route path='/calendar' element={<CalendarPage/>}></Route>
            <Route path='/register' element={<RegisterBox/>}></Route>
            <Route path='/chat' element={<ChatPage/>}></Route>
            <Route path='/diary' element={<DiaryPage/>}></Route>
        </Routes>
    )
}

export default Router;