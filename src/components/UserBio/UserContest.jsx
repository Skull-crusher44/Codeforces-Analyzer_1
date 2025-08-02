import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Trophy, TrendingUp, TrendingDown, Target, Calendar } from 'lucide-react';

export default function UserContest({ userContest, username }) {
  const contestArray = Array.from(userContest);
  
  if (contestArray.length === 0) {
    return (
      <Card className="h-full">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-secondary/10 rounded-full">
              <Trophy className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Contest Statistics</CardTitle>
              <CardDescription>Contest participation data</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">No contest data available</p>
        </CardContent>
      </Card>
    );
  }

  const bestRank = Math.min(...contestArray.map(item => item.rank));
  const worstRank = Math.max(...contestArray.map(item => item.rank));
  const maxUp = Math.max(...contestArray.map(item => item.newRating - item.oldRating));
  const maxDown = Math.min(...contestArray.map(item => item.newRating - item.oldRating));
  const totalContests = contestArray.length;

  const getPerformanceColor = (value, type) => {
    if (type === 'up') return 'text-green-600 bg-green-50';
    if (type === 'down') return 'text-red-600 bg-red-50';
    return 'text-blue-600 bg-blue-50';
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-secondary/10 rounded-full">
            <Trophy className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg">Contest Statistics</CardTitle>
            <CardDescription>Performance in {totalContests} contests</CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Total Contests */}
        <div className="flex items-center justify-between py-2 border-b border-border/50">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Contests</span>
          </div>
          <Badge variant="outline" className="text-sm font-bold">
            {totalContests}
          </Badge>
        </div>

        {/* Best Rank */}
        <div className="flex items-center justify-between py-2 border-b border-border/50">
          <div className="flex items-center space-x-2">
            <Target className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Best Rank</span>
          </div>
          <Badge variant="outline" className="text-sm font-bold text-green-600">
            #{bestRank}
          </Badge>
        </div>

        {/* Worst Rank */}
        <div className="flex items-center justify-between py-2 border-b border-border/50">
          <span className="text-sm font-medium text-muted-foreground">Worst Rank</span>
          <Badge variant="outline" className="text-sm font-bold text-orange-600">
            #{worstRank}
          </Badge>
        </div>

        {/* Max Rating Increase */}
        <div className="flex items-center justify-between py-2 border-b border-border/50">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-muted-foreground">Max Increase</span>
          </div>
          <Badge className="text-sm font-bold bg-green-100 text-green-700 hover:bg-green-100">
            +{maxUp}
          </Badge>
        </div>

        {/* Max Rating Decrease */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-2">
            <TrendingDown className="h-4 w-4 text-red-600" />
            <span className="text-sm font-medium text-muted-foreground">Max Decrease</span>
          </div>
          <Badge variant="destructive" className="text-sm font-bold">
            {maxDown}
          </Badge>
        </div>

        {/* Performance Insights */}
        <div className="mt-4 p-3 bg-secondary/5 rounded-lg">
          <p className="text-xs text-muted-foreground">
            💡 <span className="font-medium">Performance Insights:</span>
          </p>
          <ul className="text-xs text-muted-foreground mt-1 space-y-1">
            <li>• Rank range: #{bestRank} - #{worstRank}</li>
            <li>• Rating volatility: {maxUp - maxDown} points</li>
            <li>• Average contests help improve consistency</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
