
function StudentCard({ student, onDelete }) {
  function handleDelete() {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${student.firstName} ${student.lastName}?`
    );

    if (confirmed) {
      onDelete(student.id);
    }
  }

  return (
    <article className="student-card group rounded-3xl p-5 transition duration-300 hover:-translate-y-2">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-700">
          ID #{student.id}
        </span>

        <span className="text-xl">🎓</span>
      </div>

      <div className="my-5 flex flex-col items-center text-center">
        <div className="rounded-full bg-gradient-to-br from-violet-400 via-fuchsia-300 to-sky-300 p-1 shadow-lg">
          <img
            src={student.image}
            alt={`${student.firstName} ${student.lastName}`}
            className="h-24 w-24 rounded-full border-4 border-white bg-white object-cover"
          />
        </div>

        <h2 className="mt-4 text-xl font-extrabold text-slate-900">
          {student.firstName} {student.lastName}
        </h2>

        <p className="mt-1 break-all text-sm text-slate-500">
          {student.email}
        </p>
      </div>

      <div className="space-y-3 rounded-2xl bg-white/70 p-4">
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm text-slate-500">🎂 Age</span>
          <span className="font-bold text-slate-800">
            {student.age} years
          </span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="text-sm text-slate-500">👤 Gender</span>
          <span className="font-bold capitalize text-slate-800">
            {student.gender}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="text-sm text-slate-500">📍 City</span>
          <span className="text-right font-bold text-slate-800">
            {student.address?.city || "Not available"}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="text-sm text-slate-500">🏢 Department</span>
          <span className="text-right font-bold text-violet-700">
            {student.company?.department || "Computer Science"}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={handleDelete}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 font-bold text-rose-600 transition hover:border-rose-500 hover:bg-rose-600 hover:text-white focus:outline-none focus:ring-4 focus:ring-rose-200"
      >
        <span>🗑️</span>
        Delete Student
      </button>
    </article>
  );
}

export default StudentCard;
