import { useState, useEffect } from "react";
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
  Radio,
  Wifi,
  Signal
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

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="relative border-b border-border/50 bg-gradient-to-b from-card/80 to-background backdrop-blur-xl">
        {/* Top glow effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[60px] bg-gradient-to-b from-primary/20 to-transparent blur-xl" />
        </div>

        {/* Main header content */}
        <div className="container py-6">
          <div className="flex items-center justify-between">
            {/* Left decoration */}
            <div className="flex items-center gap-4 flex-1">
              <div className="flex items-center gap-3">
                <div className="tech-card !p-3 !rounded-lg">
                  <div className="text-lg font-mono text-primary">
                    {time.toLocaleTimeString("zh-CN", { hour12: false })}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {time.toLocaleDateString("zh-CN", { month: "short", day: "numeric" })}
                  </div>
                </div>
                <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-tech-green/10 border border-tech-green/30">
                  <span className="status-online" />
                  <span className="text-sm text-tech-green font-medium">系统在线</span>
                </div>
              </div>
              
              {/* Left decorative line */}
              <div className="hidden lg:flex flex-1 items-center gap-2">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-border to-primary/50" />
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-primary/30 animate-pulse" />
                  <div className="w-2 h-2 rounded-full bg-primary/50 animate-pulse" style={{ animationDelay: "0.2s" }} />
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: "0.4s" }} />
                </div>
              </div>
            </div>

            {/* Center - Logo & Title */}
            <div className="flex flex-col items-center px-8">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full" />
                  <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-primary via-tech-cyan to-primary flex items-center justify-center pulse-glow rotate-3 hover:rotate-0 transition-transform">
                    <Radio className="w-7 h-7 text-primary-foreground" />
                  </div>
                </div>
                <div className="text-center">
                  <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-tech-cyan to-primary animate-gradient">
                    智能车辆监控管理平台
                  </h1>
                  <p className="text-sm text-muted-foreground tracking-widest">INTELLIGENT VEHICLE MONITORING SYSTEM</p>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-tech-cyan/30 blur-xl rounded-full" />
                  <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-tech-cyan via-primary to-tech-cyan flex items-center justify-center pulse-glow -rotate-3 hover:rotate-0 transition-transform">
                    <Signal className="w-7 h-7 text-primary-foreground" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right decoration */}
            <div className="flex items-center gap-4 flex-1 justify-end">
              {/* Right decorative line */}
              <div className="hidden lg:flex flex-1 items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-tech-cyan animate-pulse" />
                  <div className="w-2 h-2 rounded-full bg-tech-cyan/50 animate-pulse" style={{ animationDelay: "0.2s" }} />
                  <div className="w-2 h-2 rounded-full bg-tech-cyan/30 animate-pulse" style={{ animationDelay: "0.4s" }} />
                </div>
                <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-border to-tech-cyan/50" />
              </div>
              
              <div className="flex items-center gap-3">
                <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/30">
                  <Wifi className="w-4 h-4 text-primary" />
                  <span className="text-sm text-primary font-medium">192 设备</span>
                </div>
                <div className="tech-card !p-3 !rounded-lg text-center">
                  <div className="text-lg font-bold text-tech-cyan">156</div>
                  <div className="text-xs text-muted-foreground">在线车辆</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="container pb-2">
          <div className="flex items-center justify-center gap-1 overflow-x-auto py-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-item flex items-center gap-2 whitespace-nowrap rounded-lg ${isActive ? "active bg-primary/10" : "hover:bg-secondary/50"}`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-primary" : ""}`} />
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
      <footer className="border-t border-border/50 bg-gradient-to-t from-card/50 to-transparent py-4">
        <div className="container flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-tech-green animate-pulse" />
            <span>© 2024 智能车辆监控管理平台</span>
          </div>
          <div className="flex items-center gap-4">
            <span>版本 v2.0.0</span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span>技术支持: tech@vehicle-monitor.com</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
