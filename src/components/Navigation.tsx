import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  icon: React.ReactNode;
}

const notifications: Notification[] = [
  {
    id: "1",
    title: "Revenue Milestone",
    message: "Monthly revenue exceeded $50K target",
    time: "2 min ago",
    unread: true,
    icon: <DollarSign className="w-4 h-4 text-success" />,
  },
  {
    id: "2",
    title: "Traffic Spike",
    message: "Website traffic increased by 45% today",
    time: "1 hour ago",
    unread: true,
    icon: <TrendingUp className="w-4 h-4 text-chart-1" />,
  },
  {
    id: "3",
    title: "New Users",
    message: "125 new users registered this week",
    time: "3 hours ago",
    unread: false,
    icon: <Users className="w-4 h-4 text-chart-2" />,
  },
  {
    id: "4",
    title: "Report Generated",
    message: "Monthly analytics report is ready",
    time: "1 day ago",
    unread: false,
    icon: <BarChart3 className="w-4 h-4 text-chart-3" />,
  },
];

export const Navigation = () => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <nav className="fixed top-4 left-4 right-4 z-50">
      <div className="bg-background/90 backdrop-blur-xl border border-card-border rounded-2xl shadow-2xl px-6 py-3 w-full">
        <div className="flex justify-between items-center">
          {/* Logo & Brand */}
          <motion.div
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 bg-gradient-to-br from-primary to-chart-1 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-primary-foreground" />
              </div>
              <h1 className="text-lg font-bold text-foreground">ADmyBRAND</h1>
            </div>
          </motion.div>

          {/* Right side actions */}
          <motion.div
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Notifications */}
            <DropdownMenu
              open={notificationsOpen}
              onOpenChange={setNotificationsOpen}
            >
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative glass-hover h-9 w-9 p-0"
                >
                  <Bell className="w-4 h-4" />
                  {unreadCount > 0 && (
                    <motion.span
                      className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    >
                      {unreadCount}
                    </motion.span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-80 glass border-card-border"
              >
                <DropdownMenuLabel className="text-base font-semibold">
                  Notifications
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-96 overflow-y-auto">
                  <AnimatePresence>
                    {notifications.map((notification, index) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <DropdownMenuItem className="p-4 cursor-pointer hover:bg-card-hover">
                          <div className="flex items-start space-x-3 w-full">
                            <div className="flex-shrink-0 mt-1">
                              {notification.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-foreground truncate">
                                  {notification.title}
                                </p>
                                {notification.unread && (
                                  <div className="w-2 h-2 bg-chart-1 rounded-full flex-shrink-0 ml-2" />
                                )}
                              </div>
                              <p className="text-sm text-foreground-muted mt-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-foreground-subtle mt-1">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </DropdownMenuItem>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Profile */}
            <DropdownMenu open={profileOpen} onOpenChange={setProfileOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="glass-hover h-9 w-9 p-0">
                  <div className="w-7 h-7  flex items-center justify-center">
                    <User className="w-3 h-3 text-white" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 glass border-card-border"
              >
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium text-foreground">
                      Alex Johnson
                    </p>
                    <p className="text-xs text-foreground-muted">
                      alex@admybrand.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer hover:bg-card-hover">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-card-hover">
                  <Settings className="w-4 h-4 mr-2" />
                  Account Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer hover:bg-card-hover text-destructive">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </motion.div>
        </div>
      </div>
    </nav>
  );
};
