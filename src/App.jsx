
import { useEffect, useState } from "react";
import StudentList from "./Components/StudentList";

function App() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch student records from DummyJSON API
  useEffect(() => {
    async function fetchStudents() {
      try {
        const response = await fetch(
          "https://dummyjson.com/users?limit=12"
        );

        if (!response.ok) {
          throw new Error("Unable to load students.");
        }

        const data = await response.json();
        setStudents(data.users);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    }

    fetchStudents();
  }, []);

  // Delete the selected student
  function handleDelete(studentId) {
    setStudents((currentStudents) =>
      currentStudents.filter((student) => student.id !== studentId)
    );
  }

  // Search students
  const filteredStudents = students.filter((student) => {
    const fullName = `${student.firstName} ${student.lastName}`;

    return `${fullName} ${student.email} ${student.address?.city || ""}`
      .toLowerCase()
      .includes(search.toLowerCase());
  });

  return (
    <main className="aurora-bg min-h-screen px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="mb-10 text-center">
          <span className="inline-block rounded-full border border-white/70 bg-white/60 px-5 py-2 text-xs font-bold tracking-[0.2em] text-violet-700 shadow-sm backdrop-blur">
            ✦ STUDENT ADMINISTRATION
          </span>

          <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-900 sm:text-6xl">
            Student <span className="text-violet-700">Management</span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-slate-600">
            Manage your student directory with a simple,
            modern and beautiful interface.
          </p>
        </header>

        {/* Summary */}
        <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="summary-card">
            <span className="text-3xl">🎓</span>
            <p className="mt-3 text-sm font-medium text-slate-500">
              Total Students
            </p>
            <p className="mt-1 text-3xl font-black text-violet-700">
              {students.length}
            </p>
          </div>

          <div className="summary-card">
            <span className="text-3xl">🔎</span>
            <p className="mt-3 text-sm font-medium text-slate-500">
              Search Results
            </p>
            <p className="mt-1 text-3xl font-black text-blue-700">
              {filteredStudents.length}
            </p>
          </div>

          <div className="summary-card">
            <span className="text-3xl">🗂️</span>
            <p className="mt-3 text-sm font-medium text-slate-500">
              Directory Status
            </p>
            <p className="mt-1 text-xl font-black text-emerald-700">
              {students.length > 0 ? "Active" : "Empty"}
            </p>
          </div>
        </section>

        {/* Search bar */}
        <section className="glass-panel mb-8 rounded-3xl p-5 sm:p-6">
          <label
            htmlFor="student-search"
            className="mb-3 block font-bold text-slate-800"
          >
            Find a student
          </label>

          <input
            id="student-search"
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name, email or city..."
            className="w-full rounded-xl border border-white bg-white/80 px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
          />
        </section>

        {/* Student list */}
        {loading ? (
          <div className="glass-panel rounded-3xl p-12 text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-violet-200 border-t-violet-700" />
            <p className="font-semibold text-slate-700">
              Loading student records...
            </p>
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-rose-200 bg-white/80 p-8 text-center text-rose-700">
            {error}
          </div>
        ) : (
          <StudentList
            students={filteredStudents}
            onDelete={handleDelete}
          />
        )}

        <footer className="mt-12 text-center text-sm text-slate-500">
          Made with 💜 React Components & Tailwind CSS
        </footer>
      </div>
    </main>
  );
}

export default App;
