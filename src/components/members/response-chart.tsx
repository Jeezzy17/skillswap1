"use client";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
export type Point = { day: string; rate: number };
export function ResponseChart({ data }: { data: Point[] }) {
  return (
    <figure>
      <figcaption className="mb-2 text-sm font-medium">Permintaan direspons ≤ 24 jam, 7 hari terakhir (%) — target 60%</figcaption>
      <div className="h-56"><ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}><XAxis dataKey="day" tickLine={false} /><YAxis domain={[40, 100]} width={36} /><Tooltip />
          <Line type="monotone" dataKey="rate" stroke="var(--brand)" strokeWidth={2} dot={false} /></LineChart></ResponsiveContainer></div>
      <table className="sr-only"><caption>Data respons per hari</caption><tbody>{data.map((d) => <tr key={d.day}><th scope="row">{d.day}</th><td>{d.rate}%</td></tr>)}</tbody></table>
    </figure>
  );
}
