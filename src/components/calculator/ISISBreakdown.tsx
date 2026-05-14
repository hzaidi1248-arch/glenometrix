import type { ISISResult } from "@/lib/clinical/types";

interface ISISBreakdownProps {
  result: ISISResult;
}

const ROWS = [
  { label: "Age at first dislocation < 20 y", maxPts: 2, field: "agePoints" as const },
  { label: "Competitive sport participation", maxPts: 2, field: "sportLevelPoints" as const },
  { label: "Contact or overhead sport type", maxPts: 1, field: "sportTypePoints" as const },
  { label: "Anterior / GHIS hyperlaxity", maxPts: 1, field: "hyperlaxityPoints" as const },
  { label: "Hill-Sachs on AP X-ray (ext. rotation)", maxPts: 2, field: "hillSachsPoints" as const },
  { label: "Loss of inferior glenoid contour on AP", maxPts: 2, field: "glenoidLossPoints" as const },
];

export function ISISBreakdown({ result }: ISISBreakdownProps) {
  return (
    <div className="w-full">
      <table className="w-full text-sm font-sans" aria-label="ISIS score breakdown">
        <thead>
          <tr className="border-b border-[#e2e8f0]">
            <th className="text-left py-2 text-[#64748b] text-xs uppercase tracking-wider font-medium">
              Factor
            </th>
            <th className="text-right py-2 text-[#64748b] text-xs uppercase tracking-wider font-medium w-24">
              Points
            </th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map(({ label, maxPts, field }) => {
            const pts = result[field];
            const earned = pts > 0;
            return (
              <tr key={field} className="border-b border-[#e2e8f0]/60">
                <td className="py-3 text-[#0a0e1a] leading-snug pr-4">{label}</td>
                <td className="py-3 text-right font-mono text-sm">
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
            <td className="py-3 font-semibold text-[#0a0e1a]">Total ISIS Score</td>
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
