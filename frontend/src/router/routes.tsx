import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/MainPage";
import CalendarPage from "../pages/CalendarPage";
const router = createBrowserRouter([
    {
        path: "/Calendar",
        element: <CalendarPage />,
      },
]);
export default router;