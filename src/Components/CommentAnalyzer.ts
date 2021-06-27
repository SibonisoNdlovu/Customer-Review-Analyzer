import { isNumber } from 'util';
import metrics from '../Helper/metrics.json';
import checkOccurrence from '../utils/utils'; 
import jsonfile from '../../results.json'
import createJsonFile from '../utils/createJsonFile';
import fs = require('fs');

export class CommentAnalyzer {
    file: string;
    firstLoad: boolean;

    constructor(fileDir: string, firstLoad: boolean) {
        this.file = fileDir;
        this.firstLoad = firstLoad;
    }

    analyze(){
        let results = new Map<string, number>();
        if(this.file!=null){
            this.processLineByLine(results); // calls a method that will check all the files and process each file line by line
        }
    }
    
    processLineByLine(results: Map<string, number>)  {
        var res = new Map<string, number>();
        var lineReader = require('readline').createInterface({
            input: require('fs').createReadStream(this.file)
          });

        lineReader.on('line', function (line: any) {
              for (let index = 0; index < metrics.length; index++) {
                if(isNumber(metrics[index].value)){
                    if(line.length < metrics[index].value){   
                        res = checkOccurrence(results,index); //this checks for the occurrence
                    }
                }
                else if(line.includes(metrics[index].value)){
                    res = checkOccurrence(results,index);
                }
              }
          });

          lineReader.on("close", ()=> {
            res.forEach((value:number, key:string) => {
                this.updateJsonFile(key,value);
            });
        })
    }

    updateJsonFile(key:any, value:any) {
        jsonfile.forEach(element => {
            if(this.firstLoad){ // set everything to 0 on firstload
                element.value = 0;
            }
            if(element.key == key){
                    element.value += value; 
            }
        });
        this.firstLoad = false;
        createJsonFile(jsonfile); // update the json file with the values
    }  
  }