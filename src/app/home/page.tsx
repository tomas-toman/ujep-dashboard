import Schedule from "@/components/schedule"
import { getAcademicPeriod } from "@/lib/getAcademicPeriod";

export default function home() {
  const { semester, academicYear } = getAcademicPeriod();

  return (
    <div className="grid grid-cols-2 grid-rows-2">
      <section className="  overflow-hidden m-8">
        <h1 className="text-3xl font-bold tracking-tight text-theme-black">
          Weekly Schedule
        </h1>
        <p className="text-slate-500 mt-1 mb-4">
          Academic Year {academicYear} — {semester}
        </p>
        <div className="p-1 md:p-4 bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 ">
          <Schedule />
        </div>
      </section>
      <section className="m-8"></section>
      <section className="m-8"></section>
      <section className="m-8"></section>
    </div>
  );
}