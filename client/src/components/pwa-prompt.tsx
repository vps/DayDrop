import { Share, Plus } from "lucide-react";

export default function PWAPrompt() {
  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-200">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-ios-blue rounded-lg flex items-center justify-center flex-shrink-0">
            <Plus className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-ios-text text-sm mb-1">Add to Home Screen</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Tap the share button <Share className="inline w-3 h-3" /> and select "Add to Home Screen" for quick access.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
