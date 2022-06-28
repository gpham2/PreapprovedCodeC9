

function createListString(list, valueGetter, delimiter = ' ', starting = '', combine = false) {
    const output = list
        .reduce((accum, item, index) => {
            return `${accum}${( combine || index > 0) ? delimiter : ''}${valueGetter(item)}`
        }, starting);
    return output;
}


module.exports = {createListString};