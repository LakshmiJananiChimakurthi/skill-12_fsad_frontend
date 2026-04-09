import "./App.css";
import AddStudent from "./components/AddStudent";
import StudentList from "./components/StudentList";
import { useState } from "react";

function App() {
  const [activeTab, setActiveTab] = useState("list");
  const [refreshKey, setRefreshKey] = useState(0);

  const handleStudentAdded = () => {
    setRefreshKey((prev) => prev + 1);
    setActiveTab("list");
  };

  return (
    <main className="app-shell">
      <section className="student-card">
        <h1>Student Management System</h1>

        <div className="tabs" role="tablist" aria-label="Student sections">
          <button
            type="button"
            role="tab"
            className={`tab-btn ${activeTab === "list" ? "active" : ""}`}
            aria-selected={activeTab === "list"}
            onClick={() => setActiveTab("list")}
          >
            Student List
          </button>
          <button
            type="button"
            role="tab"
            className={`tab-btn ${activeTab === "add" ? "active" : ""}`}
            aria-selected={activeTab === "add"}
            onClick={() => setActiveTab("add")}
          >
            Add Student
          </button>
        </div>

        {activeTab === "list" ? (
          <StudentList
            refreshKey={refreshKey}
            onAddNewClick={() => setActiveTab("add")}
          />
        ) : (
          <AddStudent
            onAdded={handleStudentAdded}
            onCancel={() => setActiveTab("list")}
          />
        )}
      </section>
    </main>
  );
}

export default App;