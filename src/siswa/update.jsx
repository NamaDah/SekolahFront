import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "api";

export default function SiswaEdit() {
    const [kelas1, setKelas1] = useState([]);
    const [kode, setKode] = useState('');
    const [nama, setNama] = useState('');
    const [kelas_id, setKelas] = useState('');
    const [alamat, setAlamat] = useState('');
    const [deskripsi, setDeskripsi] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();

    // Fetch data for editing
    const fetchDetailPost = async () => {
        try {
            const response = await api.get(`/siswa/${id}`);
            const siswa = response.data;
            setKode(siswa.kode);
            setNama(siswa.nama);
            setKelas(siswa.kelas_id);
            setAlamat(siswa.alamat);
            setDeskripsi(siswa.deskripsi);
        } catch (error) {
            console.error("Error fetching siswa details:", error);
        }
    };

    // Fetch Kelas data
    const fetchDataKelas = async () => {
        try {
            const response = await api.get("kelas");
            setKelas1(response.data);
        } catch (error) {
            console.error("Error fetching kelas data:", error);
        }
    };

    

    useEffect(() => {
        fetchDetailPost();
        fetchDataKelas();
    }, []);

    // Update siswa
    const updatePost = async (e) => {
        e.preventDefault();
    
        // Pastikan semua field memiliki nilai
        if (!kode || !nama || !kelas_id || !alamat || !deskripsi) {
            alert("Semua field wajib diisi!");
            return;
        }
    
        const formData = {
            kode, nama, kelas_id, alamat, deskripsi
        };

        
        try {
            await api.put (`/siswa/${id}`, formData);
            navigate('/siswas');
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
                            <form onSubmit={updatePost}>
                                <div className="mb-3">
                                    <label htmlFor="kode" className="form-label">Kode</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={kode}
                                        onChange={(e) => setKode(e.target.value)}
                                    />
                                    {errors.kode && <div className="alert alert-danger">{errors.kode}</div>}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="nama" className="form-label">Nama</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={nama}
                                        onChange={(e) => setNama(e.target.value)}
                                    />
                                    {errors.nama && <div className="alert alert-danger">{errors.nama}</div>}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="kelas_id" className="form-label">Kelas</label>
                                    <select
                                        className="form-select"
                                        value={kelas_id}
                                        onChange={(e) => setKelas(e.target.value)}
                                    >
                                        <option value="">Pilih Kelas</option>
                                        {kelas1.map((kelas) => (
                                            <option key={kelas.id} value={kelas.id}>
                                                {kelas.nama_kelas}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.kelas_id && <div className="alert alert-danger">{errors.kelas_id}</div>}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="alamat" className="form-label">Alamat</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={alamat}
                                        onChange={(e) => setAlamat(e.target.value)}
                                    />
                                    {errors.alamat && <div className="alert alert-danger">{errors.alamat}</div>}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="deskripsi" className="form-label">Deskripsi</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={deskripsi}
                                        onChange={(e) => setDeskripsi(e.target.value)}
                                    />
                                    {errors.deskripsi && <div className="alert alert-danger">{errors.deskripsi}</div>}
                                </div>
                                <div className="mb-3 d-flex gap-3">
                                    <button type="submit" className="btn btn-primary">Update</button>
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => navigate('/siswas')}
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
    )
}