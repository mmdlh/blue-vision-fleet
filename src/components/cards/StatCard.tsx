import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "cyan" | "purple" | "green" | "orange" | "pink";
}

const variantStyles = {
  default: {
    iconBg: "from-primary/20 to-primary/5",
    iconColor: "text-primary",
    glow: "group-hover:shadow-[0_0_30px_hsl(199_89%_48%/0.3)]",
  },
  cyan: {
    iconBg: "from-tech-cyan/20 to-tech-cyan/5",
    iconColor: "text-tech-cyan",
    glow: "group-hover:shadow-[0_0_30px_hsl(187_100%_50%/0.3)]",
  },
  purple: {
    iconBg: "from-tech-purple/20 to-tech-purple/5",
    iconColor: "text-tech-purple",
    glow: "group-hover:shadow-[0_0_30px_hsl(260_80%_60%/0.3)]",
  },
  green: {
    iconBg: "from-tech-green/20 to-tech-green/5",
    iconColor: "text-tech-green",
    glow: "group-hover:shadow-[0_0_30px_hsl(160_84%_45%/0.3)]",
  },
  orange: {
    iconBg: "from-tech-orange/20 to-tech-orange/5",
    iconColor: "text-tech-orange",
    glow: "group-hover:shadow-[0_0_30px_hsl(25_95%_55%/0.3)]",
  },
  pink: {
    iconBg: "from-tech-pink/20 to-tech-pink/5",
    iconColor: "text-tech-pink",
    glow: "group-hover:shadow-[0_0_30px_hsl(330_80%_60%/0.3)]",
  },
};

export function StatCard({ title, value, subtitle, icon: Icon, trend, variant = "default" }: StatCardProps) {
  const styles = variantStyles[variant];

  return (
    <div className={`group tech-card flow-light transition-all duration-300 ${styles.glow}`}>
      <div className="relative z-10 flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-2">{title}</p>
          <p className="data-value">{value}</p>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          )}
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <span className={trend.isPositive ? "text-tech-green" : "text-destructive"}>
                {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
              </span>
              <span className="text-xs text-muted-foreground">较昨日</span>
            </div>
          )}
        </div>
        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${styles.iconBg} flex items-center justify-center`}>
          <Icon className={`w-7 h-7 ${styles.iconColor}`} />
        </div>
      </div>
    </div>
  );
}
