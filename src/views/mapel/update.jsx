import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api";


export default function editMapel() {
    const [nama_mapel, setNama] = useState('');
    const [guru_pengampu, setGuru] = useState('');
    const [errors, setErrors] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    const fetchDetailPost = async () => {
        try {
            const response = await api.get(`/mapel/${id}`);
            const mapel = response.data;
            setNama(mapel.nama_mapel);
            setGuru(mapel.guru_pengampu);
        } catch (error) {
            console.error("Error fetching mapel details: ", error)
        }
    };

    useEffect(() => {
        fetchDetailPost();
    }, []);

    const updatePost = async (e) => {
        e.preventDefault();

        const formData = {
            nama_mapel, guru_pengampu
        };

        try {
            await api.put(`/mapel/${id}`, formData);
            navigate('/mapel');
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
                                    <label htmlFor="nama" className="form-label">Nama Mapel</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={nama_mapel}
                                        onChange={(e) => setNama(e.target.value)} />
                                    {errors.nama_mapel && <div className="alert alert-danger">{errors.nama_mapel}</div>}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="wali" className="form-label">Guru Pengampu</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={guru_pengampu}
                                        onChange={(e) => setGuru(e.target.value)} />
                                    {errors.guru_pengampu && <div className="alert alert-danger">{errors.guru_pengampu}</div>}
                                </div>

                                <div className="mb-3 d-flex gap-3">
                                    <button type="submit" className="btn btn-primary">Update</button>
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
    )

}