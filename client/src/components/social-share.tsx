import { Twitter, Facebook, Linkedin, MessageCircle, Send, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
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
        <h3 className="text-sm font-semibold text-ios-text mb-3">Share Countdown</h3>
        
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={shareLinks.twitter}
            className="flex flex-col items-center p-3 hover:bg-ios-gray-100 dark:hover:bg-ios-gray-200"
          >
            <Twitter className="w-5 h-5 mb-1 text-ios-blue" />
            <span className="text-xs text-ios-gray-600">Twitter</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={shareLinks.facebook}
            className="flex flex-col items-center p-3 hover:bg-ios-gray-100 dark:hover:bg-ios-gray-200"
          >
            <Facebook className="w-5 h-5 mb-1 text-ios-blue" />
            <span className="text-xs text-ios-gray-600">Facebook</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={shareLinks.linkedin}
            className="flex flex-col items-center p-3 hover:bg-ios-gray-100 dark:hover:bg-ios-gray-200"
          >
            <Linkedin className="w-5 h-5 mb-1 text-ios-blue" />
            <span className="text-xs text-ios-gray-600">LinkedIn</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={shareLinks.whatsapp}
            className="flex flex-col items-center p-3 hover:bg-ios-gray-100 dark:hover:bg-ios-gray-200"
          >
            <MessageCircle className="w-5 h-5 mb-1 text-ios-green" />
            <span className="text-xs text-ios-gray-600">WhatsApp</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={shareLinks.telegram}
            className="flex flex-col items-center p-3 hover:bg-ios-gray-100 dark:hover:bg-ios-gray-200"
          >
            <Send className="w-5 h-5 mb-1 text-ios-blue" />
            <span className="text-xs text-ios-gray-600">Telegram</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={shareLinks.email}
            className="flex flex-col items-center p-3 hover:bg-ios-gray-100 dark:hover:bg-ios-gray-200"
          >
            <Mail className="w-5 h-5 mb-1 text-ios-gray-600" />
            <span className="text-xs text-ios-gray-600">Email</span>
          </Button>
        </div>
      </div>
    </div>
  );
}