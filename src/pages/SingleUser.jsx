import { useState } from 'react';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Search, User, Trophy, Target, TrendingUp, Loader2 } from 'lucide-react';

import UserInfo from "../components/UserBio/UserInfo";
import UserContest from "../components/UserBio/UserContest";
import ProblemVerdict from "../components/ProblemVerdict/ProblemVerdict";
import ProblemLanguage from "../components/ProblemLanguage/ProblemLanguage";
import RatingGraph from "../components/RatingGraph/RatingGraph";
import ProblemTagsGraph from "../components/ProblemTagsGraph/ProblemTagsGraph";
import ProblemRatingGraph from "../components/ProblemRatingGraph/ProblemRatingGraph";
import ProblemIndexGraph from "../components/ProblemIndexGraph/ProblemIndexGraph";
import Footer from '../components/Footer/Footer';

const SingleUser = () => {
    let lastName;

    const [currname, setCurrname] = useState('');
    const [username, setUsername] = useState('');
    const [userInfo, setUserInfo] = useState('');
    const [userContest, setUserContest] = useState('');
    const [userSubmissions, setUserSubmissions] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchItems = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const resultUI = await axios(`https://codeforces.com/api/user.info?handles=${currname}`);
            setUserInfo(resultUI.data.result[0]);

            const resultUC = await axios(`https://codeforces.com/api/user.rating?handle=${currname}`);
            setUserContest(resultUC.data.result);

            const resultUS = await axios(`https://codeforces.com/api/user.status?handle=${currname}`);
            setUserSubmissions(resultUS.data.result);
        } catch (err) {
            setError('Failed to fetch user data. Please check the username and try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUsername(currname);
        fetchItems();
    };

    function render() {
        lastName = username;
        
        if (userInfo && username === userInfo.handle) {
            return (
                <div className="animate-fade-in space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <UserInfo userInfo={userInfo} username={username} />
                        <UserContest userContest={userContest} username={username} />
                    </div>

                    <RatingGraph userContest={userContest} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                            <CardContent className="p-6">
                                <ProblemVerdict userSubmissions={userSubmissions} />
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-6">
                                <ProblemLanguage userSubmissions={userSubmissions} />
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card>
                            <CardContent className="p-6">
                                <ProblemTagsGraph userSubmissions={userSubmissions} />
                            </CardContent>
                        </Card>
                        
                        <ProblemIndexGraph userSubmissions={userSubmissions} />
                        
                        <Card>
                            <CardContent className="p-6">
                                <ProblemRatingGraph userSubmissions={userSubmissions} />
                            </CardContent>
                        </Card>
                    </div>

                    <Footer />
                </div>
            );
        }
    }

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16 sm:py-24">
                <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                <div className="relative container mx-auto px-4 text-center">
                    <div className="mx-auto max-w-3xl">
                        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                            Codeforces Analyzer
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-muted-foreground">
                            Analyze your Codeforces performance and gain valuable insights to improve your competitive programming skills!
                        </p>
                        
                        {/* Feature Cards */}
                        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
                            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                                <CardHeader className="text-center pb-4">
                                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                                        <User className="h-6 w-6 text-primary" />
                                    </div>
                                    <CardTitle className="text-lg">User Analysis</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <p className="text-sm text-muted-foreground">Detailed statistics about your competitive programming journey</p>
                                </CardContent>
                            </Card>
                            
                            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                                <CardHeader className="text-center pb-4">
                                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                                        <Target className="h-6 w-6 text-primary" />
                                    </div>
                                    <CardTitle className="text-lg">Problem Insights</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <p className="text-sm text-muted-foreground">Understand your problem-solving patterns and preferences</p>
                                </CardContent>
                            </Card>
                            
                            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                                <CardHeader className="text-center pb-4">
                                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                                        <Trophy className="h-6 w-6 text-primary" />
                                    </div>
                                    <CardTitle className="text-lg">Contest Performance</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <p className="text-sm text-muted-foreground">Track your progress and achievements in contests</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search Section */}
            <div className="container mx-auto px-4 py-12">
                <Card className="mx-auto max-w-md">
                    <CardHeader>
                        <CardTitle className="text-center">Enter Username</CardTitle>
                        <CardDescription className="text-center">
                            Enter your Codeforces username to get started
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Input
                                    placeholder="Enter Codeforces username"
                                    value={currname}
                                    onChange={(e) => setCurrname(e.target.value)}
                                    className={error ? "border-destructive" : ""}
                                />
                                {error && (
                                    <p className="text-sm text-destructive">{error}</p>
                                )}
                            </div>
                            <Button 
                                type="submit" 
                                className="w-full" 
                                disabled={isLoading || !currname.trim()}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Analyzing...
                                    </>
                                ) : (
                                    <>
                                        <Search className="mr-2 h-4 w-4" />
                                        Analyze Profile
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>

            {/* Loading State */}
            {isLoading && (
                <div className="container mx-auto px-4 py-8">
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[...Array(4)].map((_, i) => (
                                <Card key={i}>
                                    <CardContent className="p-6">
                                        <div className="animate-pulse space-y-4">
                                            <div className="h-4 bg-muted rounded w-3/4"></div>
                                            <div className="h-4 bg-muted rounded w-1/2"></div>
                                            <div className="h-32 bg-muted rounded"></div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Results */}
            {!isLoading && username !== lastName && (
                <div className="container mx-auto px-4 pb-8">
                    {render()}
                </div>
            )}
        </div>
    );
};

export default SingleUser;
