import { X, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { usePWA } from "@/hooks/use-pwa";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notificationsEnabled: boolean;
  onToggleNotifications: () => void;
}

export default function SettingsModal({
  isOpen,
  onClose,
  notificationsEnabled,
  onToggleNotifications
}: SettingsModalProps) {
  const { installPrompt, showInstallPrompt } = usePWA();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Settings Header */}
        <div className="bg-ios-blue px-6 py-4 text-center relative">
          <h2 className="text-white text-lg font-semibold">Settings</h2>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white opacity-80 hover:opacity-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Settings Content */}
        <div className="p-6 space-y-4">
          {/* Notification Toggle */}
          <div className="flex items-center justify-between">
            <span className="font-medium text-ios-text">Daily Notifications</span>
            <Switch
              checked={notificationsEnabled}
              onCheckedChange={onToggleNotifications}
            />
          </div>
          
          {/* Add to Home Screen */}
          {installPrompt && (
            <Button
              onClick={showInstallPrompt}
              className="w-full bg-ios-green hover:bg-ios-green/90 text-white py-3 rounded-xl font-semibold"
            >
              Add to Home Screen
            </Button>
          )}
          
          {/* App Info */}
          <div className="text-center text-sm text-gray-500 mt-6">
            <p>Countdown Widget v1.0</p>
            <p>Optimized for iOS</p>
          </div>
        </div>
      </div>
    </div>
  );
}
