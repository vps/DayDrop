import { Twitter, Facebook, Linkedin, MessageCircle, Send, Mail } from "lucide-react";
import { TimeRemaining } from "@/lib/countdown-utils";

interface SocialShareProps {
  timeRemaining: TimeRemaining;
}

export default function SocialShare({ timeRemaining }: SocialShareProps) {
  const currentUrl = window.location.href;
  const countdownText = `Hey jaani, ${timeRemaining.days} days, ${timeRemaining.hours} hours, ${timeRemaining.minutes} minutes until forever with you :)`;
  const shortText = `${timeRemaining.days} days until forever`;

  const shareLinks = {
    twitter: () => {
      const text = encodeURIComponent(`${countdownText}\n\nCheck our countdown:`);
      window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(currentUrl)}`, '_blank');
    },
    facebook: () => {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`, '_blank');
    },
    linkedin: () => {
      const text = encodeURIComponent(`Forever Countdown - ${shortText}`);
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}&summary=${text}`, '_blank');
    },
    whatsapp: () => {
      const text = encodeURIComponent(`${countdownText}\n\n${currentUrl}`);
      window.open(`https://wa.me/?text=${text}`, '_blank');
    },
    telegram: () => {
      const text = encodeURIComponent(countdownText);
      window.open(`https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${text}`, '_blank');
    },
    email: () => {
      const subject = encodeURIComponent(`Forever Countdown - ${shortText}`);
      const body = encodeURIComponent(`${countdownText}\n\nView the live countdown: ${currentUrl}`);
      window.location.href = `mailto:?subject=${subject}&body=${body}`;
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="text-center">
        <h3 className="text-sm font-semibold text-ios-text dark:text-white mb-3">Share Countdown</h3>
        
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={shareLinks.twitter}
            className="flex flex-col items-center p-3 rounded-lg transition-colors hover:bg-ios-gray-100 dark:hover:bg-white/5"
          >
            <Twitter className="w-5 h-5 mb-1 text-ios-blue" />
            <span className="text-xs text-ios-gray-600 dark:text-ios-gray-400">Twitter</span>
          </button>
          
          <button
            onClick={shareLinks.facebook}
            className="flex flex-col items-center p-3 rounded-lg transition-colors hover:bg-ios-gray-100 dark:hover:bg-white/5"
          >
            <Facebook className="w-5 h-5 mb-1 text-ios-blue" />
            <span className="text-xs text-ios-gray-600 dark:text-ios-gray-400">Facebook</span>
          </button>
          
          <button
            onClick={shareLinks.linkedin}
            className="flex flex-col items-center p-3 rounded-lg transition-colors hover:bg-ios-gray-100 dark:hover:bg-white/5"
          >
            <Linkedin className="w-5 h-5 mb-1 text-ios-blue" />
            <span className="text-xs text-ios-gray-600 dark:text-ios-gray-400">LinkedIn</span>
          </button>
          
          <button
            onClick={shareLinks.whatsapp}
            className="flex flex-col items-center p-3 rounded-lg transition-colors hover:bg-ios-gray-100 dark:hover:bg-white/5"
          >
            <MessageCircle className="w-5 h-5 mb-1 text-ios-green" />
            <span className="text-xs text-ios-gray-600 dark:text-ios-gray-400">WhatsApp</span>
          </button>
          
          <button
            onClick={shareLinks.telegram}
            className="flex flex-col items-center p-3 rounded-lg transition-colors hover:bg-ios-gray-100 dark:hover:bg-white/5"
          >
            <Send className="w-5 h-5 mb-1 text-ios-blue" />
            <span className="text-xs text-ios-gray-600 dark:text-ios-gray-400">Telegram</span>
          </button>
          
          <button
            onClick={shareLinks.email}
            className="flex flex-col items-center p-3 rounded-lg transition-colors hover:bg-ios-gray-100 dark:hover:bg-white/5"
          >
            <Mail className="w-5 h-5 mb-1 text-ios-gray-600" />
            <span className="text-xs text-ios-gray-600 dark:text-ios-gray-400">Email</span>
          </button>
        </div>
      </div>
    </div>
  );
}