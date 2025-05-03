import { useState, useEffect } from "react";
import api from '../api';
import { Link } from "react-router-dom";


export default function SiswaIndex() {
    const [siswa, setSiswas] = useState([]);

    // Fetch all students
    const fetchDataSiswas = async () => {
        try {
            const response = await api.get("siswa");
            setSiswas(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Delete a student
    const deleteSiswa = async (id) => {
        try {
            await api.delete(`siswa/${id}`);
            fetchDataSiswas(); // Refresh the list after deletion
        } catch (error) {
            console.error("Error deleting data:", error);
        }
    };

    useEffect(() => {
        fetchDataSiswas();
    }, []); 



    return(
        <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col-md-12">
                    <Link to="/siswas/add" className="btn btn-md btn-success rounded shadow border-0 mb-3">
                    Tambah</Link>
                    <div className="card border-0 rounded shadow">
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead className="bg-dark text-white">
                                    <tr>
                                        <th scope="col">No</th>
                                        <th scope="col">Kode</th>
                                        <th scope="col">Nama</th>
                                        <th scope="col">kelas</th>
                                        <th scope="col">Alamat</th>
                                        <th scope="col">Deskripsi</th>
                                        <th scope="col" style={{ 'width': '20%' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        siswa.length > 0
                                        ? siswa.map((Siswa, index) => (
                                            <tr key={index}>
                                            <td>{index+1}. </td>
                                            <td>{ Siswa.kode }</td>
                                            <td>{ Siswa.nama }</td>
                                            <td>{ Siswa.kelas.nama_kelas }</td>
                                            <td>{ Siswa.alamat }</td>
                                            <td>{ Siswa.deskripsi }</td>
                                            <td className="text-center">
                                                <Link to={`/siswas/edit/${Siswa.id}`} className="btn btn-sm btn-primary rounded-sm shadow border-0 me-2">Edit</Link>
                                                <button onClick={() => deleteSiswa(Siswa.id)} className="btn btn-sm btn-danger rounded-sm shadow border-0">Delete</button>
                                            </td>
                                        </tr>
                                        ))

                                        : <tr>
                                            <td colSpan="6" className="text-center">
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
    );

}

