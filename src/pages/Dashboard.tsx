import { 
  Car, 
  MapPin, 
  AlertTriangle, 
  Zap, 
  TrendingUp, 
  Activity,
  Clock,
  Route,
  Gauge,
  Fuel,
  Battery,
  Navigation,
  Shield,
  Users,
  Target,
  Radio,
  Wifi,
  Signal
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, RadialBarChart, RadialBar } from "recharts";

// Mock data
const areaChartData = [
  { name: "00:00", online: 120, total: 192 },
  { name: "04:00", online: 80, total: 192 },
  { name: "08:00", online: 165, total: 192 },
  { name: "12:00", online: 175, total: 192 },
  { name: "16:00", online: 168, total: 192 },
  { name: "20:00", online: 145, total: 192 },
  { name: "23:59", online: 130, total: 192 },
];

const pieData = [
  { name: "在线", value: 156, color: "hsl(160, 84%, 45%)" },
  { name: "离线", value: 24, color: "hsl(220, 30%, 35%)" },
  { name: "告警", value: 12, color: "hsl(25, 95%, 55%)" },
];

const vehicleTypes = [
  { name: "轿车", count: 68, color: "hsl(199, 89%, 48%)" },
  { name: "SUV", count: 45, color: "hsl(187, 100%, 50%)" },
  { name: "货车", count: 52, color: "hsl(260, 80%, 60%)" },
  { name: "客车", count: 27, color: "hsl(160, 84%, 45%)" },
];

const alertStats = [
  { type: "超速", count: 23, icon: Gauge, color: "text-destructive", bg: "from-destructive/20" },
  { type: "疲劳", count: 8, icon: Users, color: "text-tech-orange", bg: "from-tech-orange/20" },
  { type: "围栏", count: 15, icon: Target, color: "text-primary", bg: "from-primary/20" },
  { type: "故障", count: 5, icon: Shield, color: "text-tech-purple", bg: "from-tech-purple/20" },
];

const realtimeVehicles = [
  { plate: "京A·12345", driver: "张三", speed: 68, location: "朝阳区建国门外大街", status: "online", fuel: 78, signal: 95 },
  { plate: "京B·67890", driver: "李四", speed: 0, location: "海淀区中关村大街", status: "warning", fuel: 18, signal: 88 },
  { plate: "京C·11111", driver: "王五", speed: 52, location: "西城区金融街", status: "online", fuel: 56, signal: 92 },
  { plate: "京D·22222", driver: "赵六", speed: 75, location: "东城区王府井大街", status: "online", fuel: 90, signal: 97 },
  { plate: "京E·33333", driver: "钱七", speed: 0, location: "丰台区南三环", status: "offline", fuel: 42, signal: 0 },
];

const radialData = [
  { name: "完成率", value: 87, fill: "hsl(160, 84%, 45%)" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {/* Main Stats */}
        <div className="col-span-2 md:col-span-2 lg:col-span-2 glow-card">
          <div className="glow-card-inner flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-tech-cyan/30 blur-xl rounded-full" />
              <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-primary via-tech-cyan to-primary flex items-center justify-center pulse-glow">
                <Car className="w-10 h-10 text-primary-foreground" />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-1">在线车辆</p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-tech-cyan">156</span>
                <span className="text-muted-foreground">/ 192</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full w-[81%] rounded-full bg-gradient-to-r from-primary to-tech-cyan" />
                </div>
                <span className="text-sm text-tech-cyan font-medium">81%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        {[
          { label: "今日里程", value: "12,458", unit: "km", icon: Route, color: "text-tech-green", trend: "+8.2%" },
          { label: "活跃告警", value: "12", unit: "条", icon: AlertTriangle, color: "text-tech-orange", trend: "-2.3%" },
          { label: "平均车速", value: "45.3", unit: "km/h", icon: Gauge, color: "text-primary", trend: "+1.5%" },
          { label: "总油耗", value: "2,340", unit: "L", icon: Fuel, color: "text-tech-purple", trend: "-3.1%" },
        ].map((stat, index) => (
          <div key={index} className="tech-card flow-light !p-4">
            <div className="flex items-center justify-between mb-2">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
              <span className={`text-xs font-medium ${stat.trend.startsWith('+') ? 'text-tech-green' : 'text-destructive'}`}>
                {stat.trend}
              </span>
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label} ({stat.unit})</p>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column - Charts */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          {/* Activity Chart */}
          <div className="tech-card scan-line">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/30 to-tech-cyan/10 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">车辆活动趋势</h3>
                  <p className="text-xs text-muted-foreground">24小时在线车辆数量变化</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-muted-foreground">在线</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-tech-cyan/30" />
                  <span className="text-muted-foreground">总数</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={areaChartData}>
                <defs>
                  <linearGradient id="colorOnline" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="hsl(187, 100%, 50%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 30%, 20%)" vertical={false} />
                <XAxis dataKey="name" stroke="hsl(215, 20%, 50%)" fontSize={11} tickLine={false} />
                <YAxis stroke="hsl(215, 20%, 50%)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "linear-gradient(145deg, hsl(220, 30%, 14%), hsl(220, 30%, 10%))",
                    border: "1px solid hsl(220, 30%, 25%)",
                    borderRadius: "12px",
                    boxShadow: "0 8px 32px hsl(220, 25%, 4%, 0.5)",
                  }}
                />
                <Area type="monotone" dataKey="total" stroke="hsl(220, 30%, 35%)" strokeWidth={1} fill="hsl(220, 30%, 20%)" fillOpacity={0.3} />
                <Area type="monotone" dataKey="online" stroke="hsl(199, 89%, 48%)" strokeWidth={3} fill="url(#colorOnline)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Alert Stats & Vehicle Types */}
          <div className="grid grid-cols-2 gap-6">
            {/* Alert Categories */}
            <div className="tech-card">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-lg bg-tech-orange/20 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-tech-orange" />
                </div>
                <h3 className="font-semibold">告警分类统计</h3>
              </div>
              <div className="space-y-3">
                {alertStats.map((alert, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center justify-between p-3 rounded-xl bg-gradient-to-r ${alert.bg} to-transparent border border-border/30 hover:border-border transition-all`}
                  >
                    <div className="flex items-center gap-3">
                      <alert.icon className={`w-5 h-5 ${alert.color}`} />
                      <span className="font-medium">{alert.type}告警</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xl font-bold ${alert.color}`}>{alert.count}</span>
                      <span className="text-xs text-muted-foreground">条</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Vehicle Types */}
            <div className="tech-card">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Car className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-semibold">车型分布</h3>
              </div>
              <div className="space-y-3">
                {vehicleTypes.map((type, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{type.name}</span>
                      <span className="text-sm font-medium">{type.count} 辆</span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary/50 overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-1000"
                        style={{ 
                          width: `${(type.count / 192) * 100}%`, 
                          background: `linear-gradient(90deg, ${type.color}, ${type.color}88)`,
                          boxShadow: `0 0 10px ${type.color}40`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Status & Map */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* Status Distribution */}
          <div className="tech-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-tech-green/20 flex items-center justify-center">
                <Signal className="w-4 h-4 text-tech-green" />
              </div>
              <h3 className="font-semibold">状态分布</h3>
            </div>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "hsl(220, 30%, 12%)",
                      border: "1px solid hsl(220, 30%, 25%)",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-5">
              {pieData.map((item) => (
                <div key={item.name} className="text-center">
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color, boxShadow: `0 0 8px ${item.color}` }} />
                    <span className="text-xs text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="text-lg font-bold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mini Map Preview */}
          <div className="tech-card !p-0 overflow-hidden h-[280px] relative">
            {/* Map Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-secondary">
              <div 
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: `
                    linear-gradient(hsl(199, 89%, 48%, 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, hsl(199, 89%, 48%, 0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: "40px 40px"
                }}
              />
              {/* Radar Effect */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border border-primary/20 animate-ping" style={{ animationDuration: '3s' }} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140px] h-[140px] rounded-full border border-primary/30" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80px] h-[80px] rounded-full border border-primary/40" />
              
              {/* Vehicle Dots */}
              {[
                { top: '25%', left: '30%', status: 'online' },
                { top: '45%', left: '55%', status: 'warning' },
                { top: '65%', left: '40%', status: 'online' },
                { top: '35%', left: '70%', status: 'online' },
                { top: '75%', left: '65%', status: 'offline' },
              ].map((dot, i) => (
                <div 
                  key={i}
                  className={`absolute w-3 h-3 rounded-full ${
                    dot.status === 'online' ? 'bg-tech-green' : 
                    dot.status === 'warning' ? 'bg-tech-orange' : 'bg-muted'
                  }`}
                  style={{ 
                    top: dot.top, 
                    left: dot.left,
                    boxShadow: dot.status === 'online' ? '0 0 10px hsl(160, 84%, 45%)' :
                               dot.status === 'warning' ? '0 0 10px hsl(25, 95%, 55%)' : 'none',
                    animation: dot.status !== 'offline' ? 'status-pulse 2s ease-in-out infinite' : 'none'
                  }}
                />
              ))}
            </div>

            {/* Overlay Info */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card/80 backdrop-blur border border-border/50">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">北京市</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card/80 backdrop-blur border border-border/50">
                <Radio className="w-4 h-4 text-tech-green" />
                <span className="text-sm">实时追踪</span>
              </div>
            </div>
          </div>

          {/* Task Completion */}
          <div className="tech-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">今日任务完成</p>
                <p className="text-3xl font-bold text-tech-green">87%</p>
                <p className="text-xs text-muted-foreground mt-1">已完成 156 / 180 单</p>
              </div>
              <div className="relative w-20 h-20">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="40" cy="40" r="35" fill="none" stroke="hsl(220, 30%, 20%)" strokeWidth="6" />
                  <circle 
                    cx="40" cy="40" r="35" fill="none" 
                    stroke="url(#progressGradient)" 
                    strokeWidth="6" 
                    strokeLinecap="round"
                    strokeDasharray={`${87 * 2.2} 220`}
                  />
                  <defs>
                    <linearGradient id="progressGradient">
                      <stop offset="0%" stopColor="hsl(160, 84%, 45%)" />
                      <stop offset="100%" stopColor="hsl(187, 100%, 50%)" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Real-time Vehicle List */}
      <div className="tech-card">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-tech-purple/30 to-tech-purple/10 flex items-center justify-center">
              <Navigation className="w-5 h-5 text-tech-purple" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">实时车辆监控</h3>
              <p className="text-xs text-muted-foreground">显示最近活动的5辆车</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-tech-green animate-pulse" />
            <span className="text-sm text-muted-foreground">实时更新中</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {realtimeVehicles.map((vehicle, index) => (
            <div 
              key={index}
              className={`p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02] cursor-pointer ${
                vehicle.status === 'online' ? 'border-tech-green/30 bg-gradient-to-br from-tech-green/10 to-transparent hover:border-tech-green/50' :
                vehicle.status === 'warning' ? 'border-tech-orange/30 bg-gradient-to-br from-tech-orange/10 to-transparent hover:border-tech-orange/50' :
                'border-border/30 bg-gradient-to-br from-muted/10 to-transparent'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <span className={`text-lg font-bold ${
                  vehicle.status === 'online' ? 'text-tech-green' :
                  vehicle.status === 'warning' ? 'text-tech-orange' : 'text-muted-foreground'
                }`}>
                  {vehicle.plate}
                </span>
                <div className={`w-2.5 h-2.5 rounded-full ${
                  vehicle.status === 'online' ? 'status-online' :
                  vehicle.status === 'warning' ? 'status-warning' : 'status-offline'
                }`} />
              </div>

              {/* Driver */}
              <p className="text-sm text-muted-foreground mb-3">{vehicle.driver}</p>

              {/* Stats */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">速度</span>
                  <span className="font-medium">{vehicle.speed} km/h</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">油量</span>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-1.5 rounded-full bg-secondary overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${vehicle.fuel > 30 ? 'bg-tech-green' : 'bg-tech-orange'}`}
                        style={{ width: `${vehicle.fuel}%` }}
                      />
                    </div>
                    <span className="font-medium">{vehicle.fuel}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">信号</span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div 
                        key={i}
                        className={`w-1 rounded-full ${i < Math.floor(vehicle.signal / 20) ? 'bg-primary' : 'bg-muted'}`}
                        style={{ height: `${(i + 1) * 3 + 4}px` }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="mt-3 pt-3 border-t border-border/30">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  <span className="truncate">{vehicle.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
