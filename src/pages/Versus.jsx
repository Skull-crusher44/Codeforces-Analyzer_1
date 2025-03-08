import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';

import VersusRatingGraph from "../components/VersusRatingGraph/VersusRatingGraph";
import VersusCommonContest from "../components/VersusCommonContest/VersusCommonContest";
import VersusProblemIndexGraph from "../components/VersusProblemIndexGraph/VersusProblemIndexGraph";
import VersusProblemRatingGraph from "../components/VersusProblemRatingGraph/VersusProblemRatingGraph";
import VersusUserInfo from "../components/VersusUser/VersusUserInfo";
import VersusUserContest from "../components/VersusUser/VersusUserContest";
import VersusSubmissionsCompare from "../components/VersusSubmissionsCompare/VersusSubmissionsCompare";
import VersusCommonPie from "../components/VersusCommonContest/VersusCommonPie";
import Footer from '../components/Footer/Footer';

const useStyles = makeStyles((theme) => ({
    textField: {
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                borderColor: '#8ba3cf',
            },
        },
        '& .MuiInputLabel-outlined.Mui-focused': {
            color: '#8ba3cf',
        },
    },
}));

const Versus = () => {
    const classes = useStyles();
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
                    <div className="flex flex-col lg:flex-row justify-between w-4/5 mx-auto mt-8 space-y-4 lg:space-y-0 lg:space-x-4">
                        <div className="w-full lg:w-1/2">
                            <VersusUserInfo userInfo1={userInfo1} userInfo2={userInfo2} />
                        </div>
                        <div className="w-full lg:w-1/2">
                            <VersusUserContest userContest1={userContest1} userContest2={userContest2} />
                        </div>
                    </div>

                    <div className="w-4/5 mx-auto mt-8 bg-[#f0d6f6] rounded-lg shadow-lg">
                        <VersusRatingGraph userContest1={userContest1} userContest2={userContest2} />
                    </div>

                    <div className="flex flex-col lg:flex-row justify-between w-4/5 mx-auto mt-8 space-y-4 lg:space-y-0 lg:space-x-4">
                        <div className="w-full lg:w-1/2 bg-[#f0d6f6] rounded-lg shadow-lg p-4">
                            <VersusCommonPie userContest1={userContest1} userContest2={userContest2} />
                        </div>
                        <div className="w-full lg:w-1/2 bg-[#f0d6f6] rounded-lg shadow-lg p-4">
                            <VersusSubmissionsCompare 
                                userSubmissions1={userSubmissions1} 
                                userSubmissions2={userSubmissions2} 
                                username1={username1} 
                                username2={username2} 
                            />
                        </div>
                    </div>

                    <div className="w-4/5 mx-auto mt-8 space-y-8">
                        <div className="bg-[#f0d6f6] rounded-lg shadow-lg p-4">
                            <VersusProblemIndexGraph 
                                userSubmissions1={userSubmissions1} 
                                userSubmissions2={userSubmissions2} 
                                username1={username1} 
                                username2={username2} 
                            />
                        </div>
                        <div className="bg-[#f0d6f6] rounded-lg shadow-lg p-4">
                            <VersusProblemRatingGraph 
                                userSubmissions1={userSubmissions1} 
                                userSubmissions2={userSubmissions2} 
                                username1={username1} 
                                username2={username2} 
                            />
                        </div>
                        <div className="bg-[#f0d6f6] rounded-lg shadow-lg p-4 mb-8">
                            <VersusCommonContest userContest1={userContest1} userContest2={userContest2} />
                        </div>
                    </div>

                    <Footer />
                </div>
            );
        }
    }

    return (
        <div className="min-h-screen">
            <div className="text-center py-12 bg-[#f0d6f6]">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Codeforces Analyzer: Versus Mode</h1>
                <p className="text-xl text-gray-600 mb-8">Compare two Codeforces users and gain valuable insights!</p>
                <div className="flex justify-center space-x-4">
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-2">Head-to-Head Comparison</h2>
                        <p>Compare user statistics and performance</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-2">Common Contests</h2>
                        <p>Analyze performance in shared contests</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-2">Problem Solving Patterns</h2>
                        <p>Compare problem-solving strategies</p>
                    </div>
                </div>
            </div>

            <form 
                noValidate 
                autoComplete="on" 
                onSubmit={handleSubmitVersus} 
                className="flex flex-col items-center mt-12 px-4 space-y-4"
            >
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                    <TextField
                        className={`w-full md:w-64 ${classes.textField}`}
                        onChange={(e) => setCurrname1(e.target.value)}
                        label="First Username *"
                        variant="outlined"
                        color="primary"
                        error={!!error}
                    />
                    <TextField
                        className={`w-full md:w-64 ${classes.textField}`}
                        onChange={(e) => setCurrname2(e.target.value)}
                        label="Second Username *"
                        variant="outlined"
                        color="primary"
                        error={!!error}
                    />
                </div>
                
                {error && (
                    <div className="text-red-500 text-sm mt-2">
                        {error}
                    </div>
                )}

                <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    disabled={isLoading}
                    className="h-14 px-8 min-w-[200px] transition-colors duration-200"
                >
                    {isLoading ? 'Loading...' : 'Compare'}
                </Button>
            </form>

            {isLoading && (
                <div className="flex justify-center mt-8">
                    <div className="animate-pulse flex space-x-4">
                        <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                        <div className="flex-1 space-y-6 py-1">
                            <div className="h-2 bg-slate-200 rounded"></div>
                            <div className="space-y-3">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                    <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {!isLoading && render()}
        </div>
    );
};

export default Versus;
