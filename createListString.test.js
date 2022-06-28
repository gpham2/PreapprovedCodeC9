//import createListString from './createListString.js'
const {createListString} = require('./createListString.js');

const testList = [
    
    // Test0: basic string output
    {
        test:    
        [
            {
                item: {
                    id: 1,
                    name: 'circle'
                    }
            },
            {
                item: {
                    id: 2,
                    name: 'square'
                }
            },
            {
                item: {
                    id: 3,
                    name: 'diamond'
                }
            }
        ]        
        ,
        solution:  
        {
            valueGetter: '(item) => item.item.name',
            delimiter: ' ',
            expected: 'circle square diamond',
            starting: '',
            combine: false
        } 
    },

    // Test1: basic complex addresses
    {
        test:    
        [
            {
                item: {
                    id: 1,
                    name: {
                            first: 'Kyle',
                            last: 'Jons'
                        }
                    }
            },
            {
                item: {
                    id: 2,
                    name: {
                        first: 'Bob',
                        last: 'Boon'
                    }
                }
            },
            {
                item: {
                    id: 3,
                    name: {
                        first: 'Boon',
                        last: 'Jes'
                    }
                }
            },
            
        ]        
        ,
        solution:  
        {
            valueGetter: '(item) => item.item.name.first',
            delimiter: ', ',
            expected: 'Kyle, Bob, Boon',
            starting: '',
            combine: false,
        } 
    },

    // Test2: non-empty starting value
    {
        test:    
        [
            {
                item: {
                    id: '4',
                    }
            },
            {
                item: {
                    id: '5',
                }
            },
            {
                item: {
                    id: '6',
                }
            },
            
        ]        
        ,
        solution:  
        {
            valueGetter: '(item) => item.item.id',
            delimiter: ', ',
            expected: '1, 2, 3, 4, 5, 6',
            starting: '1, 2, 3',
            combine: true
        } 
    },

    // Test3: using the combine feature
    {
        test:    
        [
            {
                item: {
                    id: 1,
                    name: {
                            first: 'Roll',
                            last: 'Jons'
                        }
                    }
            },
            {
                item: {
                    id: 2,
                    name: {
                        first: 'Royce',
                        last: 'Boon'
                    }
                }
            },
            {
                item: {
                    id: 3,
                    name: {
                        first: 'Robby',
                        last: 'Jes'
                    }
                }
            },
            
        ]        
        ,
        solution:  
        {
            valueGetter: '(item) => item.item.name.first',
            delimiter: '! ',
            expected: 'Watch this: Roll! Royce! Robby',
            starting: 'Watch this: ',
            combine: false,
        } 
    },

    // Test4: trying escape characters like \n
    {
        test:    
        [
            {
                item: {
                    id: '1',
                    }
            },
            {
                item: {
                    id: '2',
                }
            },
            {
                item: {
                    id: '3',
                }
            },
            
        ]        
        ,
        solution:  
        {
            valueGetter: '(item) => item.item.id',
            delimiter: '\n',
            expected: '\n1\n2\n3',
            starting: '',
            combine: true
        } 
    },

    // Test5: using integers instead of strings
    {
        test:    
        [
            {
                item: {
                    id: 44,
                    }
            },
            {
                item: {
                    id: 55,
                }
            },
            {
                item: {
                    id: 66,
                }
            },
            
        ]        
        ,
        solution:  
        {
            valueGetter: '(item) => item.item.id',
            delimiter: '\t',
            expected: '44\t55\t66',
            starting: '',
            combine: false
        } 
    },

    // Test6: mixing in integers with strings
    {
        test:    
        [
            {
                item: {
                    id: '1',
                    }
            },
            {
                item: {
                    id: 2,
                }
            },
            {
                item: {
                    id: '3',
                }
            },
            
        ]        
        ,
        solution:  
        {
            valueGetter: '(item) => item.item.id',
            delimiter: '\n\t',
            expected: '1\n\t2\n\t3',
            starting: '',
            combine: false
        } 
    },

    // Test7: all empty
    {
        test:    
        [
            {
                item: {
                    id: '',
                    }
            },
            {
                item: {
                    id: '',
                }
            },
            {
                item: {
                    id: '',
                }
            },
            
        ]        
        ,
        solution:  
        {
            valueGetter: '(item) => item.item.id',
            delimiter: '',
            expected: '',
            starting: '',
            combine: false
        } 
    },

];




for (let i = 0; i < testList.length; i++) {
    test(`Test ${i}:`, () => {
        expect(
            createListString(
                testList[i].test,
                eval(testList[i].solution.valueGetter),
                testList[i].solution.delimiter,
                testList[i].solution.starting,
                testList[i].solution.combine)
        )
        .toBe(testList[i].solution.expected);
    });
}

