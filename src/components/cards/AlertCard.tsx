import { AlertTriangle, Info, AlertCircle, CheckCircle } from "lucide-react";

interface AlertCardProps {
  type: "critical" | "warning" | "info" | "success";
  title: string;
  description: string;
  time: string;
  vehicle?: string;
}

const typeStyles = {
  critical: {
    bg: "from-destructive/20 via-destructive/10 to-transparent",
    border: "border-destructive/40 hover:border-destructive/60",
    icon: AlertCircle,
    iconColor: "text-destructive",
    iconBg: "bg-destructive/20",
    glow: "shadow-[0_0_20px_hsl(0_84%_60%/0.15)]",
  },
  warning: {
    bg: "from-tech-orange/20 via-tech-orange/10 to-transparent",
    border: "border-tech-orange/40 hover:border-tech-orange/60",
    icon: AlertTriangle,
    iconColor: "text-tech-orange",
    iconBg: "bg-tech-orange/20",
    glow: "shadow-[0_0_20px_hsl(25_95%_55%/0.15)]",
  },
  info: {
    bg: "from-primary/20 via-primary/10 to-transparent",
    border: "border-primary/40 hover:border-primary/60",
    icon: Info,
    iconColor: "text-primary",
    iconBg: "bg-primary/20",
    glow: "shadow-[0_0_20px_hsl(199_89%_48%/0.15)]",
  },
  success: {
    bg: "from-tech-green/20 via-tech-green/10 to-transparent",
    border: "border-tech-green/40 hover:border-tech-green/60",
    icon: CheckCircle,
    iconColor: "text-tech-green",
    iconBg: "bg-tech-green/20",
    glow: "shadow-[0_0_20px_hsl(160_84%_45%/0.15)]",
  },
};

export function AlertCard({ type, title, description, time, vehicle }: AlertCardProps) {
  const styles = typeStyles[type];
  const Icon = styles.icon;

  return (
    <div className={`group rounded-xl border ${styles.border} bg-gradient-to-r ${styles.bg} p-4 ${styles.glow} transition-all duration-300 hover:scale-[1.02] cursor-pointer`}>
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-lg ${styles.iconBg} flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110`}>
          <Icon className={`w-5 h-5 ${styles.iconColor}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-medium truncate">{title}</h4>
            <span className="text-xs text-muted-foreground whitespace-nowrap">{time}</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{description}</p>
          {vehicle && (
            <span className="inline-flex items-center gap-1 mt-2 px-2 py-1 rounded-md bg-card/80 text-xs text-muted-foreground border border-border/50">
              🚗 {vehicle}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
