import { Bar } from 'react-chartjs-2';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { TrendingUp, BarChart3 } from 'lucide-react';

const IndexGraph = ({userSubmissions}) => {
    let index= new Map();
    let id=new Map();
    for(let i=0;i<userSubmissions.length;i++){
        if(userSubmissions[i].verdict!=="OK"){
            continue;
        }
        let key=userSubmissions[i].contestId + userSubmissions[i].problem.index;
        if(id.has(key)){
            continue;
        }
        id.set(key,true);
        let currIndex=userSubmissions[i].problem.index[0];
        if(currIndex<'A' || currIndex > 'Z'){
          continue;
        }
        if(!index.has(currIndex)){
            index.set(currIndex,1);
        }
        else{
            let temp=index.get(currIndex);
            index.set(currIndex,temp+1)
        }
    }
    
    var indexAsc = new Map([...index.entries()].sort());
    
    // Enhanced color palette with gradient-like progression
    const colors = [
        'rgba(34, 197, 94, 0.8)',   // Green for A (easier)
        'rgba(59, 130, 246, 0.8)',  // Blue for B
        'rgba(168, 85, 247, 0.8)',  // Purple for C
        'rgba(236, 72, 153, 0.8)',  // Pink for D
        'rgba(239, 68, 68, 0.8)',   // Red for E
        'rgba(245, 101, 101, 0.8)', // Lighter red for F
        'rgba(251, 113, 133, 0.8)', // Even lighter for G+
    ];
    
    const borderColors = [
        'rgba(34, 197, 94, 1)',
        'rgba(59, 130, 246, 1)',
        'rgba(168, 85, 247, 1)',
        'rgba(236, 72, 153, 1)',
        'rgba(239, 68, 68, 1)',
        'rgba(245, 101, 101, 1)',
        'rgba(251, 113, 133, 1)',
    ];

    const data = {
        labels: [],
        datasets: [
          {
            label: 'Problems Solved',
            data: [],
            backgroundColor: [],
            borderColor: [],
            borderWidth: 2,
            borderRadius: 8,
            borderSkipped: false,
          },
        ],
    };
    
    let colorIndex = 0;
    for(let[key,value] of indexAsc){
        data.labels.push(`Problem ${key}`);
        data.datasets[0].data.push(value);
        data.datasets[0].backgroundColor.push(colors[colorIndex % colors.length]);
        data.datasets[0].borderColor.push(borderColors[colorIndex % borderColors.length]);
        colorIndex++;
    }
    
    // Calculate total problems for percentage display
    const totalProblems = Array.from(indexAsc.values()).reduce((sum, count) => sum + count, 0);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: {
                top: 20,
                bottom: 10,
                left: 10,
                right: 10
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'hsl(var(--border))',
                    drawBorder: false,
                },
                ticks: {
                    color: 'hsl(var(--muted-foreground))',
                    font: {
                        size: 12,
                        family: 'Inter, system-ui, sans-serif'
                    },
                    stepSize: 1,
                }
            },
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: 'hsl(var(--foreground))',
                    font: {
                        size: 13,
                        family: 'Inter, system-ui, sans-serif',
                        weight: '500'
                    }
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
                        const percentage = ((context.parsed.y / totalProblems) * 100).toFixed(1);
                        return `${context.parsed.y} problems (${percentage}%)`;
                    }
                }
            }
        },
        animation: {
            duration: 800,
            easing: 'easeInOutQuart'
        },
        interaction: {
            intersect: false,
            mode: 'index'
        }
    };

    // Get difficulty distribution for insights
    const getMostSolvedDifficulty = () => {
        let max = 0;
        let maxKey = '';
        for(let [key, value] of indexAsc) {
            if(value > max) {
                max = value;
                maxKey = key;
            }
        }
        return { level: maxKey, count: max };
    };

    const mostSolved = getMostSolvedDifficulty();

    return (
        <Card className="w-full">
            <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <CardTitle className="text-xl font-semibold flex items-center gap-2">
                            <BarChart3 className="h-5 w-5 text-primary" />
                            Problem Difficulty Distribution
                        </CardTitle>
                        <CardDescription>
                            Analysis of solved problems by difficulty level
                        </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-sm">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            {totalProblems} Total
                        </Badge>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                {/* Chart Container */}
                <div className="h-64 sm:h-80 lg:h-96">
                    <Bar data={data} options={options} />
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 pt-4 border-t">
                    {Array.from(indexAsc.entries()).map(([key, value], idx) => {
                        const percentage = ((value / totalProblems) * 100).toFixed(1);
                        return (
                            <div 
                                key={key} 
                                className="flex flex-col items-center p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                            >
                                <div 
                                    className="w-4 h-4 rounded-sm mb-2"
                                    style={{ backgroundColor: colors[idx % colors.length] }}
                                />
                                <div className="text-sm font-medium text-center">
                                    <div className="font-semibold">{key}</div>
                                    <div className="text-xs text-muted-foreground">{value} ({percentage}%)</div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Insights */}
                <div className="bg-primary/5 rounded-lg p-4 space-y-2">
                    <h4 className="font-medium text-sm text-foreground">💡 Insights</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                        <p>• Most solved difficulty: <span className="font-medium text-foreground">Problem {mostSolved.level}</span> with {mostSolved.count} problems</p>
                        <p>• Problem indices typically represent difficulty: A (easiest) → G+ (hardest)</p>
                        <p>• Focus on harder problems to improve your rating and skills</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default IndexGraph
