import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addDays, format } from "date-fns";

interface DatePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (date: Date) => void;
  currentDate: Date | null;
}

export default function DatePickerModal({
  isOpen,
  onClose,
  onSave,
  currentDate
}: DatePickerModalProps) {
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    if (isOpen && currentDate) {
      setSelectedDate(format(currentDate, 'yyyy-MM-dd'));
    }
  }, [isOpen, currentDate]);

  const handleSave = () => {
    if (selectedDate) {
      const date = new Date(selectedDate);
      onSave(date);
    }
  };

  const handleQuickSelect = (days: number) => {
    const futureDate = addDays(new Date(), days);
    setSelectedDate(format(futureDate, 'yyyy-MM-dd'));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center p-4 z-50">
      <div className="bg-white rounded-t-3xl w-full max-w-sm animate-in slide-in-from-bottom duration-300">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <button
            onClick={onClose}
            className="text-ios-blue font-medium"
          >
            Cancel
          </button>
          <h3 className="font-semibold text-ios-text">Set Target Date</h3>
          <button
            onClick={handleSave}
            className="text-ios-blue font-semibold"
          >
            Done
          </button>
        </div>
        
        {/* Date Input */}
        <div className="p-6">
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={format(new Date(), 'yyyy-MM-dd')}
            className="w-full p-4 border border-gray-300 rounded-xl text-lg font-medium text-ios-text focus:border-ios-blue focus:outline-none transition-colors"
          />
          
          {/* Quick Options */}
          <div className="mt-4 space-y-2">
            <p className="text-sm text-gray-600 font-medium mb-3">Quick Select:</p>
            <Button
              onClick={() => handleQuickSelect(30)}
              variant="ghost"
              className="w-full justify-start p-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-ios-text font-medium transition-colors"
            >
              30 days from now
            </Button>
            <Button
              onClick={() => handleQuickSelect(90)}
              variant="ghost"
              className="w-full justify-start p-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-ios-text font-medium transition-colors"
            >
              3 months from now
            </Button>
            <Button
              onClick={() => handleQuickSelect(365)}
              variant="ghost"
              className="w-full justify-start p-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-ios-text font-medium transition-colors"
            >
              1 year from now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
