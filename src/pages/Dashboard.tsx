import { 
  Car, 
  MapPin, 
  AlertTriangle, 
  Zap, 
  TrendingUp, 
  Activity,
  Clock,
  Route
} from "lucide-react";
import { StatCard } from "@/components/cards/StatCard";
import { AlertCard } from "@/components/cards/AlertCard";
import { VehicleCard } from "@/components/cards/VehicleCard";
import { MiniChart } from "@/components/charts/MiniChart";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// Mock data
const areaChartData = [
  { name: "00:00", value: 120 },
  { name: "04:00", value: 80 },
  { name: "08:00", value: 250 },
  { name: "12:00", value: 320 },
  { name: "16:00", value: 280 },
  { name: "20:00", value: 200 },
  { name: "23:59", value: 150 },
];

const pieData = [
  { name: "在线", value: 156, color: "hsl(160, 84%, 45%)" },
  { name: "离线", value: 24, color: "hsl(0, 84%, 60%)" },
  { name: "告警", value: 12, color: "hsl(25, 95%, 55%)" },
];

const recentAlerts = [
  { type: "critical" as const, title: "超速告警", description: "车辆速度超过限速120km/h", time: "2分钟前", vehicle: "京A·12345" },
  { type: "warning" as const, title: "低油量警告", description: "油量低于20%，请及时加油", time: "15分钟前", vehicle: "京B·67890" },
  { type: "info" as const, title: "车辆进入区域", description: "已进入北京市朝阳区电子围栏", time: "32分钟前", vehicle: "京C·11111" },
  { type: "success" as const, title: "维保完成", description: "定期保养已完成，可正常使用", time: "1小时前", vehicle: "京D·22222" },
];

const topVehicles = [
  { plateNumber: "京A·12345", driver: "张三", status: "online" as const, location: "北京市朝阳区建国门外大街", speed: 65, fuel: 78, battery: 92, lastUpdate: "10秒前" },
  { plateNumber: "京B·67890", driver: "李四", status: "warning" as const, location: "北京市海淀区中关村大街", speed: 0, fuel: 18, battery: 85, lastUpdate: "2分钟前" },
  { plateNumber: "京C·11111", driver: "王五", status: "online" as const, location: "北京市西城区金融街", speed: 45, fuel: 56, battery: 78, lastUpdate: "30秒前" },
];

const miniChartData = Array.from({ length: 20 }, () => ({ value: Math.random() * 100 + 50 }));

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="在线车辆"
          value="156"
          subtitle="总计 192 辆"
          icon={Car}
          trend={{ value: 5.2, isPositive: true }}
          variant="cyan"
        />
        <StatCard
          title="今日里程"
          value="12,458"
          subtitle="公里"
          icon={Route}
          trend={{ value: 8.1, isPositive: true }}
          variant="green"
        />
        <StatCard
          title="活跃告警"
          value="12"
          subtitle="需要处理"
          icon={AlertTriangle}
          trend={{ value: 2.3, isPositive: false }}
          variant="orange"
        />
        <StatCard
          title="平均能耗"
          value="8.5"
          subtitle="L/100km"
          icon={Zap}
          trend={{ value: 3.2, isPositive: true }}
          variant="purple"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 tech-card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">今日车辆活动趋势</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-sm text-muted-foreground">活动车辆</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={areaChartData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 30%, 20%)" />
              <XAxis dataKey="name" stroke="hsl(215, 20%, 65%)" fontSize={12} />
              <YAxis stroke="hsl(215, 20%, 65%)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  background: "hsl(220, 30%, 12%)",
                  border: "1px solid hsl(220, 30%, 25%)",
                  borderRadius: "8px",
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="hsl(199, 89%, 48%)"
                strokeWidth={3}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="tech-card">
          <h3 className="text-lg font-semibold mb-6">车辆状态分布</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
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
          <div className="flex justify-center gap-6 mt-4">
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm text-muted-foreground">{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Alerts */}
        <div className="tech-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">最新告警</h3>
            <button className="text-sm text-primary hover:underline">查看全部</button>
          </div>
          <div className="space-y-3">
            {recentAlerts.map((alert, index) => (
              <AlertCard key={index} {...alert} />
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="tech-card">
              <div className="flex items-center gap-3 mb-3">
                <Activity className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">实时速度分布</span>
              </div>
              <MiniChart data={miniChartData} color="hsl(199, 89%, 48%)" />
            </div>
            <div className="tech-card">
              <div className="flex items-center gap-3 mb-3">
                <TrendingUp className="w-5 h-5 text-tech-green" />
                <span className="text-sm text-muted-foreground">里程趋势</span>
              </div>
              <MiniChart data={miniChartData} color="hsl(160, 84%, 45%)" />
            </div>
          </div>

          {/* Top Vehicle */}
          <div className="tech-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">重点监控车辆</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                实时更新
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {topVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.plateNumber} {...vehicle} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
