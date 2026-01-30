import { Wrench, Calendar, CheckCircle, Clock, AlertCircle, Plus, ChevronRight } from "lucide-react";

const maintenanceRecords = [
  {
    id: 1,
    vehicle: "京A·12345",
    type: "定期保养",
    status: "completed",
    date: "2024-03-15",
    description: "更换机油、机滤、空滤",
    cost: 580,
    garage: "北京汽修中心",
    technician: "李师傅",
  },
  {
    id: 2,
    vehicle: "京B·67890",
    type: "故障维修",
    status: "in_progress",
    date: "2024-03-18",
    description: "刹车片更换、刹车盘检查",
    cost: 1200,
    garage: "海淀维修站",
    technician: "王师傅",
  },
  {
    id: 3,
    vehicle: "京C·11111",
    type: "定期保养",
    status: "scheduled",
    date: "2024-03-25",
    description: "30000公里大保养",
    cost: 2500,
    garage: "朝阳4S店",
    technician: "待分配",
  },
  {
    id: 4,
    vehicle: "京D·22222",
    type: "轮胎更换",
    status: "completed",
    date: "2024-03-10",
    description: "更换四条轮胎",
    cost: 3200,
    garage: "通州轮胎店",
    technician: "赵师傅",
  },
  {
    id: 5,
    vehicle: "京E·33333",
    type: "故障维修",
    status: "pending",
    date: "2024-03-20",
    description: "空调系统检修",
    cost: 800,
    garage: "待确认",
    technician: "待分配",
  },
];

const upcomingMaintenance = [
  { vehicle: "京F·44444", type: "定期保养", daysLeft: 3, mileage: "即将到期" },
  { vehicle: "京G·55555", type: "年检", daysLeft: 7, mileage: "2024-04-01" },
  { vehicle: "京H·66666", type: "保险续费", daysLeft: 15, mileage: "2024-04-08" },
  { vehicle: "京A·77777", type: "轮胎检查", daysLeft: 20, mileage: "已行驶45000km" },
];

const statusConfig = {
  completed: { label: "已完成", icon: CheckCircle, color: "text-tech-green", bg: "bg-tech-green/10" },
  in_progress: { label: "进行中", icon: Clock, color: "text-tech-cyan", bg: "bg-tech-cyan/10" },
  scheduled: { label: "已预约", icon: Calendar, color: "text-primary", bg: "bg-primary/10" },
  pending: { label: "待处理", icon: AlertCircle, color: "text-tech-orange", bg: "bg-tech-orange/10" },
};

export default function Maintenance() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">维保管理</h2>
          <p className="text-muted-foreground">车辆维护保养记录和计划</p>
        </div>
        <button className="tech-button flex items-center gap-2">
          <Plus className="w-5 h-5" />
          新建维保单
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "本月维保", value: "23", subtitle: "次", color: "from-primary/20" },
          { label: "维保支出", value: "¥45,680", subtitle: "本月", color: "from-tech-cyan/20" },
          { label: "待处理", value: "8", subtitle: "项", color: "from-tech-orange/20" },
          { label: "完成率", value: "92%", subtitle: "本月", color: "from-tech-green/20" },
        ].map((stat, index) => (
          <div key={index} className={`tech-card bg-gradient-to-br ${stat.color} to-transparent`}>
            <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
            <p className="text-3xl font-bold">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.subtitle}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Timeline */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-semibold">维保记录</h3>
          <div className="space-y-4">
            {maintenanceRecords.map((record, index) => {
              const status = statusConfig[record.status as keyof typeof statusConfig];
              const StatusIcon = status.icon;
              return (
                <div 
                  key={record.id} 
                  className="tech-card animate-slide-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    {/* Timeline indicator */}
                    <div className={`w-12 h-12 rounded-xl ${status.bg} flex items-center justify-center flex-shrink-0`}>
                      <StatusIcon className={`w-6 h-6 ${status.color}`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">{record.vehicle} - {record.type}</h4>
                          <p className="text-sm text-muted-foreground">{record.description}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${status.bg} ${status.color}`}>
                          {status.label}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-border/50">
                        <div>
                          <p className="text-xs text-muted-foreground">日期</p>
                          <p className="text-sm font-medium">{record.date}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">费用</p>
                          <p className="text-sm font-medium text-tech-cyan">¥{record.cost}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">维修站</p>
                          <p className="text-sm font-medium">{record.garage}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">技师</p>
                          <p className="text-sm font-medium">{record.technician}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming */}
          <div className="tech-card">
            <h3 className="text-lg font-semibold mb-4">即将到期</h3>
            <div className="space-y-3">
              {upcomingMaintenance.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      item.daysLeft <= 3 ? "bg-destructive/20 text-destructive" :
                      item.daysLeft <= 7 ? "bg-tech-orange/20 text-tech-orange" :
                      "bg-primary/20 text-primary"
                    }`}>
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium">{item.vehicle}</p>
                      <p className="text-xs text-muted-foreground">{item.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${
                      item.daysLeft <= 3 ? "text-destructive" :
                      item.daysLeft <= 7 ? "text-tech-orange" :
                      "text-muted-foreground"
                    }`}>
                      {item.daysLeft}天后
                    </span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="tech-card">
            <h3 className="text-lg font-semibold mb-4">维保统计</h3>
            <div className="space-y-4">
              {[
                { label: "定期保养", count: 45, percentage: 52 },
                { label: "故障维修", count: 18, percentage: 21 },
                { label: "轮胎服务", count: 12, percentage: 14 },
                { label: "其他", count: 11, percentage: 13 },
              ].map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">{item.label}</span>
                    <span className="text-sm text-muted-foreground">{item.count}次 ({item.percentage}%)</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-primary to-tech-cyan transition-all duration-500"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
