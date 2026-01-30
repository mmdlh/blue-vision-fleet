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
    iconBg: "from-primary/30 to-primary/10",
    iconColor: "text-primary",
    glow: "group-hover:shadow-[0_0_40px_hsl(199_89%_48%/0.4)]",
    border: "group-hover:border-primary/50",
  },
  cyan: {
    iconBg: "from-tech-cyan/30 to-tech-cyan/10",
    iconColor: "text-tech-cyan",
    glow: "group-hover:shadow-[0_0_40px_hsl(187_100%_50%/0.4)]",
    border: "group-hover:border-tech-cyan/50",
  },
  purple: {
    iconBg: "from-tech-purple/30 to-tech-purple/10",
    iconColor: "text-tech-purple",
    glow: "group-hover:shadow-[0_0_40px_hsl(260_80%_60%/0.4)]",
    border: "group-hover:border-tech-purple/50",
  },
  green: {
    iconBg: "from-tech-green/30 to-tech-green/10",
    iconColor: "text-tech-green",
    glow: "group-hover:shadow-[0_0_40px_hsl(160_84%_45%/0.4)]",
    border: "group-hover:border-tech-green/50",
  },
  orange: {
    iconBg: "from-tech-orange/30 to-tech-orange/10",
    iconColor: "text-tech-orange",
    glow: "group-hover:shadow-[0_0_40px_hsl(25_95%_55%/0.4)]",
    border: "group-hover:border-tech-orange/50",
  },
  pink: {
    iconBg: "from-tech-pink/30 to-tech-pink/10",
    iconColor: "text-tech-pink",
    glow: "group-hover:shadow-[0_0_40px_hsl(330_80%_60%/0.4)]",
    border: "group-hover:border-tech-pink/50",
  },
};

export function StatCard({ title, value, subtitle, icon: Icon, trend, variant = "default" }: StatCardProps) {
  const styles = variantStyles[variant];

  return (
    <div className={`group tech-card flow-light transition-all duration-500 ${styles.glow} ${styles.border}`}>
      <div className="relative z-10 flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-2 font-medium">{title}</p>
          <p className="data-value">{value}</p>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          )}
          {trend && (
            <div className="flex items-center gap-1.5 mt-3">
              <span className={`flex items-center gap-1 text-sm font-medium ${trend.isPositive ? "text-tech-green" : "text-destructive"}`}>
                {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
              </span>
              <span className="text-xs text-muted-foreground">较昨日</span>
            </div>
          )}
        </div>
        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${styles.iconBg} flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
          <Icon className={`w-7 h-7 ${styles.iconColor}`} />
        </div>
      </div>
    </div>
  );
}
