import '../App.css';
import Home from '../pages/Home';
import Schools from '../pages/Schools';
import Users from '../pages/Users';
import Documents from '../pages/Documents';
import '@aws-amplify/ui-react/styles.css';
import '@fontsource/inter/variable.css';
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Router() {

  return (
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/programs" element={<Schools />} />
          <Route path="/students" element={<Users />} />
          <Route path="/documents" element={<Documents />} />
        </Routes>
  );
}
