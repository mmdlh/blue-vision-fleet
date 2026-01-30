import { MapPin, Gauge, Fuel, Battery } from "lucide-react";

interface VehicleCardProps {
  plateNumber: string;
  driver: string;
  status: "online" | "offline" | "warning";
  location: string;
  speed: number;
  fuel: number;
  battery: number;
  lastUpdate: string;
}

const statusConfig = {
  online: { label: "在线", class: "status-online", textClass: "text-tech-green" },
  offline: { label: "离线", class: "status-offline", textClass: "text-muted-foreground" },
  warning: { label: "告警", class: "status-warning", textClass: "text-tech-orange" },
};

export function VehicleCard({ plateNumber, driver, status, location, speed, fuel, battery, lastUpdate }: VehicleCardProps) {
  const statusInfo = statusConfig[status];

  return (
    <div className="glow-card group hover:scale-[1.02] transition-all duration-300">
      <div className="glow-card-inner">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-tech-cyan">{plateNumber}</h3>
            <p className="text-sm text-muted-foreground">{driver}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className={statusInfo.class} />
            <span className={`text-sm font-medium ${statusInfo.textClass}`}>{statusInfo.label}</span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 mb-4 p-3 rounded-lg bg-gradient-to-r from-secondary/80 to-secondary/30 border border-border/30">
          <MapPin className="w-4 h-4 text-tech-cyan flex-shrink-0" />
          <span className="text-sm truncate">{location}</span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center p-2 rounded-lg bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/20">
            <Gauge className="w-4 h-4 text-primary mx-auto mb-1" />
            <p className="text-lg font-bold text-primary">{speed}</p>
            <p className="text-[10px] text-muted-foreground">km/h</p>
          </div>
          <div className="text-center p-2 rounded-lg bg-gradient-to-br from-tech-orange/15 to-tech-orange/5 border border-tech-orange/20">
            <Fuel className="w-4 h-4 text-tech-orange mx-auto mb-1" />
            <p className="text-lg font-bold text-tech-orange">{fuel}%</p>
            <p className="text-[10px] text-muted-foreground">油量</p>
          </div>
          <div className="text-center p-2 rounded-lg bg-gradient-to-br from-tech-green/15 to-tech-green/5 border border-tech-green/20">
            <Battery className="w-4 h-4 text-tech-green mx-auto mb-1" />
            <p className="text-lg font-bold text-tech-green">{battery}%</p>
            <p className="text-[10px] text-muted-foreground">电量</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-border/30 flex items-center justify-between text-xs text-muted-foreground">
          <span>最后更新</span>
          <span className="text-foreground">{lastUpdate}</span>
        </div>
      </div>
    </div>
  );
}
