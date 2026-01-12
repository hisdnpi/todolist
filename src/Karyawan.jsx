import { useState, useEffect } from "react";

export default function Karyawan() {

  const [karyawans, setKaryawans] = useState(() => {
    try {
      const raw = localStorage.getItem("karyawan_v1");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  const [inputNama, setInputNama] = useState("");
  const [inputJab, setInputJab] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    localStorage.setItem("karyawan_v1", JSON.stringify(karyawans));
  }, [karyawans]);

  function addKaryawan() {
    const nama = inputNama.trim();
    const jabatan = inputJab.trim();
    if (!nama) return;
    if (!jabatan) return;
    const newKaryawan = { id: Date.now().toString(), nama, jabatan }
    setKaryawans((st) => [newKaryawan, ...st]);
    setInputNama("");
    setInputJab("");
  }

  function startEdit(karyawan) {
    setEditingId(karyawan.id);
    setInputNama(karyawan.nama);
    setInputJab(karyawan.jabatan);
  }

  function SaveEdit() {
    const nama = inputNama.trim();
    const jabatan = inputJab.trim();
    if (!nama) return;
    if (!jabatan) return;
    setKaryawans((st) => st.map((ob) => (ob.id === editingId ? { ...ob, nama, jabatan } : ob)));
    setEditingId(null);
    setInputNama("");
    setInputJab("");
  }

  function cancelEdit() {
    setEditingId(null);
    setInputNama("");
    setInputJab("");
  }

  function search(nama) {
    const searchedKaryawans = karyawans.filter(karyawan => karyawan.nama === nama);
    return searchedKaryawans;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6">Daftar Karyawan</h1>

      {/* Form Tambah Karyawan */}
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Nama
          </label>
          <input
            type="text"
            placeholder="Masukkan nama"
            value={inputNama}
            onChange={(ev) => setInputNama(ev.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Jabatan
          </label>
          <input
            type="text"
            placeholder="Masukkan jabatan"
            value={inputJab}
            onChange={(ev) => setInputJab(ev.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        {!editingId ?
          <button
            type="submit"
            onClick={() => addKaryawan()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Tambah Karyawan
          </button>
          :
          <>
            <button
              type="submit"
              onClick={() => SaveEdit()}
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
            >
              Save Edit
            </button>
            <button
              type="submit"
              onClick={() => cancelEdit()}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </>
        }
      </form>

      {/* Tabel Karyawan */}
      <div className="overflow-x-auto">
        <table className="table-auto min-w-full bg-white border border-blue-200">
          <thead>
            <tr className="bg-blue-300 text-white">
              <th className="py-1 px-2 text-left">No</th>
              <th className="py-1 px-2 text-left">Nama</th>
              <th className="py-1 px-2 text-left">Jabatan</th>
              <th className="py-1 px-2 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {karyawans.map((karyawan, index) => (
              <tr key={karyawan.id}>
                <td className="py-1 px-2">{index + 1}</td>
                <td className="py-1 px-2">{karyawan.nama}</td>
                <td className="py-1 px-2">{karyawan.jabatan}</td>
                <td className="py-1 px-2">
                  <button className="py-2 px-4 rounded bg-blue-500 text-white"
                    onClick={() => startEdit(karyawan)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}