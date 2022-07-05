let algorithmMap = {
    1: 'Bubble Sort',
    2: 'Heap Sort',
    3: 'Insertion Sort',
    4: 'Merge Sort',
}

// * default selected algorithm
let selectedAlgo = 1;

// * selecting bubble sort as default algorithn
selectAlgorithm(selectedAlgo);

let defaultSize = 60;
let defaultMin = 1;
let defaultMax = 100;

// * default data
let generatedData = generateRandomArray(defaultSize, defaultMin, defaultMax);
var numbers = generatedData['array'];
var largest = generatedData['largest'];
var smallest = generatedData['smallest'];

displayArray(numbers, largest, smallest, defaultMin, defaultMax);

// * called when user sets (new array size) or (new calue range)
// * the ways it works, 
// * if user provided new size, the min and max equals the last chosen or default value
// * 
function setArrayAndValueConstraintsAndDisplay(size = defaultSize, min = defaultMin, max = defaultMax) {    

    // * generating new array with new constraints
    generatedData = generateRandomArray(size, min, max);
    numbers = generatedData['array'];
    largest = generatedData['largest'];
    smallest = generatedData['smallest'];

    clearScreen();
    displayArray(numbers, largest, smallest, min, max);

    // * setting new values
    defaultSize = size;
    defaultMin = min;
    defaultMax = max;
    
}

function generateArrayWithCustomSize() {
    let customSize = document.getElementById('custom-size-input').value;

    if (customSize > 200) {
        return;
    }

    setArrayAndValueConstraintsAndDisplay(size = customSize);
}

function generateArrayWithCustomRange() {
    let customMax = parseInt(document.getElementById('custom-range-input').value);

    setArrayAndValueConstraintsAndDisplay(size = defaultSize, min = defaultMin, max = customMax);
}

function generateRandomArray(size = defaultSize, min = defaultMin, max = defaultMax) {
    let array = [];
    let largest = 0;
    let smallest = max;

    for (let i = 0; i < size; i++) {
        let randomVal = (Math.random() * max) + 1;

        // * if val greater than max
        // ? sometimes happens due to rounding
        randomVal = randomVal > max ? randomVal -= 1 : randomVal;

        array.push(randomVal);

        if (randomVal > largest) {
            largest = array[i];
        }

        if (randomVal < smallest) {
            smallest = randomVal;
        }
    }

    console.log(`generated random array of size ${size}`)

    return {
        'array': array,
        'largest': largest,
        'smallest': smallest,
    };
}

function clearScreen() {
    let test_data_container = document.getElementById('test-data-container');
    test_data_container.innerHTML = " ";
}

// * this function displays the array visualy on the screen
// * with largest value taking 550px,
// * and all others relative to it
function displayArray(array, largest, smallest, min, max) {

    // * adapting width of the bars
    let padding = getAppropriatePadding(array.length);

    // * playground
    let test_data_container = document.getElementById('test-data-container');

    for (let i = 0; i < array.length; i++) {

        let new_data_node = `<div id="tst-d${i}" class="test-data">
        <div class="tooltiptext">${array[i].toFixed(1)}</div>
        </div>`;

        test_data_container.innerHTML += new_data_node;

        let height_relative_to_largest = (array[i] / largest) * 550;

        document.getElementById(`tst-d${i}`).style.height = height_relative_to_largest + 'px';
        document.getElementById(`tst-d${i}`).style.padding = padding;
    }

    // * displaying other data
    document.getElementById('array-size').innerHTML = array.length;
    document.getElementById('value-range').innerHTML = `Between ${min} to ${max}`;
    document.getElementById('largest-value').innerHTML = largest.toFixed(1);
    document.getElementById('smallest-value').innerHTML = smallest.toFixed(1);

}

function getAppropriatePadding(size) {
    
    if (size <= 30) {
        return "0px 15px"        
    } else if (size <= 40) {
        return "0px 12px"
    } else if (size <= 60) {
        return "0px 9px"
    } else if (size <= 80) {
        return "0px 6px"
    } else if (size <= 100) {
        return "0px 5px"
    } else if (size <= 120) {
        return "0px 4px"
    } else if (size <= 150) {
        return "0px 3px"
    } else {
        return "0px 2px"
    }

}

// * traverse through array
// async function traverseArray(array) {
//     for (let i = 0; i < array.length; i++) {
//         let data_node = document.getElementById(`tst-d${i}`);

//         // change color to black
//         data_node.style.backgroundColor = '#1e1e1e';

//         await sleep(30);

//         // change back to normal
//         data_node.style.backgroundColor = '#3CBEB4';
//     }
// }

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


// * for selecting and de-selecting an algorithm
function selectAlgorithm(algoNumber) {

    // * 1) first re-enable the previous selected Algorithm button
    let element = document.getElementById('algo-' + selectedAlgo);
    element.classList.remove('disabled');
    element.classList.remove('btn-outline-light');
    element.classList.add('btn-secondary');

    // * 2) disable button of the new selected algo
    element = document.getElementById('algo-' + algoNumber);
    element.classList.add('disabled');
    element.classList.remove('btn-secondary');
    element.classList.remove('active');
    element.classList.add('btn-outline-light');
    element.style.boxShadow = "none";

    // * 3) assign new algoritm number
    selectedAlgo = algoNumber;

    console.log(`selected algo-${algoNumber} (${algorithmMap[algoNumber]})`)
}

async function startAlgo() {

    // * disable start and reset button
    let start_btn = document.getElementById('start-btn');
    // let reset_btn = document.getElementById('reset-btn');

    start_btn.classList.add('disabled');
    // reset_btn.classList.add('disabled');

    start_btn.classList.remove('btn-success');
    // reset_btn.classList.remove('btn-warning');

    start_btn.classList.remove('active');

    start_btn.classList.add('btn-outline-success');
    // reset_btn.classList.add('btn-outline-warning');

    start_btn.style.boxShadow = "none";

    // * traverse array
    await performBubbleSort(numbers);
    // await bubbleSort(numbers);

    // * re-enable start and reset button
    start_btn.classList.remove('disabled');
    // reset_btn.classList.remove('disabled');

    start_btn.classList.remove('btn-outline-success');
    // reset_btn.classList.remove('btn-outline-warning');

    start_btn.classList.add('btn-success');
    // reset_btn.classList.add('btn-warning');

}


// ! ALGORITHMS
async function performBubbleSort(array) {
    
    let lastSorted = array.length - 1;
    let sorted = 1;
    
    for (let times = 0; times < array.length; times++) {

        let swapped = false;
        
        for (let i = 0; i < array.length - sorted; i++) {
            let data_node1 = document.getElementById(`tst-d${i}`);
            let data_node2 = document.getElementById(`tst-d${i + 1}`);
            
            let node1_height = data_node1.style.height;
            let node2_height = data_node2.style.height;

            let node1_innerHTML = data_node1.innerHTML;
            let node2_innerHTML = data_node2.innerHTML;

            // * change color to black
            data_node1.style.backgroundColor = '#ffc107';
            data_node2.style.backgroundColor = '#ffc107';
    
            await sleep(10);

            if (array[i] > array[i + 1]) {
                
                let temp = array[i];
    
                array[i] = array[i + 1];
                data_node1.style.height = node2_height;
                data_node1.innerHTML = node2_innerHTML;
    
                array[i + 1] = temp;
                data_node2.style.height = node1_height;
                data_node2.innerHTML = node1_innerHTML;

                swapped = true;
                
                // * change back to normal
                data_node1.style.backgroundColor = '#3CBEB4';
                data_node2.style.backgroundColor = '#3CBEB4';

            } else {
                data_node1.style.backgroundColor = '#6610f2';
                data_node2.style.backgroundColor = '#6610f2';
            }
        
        }

        // if not swapped
        if (!swapped) {
            break;
        }

        sorted = sorted + 1;
        
        document.getElementById(`tst-d${lastSorted}`).style.backgroundColor = "#6610f2";
        lastSorted = lastSorted - 1;
    }

}
