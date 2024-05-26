/*var makeAverages = (objArray, ...args) => {
    if (args.length > 0 && Array.isArray(objArray) && objArray.length > 0){
        let retArray = {names: [], values: []};
        for (var i = 0; i < args.length; i++){
            var sum = 0;
            var num = 0;
            for (var j = 0; j < objArray.length; j++){
                sum += parseFloat(objArray[j][args[i]]);
                num += 1;
            }
            let avg = parseFloat(sum)/num
            retArray.names.push(args[i]);
            retArray.values.push(avg);
        }
        return retArray;
    }
    return null;
}*/
const decimalPlace = 2;
exports.makeAveragesfromList = (objArray, nameArray, labelArray) => {
    if (verifyArrays(objArray, nameArray, labelArray)){
        console.log(nameArray);
        let retArray = {names: [], values: []};
        for (var i = 0; i < nameArray.length; i++){
            let avg = this.makeSingleAverage(objArray, [nameArray[i]]);
            retArray.names.push(labelArray[i]);
            retArray.values.push(roundToFloat(avg, decimalPlace));
        }
        return retArray;
    }
    return null;
}

exports.makeStdDevfromList = (objArray, nameArray, labelArray) => {
    if (verifyArrays(objArray, nameArray, labelArray)){
        console.log(nameArray);
        let retArray = {names: [], values: []};
        for (var i = 0; i < nameArray.length; i++){
            let avg = this.makeSingleStdDev(objArray, [nameArray[i]]);
            retArray.names.push(labelArray[i]);
            retArray.values.push(roundToFloat(avg, decimalPlace));
        }
        return retArray;
    }
    return null;
}

exports.makeSkewfromList = (objArray, nameArray, labelArray) => {
    if (verifyArrays(objArray, nameArray, labelArray)){
        console.log(nameArray);
        let retArray = {names: [], values: []};
        for (var i = 0; i < nameArray.length; i++){
            let avg = this.makeSingleSkew(objArray, [nameArray[i]]);
            retArray.names.push(labelArray[i]);
            retArray.values.push(roundToFloat(avg, decimalPlace));
        }
        return retArray;
    }
    return null;
}

exports.getMedian = (objArray, nameArray) => {
    var sortArray = [];
    for (var i = 0; i < objArray.length; i++){
        for (var j = 0; j < nameArray.length; j++){
            sortArray.push(parseInt(objArray[i][nameArray[j]]));
        }
    }
    sortArray.sort(function(a,b){
        return a-b;
    });

    var half = Math.floor(sortArray.length / 2);

    if (sortArray.length % 2){
        return sortArray[half];
    }
    else{
        return (sortArray[half-1] + sortArray[half]) / 2.0;
    }
}

exports.makeKurtosisfromList = (objArray, nameArray, labelArray) => {
    if (verifyArrays(objArray, nameArray, labelArray)){
        console.log(nameArray);
        let retArray = {names: [], values: []};
        for (var i = 0; i < nameArray.length; i++){
            let avg = this.makeSingleKurtosis(objArray, [nameArray[i]]);
            retArray.names.push(labelArray[i]);
            retArray.values.push(roundToFloat(avg, decimalPlace));
        }
        return retArray;
    }
    return null;
}

exports.makeAverageListFromDate = (objArray, nameArray, dateArray, labelArray, limitDate) => {
    let retArray = {names: [], values: []};
    for (var j = 0; j < nameArray.length; j++){
        var sum = 0;
        var counter = 0;
        for (var i = 0; i < objArray.length; i++){
            var t = objArray[i][nameArray[j]];
            var s = objArray[i][dateArray[j]];
            s = s.replace(/'/g, "\"");
            var dates = JSON.parse(s);
            var scores = JSON.parse(t);
            for(var k = 0; k < dates.length; k++){
                var value = Date.parse(dates[k]);
                if(value >= limitDate){
                    sum += scores[k];
                    counter++;
                }
            }
        }
        let avg = parseFloat(sum)/counter;
        retArray.names.push(labelArray[j]);
        retArray.values.push(avg);
    }
    return retArray;
}

exports.makeAverageListSameMonthLastYear = (objArray, nameArray, dateArray, labelArray, limitDate) => {
    let retArray = {names: [], values: []};
    for (var j = 0; j < nameArray.length; j++){
        var sum = 0;
        var counter = 0;
        for (var i = 0; i < objArray.length; i++){
            var t = objArray[i][nameArray[j]];
            var s = objArray[i][dateArray[j]];
            s = s.replace(/'/g, "\"");
            var dates = JSON.parse(s);
            var scores = JSON.parse(t);
            for(var k = 0; k < dates.length; k++){
                var value = Date.parse(dates[k]);
                var valueDate = new Date(value);
                if(valueDate.getMonth() === limitDate.getMonth() && valueDate.getFullYear() === limitDate.getFullYear()){
                //if(value >= limitDate){
                    sum += scores[k];
                    counter++;
                }
            }
        }
        let avg = parseFloat(sum)/counter;
        retArray.names.push(labelArray[j]);
        retArray.values.push(avg);
    }
    return retArray;
}

exports.makeSingleAverage = (objArray, nameArray) => {
    var retValue = 0;
    var counter = 0;
    for (var i = 0; i < objArray.length; i++){
        for (var j = 0; j < nameArray.length; j++){
            retValue += parseInt(objArray[i][nameArray[j]]);
            counter++;
        }
    }
    return roundToFloat(parseFloat(retValue/counter), decimalPlace);
}

exports.makeSingleAverageFromDate = (objArray, nameArray, dateArray, limitDate) => {
    var retValue = 0;
    var counter = 0;
    for (var i = 0; i < objArray.length; i++){
        for (var j = 0; j < nameArray.length; j++){
            var t = objArray[i][nameArray[j]];
            var s = objArray[i][dateArray[j]];
            s = s.replace(/'/g, "\"");
            var dates = JSON.parse(s);
            var scores = JSON.parse(t);
            for(var k = 0; k < dates.length; k++){
                var value = Date.parse(dates[k]);
                if(value >= limitDate){
                    retValue += parseFloat(scores[k]);
                    counter++;
                }
            }
        }
    }
    return parseFloat(retValue)/counter;
}

exports.makeSingleAverageFromTwoDates = (objArray, nameArray, dateArray, fromDate1, toDate1, fromDate2, toDate2) => {
    var retValue = 0;
    var counter = 0;
    dateArray, fromDate1, toDate1, fromDate2, toDate2;
    for (var i = 0; i < objArray.length; i++){
        for (var j = 0; j < nameArray.length; j++){
            retValue += parseInt(objArray[i][nameArray[j]]);
            counter++;
        }
    }
    return parseFloat(retValue)/counter;
}

exports.makeSingleStdDev = (objArray, nameArray) => {
    var retValue = 0;
    var counter = 0;
    for (let i = 0; i < objArray.length; i++){
        for (let j = 0; j < nameArray.length; j++){
            retValue += parseInt(objArray[i][nameArray[j]]);
            counter++;
        }
    }
    var mean = parseFloat(retValue/counter);
    var stdDevTotal = 0;

    for (let i = 0; i < objArray.length; i++){
        for (let j = 0; j < nameArray.length; j++){
            stdDevTotal += Math.pow(parseFloat(objArray[i][nameArray[j]] - mean), 2);
        }
    }

    return roundToFloat(Math.sqrt(stdDevTotal/counter), decimalPlace);
}

exports.makeSingleSkew = (objArray, nameArray) => {
    var dataArray = [];
    for (let i = 0; i < objArray.length; i++){
        for (let j = 0; j < nameArray.length; j++){
            dataArray.push(parseInt(objArray[i][nameArray[j]]));
        }
    }
    var retValue = 0;
    var counter = 0;
    for (let i = 0; i < objArray.length; i++){
        for (let j = 0; j < nameArray.length; j++){
            retValue += parseInt(objArray[i][nameArray[j]]);
            counter++;
        }
    }
    var mean = parseFloat(retValue/counter);
    var med = median(dataArray);
    var stdDevTotal = 0;

    for (let i = 0; i < objArray.length; i++){
        for (let j = 0; j < nameArray.length; j++){
            stdDevTotal += Math.pow(parseFloat(objArray[i][nameArray[j]] - mean), 2);
        }
    }

    var stdDev = Math.sqrt(stdDevTotal/counter);

    return roundToFloat((3 * (mean - med)/stdDev), decimalPlace);
}

exports.makeSingleKurtosis = (objArray, nameArray) => {
    var retValue = 0;
    var counter = 0;
    for (let i = 0; i < objArray.length; i++){
        for (let j = 0; j < nameArray.length; j++){
            retValue += parseInt(objArray[i][nameArray[j]]);
            counter++;
        }
    }
    var mean = parseFloat(retValue/counter);
    var p2Total = 0;
    var p4Total = 0;

    for (let i = 0; i < objArray.length; i++){
        for (let j = 0; j < nameArray.length; j++){
            p2Total += Math.pow(parseFloat(objArray[i][nameArray[j]] - mean), 2);
            p4Total += Math.pow(parseFloat(objArray[i][nameArray[j]] - mean), 4);
        }
    }

    return roundToFloat(parseFloat((p4Total/counter)/Math.pow((p2Total/counter), decimalPlace)-3), 2);
}
exports.makeSingleAverageSameMonthLastYear = (objArray, nameArray, dateArray, limitDate) => {
    var retValue = 0;
    var counter = 0;
    for (var i = 0; i < objArray.length; i++){
        for (var j = 0; j < nameArray.length; j++){
            var t = objArray[i][nameArray[j]];
            var s = objArray[i][dateArray[j]];
            s = s.replace(/'/g, "\"");
            var dates = JSON.parse(s);
            var scores = JSON.parse(t);
            for(var k = 0; k < dates.length; k++){
                var value = Date.parse(dates[k]);
                var valueDate = new Date(value);
                if(valueDate.getMonth() === limitDate.getMonth() && valueDate.getFullYear() === limitDate.getFullYear()){
                    retValue += parseFloat(scores[k]);
                    counter++;
                    break;
                }
            }
        }
    }
    return parseFloat(retValue)/counter;
}

exports.makeAverageFromDate = (objArray, nameArray, dateArray) => {
    var retArray = [];
    var counterArray = new Array(48).fill(0);
    var sumArray = []
    
    for (var i = 0; i < objArray.length; i++){
        for (var j = 0; j < nameArray.length; j++){
            for (var k = objArray[i][dateArray[j]].length-1; k >=0; k--){
                sumArray[j] = objArray[i][nameArray[j][k]];
                counterArray[j]++;
            }
            
        }
    }
    return retArray;

}

var verifyArrays = (objArray, nameArray, labelArray) => {
    if(Array.isArray(nameArray) && nameArray.length > 0 && Array.isArray(objArray) && objArray.length > 0 && Array.isArray(labelArray) && labelArray.length > 0
    && labelArray.length === nameArray.length){
        return true;
    }
    return false;
}

function median(values){
    if(values.length ===0) return 0;
  
    values.sort(function(a,b){
      return a-b;
    });
  
    var half = Math.floor(values.length / 2);
  
    if (values.length % 2)
      return values[half];
  
    return (values[half - 1] + values[half]) / 2.0;
  }

  function roundToFloat(num, place){
    if (place < 0){
      return 0;
    }
    var mulPlace = Math.pow(10, place);
    return Math.round(mulPlace*num)/mulPlace;
  }

//export default makeAverages;
