import { FileText, Download, Calendar, Filter, TrendingUp, BarChart3, PieChart, Activity } from "lucide-react";

const reportTemplates = [
  { id: 1, name: "车辆运营日报", description: "每日车辆运营数据汇总报表", icon: Activity, color: "from-primary/20" },
  { id: 2, name: "里程统计月报", description: "月度车辆里程统计分析", icon: TrendingUp, color: "from-tech-cyan/20" },
  { id: 3, name: "油耗分析报表", description: "车队油耗对比分析", icon: BarChart3, color: "from-tech-green/20" },
  { id: 4, name: "告警处理报表", description: "告警事件统计及处理情况", icon: PieChart, color: "from-tech-orange/20" },
];

const recentReports = [
  { name: "2024年3月运营报表", type: "月度报表", date: "2024-03-15", size: "2.4 MB", status: "ready" },
  { name: "Q1季度分析报告", type: "季度报表", date: "2024-03-10", size: "5.8 MB", status: "ready" },
  { name: "车队油耗对比", type: "专项报表", date: "2024-03-08", size: "1.2 MB", status: "ready" },
  { name: "3月第2周周报", type: "周报", date: "2024-03-17", size: "856 KB", status: "generating" },
  { name: "维保支出统计", type: "财务报表", date: "2024-03-05", size: "3.1 MB", status: "ready" },
  { name: "驾驶行为分析", type: "安全报表", date: "2024-03-01", size: "4.5 MB", status: "ready" },
];

export default function Reports() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">报表中心</h2>
          <p className="text-muted-foreground">生成和管理各类运营报表</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border hover:border-primary transition-all">
            <Calendar className="w-4 h-4" />
            选择日期
          </button>
          <button className="tech-button flex items-center gap-2">
            <FileText className="w-5 h-5" />
            生成报表
          </button>
        </div>
      </div>

      {/* Report Templates */}
      <div>
        <h3 className="text-lg font-semibold mb-4">快速生成</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {reportTemplates.map((template) => {
            const Icon = template.icon;
            return (
              <div
                key={template.id}
                className={`tech-card bg-gradient-to-br ${template.color} to-transparent cursor-pointer hover:scale-[1.02] transition-all`}
              >
                <div className="w-12 h-12 rounded-xl bg-card/50 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">{template.name}</h4>
                <p className="text-sm text-muted-foreground">{template.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Reports */}
      <div className="tech-card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">历史报表</h3>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary hover:bg-secondary/80 text-sm transition-all">
              <Filter className="w-4 h-4" />
              筛选
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {recentReports.map((report, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-all animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">{report.name}</h4>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span>{report.type}</span>
                    <span>•</span>
                    <span>{report.date}</span>
                    <span>•</span>
                    <span>{report.size}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {report.status === "generating" ? (
                  <span className="flex items-center gap-2 text-sm text-tech-cyan">
                    <span className="w-2 h-2 rounded-full bg-tech-cyan animate-pulse" />
                    生成中...
                  </span>
                ) : (
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border hover:border-primary hover:text-primary transition-all text-sm">
                    <Download className="w-4 h-4" />
                    下载
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">共 48 份报表</p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 rounded bg-secondary text-sm">上一页</button>
            <button className="px-3 py-1 rounded bg-primary text-primary-foreground text-sm">1</button>
            <button className="px-3 py-1 rounded bg-secondary text-sm">2</button>
            <button className="px-3 py-1 rounded bg-secondary text-sm">3</button>
            <button className="px-3 py-1 rounded bg-secondary text-sm">下一页</button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "本月生成", value: "156", unit: "份" },
          { label: "下载次数", value: "892", unit: "次" },
          { label: "定时报表", value: "12", unit: "个" },
          { label: "存储占用", value: "2.4", unit: "GB" },
        ].map((stat, index) => (
          <div key={index} className="tech-card text-center">
            <p className="text-3xl font-bold text-primary">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label} ({stat.unit})</p>
          </div>
        ))}
      </div>
    </div>
  );
}
