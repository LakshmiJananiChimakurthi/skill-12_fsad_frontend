import axios from "axios";
import { useState } from "react";

function AddStudent({ onAdded, onCancel }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://127.0.0.1:8080/students", {
        name,
        email,
        course
      });

      console.log(res.data);

      alert("Student saved successfully");

      setName("");
      setEmail("");
      setCourse("");

      if (onAdded) {
        onAdded();
      }
    } catch (error) {
      console.error("ERROR:", error);

      if (error.code === "ERR_NETWORK") {
        alert("Backend not reachable (check server)");
      } else if (error.response) {
        alert("Server error: " + error.response.status);
      } else {
        alert("Unknown error");
      }
    }
  };

  return (
    <div>
      <h2 className="panel-title">Add Student</h2>

      <form onSubmit={submit} className="add-form">
        <div className="form-field">
          <label htmlFor="student-name">Name</label>
          <input
            id="student-name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="student-email">Email</label>
          <input
            id="student-email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="student-course">Course</label>
          <input
            id="student-course"
            placeholder="Enter course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">Save Student</button>
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Back to List
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddStudent;