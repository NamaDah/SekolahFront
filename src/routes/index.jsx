import { Route, Routes } from "react-router-dom";
import Home from "../views/home";
import SiswaIndex from "../views/siswa/index.jsx";
import SiswaAdd from "../views/siswa/add.jsx";
import SiswaEdit from "../views/siswa/update.jsx";

import KelasIndex from "../views/kelas/index.jsx";
import KelasAdd from "../views/kelas/add.jsx";
import KelasEdit from "../views/kelas/update.jsx";

import MapelIndex from "../views/mapel/index.jsx";
import MapelAdd from "../views/mapel/add.jsx";
import MapelEdit from "../views/mapel/update.jsx";

import JadwalIndex from "../views/jadwal/index.jsx";
import JadwalAdd from "../views/jadwal/add.jsx";
import JadwalEdit from "../views/jadwal/update.jsx";

export default function RouteIndex() {
    return(
        <>
        <Routes>
            {/* <Route path="/" /> */}
            <Route path="/" element={< Home />} />

            {/* Siswa */}
            <Route path="/siswas" element={< SiswaIndex />} />
            <Route path="/siswas/add" element={< SiswaAdd />} />
            <Route path="/siswas/edit/:id" element={< SiswaEdit />} />
            
            {/* Kelas */}
            <Route path="/kelas" element={< KelasIndex />} />
            <Route path="/kelas/add" element={< KelasAdd />} />
            <Route path="/kelas/edit/:id" element={< KelasEdit />} />
            
            {/* Mapel */}
            <Route path="/mapel" element={< MapelIndex />} />
            <Route path="/mapel/add" element={< MapelAdd />} />
            <Route path="/mapel/edit/:id" element={< MapelEdit />} />

            <Route path="/jadwal" element={< JadwalIndex />} />
            <Route path="/jadwal/add" element={< JadwalAdd />} />
            <Route path="/jadwal/edit/:id" element={< JadwalEdit />} />

        </Routes>
        </>

    );
}