import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function MapelAdd() {
    const [nama, setNama] = useState();
    const [guru, setGuru] = useState();
    const [error, setErrors] = useState('');
    const navigate = useNavigate();

    const storeMapel = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('nama_mapel', nama);
        formData.append('guru_pengampu', guru);

        await api.post('mapel', formData)
            .then(() => {
                navigate('/mapel')
            })
            .catch(error => {
                setErrors(error.response.data)
            })
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card border-0 rounded shadow">
                        <div className="card-body">
                            <form onSubmit={storeMapel} action="">
                                <div className="mb-3">
                                    <label htmlFor="" className="form-label fw-bold">Mapel</label>
                                    <input type="text" className="form-control" onChange={(e) => setNama(e.target.value)} placeholder="Masukan nama mapel" />
                                    {
                                        error.tittle && (
                                            <div className="alert alert-danger mt-2">
                                                {setErrors.setNama}
                                            </div>
                                        )
                                    }
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="" className="form-label fw-bold">Guru Pengampu</label>
                                    <input type="text" className="form-control" onChange={(e) => setGuru(e.target.value)} placeholder="Masukan nama guru pengampu" />
                                    {
                                        error.tittle && (
                                            <div className="alert alert-danger mt-2">
                                                {setErrors.setGuru}
                                            </div>
                                        )
                                    }
                                </div>

                                <div className="mb-3 d-flex gap-3">
                                    <button
                                        type="submit"
                                        className="btn btn-primary" >
                                        Save
                                    </button>
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