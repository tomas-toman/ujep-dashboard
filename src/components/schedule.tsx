import ScheduleClient from "./scheduleClient";

export interface RozvrhovaAkce {
  den: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
  hodinaSkutOd: { value: string };
  hodinaSkutDo: { value: string };
  katedra: string;
  predmet: string;
  budova: string;
  mistnost: string;
  typAkce: string;
}

export interface StagApiResponse {
  rozvrhovaAkce: RozvrhovaAkce[];
}

interface ScheduleProps {
  showFilter?: boolean;
}

export default async function ScheduleComponent({ showFilter = true }: ScheduleProps) {
  const baseUrl = "https://ws.ujep.cz";
  const endpoint = "/ws/services/rest2/rozvrhy/getRozvrhByStudent";
  const username = process.env.STAG_USERNAME ?? "";
  const password = process.env.STAG_PASSWORD ?? "";
  const number = process.env.STAG_NUMBER ?? "";
  const week = getWeekDates();
  
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
    return <div>Error while loading schedule.</div>;
  }

  const rozvrh = (await response.json()) as StagApiResponse;

  return <ScheduleClient data={rozvrh.rozvrhovaAkce} showFilter={showFilter} />;
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