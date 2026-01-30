import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";

interface MiniChartProps {
  data: { value: number }[];
  color?: string;
  height?: number;
}

export function MiniChart({ data, color = "hsl(199, 89%, 48%)", height = 60 }: MiniChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.3} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Tooltip
          contentStyle={{
            background: "hsl(220, 30%, 12%)",
            border: "1px solid hsl(220, 30%, 25%)",
            borderRadius: "8px",
            padding: "8px 12px",
          }}
          labelStyle={{ display: "none" }}
          itemStyle={{ color: "hsl(210, 40%, 98%)" }}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          fill={`url(#gradient-${color})`}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
