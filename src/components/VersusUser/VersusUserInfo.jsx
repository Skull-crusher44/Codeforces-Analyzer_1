import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { User, MapPin, TrendingUp, Star, Award } from 'lucide-react';

const VersusUserInfo = ({ userInfo1, userInfo2 }) => {
    const createUserData = (userInfo) => ({
        username: userInfo.handle,
        name: `${userInfo.firstName || ''} ${userInfo.lastName || ''}`.trim() || 'Not specified',
        country: userInfo.country || 'Not specified',
        rating: userInfo.rating || 'Unrated',
        rank: userInfo.rank || 'Unranked',
        maxRating: userInfo.maxRating || 'No data',
        maxRank: userInfo.maxRank || 'No data',
        contribution: userInfo.contribution || 0
    });

    const user1 = createUserData(userInfo1);
    const user2 = createUserData(userInfo2);

    const UserCard = ({ user, isFirst = false }) => (
        <div className="space-y-3 sm:space-y-4">
            {/* Header */}
            <div className="text-center space-y-1 sm:space-y-2">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center mx-auto mb-2">
                    <User className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-foreground truncate">{user.username}</h3>
                <p className="text-xs text-muted-foreground truncate">{user.name}</p>
            </div>

            {/* Stats Grid */}
            <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-1 sm:gap-2">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs font-medium">Country</span>
                    </div>
                    <span className="text-xs text-foreground truncate max-w-16 sm:max-w-20">{user.country}</span>
                </div>

                <div className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-1 sm:gap-2">
                        <TrendingUp className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs font-medium">Rating</span>
                    </div>
                    <div className="text-right">
                        <div className="text-xs font-bold text-foreground">{user.rating}</div>
                        <Badge variant="secondary" className="text-xs px-1 py-0 h-4">
                            {user.rank}
                        </Badge>
                    </div>
                </div>

                <div className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-1 sm:gap-2">
                        <Star className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs font-medium">Max</span>
                    </div>
                    <div className="text-right">
                        <div className="text-xs font-bold text-foreground">{user.maxRating}</div>
                        <Badge variant="outline" className="text-xs px-1 py-0 h-4">
                            {user.maxRank}
                        </Badge>
                    </div>
                </div>

                <div className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-1 sm:gap-2">
                        <Award className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs font-medium">Contrib</span>
                    </div>
                    <Badge variant={user.contribution >= 0 ? "default" : "destructive"} className="text-xs px-1 py-0 h-4">
                        {user.contribution >= 0 ? '+' : ''}{user.contribution}
                    </Badge>
                </div>
            </div>
        </div>
    );

    return (
        <Card className="animate-fade-in">
            <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    User Comparison
                </CardTitle>
                <CardDescription>Head-to-head user statistics</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <UserCard user={user1} isFirst={true} />
                    <UserCard user={user2} />
                </div>
            </CardContent>
        </Card>
    );
};

export default VersusUserInfo;
