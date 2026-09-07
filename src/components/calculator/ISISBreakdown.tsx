import type { ISISResult } from "@/lib/clinical/types";

interface ISISBreakdownProps {
  result: ISISResult;
}

const ROWS = [
  { label: "Age at first dislocation", description: "< 20 = 2 · 20–30 = 1 · > 30 = 0", maxPts: 2, field: "agePoints" as const },
  { label: "Competitive sport participation", maxPts: 2, field: "sportLevelPoints" as const },
  { label: "Contact or overhead sport type", maxPts: 1, field: "sportTypePoints" as const },
  { label: "Anterior / GHIS hyperlaxity", maxPts: 1, field: "hyperlaxityPoints" as const },
  { label: "Glenoid bone loss", description: "< 10% = 0 · 10–20% = 1 · > 20% = 2", maxPts: 2, field: "boneLossPoints" as const },
  { label: "Hill-Sachs track status", description: "On-track = 0 · Off-track = 2", maxPts: 2, field: "trackPoints" as const },
];

export function ISISBreakdown({ result }: ISISBreakdownProps) {
  return (
    <div className="w-full">
      <table className="w-full text-sm font-sans" aria-label="ISIS score breakdown">
        <thead>
          <tr className="border-b border-[#ebebea]">
            <th className="text-left py-2 font-mono text-[9px] text-[#9ca3af] uppercase tracking-[0.2em] font-normal">
              Factor
            </th>
            <th className="text-right py-2 font-mono text-[9px] text-[#9ca3af] uppercase tracking-[0.2em] font-normal w-24">
              Pts
            </th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map(({ label, description, maxPts, field }) => {
            const pts = result[field];
            const earned = pts > 0;
            return (
              <tr key={field} className="border-b border-[#ebebea]">
                <td className="py-3 text-[#0a0e1a] leading-snug pr-4">
                  <div>{label}</div>
                  {description && (
                    <div className="font-mono text-[9px] text-[#9ca3af] uppercase tracking-wider mt-1">
                      {description}
                    </div>
                  )}
                </td>
                <td className="py-3 text-right font-mono text-sm align-top">
                  <span className={earned ? "text-[#1a5fae] font-semibold" : "text-[#64748b]"}>
                    {pts}
                  </span>
                  <span className="text-[#64748b]">/{maxPts}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td className="py-3 font-semibold text-[#0a0e1a]">Total Score</td>
            <td className="py-3 text-right">
              <span className="font-mono font-semibold text-[#0a0e1a]">{result.total}</span>
              <span className="text-[#64748b] font-mono">/10</span>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
