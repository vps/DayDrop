import { Share, Plus } from "lucide-react";

export default function PWAPrompt() {
  return (
    <div className="w-full max-w-sm mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-ios-card-bg rounded-2xl p-5 shadow-lg border border-ios-gray-200 backdrop-blur-sm">
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 pwa-icon rounded-xl flex items-center justify-center flex-shrink-0">
            <Plus className="w-6 h-6 text-white" strokeWidth={2.5} />
          </div>
          <div className="flex-1 pt-0.5">
            <h3 className="font-semibold text-ios-text text-base mb-2.5 leading-tight">Add to Home Screen</h3>
            <p className="text-sm text-ios-gray-500 leading-relaxed">
              Tap the share button <Share className="inline w-4 h-4 mx-0.5" strokeWidth={2} /> and select "Add to Home Screen" for quick access.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
