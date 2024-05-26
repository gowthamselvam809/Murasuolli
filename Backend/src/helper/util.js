const excelEpoc = new Date(1900, 0, 0).getTime();
const crypto = require('crypto');
const fs = require("fs");
const msDay = 86400000;
const uuid = require("uuidv4");
const { StatusCodes } = require('http-status-codes');
const redis = require('redis');
const client = redis.createClient();

exports.ERROR = StatusCodes;

exports.getCurrentTimestamp = () => new Date().toISOString();

exports.getRandomString = () => uuid.fromString(crypto.randomBytes(20).toString("hex"));

exports.getRandomOtp = () => Math.floor(100000 + Math.random() * 900000);

exports.getOTPExpTime = () => new Date().getTime() + 5 * 60000;

exports.sortDataBasedOnTimestamp = function (j, data) {
    let orderedData = data;
    function getSortedData(i) {
        if (i < data.Items.length) {
            let today = new Date(data.Items[i].created_ts);
            let y = today.getFullYear();
            let m = today.getMonth() + 1;
            let newM = m < 12 ? '0' + m : m;
            let d = today.getDate();
            let newD = d < 10 ? '0' + d : d;
            let h = today.getHours();
            let newH = h < 10 ? '0' + h : h;
            let mt = today.getMinutes();
            let newMt = mt < 10 ? '0' + mt : mt;
            let sec = today.getSeconds();
            let newSec = sec < 10 ? '0' + sec : sec;
            let ts = y + "" + newM + "" + newD + "" + newH + "" + newMt + "" + newSec;
            let timeerds = parseInt(ts);
            data.Items[i].order_id = timeerds;
            i++;
            getSortedData(i);
        } else {
            data.Items.sort(function (a, b) {
                return b.order_id - a.order_id;
            });
            return orderedData;
        }
    }
    getSortedData(j);
    return orderedData;
}

exports.strToLowercase = (str) => str.toLowerCase();

exports.isNullOrEmpty = (str) => !str;

exports.isEmptyObject = (val) => this.isNullOrEmpty(val) || (val && Object.keys(val).length === 0);

exports.isEmptyArray = (val) => val && !val.length;

exports.removeDuplicates = (arr) => [...new Set(arr)];

exports.reverse = (arr) => [...arr].reverse();

exports.extractValue = (arr, prop) => removeDuplicates(arr.map(item => item[prop]));

exports.parseStr = (str, replaceStr = "") => this.isNullOrEmpty(str) ? replaceStr : str;

exports.hasText = (str) => !!(str && str.trim() !== "");

exports.hasNoText = (str) => !(str && str.trim() !== "");

// Ex: sortArrayOfObjects(array, "id", "ascending"); direction => 'ascending' | 'descending' | 'none'
exports.sortArrayOfObjects = (arr, keyToSort, direction) => {
    if (direction === 'none') return arr;

    const compare = (objectA, objectB) => {
        const valueA = objectA[keyToSort]
        const valueB = objectB[keyToSort]

        if (valueA === valueB) return 0;

        if (valueA > valueB) {
            return direction === 'ascending' ? 1 : -1
        } else {
            return direction === 'ascending' ? -1 : 1
        }
    }

    return arr.slice().sort(compare)
}

exports.sortByDate = (arr, keyToSort) => arr.sort((a, b) => new Date(b[keyToSort]) - new Date(a[keyToSort]))

exports.getExtType = function (file_type) {
    let file_ext;
    switch (file_type) {
        case 'image/jpeg':
            file_ext = '.jpg';
            break;
        case 'text/plain':
            file_ext = '.txt';
            break;
        case 'text/html':
            file_ext = '.html';
            break;
        case 'text/css':
            file_ext = '.css';
            break;
        case 'image/png':
            file_ext = '.png';
            break;
        case 'application/pdf':
            file_ext = '.pdf';
            break;
        case 'application/json':
            file_ext = '.json';
            break;
        case 'application/octet-stream':
            file_ext = '.docx';
            break;
        case 'application/msword':
            file_ext = '.doc';
            break;
        case 'application/vnd.ms-excel':
            file_ext = '.xls';
            break;
        case 'application/vnd.ms-powerpoint':
            file_ext = '.ppt';
            break;

        case "application/zip":
            file_ext = ".zip";
            break;

        case "application/x-zip-compressed":
            file_ext = ".zip";
            break;

        case "multipart/x-zip":
            file_ext = ".zip"
            break;

        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
            file_ext = '.xls';
            break;
    }
    return file_ext;
}

exports.getMimeType = function (file_ext) {
    let file_mime;
    switch (file_ext) {
        case '.jpg':
            file_mime = 'image/jpeg';
            break;
        case '.jpeg':
            file_mime = 'image/jpeg';
            break;
        case '.txt':
            file_mime = 'text/plain';
            break;
        case '.html':
            file_mime = 'text/html';
            break;
        case '.css':
            file_mime = 'text/css';
            break;
        case '.png':
            file_mime = 'image/png';
            break;
        case '.pdf':
            file_mime = 'application/pdf';
            break;
        case '.json':
            file_mime = 'application/json';
            break;
        case '.docx':
            file_mime = 'application/octet-stream';
            break;
        case '.doc':
            file_mime = 'application/msword';
            break;
        case '.xls':
            file_mime = 'application/vnd.ms-excel';
            break;
        case '.xlsx':
            file_mime = 'application/vnd.ms-excel';
            break;
        case '.ppt':
            file_mime = 'application/vnd.ms-powerpoint';
            break;

        case '.zip':
            file_mime = 'application/zip';
            break;
    }
    return file_mime;
}

exports.excelDateToJavascriptDate = (excelDate) => new Date(excelEpoc + excelDate * msDay);

exports.convertNumberToAlphabet = (number) => (number + 9).toString(36).toUpperCase();

exports.timeDifference = function (date1, date2) {
    let difference = date1.getTime() - date2.getTime();
    return Math.floor(difference / 1000 / 60 / 60 / 24);
}

exports.range = function (start, stop, step) {
    if (typeof stop == 'undefined') {
        // one param defined
        stop = start;
        start = 0;
    }

    if (typeof step == 'undefined') {
        step = 1;
    }

    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
        return [];
    }

    let result = [];
    for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
        result.push(i);
    }

    return result;
};

exports.getDateAndTime = function () {
    let ts = new Date().toISOString();
    let date = ts.split("T")[0];
    let time = ts.split("T")[1].replace("Z", "+00");

    return `${date} ${time}`
}

exports.queryString = (params) => querystring.stringify(params);

exports.getTimeDifferenceInMinutes = (timeStamp, differenceTimeStamp) => {
    const timestamp1 = timeStamp;
    const timestamp2 = differenceTimeStamp;

    const date1 = new Date(timestamp1);
    const date2 = new Date(timestamp2);

    const differenceInMilliseconds = Math.abs(date1 - date2);
    const differenceInMinutes = Math.floor(differenceInMilliseconds / (1000 * 60));

    return differenceInMinutes;
}

exports.getTimeDifferenceInSeconds = (timeStamp, differenceTimeStamp) => {
    const timestamp1 = timeStamp;
    const timestamp2 = differenceTimeStamp;

    const date1 = new Date(timestamp1);
    const date2 = new Date(timestamp2);

    const differenceInMilliseconds = date1 - date2;
    const differenceInSeconds = Math.floor(differenceInMilliseconds / (1000));

    return differenceInSeconds;
}

exports.generateRandomString = () => {
    const characters = process.env.RANDOM_STRING;
    let result = '';

    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        const randomCharacter = characters.charAt(randomIndex);
        result += randomCharacter;
    }

    return result;
}

exports.getTimestampWithMinutesBuffer = (bufferTime) => {
    const currentTime = new Date();
    const futureTime = new Date(currentTime.getTime() + bufferTime * 60000);
    // 20 minutes * 60 seconds * 1000 milliseconds

    const futureTimestamp = futureTime.toISOString();
    return futureTimestamp;
}

exports.getRandomArrayElements = (array, numElements) => {

    const shuffledArray = array.slice();

    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }

    return shuffledArray.slice(0, numElements);
}

exports.getIsoString = (time) => new Date(time).toISOString();

exports.fortmatData = (data) => JSON.stringify(data, null, 2);

exports.readFile = async filePath => await fs.promises.readFile(filePath, 'utf8');

exports.formatResponse = (result) => ({ "Items": result });

exports.formatResponseForOAuth = (result) => ({ status: StatusCodes.OK, body: JSON.stringify(result) });

exports.formatErrorResponse = (errorMessage, status = "") => {
    let error = new Error(errorMessage)
    error.status = status
    return error;
};

exports.formatErrorResponseForOAuth = (status = 500, errorMessage) => ({ status: status, body: errorMessage });

// Ex: var arr = [1, 2, 3]; var match = [2, 4]; => returns true.
// Ex: var arr = [1, 2, 3]; var match = [4, 5]; => returns false.
exports.hasMatch = (arr, match) => arr.some(a => match.some(m => a === m));

// Ex: var arr = [1, 2, 3]; var match = [2, 3]; => returns true.
// Ex: var arr = [1, 2, 3]; var match = [3, 5]; => returns false.
exports.hasEveryMatch = (arr, match) => arr.some(a => match.some(m => a === m)); // TODO  

exports.formatDateWithShortMonthAndDay = (timeStamp) => new Date(timeStamp).toLocaleString('en-us', { month: 'short', day: 'numeric' });

exports.formatDateWithShortMonthDayAndYear = (timeStamp) => new Date(timeStamp).toLocaleString('en-us', { month: 'short', day: 'numeric', year: 'numeric' });

exports.getMonthNames = (isShort = true) => {
    let currentDate = new Date();
    return Array.from(new Array(12), (_, monthIdx) => {
        currentDate.setMonth(monthIdx);
        return currentDate.toLocaleString("en-US", { month: isShort ? "short" : "long" })
    });
}

exports.countElement = (marking, year) => {
    let arr = [], regex = new RegExp(year)
    marking.forEach(marking => {
        marking.category.forEach(category => {
            category.description.forEach(description => {
                arr.push(description.markings.find(m => regex.test(m)) ? description.markings.find(m => regex.test(m)) : '');
            });
        });
    });
    const elementCount = {};
    for (const element of arr) {
        if (elementCount[element]) {
            elementCount[element]++;
        } else {
            elementCount[element] = 1;
        }
    }
    return elementCount;
}

exports.subtractDays = (dateStr, days) => {
    let dateObj = new Date(dateStr);
    dateObj.setDate(dateObj.getDate() - days);
    let newDateStr = dateObj.toISOString().split('T')[0];
    return newDateStr;
}

exports.setRedis = (key, value) => client.set(key, value, (err, reply) => {
    if (err) {
        console.error('Error storing data:', err);
    } else {
        console.log('Data stored successfully:', reply);
    }
});

exports.isValidate = (item) => {
    return parseInt(item) <= Math.pow(5, 2) * 8 * 2;
}

exports.getRedis = (key) => client.get(key, (err, reply) => {
    if (err) {
        console.error('Error retrieving data:', err);
    } else {
        console.log('Retrieved data:', reply);
        return reply;
    }
});

exports.ensureGetCopiesFunctionExists = async (sequelize, dbName) => {
    const checkFunctionQuery = `
        IF NOT EXISTS (
            SELECT * FROM sys.objects 
            WHERE object_id = OBJECT_ID(N'[dbo].[getCopies]') 
            AND type IN (N'FN', N'IF', N'TF', N'FS', N'FT')
        )
        BEGIN
            EXEC('
            CREATE FUNCTION [dbo].[getCopies] (@dt varchar(15), @party varchar(15))
            RETURNS INT
            AS
            BEGIN
                DECLARE @copies int;
                SELECT @copies = e.copies
                FROM dbo.ISSUES e
                WHERE e.partycode = @party AND e.issdate = @dt;
                RETURN @copies;
            END;')
        END;
    `;

    try {
        await sequelize.query(checkFunctionQuery);
        console.log(`Ensured that getCopies function exists in ${dbName}`);
    } catch (error) {
        console.error('Error ensuring getCopies function exists:', error);
        throw error;
    }
}
