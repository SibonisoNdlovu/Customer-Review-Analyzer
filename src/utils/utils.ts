

import metrics from '../Helper/metrics.json';
 
export default function checkOccurrence(results: Map<string, number>, key: number): any {
    if (results.get(metrics[key].key) == null) { //loop through all the metrics and check if that key exists or not
        results.set(metrics[key].key, 1);
    } else{
        let val =  results.get(metrics[key].key) as number; // add counter for everytime something is appearing again
        results.set(metrics[key].key,val+1)
    }

    return results;
}