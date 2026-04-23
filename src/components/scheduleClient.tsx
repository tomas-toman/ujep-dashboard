"use client";

import { useState } from "react";
import { RozvrhovaAkce } from "./schedule";

const TYP_AKCE_MAP: Record<string, string> = {
  "Přednáška": "Lecture",
  "Cvičení": "Lab",
  "Seminář": "Seminar",
};

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const times = ['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'];
const hours = Array.from({ length: 15 }, (_, i) => i + 7);

const getDuration = (start: string, end: string) => {
  if (!start || !end) return 1;
  const startH = parseInt(start.split(':')[0]);
  const endH = parseInt(end.split(':')[0]);
  return (endH - startH) + 1; 
};

export default function scheduleClient({ 
  data, 
  showFilter = true 
}: { 
  data: RozvrhovaAkce[];
  showFilter?: boolean;
}) {
  const uniqueSubjects = Array.from(
    new Set(data.map((akce) => `${akce.katedra}/${akce.predmet}`))
  );
  
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(uniqueSubjects);

  const toggleSubject = (subject: string) => {
    setSelectedSubjects((prev) => 
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject]
    );
  };

  const filteredData = data.filter((akce) => 
    selectedSubjects.includes(`${akce.katedra}/${akce.predmet}`)
  );

  return (
    <div className="flex flex-col gap-6">
      {showFilter && (
        <div className="flex flex-wrap gap-4 p-4 bg-theme-white rounded-xl shadow-sm border border-gray-200">
          <span className="font-semibold text-theme-black w-full">Filter Classes:</span>
          {uniqueSubjects.map((subject) => (
            <label key={subject} className="flex items-center gap-2 cursor-pointer text-sm">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-theme-black focus:ring-theme-black"
                checked={selectedSubjects.includes(subject)}
                onChange={() => toggleSubject(subject)}
              />
              {subject}
            </label>
          ))}
        </div>
      )}

      <div className="rounded-xl shadow-sm bg-theme-white overflow-x-scroll">
        <table className="text-sm w-full">
          <thead className="font-medium">
            <tr className="text-center whitespace-nowrap text-theme-white bg-theme-black">
              <th className="py-3 sticky left-0 z-20 bg-theme-black border-r border-gray-600"></th>
              {hours.map((hour) => (
                <th key={hour} className="py-3 px-4 text-center">
                  {`${hour.toString().padStart(2, '0')}:00 - ${hour.toString().padStart(2, '0')}:50`}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-400">
            {days.map((day) => {
              let skipCount = 0;

              return (
                <tr key={day} className="h-20 hover:bg-theme-cream">
                  <td className="font-bold px-4 bg-zinc-50 sticky left-0 z-10 border-r border-gray-300">{day}</td>

                  {times.map((time) => {
                    if (skipCount > 0) {
                      skipCount--;
                      return null; 
                    }

                    const akce = filteredData.find(
                      (a) => a.den === day && a.hodinaSkutOd?.value?.startsWith(time)
                    );

                    if (akce) {
                      const span = getDuration(akce.hodinaSkutOd?.value, akce.hodinaSkutDo?.value);
                      skipCount = span - 1;

                      return (
                        <td key={time} colSpan={span} className="min-w-35 p-1">
                          <div className="flex flex-col h-full justify-center p-2 rounded shadow-sm bg-theme-black text-theme-white">
                            <div className="font-bold">{akce.katedra}/{akce.predmet}</div>
                            <div className="text-[10px] font-medium">{akce.hodinaSkutOd?.value} - {akce.hodinaSkutDo?.value}</div>
                            <div className="text-[10px]">{akce.budova}-{akce.mistnost} | {TYP_AKCE_MAP[akce.typAkce] || akce.typAkce}</div>
                          </div>
                        </td>
                      );
                    }
                    return <td key={time} className="min-w-35 border-l border-gray-200 border-dashed"></td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}