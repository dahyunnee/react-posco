import { createBrowserRouter } from "react-router-dom";
import CalendarPage from "../pages/CalendarPage";
const router = createBrowserRouter([
    {
        path: "",
        element: <CalendarPage />,
      },
])
export default router;