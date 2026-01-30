import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  MapPin, 
  Bell, 
  BarChart3, 
  Truck, 
  Wrench, 
  Settings,
  FileText,
  Radio
} from "lucide-react";

const navItems = [
  { path: "/", label: "监控总览", icon: LayoutDashboard },
  { path: "/tracking", label: "车辆追踪", icon: MapPin },
  { path: "/alerts", label: "告警中心", icon: Bell },
  { path: "/analytics", label: "数据分析", icon: BarChart3 },
  { path: "/fleet", label: "车队管理", icon: Truck },
  { path: "/maintenance", label: "维保管理", icon: Wrench },
  { path: "/reports", label: "报表中心", icon: FileText },
  { path: "/settings", label: "系统设置", icon: Settings },
];

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const location = useLocation();
  const [time, setTime] = useState(new Date());

  // Update time every second
  useState(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  });

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="relative border-b border-border/50 bg-card/50 backdrop-blur-xl">
        {/* Glow effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent" />
        </div>

        {/* Top bar */}
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center pulse-glow">
              <Radio className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary">
                智能车辆监控管理平台
              </h1>
              <p className="text-sm text-muted-foreground">Intelligent Vehicle Monitoring System</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="status-online" />
              <span className="text-sm text-muted-foreground">系统在线</span>
            </div>
            <div className="tech-card !p-3 !rounded-lg">
              <div className="text-lg font-mono text-primary">
                {time.toLocaleTimeString("zh-CN", { hour12: false })}
              </div>
              <div className="text-xs text-muted-foreground">
                {time.toLocaleDateString("zh-CN", { weekday: "long", month: "long", day: "numeric" })}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="container">
          <div className="flex items-center gap-1 overflow-x-auto pb-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-item flex items-center gap-2 whitespace-nowrap ${isActive ? "active" : ""}`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 container py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/30 py-4">
        <div className="container flex items-center justify-between text-sm text-muted-foreground">
          <span>© 2024 智能车辆监控管理平台 - 版权所有</span>
          <div className="flex items-center gap-4">
            <span>版本 v2.0.0</span>
            <span>|</span>
            <span>技术支持: tech@vehicle-monitor.com</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
