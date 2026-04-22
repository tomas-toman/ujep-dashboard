import ScheduleComponent from "@/components/schedule";
import { getAcademicPeriod } from "@/lib/getAcademicPeriod";

export default function schedule() {
  const { semester, academicYear } = getAcademicPeriod();
  
  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-theme-black">
              Weekly Schedule
            </h1>
            <p className="text-slate-500 mt-1">
              Academic Year {academicYear} — {semester}
            </p>
          </div>
        </header>

        <section className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
          <div className="p-1 md:p-4">
            <ScheduleComponent />
          </div>
        </section>
      </div>
    </div>
  );
}

