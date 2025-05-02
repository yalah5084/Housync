
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Medal } from 'lucide-react';

interface PremiumFeaturesProps {
  totalEarned: number;
  unlockFeature: (feature: string, cost: number) => Promise<boolean>;
}

const PremiumFeatures = ({ totalEarned, unlockFeature }: PremiumFeaturesProps) => {
  if (totalEarned < 10) {
    return (
      <div className="mb-4 p-2 bg-gray-50 rounded-md">
        <p className="text-xs text-gray-500 font-medium">
          Keep chatting to earn more tokens! You'll unlock premium features at 10 tokens.
          <span className="block mt-1">Current tokens: {totalEarned}</span>
        </p>
      </div>
    );
  }

  return (
    <div className="mb-4 space-y-2">
      <p className="text-xs text-gray-500 font-medium">Unlock premium features with your tokens:</p>
      <div className="flex gap-2 flex-wrap">
        <Button
          size="sm"
          variant="outline"
          className="text-xs border-match-primary text-match-primary hover:bg-match-primary/10"
          onClick={() => unlockFeature('Schedule Visit', 10)}
        >
          <Calendar className="h-3 w-3 mr-1" />
          Schedule Visit (10 tokens)
        </Button>
        
        {totalEarned >= 20 && (
          <Button
            size="sm"
            variant="outline"
            className="text-xs border-match-primary text-match-primary hover:bg-match-primary/10"
            onClick={() => unlockFeature('Priority Match', 20)}
          >
            <Medal className="h-3 w-3 mr-1" />
            Priority Match (20 tokens)
          </Button>
        )}
      </div>
    </div>
  );
};

export default PremiumFeatures;
