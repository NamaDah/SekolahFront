import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";

export default function AddSiswa() {
    // const [siswa, setSiswas] = useState([]);
    const [kelas1, setKelas1] = useState([]);
    const [kode, setKode] = useState('');
    const [nama, setNama] = useState('');
    const [kelas_id, setKelas] = useState('');
    const [alamat, setAlamat] = useState('');
    const [deskripsi, setDeskripsi] = useState('');
    const [error, setErrors] = useState('');
    const navigate = useNavigate();

    //
    const storeSiswa = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('kode', kode);
        formData.append('nama', nama);
        formData.append('kelas_id', kelas_id);
        formData.append('alamat', alamat);
        formData.append('deskripsi', deskripsi);

        await api.post('siswa', formData)
            .then(() => {
                navigate('/siswas');
            })
            .catch(error => {
                setErrors(error.response.data)
            })
    }

        const fetchDataKelas = async () => {
            try {
                const response = await api.get("kelas");
                setKelas1(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };


            useEffect(() => {
                fetchDataKelas();
            }, []); 

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card border-0 rounded shadow">
                        <div className="card-body">

                            <form onSubmit={storeSiswa} action="">
                                <div className="mb-3">
                                    <label htmlFor="" className="form-label fw-bold">Kode</label>
                                    <input type="text" className="form-control" onChange={(e) => setKode(e.target.value)} placeholder="masukan kode siswa" />
                                    {
                                        error.title && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.setKode}
                                            </div>
                                        )
                                    }
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="" className="form-label fw-bold">Nama</label>
                                    <input type="text" className="form-control" onChange={(e) => setNama(e.target.value)} placeholder="masukan nama siswa" />
                                    {
                                        error.title && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.setNama}
                                            </div>
                                        )
                                    }
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="" className="form-label fw-bold">Kelas</label>
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
                                                {kelasItem.nama_kelas} {}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="" className="form-label fw-bold">Alamat</label>
                                    <input type="text" className="form-control" onChange={(e) => setAlamat(e.target.value)} placeholder="masukan alamat siswa" />
                                    {
                                        error.title && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.setAlamat}
                                            </div>
                                        )
                                    }
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="" className="form-label fw-bold">Deskripsi</label>
                                    <input type="text" className="form-control" onChange={(e) => setDeskripsi(e.target.value)} placeholder="masukan deskripsi siswa" />
                                    {
                                        error.title && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.setDeskripsi}
                                            </div>
                                        )
                                    }
                                </div>

                                <div className="mb-3 d-flex gap-3">
                                    <button type="submit" className="btn btn-primary">Save</button>
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
