import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserSignUp from "./pages/UserSignUp.jsx";
import SignIn from "./pages/SignIn.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import SendMoney from "./pages/SendMoney.jsx";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/signup" element={<UserSignUp />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/send" element={<SendMoney />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
