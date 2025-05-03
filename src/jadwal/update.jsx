import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "api";

export default function JadwalEdit() {
    const [kelas1, setKelas1] = useState([]);
    const [mapel1, setMapel1] = useState([]);
    const [kelas_id, setKelas] = useState('');
    const [mapel_id, setMapel] = useState('');
    const [hari, setHari] = useState('');
    const [jam_mulai, setMulai] = useState('');
    const [jam_selesai, setSelesai] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();

    // Fetch data for editing
    const fetchDetailJadwal = async () => {
        try {
            const response = await api.get(`/jadwal/${id}`);
            const jadwal = response.data.data; // Access the 'data' property
            setKelas(jadwal.kelas_id);
            setMapel(jadwal.mapel_id);
            setHari(jadwal.hari);
            setMulai(jadwal.jam_mulai);
            setSelesai(jadwal.jam_selesai);
        } catch (error) {
            console.error("Error fetching jadwal details:", error);
        }
    };

    // Fetch Kelas and Mapel data
    const fetchDataKelasAndMapel = async () => {
        try {
            const kelasResponse = await api.get("kelas");
            setKelas1(kelasResponse.data);
            const mapelResponse = await api.get("mapel");
            setMapel1(mapelResponse.data);
        } catch (error) {
            console.error("Error fetching kelas or mapel data:", error);
        }
    };

    useEffect(() => {
        fetchDetailJadwal();
        fetchDataKelasAndMapel();
    }, []);

    // Update jadwal
    const updateJadwal = async (e) => {
        e.preventDefault();

        // Validate fields
        if (!kelas_id || !mapel_id || !hari || !jam_mulai || !jam_selesai) {
            alert("Semua field wajib diisi!");
            return;
        }

        const formData = {
            kelas_id,
            mapel_id,
            hari,
            jam_mulai,
            jam_selesai
        };

        try {
            await api.put(`/jadwal/${id}`, formData);
            navigate('/jadwal');
        } catch (error) {
            if (error.response && error.response.data) {
                setErrors(error.response.data.errors);
            }
        }
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card border-0 rounded shadow">
                        <div className="card-body">
                            <form onSubmit={updateJadwal}>
                                <div className="mb-3">
                                    <label htmlFor="kelas_id" className="form-label">Kelas</label>
                                    <select
                                        className="form-select"
                                        value={kelas_id}
                                        onChange={(e) => setKelas(e.target.value)}
                                    >
                                        {kelas1.map((kelas) => (
                                            <option key={kelas.id} value={kelas.id}>
                                                {kelas.nama_kelas}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.kelas_id && <div className="alert alert-danger">{errors.kelas_id}</div>}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="mapel_id" className="form-label">Mapel</label>
                                    <select
                                        className="form-select"
                                        value={mapel_id}
                                        onChange={(e) => setMapel(e.target.value)}
                                    >
                                        {mapel1.map((mapels) => (
                                            <option key={mapels.id} value={mapels.id}>
                                                {mapels.nama_mapel}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.mapel_id && <div className="alert alert-danger">{errors.mapel_id}</div>}
                                </div>

                                <div className="mb-3 ">
                                    <label htmlFor="hari" className="form-label">Hari</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={hari}
                                        onChange={(e) => setHari(e.target.value)}
                                    />
                                    {errors.hari && <div className="alert alert-danger">{errors.hari}</div>}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="jamMulai" className="form-label">Jam Mulai</label>
                                    <input
                                        type="time"
                                        className="form-control"
                                        value={jam_mulai}
                                        onChange={(e) => setMulai(e.target.value)}
                                    />
                                    {errors.jam_mulai && <div className="alert alert-danger">{errors.jam_mulai}</div>}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="jamSelesai" className="form-label">Jam Selesai</label>
                                    <input
                                        type="time"
                                        className="form-control"
                                        value={jam_selesai}
                                        onChange={(e) => setSelesai(e.target.value)}
                                    />
                                    {errors.jam_selesai && <div className="alert alert-danger">{errors.jam_selesai}</div>}
                                </div>

                                <div className="mb-3 d-flex gap-3">
                                    <button type="submit" className="btn btn-primary">Update</button>
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => navigate('/jadwal')}
                                    >
                                        Back
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 