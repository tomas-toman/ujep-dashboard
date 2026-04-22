const TYP_AKCE_MAP: Record<string, string> = {
  "Přednáška": "Lecture",
  "Cvičení": "Lab",
  "Seminář": "Seminar",
};

export default async function schedule() {
  const baseUrl = "https://ws.ujep.cz";
  const endpoint = "/ws/services/rest2/rozvrhy/getRozvrhByStudent";
  const username = process.env.STAG_USERNAME ?? "";
  const password = process.env.STAG_PASSWORD ?? "";
  const number = process.env.STAG_NUMBER ?? "";
  const week = getWeekDates();
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const times = ['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'];
  const hours = Array.from({ length: 15 }, (_, i) => i + 7);
  
  const params = new URLSearchParams({
    osCislo: number,
    rok: "2025", 
    datumOd: week.from,
    datumDo: week.to,
    jenRozvrhoveAkce: "true",
    lang: "en",
  });

  const auth = Buffer.from(`${username}:${password}`).toString('base64');

  const response = await fetch(`${baseUrl}${endpoint}?${params.toString()}`, {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Basic ${auth}`
    },
    next: { revalidate: 3600 }
  });

  if (!response.ok) {
    return <div>Error while loading schedule.</div>
  }

  const rozvrh = await response.json();

  const getDuration = (start?: string, end?: string) => {
    if (!start || !end) return 1;
    const startH = parseInt(start.split(':')[0]);
    const endH = parseInt(end.split(':')[0]);
    return (endH - startH) + 1; 
  };
  
  return (
    <>
      <div className="rounded-xl shadow-sm bg-theme-white overflow-x-scroll">
        <table className="text-sm">
          <thead className="font-medium">
            <tr className="text-center whitespace-nowrap text-theme-white bg-theme-black">
              <th className="py-3 sticky left-0 z-20 bg-theme-black"></th>
              {hours.map((hour) => (
                <th key={hour} className="py-3 px-4 text-center border-l border-theme-gray-200 first:border-none">
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
                  <td className="font-bold px-4 bg-zinc-50 sticky left-0 z-10 border-gray-300">{day}</td>

                  {times.map((time) => {
                    if (skipCount > 0) {
                      skipCount--;
                      return null; 
                    }

                    const akce = rozvrh.rozvrhovaAkce.find(
                      (a: any) => a.den === day && a.hodinaSkutOd?.value?.startsWith(time)
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
                    return <td key={time} className="min-w-35"></td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

function getWeekDates() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const monday = new Date(today);
  const friday = new Date(monday);

  monday.setDate(today.getDate() + diffToMonday);
  friday.setDate(monday.getDate() + 4);

  const formatDate = (date: Date) => {
    const d = String(date.getDate()).padStart(2, '0');
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const y = date.getFullYear();
    return `${d}.${m}.${y}`;
  };

  return {
    from: formatDate(monday),
    to: formatDate(friday)
  };
}