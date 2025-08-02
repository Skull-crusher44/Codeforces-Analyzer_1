import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Trophy, TrendingUp, TrendingDown, Calendar, Award } from 'lucide-react';

const VersusUserContest = ({ userContest1, userContest2 }) => {
    let username1 = userContest1.length > 0 ? userContest1[0].handle : '';
    let username2 = userContest2.length > 0 ? userContest2[0].handle : '';
    
    userContest1 = Array.from(userContest1);
    userContest2 = Array.from(userContest2);

    const calculateStats = (contests) => {
        if (contests.length === 0) {
            return {
                bestRank: 'N/A',
                worstRank: 'N/A',
                maxUp: 'N/A',
                maxDown: 'N/A'
            };
        }
        return {
            bestRank: Math.min(...contests.map(item => item.rank)),
            worstRank: Math.max(...contests.map(item => item.rank)),
            maxUp: Math.max(...contests.map(item => item.newRating - item.oldRating)),
            maxDown: Math.min(...contests.map(item => item.newRating - item.oldRating))
        };
    };

    const stats1 = calculateStats(userContest1);
    const stats2 = calculateStats(userContest2);

    const StatCard = ({ user, stats, isFirst = false }) => (
        <div className="space-y-3 sm:space-y-4">
            {/* Header */}
            <div className="text-center space-y-1 sm:space-y-2">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Trophy className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-foreground truncate">{user}</h3>
                <p className="text-xs text-muted-foreground">Contest Statistics</p>
            </div>

            {/* Stats Grid */}
            <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-1 sm:gap-2">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs font-medium">Contests</span>
                    </div>
                    <Badge variant="secondary" className="text-xs px-1 py-0 h-4 font-bold">
                        {isFirst ? userContest1.length : userContest2.length}
                    </Badge>
                </div>

                <div className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-1 sm:gap-2">
                        <Trophy className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs font-medium">Best Rank</span>
                    </div>
                    <Badge variant="default" className="text-xs px-1 py-0 h-4 font-bold">
                        #{stats.bestRank}
                    </Badge>
                </div>

                <div className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-1 sm:gap-2">
                        <Award className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs font-medium">Worst</span>
                    </div>
                    <Badge variant="outline" className="text-xs px-1 py-0 h-4">
                        #{stats.worstRank}
                    </Badge>
                </div>

                <div className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-1 sm:gap-2">
                        <TrendingUp className="h-3 w-3 text-green-600" />
                        <span className="text-xs font-medium">Max Up</span>
                    </div>
                    <Badge variant="default" className="text-xs px-1 py-0 h-4 font-bold bg-green-100 text-green-800 hover:bg-green-200">
                        +{stats.maxUp}
                    </Badge>
                </div>

                <div className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-1 sm:gap-2">
                        <TrendingDown className="h-3 w-3 text-red-600" />
                        <span className="text-xs font-medium">Max Down</span>
                    </div>
                    <Badge variant="destructive" className="text-xs px-1 py-0 h-4 font-bold">
                        {stats.maxDown}
                    </Badge>
                </div>
            </div>
        </div>
    );

    return (
        <Card className="animate-fade-in">
            <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                    <Trophy className="h-5 w-5 text-primary" />
                    Contest Statistics
                </CardTitle>
                <CardDescription>Performance comparison in contests</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <StatCard user={username1} stats={stats1} isFirst={true} />
                    <StatCard user={username2} stats={stats2} />
                </div>
            </CardContent>
        </Card>
    );
};

export default VersusUserContest;
