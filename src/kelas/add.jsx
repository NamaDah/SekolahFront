import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function KelasAdd() {
    const [nama, setNama] = useState();
    const [wali, setWali] = useState();
    const [error, setErrors] = useState('');
    const navigate = useNavigate();

    const storeKelas = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('nama_kelas', nama);
        formData.append('wali_kelas', wali);

        await api.post('kelas', formData)
            .then(() => {
                navigate('/kelas')
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
                            <form onSubmit={storeKelas} action="">
                                <div className="mb-3">
                                    <label htmlFor="" className="form-label fw-bold">Kelas</label>
                                    <input type="text" className="form-control" onChange={(e) => setNama(e.target.value)} placeholder="Masukan nama kelas" />
                                    {
                                        error.tittle && (
                                            <div className="alert alert-danger mt-2">
                                                {setErrors.setNama}
                                            </div>
                                        )
                                    }
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="" className="form-label fw-bold">Wali Kelas</label>
                                    <input type="text" className="form-control" onChange={(e) => setWali(e.target.value)} placeholder="Masukan nama wali kelas" />
                                    {
                                        error.tittle && (
                                            <div className="alert alert-danger mt-2">
                                                {setErrors.setWali}
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