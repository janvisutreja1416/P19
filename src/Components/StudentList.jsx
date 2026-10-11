
import StudentCard from "./StudentCard";

function StudentList({ students = [], onDelete }) {
  if (students.length === 0) {
    return (
      <div className="glass-panel rounded-3xl px-5 py-16 text-center">
        <div className="text-5xl">📚</div>

        <h2 className="mt-4 text-2xl font-extrabold text-slate-800">
          No students found
        </h2>

        <p className="mt-2 text-slate-500">
          Try another search, or your student directory is empty.
        </p>
      </div>
    );
  }

  return (
    <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {students.map((student) => (
        <StudentCard
          key={student.id}
          student={student}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
}

export default StudentList;
