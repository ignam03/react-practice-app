import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AppRouter } from "./routes/Router";
import { NotificationProvider } from "./context/notification.context";
import { AuthProvider } from "./context/AuthProvider";

function App() {
  return (
    <NotificationProvider>
      <BrowserRouter>
        <AuthProvider>
        <AppRouter />
        </AuthProvider>
      </BrowserRouter>
    </NotificationProvider>
  );
}

export default App;
