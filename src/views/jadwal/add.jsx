import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";

export default function AddJadwal() {
    const [kelas1, setKelas1] = useState([]);
    const [mapel1, setMapel1] = useState([]);
    const [kelas_id, setKelas] = useState('');
    const [mapel_id, setMapel] = useState('');
    const [hari, setHari] = useState('');
    const [jam_mulai, setMulai] = useState('');
    const [jam_selesai, setSelesai] = useState('');
    const [errors, setErrors] = useState({}); // Changed to an object for multiple error messages
    const navigate = useNavigate();

    const storeJadwal = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('kelas_id', kelas_id);
        formData.append('mapel_id', mapel_id);
        formData.append('hari', hari);
        formData.append('jam_mulai', jam_mulai);
        formData.append('jam_selesai', jam_selesai);

        try {
            await api.post('jadwal', formData);
            navigate('/jadwal');
        } catch (error) {
            setErrors(error.response.data.errors || {}); // Adjusted to handle multiple errors
        }
    };

    const fetchDataJadwal = async () => {
        try {
            const response = await api.get("kelas");
            setKelas1(response.data);
            const mapelResponse = await api.get("mapel"); // Fetching subjects
            setMapel1(mapelResponse.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchDataJadwal();
    }, []);

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card border-0 rounded shadow">
                        <div className="card-body">
                            <form onSubmit={storeJadwal}>
                                <div className="mb-3">
                                    <label htmlFor="kelas" className="form-label fw-bold">Kelas</label>
                                    <select
                                        name="kelas"
                                        id="kelas"
                                        className="form-select"
                                        value={kelas_id}
                                        onChange={(e) => setKelas(e.target.value)}
                                    >
                                        <option value="">Pilih Kelas</option>
                                        {kelas1.map((kelasItem) => (
                                            <option key={kelasItem.id} value={kelasItem.id}>
                                                {kelasItem.nama_kelas}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.kelas_id && (
                                        <div className="alert alert-danger mt-2">
                                            {errors.kelas_id}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="mapel" className="form-label fw-bold">Mapel</label>
                                    <select
                                        name="mapel"
                                        id="mapel"
                                        className="form-select"
                                        value={mapel_id}
                                        onChange={(e) => setMapel(e.target.value)}
                                    >
                                        <option value="">Pilih Mapel</option>
                                        {mapel1.map((mapelItem) => (
                                            <option key={mapelItem.id} value={mapelItem.id}>
                                                {mapelItem.nama_mapel}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.mapel_id && (
                                        <div className="alert alert-danger mt-2">
                                            {errors.mapel_id}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="hari" className="form-label fw-bold">Hari</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="hari" 
                                        onChange={(e) => setHari(e.target.value)} 
                                        placeholder="Masukkan hari" 
                                    />
                                    {errors.hari && (
                                        <div className="alert alert-danger mt-2">
                                            {errors.hari}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="jamMulai" className="form-label fw-bold">Jam Mulai</label>
                                    <input
                                        type="time"
                                        className="form-control"
                                        id="jamMulai"
                                        onChange={(e) => setMulai(e.target.value)}
                                        placeholder="Masukkan jam mulai"
                                    />
                                    {errors.jam_mulai && (
                                        <div className="alert alert-danger mt-2">
                                            {errors.jam_mulai}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="jamSelesai" className="form-label fw-bold">Jam Selesai</label>
                                    <input
                                        type="time"
                                        className="form-control"
                                        id="jamSelesai"
                                        onChange={(e) => setSelesai(e.target.value)}
                                        placeholder="Masukkan jam selesai"
                                    />
                                    {errors.jam_selesai && (
                                        <div className="alert alert-danger mt-2">
                                            {errors.jam_selesai}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-3 d-flex gap-3">
                                    <button type="submit" className="btn btn-primary">Save</button>
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => navigate('/mapel')}
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