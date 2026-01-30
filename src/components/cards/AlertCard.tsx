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
    bg: "from-destructive/20 to-destructive/5",
    border: "border-destructive/50",
    icon: AlertCircle,
    iconColor: "text-destructive",
    glow: "shadow-[0_0_20px_hsl(0_84%_60%/0.2)]",
  },
  warning: {
    bg: "from-tech-orange/20 to-tech-orange/5",
    border: "border-tech-orange/50",
    icon: AlertTriangle,
    iconColor: "text-tech-orange",
    glow: "shadow-[0_0_20px_hsl(25_95%_55%/0.2)]",
  },
  info: {
    bg: "from-primary/20 to-primary/5",
    border: "border-primary/50",
    icon: Info,
    iconColor: "text-primary",
    glow: "shadow-[0_0_20px_hsl(199_89%_48%/0.2)]",
  },
  success: {
    bg: "from-tech-green/20 to-tech-green/5",
    border: "border-tech-green/50",
    icon: CheckCircle,
    iconColor: "text-tech-green",
    glow: "shadow-[0_0_20px_hsl(160_84%_45%/0.2)]",
  },
};

export function AlertCard({ type, title, description, time, vehicle }: AlertCardProps) {
  const styles = typeStyles[type];
  const Icon = styles.icon;

  return (
    <div className={`rounded-xl border ${styles.border} bg-gradient-to-br ${styles.bg} p-4 ${styles.glow} transition-all duration-300 hover:scale-[1.02]`}>
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-lg bg-card flex items-center justify-center flex-shrink-0`}>
          <Icon className={`w-5 h-5 ${styles.iconColor}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-medium truncate">{title}</h4>
            <span className="text-xs text-muted-foreground whitespace-nowrap">{time}</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
          {vehicle && (
            <span className="inline-block mt-2 px-2 py-1 rounded bg-card text-xs text-muted-foreground">
              {vehicle}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
