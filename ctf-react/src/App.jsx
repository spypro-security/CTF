import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Internships from "./pages/Internships";
import Jobs from "./pages/Jobs";
import Workshops from "./pages/Workshops";
import JobDetail from "./pages/JobDetail";
import JobApplication from "./pages/JobApplication";
import Competitions from "./pages/Competitions";
import Practice from "./pages/Practice";
import Badges from "./pages/Badges";
import Introduction from "./pages/Introduction";
import Topic from "./pages/Topic";
import Unix from "./pages/Unix";
import Essential from "./pages/Essential";
import Pcap from "./pages/Pcap";
import Http from "./pages/Http";
import Serialize from "./pages/Serialize";
import Intercept from "./pages/Intercept";
import Auth from "./pages/Auth";
import Android from "./pages/Android";
import CTF from "./pages/CTF";
import EnrollPage from "./pages/EnrollPage";
import CTFIntroduction from "./pages/CTFIntroduction";
import ApplicationResult from "./pages/ApplicationResult";
import WorkshopCurriculum from "./pages/WorkshopCurriculum"; // ✅ NEW

function App() {
  return (
    <>
      <Navbar />

      <div className="main-content">
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/internships" element={<Internships />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/job-detail" element={<JobDetail />} />
          <Route path="/job-application" element={<JobApplication />} />
          <Route path="/competitions" element={<Competitions />} />
          <Route path="/workshop" element={<Workshops />} />

          {/* ✅ Workshop Curriculum */}
          <Route
            path="/workshop-curriculum"
            element={<WorkshopCurriculum />}
          />

          {/* Practice Flow */}
          <Route path="/practice" element={<Practice />} />
          <Route path="/practice/enroll" element={<EnrollPage />} />
          <Route path="/practice/badges" element={<Badges />} />

          {/* Badge Topics */}
          <Route path="/practice/introduction" element={<Introduction />} />
          <Route path="/practice/unix" element={<Unix />} />
          <Route path="/practice/essential" element={<Essential />} />
          <Route path="/practice/pcap" element={<Pcap />} />
          <Route path="/practice/http" element={<Http />} />
          <Route path="/practice/white" element={<Topic title="White" />} />
          <Route path="/practice/serialize" element={<Serialize />} />
          <Route path="/practice/yellow" element={<Topic title="Yellow" />} />
          <Route path="/practice/blue" element={<Topic title="Blue" />} />
          <Route path="/practice/green" element={<Topic title="Green" />} />
          <Route path="/practice/orange" element={<Topic title="Orange" />} />
          <Route path="/practice/intercept" element={<Intercept />} />
          
          <Route
            path="/practice/auth"
            element={<Auth />}
          />
          <Route path="/practice/android" element={<Android />} />
          <Route path="/practice/ctf" element={<CTF />} />
          <Route path="/practice/ctf/introduction" element={<CTFIntroduction />} />
          <Route path="/practice/ctf/:challenge" element={<Topic />} />

          <Route
            path="/application-result"
            element={<ApplicationResult />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
