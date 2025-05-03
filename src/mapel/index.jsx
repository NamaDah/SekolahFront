import { useState, useEffect } from "react";
import api from "../api";
import { Link } from "react-router-dom";

export default function MapelIndex() {
    const [mapel, setMapel] = useState([]);

    const fetchDataMapel = async () => {
        try {
            const response = await api.get("mapel");
            setMapel(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        fetchDataMapel();
    }, []);

    const deleteMapel = async (id) => {
        try {
            await api.delete(`/mapel/${id}`);
            // Fetch the updated list after deletion
            fetchDataMapel();
        } catch (error) {
            console.error("Error deleting mapel:", error);
        }
    }

    return(
        <div className="container mt-5 mb-5">
        <div className="row">
            <div className="col-md-12">
                <Link to="/mapel/add" className="btn btn-md btn-success rounded shadow border-0 mb-3">
                Tambah</Link>
                <div className="card border-0 rounded shadow">
                    <div className="card-body">
                        <table className="table table-bordered">
                            <thead className="bg-dark text-white">
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Nama Mapel</th>
                                    <th scope="col">Guru Pengampu</th>
                                    <th scope="col" style={{ 'width': '20%' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    mapel.length > 0
                                    ? mapel.map((Mapel, index) => (
                                        <tr key={index}>
                                        <td>{index+1}. </td>
                                        <td>{ Mapel.nama_mapel }</td>
                                        <td>{ Mapel.guru_pengampu }</td>
                                        <td className="text-center">
                                            <Link to={`/mapel/edit/${Mapel.id}`} className="btn btn-sm btn-primary rounded-sm shadow border-0 me-2">Edit</Link>
                                            <button onClick={() => deleteMapel(Mapel.id)} className="btn btn-sm btn-danger rounded-sm shadow border-0">Delete</button>
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