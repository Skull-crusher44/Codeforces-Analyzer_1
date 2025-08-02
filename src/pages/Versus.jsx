import { useState } from 'react';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Users, TrendingUp, Target, BarChart3, Loader2 } from 'lucide-react';

import VersusRatingGraph from "../components/VersusRatingGraph/VersusRatingGraph";
import VersusCommonContest from "../components/VersusCommonContest/VersusCommonContest";
import VersusProblemIndexGraph from "../components/VersusProblemIndexGraph/VersusProblemIndexGraph";
import VersusProblemRatingGraph from "../components/VersusProblemRatingGraph/VersusProblemRatingGraph";
import VersusUserInfo from "../components/VersusUser/VersusUserInfo";
import VersusUserContest from "../components/VersusUser/VersusUserContest";
import VersusSubmissionsCompare from "../components/VersusSubmissionsCompare/VersusSubmissionsCompare";
import VersusCommonPie from "../components/VersusCommonContest/VersusCommonPie";
import Footer from '../components/Footer/Footer';

const Versus = () => {
    const [currname1, setCurrname1] = useState('');
    const [username1, setUsername1] = useState('');
    const [userInfo1, setUserInfo1] = useState('');
    const [userContest1, setUserContest1] = useState('');
    const [userSubmissions1, setUserSubmissions1] = useState('');

    const [currname2, setCurrname2] = useState('');
    const [username2, setUsername2] = useState('');
    const [userInfo2, setUserInfo2] = useState('');
    const [userContest2, setUserContest2] = useState('');
    const [userSubmissions2, setUserSubmissions2] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchItemsVersus = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const [resultUI1, resultUI2, resultUC1, resultUC2, resultUS1, resultUS2] = await Promise.all([
                axios(`https://codeforces.com/api/user.info?handles=${currname1}`),
                axios(`https://codeforces.com/api/user.info?handles=${currname2}`),
                axios(`https://codeforces.com/api/user.rating?handle=${currname1}`),
                axios(`https://codeforces.com/api/user.rating?handle=${currname2}`),
                axios(`https://codeforces.com/api/user.status?handle=${currname1}`),
                axios(`https://codeforces.com/api/user.status?handle=${currname2}`)
            ]);

            setUserInfo1(resultUI1.data.result[0]);
            setUserInfo2(resultUI2.data.result[0]);
            setUserContest1(resultUC1.data.result);
            setUserContest2(resultUC2.data.result);
            setUserSubmissions1(resultUS1.data.result);
            setUserSubmissions2(resultUS2.data.result);
        } catch (err) {
            setError('Failed to fetch user data. Please check the usernames and try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmitVersus = async (e) => {
        e.preventDefault();
        setUsername1(currname1);
        setUsername2(currname2);
        fetchItemsVersus();
    };

    function render() {
        if (userInfo1 && username1 === userInfo1.handle && userInfo2 && username2 === userInfo2.handle) {
            return (
                <div className="animate-fade-in">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-7xl mx-auto mt-8 px-4">
                        <Card>
                            <CardContent className="p-0">
                                <VersusUserInfo userInfo1={userInfo1} userInfo2={userInfo2} />
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-0">
                                <VersusUserContest userContest1={userContest1} userContest2={userContest2} />
                            </CardContent>
                        </Card>
                    </div>

                    <div className="w-full max-w-7xl mx-auto mt-8 px-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <TrendingUp className="h-5 w-5 text-primary" />
                                    Rating Comparison
                                </CardTitle>
                                <CardDescription>Compare rating progression over time</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <VersusRatingGraph userContest1={userContest1} userContest2={userContest2} />
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-7xl mx-auto mt-8 px-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <BarChart3 className="h-5 w-5 text-primary" />
                                    Common Contests
                                </CardTitle>
                                <CardDescription>Performance comparison in shared contests</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <VersusCommonPie userContest1={userContest1} userContest2={userContest2} />
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Target className="h-5 w-5 text-primary" />
                                    Submission Patterns
                                </CardTitle>
                                <CardDescription>Compare submission statistics</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <VersusSubmissionsCompare 
                                    userSubmissions1={userSubmissions1} 
                                    userSubmissions2={userSubmissions2} 
                                    username1={username1} 
                                    username2={username2} 
                                />
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6 w-full max-w-7xl mx-auto mt-8 px-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <BarChart3 className="h-5 w-5 text-primary" />
                                    Problem Index Distribution
                                </CardTitle>
                                <CardDescription>Compare problem difficulty preferences</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <VersusProblemIndexGraph 
                                    userSubmissions1={userSubmissions1} 
                                    userSubmissions2={userSubmissions2} 
                                    username1={username1} 
                                    username2={username2} 
                                />
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <TrendingUp className="h-5 w-5 text-primary" />
                                    Problem Rating Analysis
                                </CardTitle>
                                <CardDescription>Compare problem rating distribution</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <VersusProblemRatingGraph 
                                    userSubmissions1={userSubmissions1} 
                                    userSubmissions2={userSubmissions2} 
                                    username1={username1} 
                                    username2={username2} 
                                />
                            </CardContent>
                        </Card>
                        <Card className="mb-8">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Users className="h-5 w-5 text-primary" />
                                    Contest Performance
                                </CardTitle>
                                <CardDescription>Detailed contest comparison and statistics</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <VersusCommonContest userContest1={userContest1} userContest2={userContest2} />
                            </CardContent>
                        </Card>
                    </div>

                    <Footer />
                </div>
            );
        }
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-background py-16 px-4">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                <div className="relative max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                        <Users className="h-4 w-4" />
                        Compare & Analyze
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                        Codeforces Analyzer
                        <span className="block text-primary">Versus Mode</span>
                    </h1>
                    <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
                        Compare two Codeforces users side by side and discover detailed insights about their competitive programming journey!
                    </p>
                    
                    {/* Feature Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                            <CardHeader className="text-center pb-4">
                                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                                    <Users className="h-6 w-6 text-primary" />
                                </div>
                                <CardTitle className="text-lg">Head-to-Head Comparison</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <p className="text-sm text-muted-foreground">Compare user statistics and performance metrics</p>
                            </CardContent>
                        </Card>
                        
                        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                            <CardHeader className="text-center pb-4">
                                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                                    <BarChart3 className="h-6 w-6 text-primary" />
                                </div>
                                <CardTitle className="text-lg">Common Contests</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <p className="text-sm text-muted-foreground">Analyze performance in shared contests</p>
                            </CardContent>
                        </Card>
                        
                        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                            <CardHeader className="text-center pb-4">
                                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                                    <Target className="h-6 w-6 text-primary" />
                                </div>
                                <CardTitle className="text-lg">Problem Solving Patterns</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <p className="text-sm text-muted-foreground">Compare problem-solving strategies</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Search Section */}
            <div className="py-12 px-4">
                <div className="max-w-2xl mx-auto">
                    <Card className="border-2 border-dashed border-border/50 bg-card/30 backdrop-blur-sm">
                        <CardHeader className="text-center pb-4">
                            <CardTitle className="flex items-center justify-center gap-2">
                                <Users className="h-5 w-5 text-primary" />
                                Compare Users
                            </CardTitle>
                            <CardDescription>Enter two Codeforces usernames to start comparison</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmitVersus} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground">First Username</label>
                                        <Input
                                            placeholder="e.g., tourist"
                                            value={currname1}
                                            onChange={(e) => setCurrname1(e.target.value)}
                                            className={error ? "border-destructive" : ""}
                                            disabled={isLoading}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground">Second Username</label>
                                        <Input
                                            placeholder="e.g., jiangly"
                                            value={currname2}
                                            onChange={(e) => setCurrname2(e.target.value)}
                                            className={error ? "border-destructive" : ""}
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>
                                
                                {error && (
                                    <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                                        <p className="text-sm text-destructive">{error}</p>
                                    </div>
                                )}

                                <Button
                                    type="submit"
                                    className="w-full h-12 text-base font-medium"
                                    disabled={isLoading || !currname1.trim() || !currname2.trim()}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Analyzing...
                                        </>
                                    ) : (
                                        <>
                                            <Users className="mr-2 h-4 w-4" />
                                            Compare Users
                                        </>
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {isLoading && (
                <div className="py-12 px-4">
                    <div className="max-w-4xl mx-auto">
                        <Card>
                            <CardContent className="py-12">
                                <div className="flex flex-col items-center space-y-4">
                                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                    <div className="text-center space-y-2">
                                        <h3 className="text-lg font-medium">Analyzing Users</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Fetching user data and preparing comparison...
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}

            {!isLoading && render()}
        </div>
    );
};

export default Versus;
