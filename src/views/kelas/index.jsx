import { useState, useEffect } from "react";
import api from '../../api';
import { Link } from "react-router-dom";

export default function KelasIndex() {
    const [kelas, setKelas] = useState([]);

    const fetchDataKelas = async () => {
        try {
            const response = await api.get("kelas");
            setKelas(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        fetchDataKelas();
    }, []);

    const deleteKelas = async ($id) => {
        await api.delete(`/kelas/${id}`)
        .then(() => {
            fetchDataKelas
        })
    }

    return(
        <div className="container mt-5 mb-5">
        <div className="row">
            <div className="col-md-12">
                <Link to="/kelas/add" className="btn btn-md btn-success rounded shadow border-0 mb-3">
                Tambah</Link>
                <div className="card border-0 rounded shadow">
                    <div className="card-body">
                        <table className="table table-bordered">
                            <thead className="bg-dark text-white">
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Nama Kelas</th>
                                    <th scope="col">Wali Kelas</th>
                                    <th scope="col" style={{ 'width': '20%' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    kelas.length > 0
                                    ? kelas.map((Kelas, index) => (
                                        <tr key={index}>
                                        <td>{index+1}. </td>
                                        <td>{ Kelas.nama_kelas }</td>
                                        <td>{ Kelas.wali_kelas }</td>
                                        <td className="text-center">
                                            <Link to={`/kelas/edit/${Kelas.id}`} className="btn btn-sm btn-primary rounded-sm shadow border-0 me-2">Edit</Link>
                                            <button onClick={() => deleteKelas(Kelas.id)} className="btn btn-sm btn-danger rounded-sm shadow border-0">Delete</button>
                                        </td>
                                    </tr>
                                    ))

                                    : <tr>
                                        <td colSpan="4" className="text-center">
                                            <div className="alert alert-danger mb-0">
                                                Data belum tersedia!
                                                </div>
                                                </td>
                                    </tr>
                                }
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    </div>
    )

}