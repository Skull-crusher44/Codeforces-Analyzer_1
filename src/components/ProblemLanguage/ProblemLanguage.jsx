import { Pie } from "react-chartjs-2";

const ProblemLanguage = ({ userSubmissions }) => {
    let lang = new Map();

    for (let i = 0; i < userSubmissions.length; i++) {
        let currLang = userSubmissions[i].programmingLanguage;

        if (!lang.has(currLang)) {
            lang.set(currLang, 1);
        } else {
            let temp = lang.get(currLang);
            lang.set(currLang, temp + 1);
        }
    }
    
    var langDsc = new Map([...lang.entries()].sort((a, b) => b[1] - a[1]));
    const data = {
        labels: [],
        datasets: [
            {
                label: "",
                data: [],
                backgroundColor: [
                    "rgba(228, 28, 28, 0.8)",
                    "rgba(138, 216, 38, 0.8)",
                    "rgba(4, 119, 198, 0.8)",
                    'rgba(198, 8, 140, 0.8)',
                    'rgba(155, 159, 182, 0.8)',
                    'rgba(205, 170, 30, 0.8)',
                ],
                borderColor: [
                    "rgba(228, 28, 28, 1)",
                    "rgba(138, 216, 38, 1)",
                    "rgba(4, 119, 198, 1)",
                    'rgba(198, 8, 140, 1)',
                    'rgba(155, 159, 182, 1)',
                    'rgba(205, 170, 30, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    for (let [key, value] of langDsc) {
        data.labels.push(key);
        data.datasets[0].data.push(value);
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Languages'
            },
            tooltip: {
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                titleColor: '#1f2937',
                bodyColor: '#374151',
                borderColor: '#e5e7eb',
                borderWidth: 1,
                cornerRadius: 8,
                displayColors: true,
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
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = ((context.parsed / total) * 100).toFixed(1);
                        return `${context.label}: ${context.parsed} submissions (${percentage}%)`;
                    }
                }
            }
        },
    };
    return (
        <div>
            <Pie data={data} 
                options={options} 
                height={400} 
            />
        </div>
    );
};

export default ProblemLanguage;
