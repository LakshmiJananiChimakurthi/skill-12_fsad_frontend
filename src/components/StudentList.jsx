import axios from "axios";
import { useEffect, useState } from "react";

function StudentList({ refreshKey, onAddNewClick }) {
  const [students, setStudents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    course: ""
  });

  useEffect(() => {
    loadStudents();
  }, [refreshKey]);

  const loadStudents = () => {
    axios.get("http://127.0.0.1:8080/students")
      .then((res) => {
        setStudents(res.data);
      })
      .catch((error) => {
        console.error("Failed to load students", error);
      });
  };

  const deleteStudent = (id) => {
    axios.delete("http://127.0.0.1:8080/students/" + id)
      .then(() => {
        if (editingId === id) {
          setEditingId(null);
        }
        loadStudents();
      })
      .catch((error) => {
        console.error("Failed to delete student", error);
      });
  };

  const startEdit = (student) => {
    setEditingId(student.id);
    setEditForm({
      name: student.name,
      email: student.email,
      course: student.course
    });
  };

  const saveEdit = async (id) => {
    try {
      await axios.post("http://127.0.0.1:8080/students", {
        id,
        name: editForm.name,
        email: editForm.email,
        course: editForm.course
      });
      setEditingId(null);
      loadStudents();
    } catch (error) {
      console.error("Failed to update student", error);
      alert("Unable to update student");
    }
  };

  return (
    <div>
      <h2 className="panel-title">Student List</h2>

      <div className="table-wrap">
        <table className="student-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Course</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s, index) => {
              const isEditing = editingId === s.id;
              return (
                <tr key={s.id}>
                  <td>{index + 1}</td>
                  <td>
                    {isEditing ? (
                      <input
                        className="edit-input"
                        value={editForm.name}
                        onChange={(e) => setEditForm((prev) => ({ ...prev, name: e.target.value }))}
                      />
                    ) : (
                      s.name
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <input
                        className="edit-input"
                        value={editForm.email}
                        onChange={(e) => setEditForm((prev) => ({ ...prev, email: e.target.value }))}
                      />
                    ) : (
                      s.email
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <input
                        className="edit-input"
                        value={editForm.course}
                        onChange={(e) => setEditForm((prev) => ({ ...prev, course: e.target.value }))}
                      />
                    ) : (
                      s.course
                    )}
                  </td>
                  <td>
                    <div className="actions">
                      {isEditing ? (
                        <>
                          <button type="button" className="btn btn-save" onClick={() => saveEdit(s.id)}>
                            Save
                          </button>
                          <button type="button" className="btn btn-cancel" onClick={() => setEditingId(null)}>
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button type="button" className="btn btn-edit" onClick={() => startEdit(s)}>
                            Edit
                          </button>
                          <button
                            type="button"
                            className="btn btn-delete"
                            onClick={() => deleteStudent(s.id)}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="add-new-wrap">
        <button type="button" className="btn-add" onClick={onAddNewClick}>
          Add New Student
        </button>
        <span className="tagline">React frontend student list</span>
      </div>
    </div>
  );
}

export default StudentList;