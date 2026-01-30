import { useState } from "react";
import { AlertTriangle, AlertCircle, Info, CheckCircle, Bell, Filter, Search, Clock, X } from "lucide-react";
import { AlertCard } from "@/components/cards/AlertCard";

const alertTypes = [
  { id: "all", label: "全部告警", icon: Bell, count: 48 },
  { id: "critical", label: "严重告警", icon: AlertCircle, count: 8 },
  { id: "warning", label: "警告", icon: AlertTriangle, count: 15 },
  { id: "info", label: "信息", icon: Info, count: 20 },
  { id: "success", label: "已处理", icon: CheckCircle, count: 5 },
];

const allAlerts = [
  { type: "critical" as const, title: "车辆超速告警", description: "车速达到135km/h，超过高速公路限速120km/h", time: "2分钟前", vehicle: "京A·12345" },
  { type: "critical" as const, title: "疲劳驾驶预警", description: "连续驾驶超过4小时，请立即休息", time: "5分钟前", vehicle: "京B·67890" },
  { type: "warning" as const, title: "低油量警告", description: "油量低于15%，请及时加油补充", time: "12分钟前", vehicle: "京C·11111" },
  { type: "warning" as const, title: "胎压异常", description: "左前轮胎压偏低，当前2.0bar", time: "18分钟前", vehicle: "京D·22222" },
  { type: "info" as const, title: "进入电子围栏", description: "车辆已进入「朝阳区配送区域」", time: "25分钟前", vehicle: "京E·33333" },
  { type: "info" as const, title: "离开电子围栏", description: "车辆已离开「海淀区仓储区域」", time: "32分钟前", vehicle: "京F·44444" },
  { type: "success" as const, title: "告警已处理", description: "超速告警已人工确认处理", time: "45分钟前", vehicle: "京G·55555" },
  { type: "critical" as const, title: "急刹车事件", description: "检测到急刹车行为，减速度超过8m/s²", time: "1小时前", vehicle: "京H·66666" },
  { type: "warning" as const, title: "发动机温度过高", description: "发动机温度达到105°C，建议检查冷却系统", time: "1小时前", vehicle: "京A·77777" },
  { type: "info" as const, title: "定期保养提醒", description: "距下次保养还有500公里", time: "2小时前", vehicle: "京B·88888" },
  { type: "warning" as const, title: "蓄电池电压低", description: "蓄电池电压11.8V，低于正常值", time: "2小时前", vehicle: "京C·99999" },
  { type: "success" as const, title: "故障已修复", description: "刹车系统故障已在维修站处理完成", time: "3小时前", vehicle: "京D·00000" },
];

export default function Alerts() {
  const [activeType, setActiveType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAlerts = allAlerts.filter(alert => {
    const matchesType = activeType === "all" || alert.type === activeType;
    const matchesSearch = alert.title.includes(searchQuery) || 
                          alert.description.includes(searchQuery) || 
                          alert.vehicle?.includes(searchQuery);
    return matchesType && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {alertTypes.map((type) => {
          const Icon = type.icon;
          const isActive = activeType === type.id;
          return (
            <button
              key={type.id}
              onClick={() => setActiveType(type.id)}
              className={`tech-card !p-4 text-left transition-all ${
                isActive ? "ring-2 ring-primary" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-5 h-5 ${
                  type.id === "critical" ? "text-destructive" :
                  type.id === "warning" ? "text-tech-orange" :
                  type.id === "info" ? "text-primary" :
                  type.id === "success" ? "text-tech-green" :
                  "text-muted-foreground"
                }`} />
                <span className="text-2xl font-bold">{type.count}</span>
              </div>
              <p className="text-sm text-muted-foreground">{type.label}</p>
            </button>
          );
        })}
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="搜索告警内容或车牌号..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-card border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-3 rounded-lg bg-card border border-border hover:border-primary transition-all">
            <Filter className="w-4 h-4" />
            <span className="text-sm">高级筛选</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-3 rounded-lg bg-card border border-border hover:border-primary transition-all">
            <Clock className="w-4 h-4" />
            <span className="text-sm">时间范围</span>
          </button>
        </div>
      </div>

      {/* Alert Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAlerts.map((alert, index) => (
          <div 
            key={index} 
            className="animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <AlertCard {...alert} />
          </div>
        ))}
      </div>

      {filteredAlerts.length === 0 && (
        <div className="tech-card text-center py-12">
          <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">没有找到告警</h3>
          <p className="text-muted-foreground">尝试调整筛选条件或搜索关键词</p>
        </div>
      )}
    </div>
  );
}
