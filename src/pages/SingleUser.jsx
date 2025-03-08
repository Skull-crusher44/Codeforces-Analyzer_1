import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';

import UserInfo from "../components/UserBio/UserInfo";
import UserContest from "../components/UserBio/UserContest";
import ProblemVerdict from "../components/ProblemVerdict/ProblemVerdict";
import ProblemLanguage from "../components/ProblemLanguage/ProblemLanguage";
import RatingGraph from "../components/RatingGraph/RatingGraph";
import ProblemTagsGraph from "../components/ProblemTagsGraph/ProblemTagsGraph";
import ProblemRatingGraph from "../components/ProblemRatingGraph/ProblemRatingGraph";
import ProblemIndexGraph from "../components/ProblemIndexGraph/ProblemIndexGraph";
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

const SingleUser = () => {
    const classes = useStyles();
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
                <div className="animate-fade-in">
                    <div className="flex flex-col md:flex-row justify-between w-4/5 mx-auto mt-8 space-y-4 md:space-y-0 md:space-x-4">
                        <div className="w-full md:w-1/2">
                            <UserInfo userInfo={userInfo} username={username} />
                        </div>
                        <div className="w-full md:w-1/2">
                            <UserContest userContest={userContest} username={username} />
                        </div>
                    </div>

                    <div className="w-4/5 mx-auto mt-8 bg-[#f0d6f6] rounded-lg shadow-lg">
                        <RatingGraph userContest={userContest} />
                    </div>

                    <div className="flex flex-col md:flex-row justify-between w-4/5 mx-auto mt-8 space-y-4 md:space-y-0 md:space-x-4">
                        <div className="w-full md:w-1/2 bg-[#f0d6f6] rounded-lg shadow-lg p-4">
                            <ProblemVerdict userSubmissions={userSubmissions} />
                        </div>
                        <div className="w-full md:w-1/2 bg-[#f0d6f6] rounded-lg shadow-lg p-4">
                            <ProblemLanguage userSubmissions={userSubmissions} />
                        </div>
                    </div>

                    <div className="w-4/5 mx-auto mt-8 space-y-8">
                        <div className="bg-[#f0d6f6] rounded-lg shadow-lg p-4">
                            <ProblemTagsGraph userSubmissions={userSubmissions} />
                        </div>
                        <div className="bg-[#f0d6f6] rounded-lg shadow-lg p-4">
                            <ProblemIndexGraph userSubmissions={userSubmissions} />
                        </div>
                        <div className="bg-[#f0d6f6] rounded-lg shadow-lg p-4 mb-8">
                            <ProblemRatingGraph userSubmissions={userSubmissions} />
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
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Codeforces Analyzer</h1>
                <p className="text-xl text-gray-600 mb-8">Analyze your Codeforces performance and gain valuable insights!</p>
                <div className="flex justify-center space-x-4">
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-2">User Analysis</h2>
                        <p>Get detailed statistics about your Codeforces journey</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-2">Problem Insights</h2>
                        <p>Understand your problem-solving patterns</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-2">Contest Performance</h2>
                        <p>Track your progress in Codeforces contests</p>
                    </div>
                </div>
            </div>

            <form 
                noValidate 
                autoComplete="on" 
                onSubmit={handleSubmit} 
                className="flex flex-col md:flex-row items-center justify-center mt-12 px-4 space-y-4 md:space-y-0 md:space-x-4"
            >
                <TextField
                    className={`w-full md:w-1/3 ${classes.textField}`}
                    onChange={(e) => setCurrname(e.target.value)}
                    label="Codeforces Username *"
                    variant="outlined"
                    color="primary"
                    error={!!error}
                    helperText={error}
                />
                <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    disabled={isLoading}
                    className="h-14 px-8 transition-colors duration-200"
                >
                    {isLoading ? 'Loading...' : 'Analyze'}
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

            {!isLoading && username !== lastName && render()}
        </div>
    );
};

export default SingleUser;
