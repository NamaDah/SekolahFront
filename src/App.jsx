import { Link } from "react-router-dom";
import Routes from "./routes";


export default function App() {
  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
          <div className="container">
            <Link to="" className="navbar-brand">Home</Link>
            <button className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              arial-controls="navbarSupportedContent"
              arial-expanded="false"
              arial-label="Toggle navigation"
              >
              <span className="navbar-toggle-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
            <Link
                to="/siswas"
                className="nav-link d-flex align-items-center gap-2 active"
                aria-current="page"
            >
                <i className="bi bi-people"></i> Siswa
            </Link>
        </li>
        <li className="nav-item">
            <Link
                to="/kelas"
                className="nav-link d-flex align-items-center gap-2 active"
                aria-current="page"
            >
                <i className="bi bi-building"></i> Kelas
            </Link>
        </li>
        <li className="nav-item">
            <Link
                to="/mapel"
                className="nav-link d-flex align-items-center gap-2 active"
                aria-current="page"
            >
                <i className="bi bi-book-fill"></i> Mapel
            </Link>
        </li>

        <li className="nav-item">
            <Link
                to="/jadwal"
                className="nav-link d-flex align-items-center gap-2 active"
                aria-current="page"
            >
                <i className="bi bi-calendar-date-fill"></i> Jadwal
            </Link>
        </li>
    </ul>
    
</div>



          </div>
        </nav>
      </div>
      <Routes />

    </>

  )
}