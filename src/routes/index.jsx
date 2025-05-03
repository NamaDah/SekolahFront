import { Route, Routes } from "react-router-dom";
import Home from "../home";
import SiswaIndex from "../siswa/index.jsx";
import SiswaAdd from "../siswa/add.jsx";
import SiswaEdit from "../siswa/update.jsx";

import KelasIndex from "../kelas/index.jsx";
import KelasAdd from "../kelas/add.jsx";
import KelasEdit from "../kelas/update.jsx";

import MapelIndex from "../mapel/index.jsx";
import MapelAdd from "../mapel/add.jsx";
import MapelEdit from "../mapel/update.jsx";

import JadwalIndex from "../jadwal/index.jsx";
import JadwalAdd from "../jadwal/add.jsx";
import JadwalEdit from "../jadwal/update.jsx";

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