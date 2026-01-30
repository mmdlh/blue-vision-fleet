import { useState } from "react";
import { Settings as SettingsIcon, User, Bell, Shield, Database, Globe, Palette, Save } from "lucide-react";

const settingsSections = [
  { id: "profile", label: "个人设置", icon: User },
  { id: "notifications", label: "通知设置", icon: Bell },
  { id: "security", label: "安全设置", icon: Shield },
  { id: "system", label: "系统配置", icon: Database },
  { id: "appearance", label: "外观设置", icon: Palette },
  { id: "integration", label: "接口管理", icon: Globe },
];

export default function Settings() {
  const [activeSection, setActiveSection] = useState("profile");

  return (
    <div className="flex gap-6 animate-fade-in">
      {/* Sidebar */}
      <div className="w-64 space-y-2">
        {settingsSections.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{section.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="flex-1 tech-card">
        {activeSection === "profile" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">个人设置</h3>
              <p className="text-muted-foreground">管理您的账户信息和偏好</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">用户名</label>
                <input
                  type="text"
                  defaultValue="admin"
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">邮箱</label>
                <input
                  type="email"
                  defaultValue="admin@vehicle-monitor.com"
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">手机号</label>
                <input
                  type="tel"
                  defaultValue="138****1234"
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">部门</label>
                <input
                  type="text"
                  defaultValue="运营部"
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                />
              </div>
            </div>

            <button className="tech-button flex items-center gap-2">
              <Save className="w-5 h-5" />
              保存更改
            </button>
          </div>
        )}

        {activeSection === "notifications" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">通知设置</h3>
              <p className="text-muted-foreground">配置告警和消息通知方式</p>
            </div>

            <div className="space-y-4">
              {[
                { label: "超速告警", description: "车辆超过限速时通知", enabled: true },
                { label: "疲劳驾驶", description: "检测到疲劳驾驶时通知", enabled: true },
                { label: "电子围栏", description: "车辆进出围栏区域时通知", enabled: false },
                { label: "低油量提醒", description: "油量低于设定值时通知", enabled: true },
                { label: "维保提醒", description: "临近维保日期时通知", enabled: true },
                { label: "系统公告", description: "系统更新和重要公告", enabled: false },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-secondary/30">
                  <div>
                    <p className="font-medium">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <button
                    className={`w-12 h-6 rounded-full transition-all ${
                      item.enabled ? "bg-primary" : "bg-muted"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white transition-all ${
                        item.enabled ? "translate-x-6" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === "security" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">安全设置</h3>
              <p className="text-muted-foreground">管理账户安全和权限</p>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-secondary/30">
                <h4 className="font-medium mb-2">修改密码</h4>
                <div className="space-y-3">
                  <input
                    type="password"
                    placeholder="当前密码"
                    className="w-full px-4 py-3 rounded-lg bg-card border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                  />
                  <input
                    type="password"
                    placeholder="新密码"
                    className="w-full px-4 py-3 rounded-lg bg-card border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                  />
                  <input
                    type="password"
                    placeholder="确认新密码"
                    className="w-full px-4 py-3 rounded-lg bg-card border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-secondary/30">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">双因素认证</h4>
                    <p className="text-sm text-muted-foreground">启用后登录需要验证码</p>
                  </div>
                  <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm">
                    启用
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-secondary/30">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">登录记录</h4>
                    <p className="text-sm text-muted-foreground">查看最近的登录活动</p>
                  </div>
                  <button className="px-4 py-2 rounded-lg bg-card border border-border hover:border-primary text-sm transition-all">
                    查看
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === "system" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">系统配置</h3>
              <p className="text-muted-foreground">配置系统运行参数</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-secondary/30 space-y-3">
                <h4 className="font-medium">数据刷新频率</h4>
                <select className="w-full px-4 py-3 rounded-lg bg-card border border-border focus:border-primary focus:outline-none">
                  <option>5秒</option>
                  <option>10秒</option>
                  <option>30秒</option>
                  <option>1分钟</option>
                </select>
              </div>
              <div className="p-4 rounded-xl bg-secondary/30 space-y-3">
                <h4 className="font-medium">超速阈值</h4>
                <input
                  type="number"
                  defaultValue="120"
                  className="w-full px-4 py-3 rounded-lg bg-card border border-border focus:border-primary focus:outline-none"
                />
              </div>
              <div className="p-4 rounded-xl bg-secondary/30 space-y-3">
                <h4 className="font-medium">低油量阈值</h4>
                <input
                  type="number"
                  defaultValue="20"
                  className="w-full px-4 py-3 rounded-lg bg-card border border-border focus:border-primary focus:outline-none"
                />
              </div>
              <div className="p-4 rounded-xl bg-secondary/30 space-y-3">
                <h4 className="font-medium">数据保留天数</h4>
                <input
                  type="number"
                  defaultValue="90"
                  className="w-full px-4 py-3 rounded-lg bg-card border border-border focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            <button className="tech-button flex items-center gap-2">
              <Save className="w-5 h-5" />
              保存配置
            </button>
          </div>
        )}

        {activeSection === "appearance" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">外观设置</h3>
              <p className="text-muted-foreground">自定义界面外观</p>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-secondary/30">
                <h4 className="font-medium mb-4">主题色</h4>
                <div className="flex gap-4">
                  {[
                    "hsl(199, 89%, 48%)",
                    "hsl(160, 84%, 45%)",
                    "hsl(260, 80%, 60%)",
                    "hsl(330, 80%, 60%)",
                  ].map((color, index) => (
                    <button
                      key={index}
                      className={`w-10 h-10 rounded-xl ${index === 0 ? "ring-2 ring-offset-2 ring-offset-background ring-primary" : ""}`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-secondary/30">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">动画效果</h4>
                    <p className="text-sm text-muted-foreground">启用界面动画和过渡效果</p>
                  </div>
                  <button className="w-12 h-6 rounded-full bg-primary">
                    <div className="w-5 h-5 rounded-full bg-white translate-x-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === "integration" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">接口管理</h3>
              <p className="text-muted-foreground">管理第三方集成和API</p>
            </div>

            <div className="space-y-4">
              {[
                { name: "GPS定位服务", status: "已连接", provider: "高德地图" },
                { name: "短信通知", status: "已连接", provider: "阿里云" },
                { name: "天气服务", status: "已连接", provider: "和风天气" },
                { name: "ERP系统", status: "未连接", provider: "-" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-secondary/30">
                  <div>
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">服务商: {item.provider}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    item.status === "已连接" 
                      ? "bg-tech-green/20 text-tech-green" 
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
