import { useState } from "react";
import CountdownWidget from "@/components/countdown-widget";
import DatePickerModal from "@/components/date-picker-modal";
import SettingsModal from "@/components/settings-modal";
import CompletionDisplay from "@/components/completion-display";
import PWAPrompt from "@/components/pwa-prompt";
import { useCountdown } from "@/hooks/use-countdown";

export default function Home() {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  
  const {
    targetDate,
    timeRemaining,
    daysRemaining,
    isComplete,
    setTargetDate,
    resetCountdown
  } = useCountdown();

  const handleSetNewDate = (date: Date) => {
    setTargetDate(date);
    setIsDatePickerOpen(false);
  };

  const handleStartNewCountdown = () => {
    resetCountdown();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-ios-bg">
      <div className="w-full max-w-sm space-y-8">
        <CountdownWidget
          targetDate={targetDate}
          timeRemaining={timeRemaining}
          onSetNewDate={() => setIsDatePickerOpen(true)}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onReset={resetCountdown}
        />
        
        <PWAPrompt />
      </div>

      <DatePickerModal
        isOpen={isDatePickerOpen}
        onClose={() => setIsDatePickerOpen(false)}
        onSave={handleSetNewDate}
        currentDate={targetDate}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        notificationsEnabled={notificationsEnabled}
        onToggleNotifications={() => setNotificationsEnabled(!notificationsEnabled)}
      />

      <CompletionDisplay
        isVisible={isComplete}
        onStartNew={handleStartNewCountdown}
      />
    </div>
  );
}
