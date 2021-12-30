//FUNCION PARA DIVIDIR UN ARRAY Y BUSCAR EL NUMERO INGRESADO

import Ask from "https://deno.land/x/ask@1.0.6/mod.ts";
import * as Colors from "https://deno.land/std/fmt/colors.ts";
const ask = new Ask();

async function main(): Promise<void>{
    let appStart = performance.now();

    console.log(Colors.blue(`
    ################################
    #        DIVIDE ARRAY   v0.2   #
    ################################
    `))

    // ENTRY NUMBER 
    let entryNumber = await ask.prompt([
        {
            name: "number",
            type: "input",
            message: "Entry one number:"
        }
    ])
    let selectedNumber: any = entryNumber.number
    //END ENTRY NUMBER

     // ENTRY FIND NUMBER 
     let entryFindNumber = await ask.prompt([
        {
            name: "number",
            type: "input",
            message: "Find one number:"
        }
    ])
    let selectedFindNumber: any = entryFindNumber.number
    //END ENTRY FIND NUMBER

    //CREATE INITIAL ARRAY WHIT THE RESERVED NUMBER
    function createInitialArray(selectedNumber:number){
        let array:number[] = []
        if(selectedNumber >= 0){
            //POSITIVE NUMBERS
            for(let i:number = 0; i <= selectedNumber; i++){
                array.push(i)
            }
            return array
        }else{
            //NEGATIVE NUMBERS
            for(let i:number = parseInt(selectedNumber.toString()); i <= 0; i++){
                array.push(i)
            }
            return array
        }
    }

    //DIVIDE ARRAY
     function divideArray(selectedFindNumber:number, initialArray:number[]){
        let selectedNumber:number = initialArray.length -1
        let arrayOne : number[] = [];
        let arrayTwo : number[] = [];
        let result : any[] = []
        if(initialArray[initialArray.length -2] >= 0){
            //POSTIVE ARRAY
            let limitArrayOne : number = selectedNumber % 2 !== 0 ? (initialArray.length/2)-1 : initialArray.length/2;
            for(let x = 0; x <= limitArrayOne; x++ ){
                arrayOne.push(x)
            }
            for(let y = arrayOne.length; y < initialArray.length; y++){
                arrayTwo.push(y)
            }

        }else if(initialArray[initialArray.length -2] < 0){
            //NEGATIVE ARRAY
            for(let x = initialArray[0]; x <= parseInt(`-${initialArray.length /2}`); x++ ){
                arrayOne.push(x)
            }
            for(let y = selectedNumber % 2 !== 0 ? parseInt(`-${arrayOne.length -1}`) :parseInt(`-${arrayOne.length -2}`) ; y <= 0; y++){
                arrayTwo.push(y)
            }
        }
        result.push(arrayOne, arrayTwo)
        find(selectedFindNumber, result)
        return result
    }


    //executions
    const resultInitialArray =await createInitialArray(selectedNumber)
    const resultDivideArray =await divideArray(selectedFindNumber, resultInitialArray)


    /*
    ##################################
        FIND SELECTED NUMBER
    ##################################
    */
    function find(selectedFindNumber:number, result:any[]){
        let findNumber:number =  parseInt(selectedFindNumber.toString())
        let arrayOne = result[0]
        let arrayTwo = result[1]
        let arrayOneFirstNumber:number = arrayOne[0]
        let arrayOneLastNumber:number = arrayOne[arrayOne.length -1]
        let arrayTwoFirstNumber : number =arrayTwo[0]
        let arrayTwoLastNumber : number = arrayTwo[arrayTwo.length -1]
       
        if( findNumber <= arrayOneLastNumber && findNumber >= arrayOneFirstNumber){
            console.log("SELECTED NUMBER ON ARRAY ONE")                   
        }else if(findNumber >= arrayTwoFirstNumber && findNumber <= arrayTwoLastNumber){
            console.log("SELECTED NUMBER ON ARRAY TWO")
        }else{
            console.log("SELECTED NUMBER NOT FOUND ON ARRAYS")
        }
    }
    /*
    ##################################
        END FIND SELECTED NUMBER 
    ##################################
    */


    
    //visualizations
    //console.log(resultInitialArray)
    console.log(resultDivideArray)


    let appEnd = performance.now();
    console.log("Tiempo de ejecucion " + (appEnd - appStart) + " milisegundos." + "\n")

    //restart app
    let entryRestart = await ask.prompt([
        {
            name: "option",
            type: "input",
            message: "Restart application: y/n"
        }
    ])
    let selectedOption: any = entryRestart.option
    if(selectedOption === "y" || selectedOption ==="yes" || selectedOption === "YES" || selectedOption === "Y"){
        main()
    }else{
        console.log(Colors.red(`
    #################################
    #            EXIT               #
    #################################    
    `))
    }

}
main()