import { Line } from 'react-chartjs-2';
import moment from 'moment';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { TrendingUp, Calendar, Award } from 'lucide-react';

const RatingGraph = ({userContest}) => {
    const contestArray = Array.from(userContest);
    
    if (contestArray.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        Rating Progress
                    </CardTitle>
                    <CardDescription>Track your rating changes over time</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-center text-muted-foreground py-8">No contest data available</p>
                </CardContent>
            </Card>
        );
    }

    const data = {
        labels: [],
        datasets: [
          {
            label: 'Rating',
            data: [],
            fill: false,
            backgroundColor: 'hsl(var(--primary))',
            borderColor: 'hsl(var(--primary))',
            pointBackgroundColor: 'hsl(var(--primary))',
            pointBorderColor: 'hsl(var(--background))',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
            tension: 0.3,
            borderWidth: 3,
          },
        ],
    };

    for(let i = 0; i < contestArray.length; i++){    
        let dateSeconds = contestArray[i].ratingUpdateTimeSeconds;
        let rating = contestArray[i].newRating;
        var date = new Date(null);
        date.setTime(dateSeconds * 1000);
        
        let momentDate = moment(date).format('MMM D, YYYY');
        
        data.datasets[0].data.push({x: momentDate, y: rating});
    }

    // Calculate statistics
    const currentRating = contestArray[contestArray.length - 1]?.newRating || 0;
    const initialRating = contestArray[0]?.oldRating || 0;
    const maxRating = Math.max(...contestArray.map(c => c.newRating));
    const minRating = Math.min(...contestArray.map(c => c.newRating));
    const totalChange = currentRating - initialRating;

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: false,
                grid: {
                    color: 'hsl(var(--border))',
                    drawBorder: false,
                },
                ticks: {
                    color: 'hsl(var(--muted-foreground))',
                    font: {
                        size: 12,
                        family: 'Inter, system-ui, sans-serif'
                    }
                }
            },
            x: {
                grid: {
                    color: 'hsl(var(--border))',
                    drawBorder: false,
                },
                ticks: {
                    color: 'hsl(var(--muted-foreground))',
                    font: {
                        size: 11,
                        family: 'Inter, system-ui, sans-serif'
                    },
                    maxTicksLimit: 8
                }
            }
        },
        plugins: {
            title: {
                display: false
            },
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                titleColor: '#1f2937',
                bodyColor: '#374151',
                borderColor: '#e5e7eb',
                borderWidth: 1,
                cornerRadius: 8,
                displayColors: false,
                titleFont: {
                    size: 14,
                    family: 'Inter, system-ui, sans-serif',
                    weight: '600'
                },
                bodyFont: {
                    size: 13,
                    family: 'Inter, system-ui, sans-serif'
                },
                padding: 12,
                caretPadding: 6,
                callbacks: {
                    label: function(context) {
                        return `Rating: ${context.parsed.y}`;
                    }
                }
            }
        },
        animation: {
            duration: 1000,
            easing: 'easeInOutQuart'
        },
        interaction: {
            intersect: false,
            mode: 'index'
        }
    };

    return (
        <Card>
            <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <CardTitle className="text-xl font-semibold flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-primary" />
                            Rating Progress
                        </CardTitle>
                        <CardDescription>
                            Your rating journey across {contestArray.length} contests
                        </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-sm">
                            <Award className="h-3 w-3 mr-1" />
                            {currentRating}
                        </Badge>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                {/* Statistics Row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg">
                    <div className="text-center">
                        <div className="text-lg font-bold text-foreground">{currentRating}</div>
                        <div className="text-xs text-muted-foreground">Current</div>
                    </div>
                    <div className="text-center">
                        <div className="text-lg font-bold text-green-600">{maxRating}</div>
                        <div className="text-xs text-muted-foreground">Peak</div>
                    </div>
                    <div className="text-center">
                        <div className={`text-lg font-bold ${totalChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {totalChange >= 0 ? '+' : ''}{totalChange}
                        </div>
                        <div className="text-xs text-muted-foreground">Total Change</div>
                    </div>
                    <div className="text-center">
                        <div className="text-lg font-bold text-foreground">{contestArray.length}</div>
                        <div className="text-xs text-muted-foreground">Contests</div>
                    </div>
                </div>

                {/* Chart */}
                <div className="h-64 sm:h-80 lg:h-96">
                    <Line data={data} options={options} />
                </div>

                {/* Insights */}
                <div className="bg-primary/5 rounded-lg p-4 space-y-2">
                    <h4 className="font-medium text-sm text-foreground flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Performance Insights
                    </h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                        <p>• Rating range: {minRating} - {maxRating} ({maxRating - minRating} points)</p>
                        <p>• {totalChange >= 0 ? 'Positive' : 'Negative'} overall trend: {Math.abs(totalChange)} points</p>
                        <p>• Keep participating regularly to improve your rating stability</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default RatingGraph
