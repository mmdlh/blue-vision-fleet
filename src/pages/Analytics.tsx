import { TrendingUp, TrendingDown, BarChart3, PieChart as PieChartIcon, Activity, Calendar } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, Legend } from "recharts";
import { StatCard } from "@/components/cards/StatCard";

const monthlyData = [
  { month: "1月", mileage: 45000, fuel: 3200, alerts: 120 },
  { month: "2月", mileage: 42000, fuel: 2900, alerts: 98 },
  { month: "3月", mileage: 52000, fuel: 3600, alerts: 145 },
  { month: "4月", mileage: 48000, fuel: 3300, alerts: 112 },
  { month: "5月", mileage: 55000, fuel: 3800, alerts: 156 },
  { month: "6月", mileage: 60000, fuel: 4100, alerts: 134 },
];

const fuelByVehicle = [
  { name: "轿车", value: 35, color: "hsl(199, 89%, 48%)" },
  { name: "SUV", value: 28, color: "hsl(187, 100%, 50%)" },
  { name: "货车", value: 22, color: "hsl(260, 80%, 60%)" },
  { name: "客车", value: 15, color: "hsl(160, 84%, 45%)" },
];

const weeklyTrend = [
  { day: "周一", online: 145, offline: 25 },
  { day: "周二", online: 152, offline: 18 },
  { day: "周三", online: 148, offline: 22 },
  { day: "周四", online: 160, offline: 10 },
  { day: "周五", online: 155, offline: 15 },
  { day: "周六", online: 120, offline: 50 },
  { day: "周日", online: 98, offline: 72 },
];

const hourlyActivity = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  value: Math.floor(Math.random() * 100 + 50),
}));

export default function Analytics() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="本月总里程"
          value="324,580"
          subtitle="公里"
          icon={TrendingUp}
          trend={{ value: 12.5, isPositive: true }}
          variant="cyan"
        />
        <StatCard
          title="月均油耗"
          value="8.2"
          subtitle="L/100km"
          icon={Activity}
          trend={{ value: 3.2, isPositive: true }}
          variant="green"
        />
        <StatCard
          title="告警处理率"
          value="94.5%"
          subtitle="已处理/总数"
          icon={BarChart3}
          trend={{ value: 2.1, isPositive: true }}
          variant="purple"
        />
        <StatCard
          title="车辆利用率"
          value="87.3%"
          subtitle="本月平均"
          icon={PieChartIcon}
          trend={{ value: 5.8, isPositive: true }}
          variant="orange"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend */}
        <div className="tech-card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">月度数据趋势</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              2024年上半年
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 30%, 20%)" />
              <XAxis dataKey="month" stroke="hsl(215, 20%, 65%)" fontSize={12} />
              <YAxis stroke="hsl(215, 20%, 65%)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  background: "hsl(220, 30%, 12%)",
                  border: "1px solid hsl(220, 30%, 25%)",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="mileage" 
                name="里程(km)" 
                stroke="hsl(199, 89%, 48%)" 
                strokeWidth={2}
                dot={{ fill: "hsl(199, 89%, 48%)" }}
              />
              <Line 
                type="monotone" 
                dataKey="fuel" 
                name="油耗(L)" 
                stroke="hsl(160, 84%, 45%)" 
                strokeWidth={2}
                dot={{ fill: "hsl(160, 84%, 45%)" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Fuel Distribution */}
        <div className="tech-card">
          <h3 className="text-lg font-semibold mb-6">车型油耗分布</h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={fuelByVehicle}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  innerRadius={60}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={{ stroke: "hsl(215, 20%, 65%)" }}
                >
                  {fuelByVehicle.map((entry, index) => (
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
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Vehicle Status */}
        <div className="lg:col-span-2 tech-card">
          <h3 className="text-lg font-semibold mb-6">周车辆在线状态</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={weeklyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 30%, 20%)" />
              <XAxis dataKey="day" stroke="hsl(215, 20%, 65%)" fontSize={12} />
              <YAxis stroke="hsl(215, 20%, 65%)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  background: "hsl(220, 30%, 12%)",
                  border: "1px solid hsl(220, 30%, 25%)",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar dataKey="online" name="在线" fill="hsl(160, 84%, 45%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="offline" name="离线" fill="hsl(220, 30%, 30%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 24h Activity */}
        <div className="tech-card">
          <h3 className="text-lg font-semibold mb-6">24小时活动热力</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={hourlyActivity}>
              <defs>
                <linearGradient id="activityGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(260, 80%, 60%)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="hsl(260, 80%, 60%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="hour" 
                stroke="hsl(215, 20%, 65%)" 
                fontSize={10}
                interval={5}
              />
              <YAxis stroke="hsl(215, 20%, 65%)" fontSize={10} />
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
                stroke="hsl(260, 80%, 60%)"
                strokeWidth={2}
                fill="url(#activityGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "平均日行驶", value: "156.8 km", change: "+8.2%" },
          { label: "平均车速", value: "45.3 km/h", change: "+2.1%" },
          { label: "违章次数", value: "23 次", change: "-15.3%" },
          { label: "事故率", value: "0.02%", change: "-0.5%" },
        ].map((metric, index) => (
          <div key={index} className="tech-card text-center">
            <p className="text-sm text-muted-foreground mb-2">{metric.label}</p>
            <p className="text-2xl font-bold text-primary mb-1">{metric.value}</p>
            <p className={`text-sm ${metric.change.startsWith("+") ? "text-tech-green" : metric.change.startsWith("-") ? "text-destructive" : "text-muted-foreground"}`}>
              {metric.change}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
