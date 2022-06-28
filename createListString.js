// Creates a string list given an address
export function createListString(list, valueGetter, delimiter = ' ', starting = '', combine = false) {
    const output = list
        .reduce((accum, item, index) => {
            return `${accum}${( combine || index > 0) ? delimiter : ''}${valueGetter(item)}`
        }, starting);
    return output;
}

   
//  Example Usage //
//
//
//  const list = [
//       { item: { id: 1, name: 'circle' } },
//       { item: { id: 2, name: 'square' } },
//       { item: { id: 3, name: 'diamond' } },
//   ];
//
//            
//   const valueGetter = (item) => {item.item.name}
//   delimiter = ', '
//
//   const output = createListString(list, valueGetter, delimiter);
//
//   output => 'circle, square, diamond' //
             
