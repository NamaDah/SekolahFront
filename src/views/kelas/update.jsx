import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api";


export default function editKelas() {
    const [nama_kelas, setNama] = useState('');
    const [wali_kelas, setWali] = useState('');
    const [errors, setErrors] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    const fetchDetailPost = async () => {
        try {
            const response = await api.get(`/kelas/${id}`);
            const kelas = response.data;
            setNama(kelas.nama_kelas);
            setWali(kelas.wali_kelas);
        } catch (error) {
            console.error("Error fetching kelas details: ", error)
        }
    };

    useEffect(() => {
        fetchDetailPost();
    }, []);

    const updatePost = async (e) => {
        e.preventDefault();

        const formData = {
            nama_kelas, wali_kelas
        };

        try {
            await api.put(`/kelas/${id}`, formData);
            navigate('/kelas');
        } catch (error) {
            if (error.response && error.response.data) {
                setErrors(error.response.data.errors)
            }
        }

    };


    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card border-0 rounded shadow">
                        <div className="card-body">
                            <form action="" onSubmit={updatePost}>
                                <div className="mb-3">
                                    <label htmlFor="nama" className="form-label">Nama</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={nama_kelas}
                                        onChange={(e) => setNama(e.target.value)} />
                                    {errors.nama_kelas && <div className="alert alert-danger">{errors.nama_kelas}</div>}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="wali" className="form-label">Wali</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={wali_kelas}
                                        onChange={(e) => setWali(e.target.value)} />
                                    {errors.wali_kelas && <div className="alert alert-danger">{errors.wali_kelas}</div>}
                                </div>

                                <div className="mb-3 d-flex gap-3">
                                    <button type="submit" className="btn btn-primary">Update</button>
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => navigate('/kelas')}
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