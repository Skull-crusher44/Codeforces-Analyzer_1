import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { User, MapPin, Star, TrendingUp } from 'lucide-react';

export default function UserInfo({ userInfo, username }) {
  const name = `${userInfo.firstName || ''} ${userInfo.lastName || ''}`.trim();
  const country = userInfo.country || 'Not specified';
  const rating = userInfo.rating || 0;
  const rank = userInfo.rank || 'Unrated';
  const maxRating = userInfo.maxRating || 0;
  const maxRank = userInfo.maxRank || 'Unrated';
  const contribution = userInfo.contribution || 0;

  const getRankColor = (rank) => {
    if (rank.includes('legendary')) return 'text-red-600';
    if (rank.includes('international grandmaster')) return 'text-red-500';
    if (rank.includes('grandmaster')) return 'text-red-400';
    if (rank.includes('international master')) return 'text-orange-500';
    if (rank.includes('master')) return 'text-orange-400';
    if (rank.includes('candidate master')) return 'text-purple-500';
    if (rank.includes('expert')) return 'text-blue-500';
    if (rank.includes('specialist')) return 'text-cyan-500';
    if (rank.includes('pupil')) return 'text-green-500';
    if (rank.includes('newbie')) return 'text-gray-500';
    return 'text-gray-400';
  };

  const getContributionColor = (contribution) => {
    if (contribution > 0) return 'text-green-600';
    if (contribution < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-full">
            <User className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg">{username}</CardTitle>
            <CardDescription>User Profile Information</CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Name */}
        <div className="flex items-center justify-between py-2 border-b border-border/50">
          <span className="text-sm font-medium text-muted-foreground">Name</span>
          <span className="text-sm font-medium">{name || 'Not available'}</span>
        </div>

        {/* Country */}
        <div className="flex items-center justify-between py-2 border-b border-border/50">
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Country</span>
          </div>
          <span className="text-sm font-medium">{country}</span>
        </div>

        {/* Current Rating */}
        <div className="flex items-center justify-between py-2 border-b border-border/50">
          <div className="flex items-center space-x-2">
            <Star className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Rating</span>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold">{rating}</div>
            <Badge variant="outline" className={`text-xs ${getRankColor(rank)}`}>
              {rank}
            </Badge>
          </div>
        </div>

        {/* Max Rating */}
        <div className="flex items-center justify-between py-2 border-b border-border/50">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Max Rating</span>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold">{maxRating}</div>
            <Badge variant="outline" className={`text-xs ${getRankColor(maxRank)}`}>
              {maxRank}
            </Badge>
          </div>
        </div>

        {/* Contribution */}
        <div className="flex items-center justify-between py-2">
          <span className="text-sm font-medium text-muted-foreground">Contribution</span>
          <Badge 
            variant={contribution > 0 ? "default" : contribution < 0 ? "destructive" : "secondary"}
            className="text-sm"
          >
            {contribution > 0 ? '+' : ''}{contribution}
          </Badge>
        </div>

        {/* Rating Insight */}
        {rating > 0 && (
          <div className="mt-4 p-3 bg-primary/5 rounded-lg">
            <p className="text-xs text-muted-foreground">
              💡 <span className="font-medium">Rating Progress:</span> 
              {maxRating > rating 
                ? ` Peak rating was ${maxRating - rating} points higher`
                : ' Currently at peak rating!'
              }
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
