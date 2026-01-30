import { useState } from "react";
import { Car, Search, Filter, Plus, MoreVertical, Edit, Trash2, Eye } from "lucide-react";

const fleetData = [
  { id: 1, plateNumber: "京A·12345", model: "特斯拉 Model Y", driver: "张三", phone: "138****1234", status: "online", mileage: 45678, lastMaintenance: "2024-01-15", group: "北京车队" },
  { id: 2, plateNumber: "京B·67890", model: "比亚迪 汉", driver: "李四", phone: "139****5678", status: "warning", mileage: 32456, lastMaintenance: "2024-02-20", group: "北京车队" },
  { id: 3, plateNumber: "京C·11111", model: "蔚来 ES6", driver: "王五", phone: "137****9012", status: "online", mileage: 28934, lastMaintenance: "2024-03-10", group: "天津车队" },
  { id: 4, plateNumber: "京D·22222", model: "小鹏 P7", driver: "赵六", phone: "136****3456", status: "offline", mileage: 51234, lastMaintenance: "2024-01-28", group: "天津车队" },
  { id: 5, plateNumber: "京E·33333", model: "理想 L9", driver: "钱七", phone: "135****7890", status: "online", mileage: 18765, lastMaintenance: "2024-03-05", group: "上海车队" },
  { id: 6, plateNumber: "京F·44444", model: "问界 M7", driver: "孙八", phone: "134****1234", status: "online", mileage: 42156, lastMaintenance: "2024-02-15", group: "上海车队" },
  { id: 7, plateNumber: "京G·55555", model: "极氪 001", driver: "周九", phone: "133****5678", status: "online", mileage: 35678, lastMaintenance: "2024-03-18", group: "广州车队" },
  { id: 8, plateNumber: "京H·66666", model: "智己 L7", driver: "吴十", phone: "132****9012", status: "warning", mileage: 29876, lastMaintenance: "2024-02-28", group: "广州车队" },
];

const statusConfig = {
  online: { label: "在线", class: "bg-tech-green text-background" },
  offline: { label: "离线", class: "bg-muted text-muted-foreground" },
  warning: { label: "告警", class: "bg-tech-orange text-background" },
};

export default function Fleet() {
  const [selectedGroup, setSelectedGroup] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const groups = ["all", "北京车队", "天津车队", "上海车队", "广州车队"];

  const filteredData = fleetData.filter(vehicle => {
    const matchesGroup = selectedGroup === "all" || vehicle.group === selectedGroup;
    const matchesSearch = vehicle.plateNumber.includes(searchQuery) || 
                          vehicle.driver.includes(searchQuery) ||
                          vehicle.model.includes(searchQuery);
    return matchesGroup && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">车队管理</h2>
          <p className="text-muted-foreground">管理所有车辆和司机信息</p>
        </div>
        <button className="tech-button flex items-center gap-2">
          <Plus className="w-5 h-5" />
          添加车辆
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "总车辆数", value: "192", icon: Car, color: "text-primary" },
          { label: "在线车辆", value: "156", icon: Car, color: "text-tech-green" },
          { label: "离线车辆", value: "24", icon: Car, color: "text-muted-foreground" },
          { label: "告警车辆", value: "12", icon: Car, color: "text-tech-orange" },
        ].map((stat, index) => (
          <div key={index} className="tech-card flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-transparent flex items-center justify-center`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
        {/* Group Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
          {groups.map((group) => (
            <button
              key={group}
              onClick={() => setSelectedGroup(group)}
              className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${
                selectedGroup === group
                  ? "bg-primary text-primary-foreground"
                  : "bg-card hover:bg-secondary"
              }`}
            >
              {group === "all" ? "全部" : group}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="搜索车牌、司机、车型..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-card border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
          />
        </div>

        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border hover:border-primary transition-all">
          <Filter className="w-4 h-4" />
          筛选
        </button>
      </div>

      {/* Table */}
      <div className="tech-card !p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">车牌号</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">车型</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">驾驶员</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">联系电话</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">状态</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">总里程</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">车队</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((vehicle, index) => {
                const status = statusConfig[vehicle.status];
                return (
                  <tr 
                    key={vehicle.id} 
                    className="border-b border-border/50 hover:bg-secondary/30 transition-colors animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <td className="py-4 px-6">
                      <span className="font-medium text-primary">{vehicle.plateNumber}</span>
                    </td>
                    <td className="py-4 px-6 text-sm">{vehicle.model}</td>
                    <td className="py-4 px-6 text-sm">{vehicle.driver}</td>
                    <td className="py-4 px-6 text-sm text-muted-foreground">{vehicle.phone}</td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${status.class}`}>
                        {status.label}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm">{vehicle.mileage.toLocaleString()} km</td>
                    <td className="py-4 px-6 text-sm">{vehicle.group}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                          <Eye className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                          <Edit className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            显示 {filteredData.length} 条记录，共 {fleetData.length} 条
          </p>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 text-sm transition-colors">
              上一页
            </button>
            <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm">
              1
            </button>
            <button className="px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 text-sm transition-colors">
              2
            </button>
            <button className="px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 text-sm transition-colors">
              下一页
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
