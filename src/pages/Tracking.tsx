import { useState } from "react";
import { Search, Filter, MapPin, Navigation, Crosshair, Layers } from "lucide-react";
import { VehicleCard } from "@/components/cards/VehicleCard";

const vehicles = [
  { plateNumber: "京A·12345", driver: "张三", status: "online" as const, location: "北京市朝阳区建国门外大街1号", speed: 65, fuel: 78, battery: 92, lastUpdate: "10秒前" },
  { plateNumber: "京B·67890", driver: "李四", status: "warning" as const, location: "北京市海淀区中关村大街15号", speed: 0, fuel: 18, battery: 85, lastUpdate: "2分钟前" },
  { plateNumber: "京C·11111", driver: "王五", status: "online" as const, location: "北京市西城区金融街甲1号", speed: 45, fuel: 56, battery: 78, lastUpdate: "30秒前" },
  { plateNumber: "京D·22222", driver: "赵六", status: "offline" as const, location: "北京市东城区王府井大街", speed: 0, fuel: 42, battery: 65, lastUpdate: "1小时前" },
  { plateNumber: "京E·33333", driver: "钱七", status: "online" as const, location: "北京市丰台区南三环西路", speed: 82, fuel: 90, battery: 98, lastUpdate: "5秒前" },
  { plateNumber: "京F·44444", driver: "孙八", status: "online" as const, location: "北京市通州区新华大街", speed: 55, fuel: 67, battery: 88, lastUpdate: "15秒前" },
];

export default function Tracking() {
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredVehicles = vehicles.filter(v => 
    filterStatus === "all" || v.status === filterStatus
  );

  return (
    <div className="h-[calc(100vh-200px)] flex gap-6 animate-fade-in">
      {/* Sidebar */}
      <div className="w-96 flex flex-col gap-4">
        {/* Search */}
        <div className="tech-card !p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="搜索车牌号、司机..."
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="tech-card !p-4">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">状态筛选</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { value: "all", label: "全部", count: vehicles.length },
              { value: "online", label: "在线", count: vehicles.filter(v => v.status === "online").length },
              { value: "offline", label: "离线", count: vehicles.filter(v => v.status === "offline").length },
              { value: "warning", label: "告警", count: vehicles.filter(v => v.status === "warning").length },
            ].map((filter) => (
              <button
                key={filter.value}
                onClick={() => setFilterStatus(filter.value)}
                className={`px-3 py-2 rounded-lg text-sm transition-all ${
                  filterStatus === filter.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary hover:bg-secondary/80"
                }`}
              >
                {filter.label} ({filter.count})
              </button>
            ))}
          </div>
        </div>

        {/* Vehicle List */}
        <div className="flex-1 overflow-auto space-y-3 pr-2">
          {filteredVehicles.map((vehicle) => (
            <div
              key={vehicle.plateNumber}
              onClick={() => setSelectedVehicle(vehicle.plateNumber)}
              className={`cursor-pointer transition-all ${
                selectedVehicle === vehicle.plateNumber ? "ring-2 ring-primary" : ""
              }`}
            >
              <VehicleCard {...vehicle} />
            </div>
          ))}
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 tech-card !p-0 overflow-hidden relative">
        {/* Mock Map */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-secondary">
          {/* Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(hsl(199, 89%, 48%, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, hsl(199, 89%, 48%, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px"
            }}
          />
          
          {/* Vehicle Markers */}
          <div className="absolute top-1/4 left-1/3 animate-float">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-tech-green flex items-center justify-center pulse-glow">
                <Navigation className="w-5 h-5 text-background" />
              </div>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-card px-2 py-1 rounded text-xs">
                京A·12345
              </div>
            </div>
          </div>
          
          <div className="absolute top-1/2 left-1/2 animate-float" style={{ animationDelay: "1s" }}>
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-tech-orange flex items-center justify-center pulse-glow">
                <Navigation className="w-5 h-5 text-background" />
              </div>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-card px-2 py-1 rounded text-xs">
                京B·67890
              </div>
            </div>
          </div>

          <div className="absolute top-2/3 left-2/3 animate-float" style={{ animationDelay: "2s" }}>
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-tech-green flex items-center justify-center pulse-glow">
                <Navigation className="w-5 h-5 text-background" />
              </div>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-card px-2 py-1 rounded text-xs">
                京C·11111
              </div>
            </div>
          </div>

          {/* Decorative circles */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-primary/20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-primary/10" />
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button className="w-10 h-10 rounded-lg bg-card/90 backdrop-blur border border-border hover:border-primary transition-all flex items-center justify-center">
            <Crosshair className="w-5 h-5 text-primary" />
          </button>
          <button className="w-10 h-10 rounded-lg bg-card/90 backdrop-blur border border-border hover:border-primary transition-all flex items-center justify-center">
            <Layers className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Bottom Info */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-card/90 backdrop-blur rounded-xl border border-border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-tech-green" />
                  <span className="text-sm">在线: 4辆</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-tech-orange" />
                  <span className="text-sm">告警: 1辆</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-muted" />
                  <span className="text-sm">离线: 1辆</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                北京市
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
