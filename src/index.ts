const fs = require( 'fs' );
const path = require( 'path' );


import  { CommentAnalyzer }  from "./Components/CommentAnalyzer";
import createJsonFile from '../src/utils/createJsonFile'; 
import metrics from '../src/Helper/metrics.json';

main();

async function main(){
    try {
        const fileDir = "./docs";
        const files = await fs.promises.readdir( fileDir );
        createJsonFile(metrics); // create a json file to store results once program is done since there is no frontend
        
        let firstLoad = true;
        for( const file of files ) { // loop over all the files in the folder
            const filePath = path.join( fileDir, file );
            
            // Stat the file to see if we have a file or dir
            const stat = await fs.promises.stat( filePath );
            if(await stat.isFile() )
            {
                let commentAnalyzer = new CommentAnalyzer(filePath, firstLoad)
                commentAnalyzer.analyze(); 
                firstLoad = false;     
            }
            else if( stat.isDirectory() )
                console.log( "'%s' is a directory.", filePath );
        }
    }
    catch( e ) {
        // Catch anything bad that happens
        console.error( "We've thrown! Whoops!", e );
    }
}; 