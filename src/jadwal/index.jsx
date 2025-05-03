import { useState, useEffect } from "react";
import api from "../api";
import { Link } from "react-router-dom";

export default function JadwalIndex() {
    const [jadwal, setJadwal] = useState([]);

    // Fetch all schedules
    const fetchDataJadwal = async () => {
        try {
            const response = await api.get("jadwal");
            setJadwal(response.data.data); // Adjust based on your API response structure
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Delete a schedule
    const deleteJadwal = async (id) => {
        if (window.confirm("Are you sure you want to delete this schedule?")) {
            try {
                await api.delete(`jadwal/${id}`);
                fetchDataJadwal(); // Refresh the list after deletion
            } catch (error) {
                console.error("Error deleting data:", error);
            }
        }
    };

    useEffect(() => {
        fetchDataJadwal();
    }, []); 

    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col-md-12">
                    <Link to="/jadwal/add" className="btn btn-md btn-success rounded shadow border-0 mb-3">
                        Tambah
                    </Link>
                    <div className="card border-0 rounded shadow">
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead className="bg-dark text-white">
                                    <tr>
                                        <th scope="col">No</th>
                                        <th scope="col">Kelas</th>
                                        <th scope="col">Mapel</th>
                                        <th scope="col">Hari</th>
                                        <th scope="col">Jam Mulai</th>
                                        <th scope="col">Jam Selesai</th>
                                        <th scope="col" style={{ width: '20%' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        jadwal.length > 0
                                            ? jadwal.map((Jadwal, index) => (
                                                <tr key={Jadwal.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{Jadwal.kelas.nama_kelas}</td>
                                                    <td>{Jadwal.mapel.nama_mapel}</td>
                                                    <td>{Jadwal.hari}</td>
                                                    <td>{Jadwal.jam_mulai}</td>
                                                    <td>{Jadwal.jam_selesai}</td>
                                                    <td className="text-center">
                                                        <Link to={`/jadwal/edit/${Jadwal.id}`} className="btn btn-sm btn-primary rounded-sm shadow border-0 me-2">Edit</Link>
                                                        <button onClick={() => deleteJadwal(Jadwal.id)} className="btn btn-sm btn-danger rounded-sm shadow border-0">Delete</button>
                                                    </td>
                                                </tr>
                                            ))
                                            : <tr>
                                                <td colSpan="7" className="text-center">
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