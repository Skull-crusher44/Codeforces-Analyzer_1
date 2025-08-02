import { Bar } from 'react-chartjs-2';

const VersusProblemRatingGraph = ({userSubmissions1,userSubmissions2,username1,username2}) => {
    
    let rating = new Map();

    let rating1 = new Map();
    let id1=new Map();
    for(let i=0;i<userSubmissions1.length;i++){
        if(userSubmissions1[i].verdict!=="OK"){
            continue;
        }
        let key1=userSubmissions1[i].contestId + userSubmissions1[i].problem.index;
        if(id1.has(key1)){
            continue;
        }
        id1.set(key1,true);
        let currRating1=userSubmissions1[i].problem.rating;
        if(currRating1===undefined){
            continue;
        }
        currRating1=parseInt(currRating1);
        if(!rating1.has(currRating1)){
            rating1.set(currRating1,1);
        }
        else{
            let temp=rating1.get(currRating1);
            rating1.set(currRating1,temp+1);
        }
        rating.set(currRating1,1);
    } 
    
    let rating2 = new Map();
    let id2=new Map();
    for(let i=0;i<userSubmissions2.length;i++){
        if(userSubmissions2[i].verdict!=="OK"){
            continue;
        }
        let key2=userSubmissions2[i].contestId + userSubmissions2[i].problem.index;
        if(id2.has(key2)){
            continue;
        }
        id2.set(key2,true);
        let currRating2=userSubmissions2[i].problem.rating;
        if(currRating2===undefined){
            continue;
        }
        currRating2=parseInt(currRating2);
        if(!rating2.has(currRating2)){
            rating2.set(currRating2,1);
        }
        else{
            let temp=rating2.get(currRating2);
            rating2.set(currRating2,temp+1);
        }
        rating.set(currRating2,1);
    } 
    
    var ratingAsc = new Map([...rating.entries()].sort(function order(key1, key2) {
        if (parseInt(key1) < parseInt(key2)) return -1;
        else if (parseInt(key1) > parseInt(key2)) return +1;
        else return 0;
    }));

    const data = {
        labels: [],
        datasets: [
          {
            label: username1,
            data: [],
            backgroundColor: [
              'red',
            ],
            borderColor: [
              'rgba(255, 0, 0, 1)',
            ],
            borderWidth: 0,
          },
          {
            label: username2,
            data: [],
            backgroundColor: [
              'blue',
            ],
            borderColor: [
              'rgba(0, 0, 255, 1)',
            ],
            borderWidth: 0,
          },
        ],
    };

    for(let[key,value] of ratingAsc){
        data.labels.push(key);
        data.datasets[0].data.push(rating1.has(key)? rating1.get(key) :0);
        data.datasets[1].data.push(rating2.has(key)? rating2.get(key) :0);  
    }


    const options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
        plugins: {
          title: {
              display: true,
              text: 'Problem Rating'
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
                        return `${context.dataset.label}: ${context.parsed.y} problems`;
                    }
                }
            }
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div>
            <Bar 
                data={data} 
                options={options}
	              height={400}
               
            />     
        </div>
    )
}

export default VersusProblemRatingGraph
