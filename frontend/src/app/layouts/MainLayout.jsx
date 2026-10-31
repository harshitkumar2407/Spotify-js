import { Outlet } from "react-router";
import Navbar from "../../shared/ui/components/Navbar";
import GlobalPlayer from "../../features/player/ui/GlobalPlayer";
import "./MainLayout.css";

const MainLayout = () => {
  return (
    <div className="app-shell">
      <header className="app-shell__header">
        <Navbar />
      </header>

      <div className="app-shell__workspace">
        <aside className="app-shell__sidebar app-shell__sidebar--library">
          <h2>Your Library</h2>
        </aside>

        <main className="app-shell__content">
          <Outlet />
        </main>

        <aside className="app-shell__sidebar app-shell__sidebar--activity">
          <h2>Friend activity</h2>
        </aside>
      </div>

      <footer className="app-shell__player">
        <GlobalPlayer />
      </footer>
    </div>
  );
};

export default MainLayout;
