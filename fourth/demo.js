const display = (text) => {
    const outputArea = document.getElementById("output");
    const pre = document.createElement("pre");
    pre.textContent = text;
    outputArea.appendChild(pre);
};

const createDenseArray = (size) => {
    const arr = [];
    for (let i = 0; i < size; i++) {
        arr.push(Math.floor(Math.random() * 500) + 1);
    }
    return arr;
};

const createSparseArray = (size) => {
    const arr = createDenseArray(size);
    // Позначимо деякі індекси як undefined
    [10, 30, 55, 70, 90].forEach((index) => {
        arr[index] = undefined;
    });
    return arr;
};

const duplicateArray = (arr) => arr.slice();

window.onload = () => {
    display("---> Демонстрація на нерозрідженому масиві <---");
    const denseArray = createDenseArray(100);
    display("Початковий масив:");
    display(JSON.stringify(denseArray));

    let tempArr;

    tempArr = duplicateArray(denseArray);
    display("Bubble Sort (asc):");
    display(JSON.stringify(SortUtility.bubbleSortWrapper(tempArr, "asc")));

    tempArr = duplicateArray(denseArray);
    display("Selection Sort (asc):");
    display(JSON.stringify(SortUtility.selectionSortWrapper(tempArr, "asc")));

    tempArr = duplicateArray(denseArray);
    display("Insertion Sort (asc):");
    display(JSON.stringify(SortUtility.insertionSortWrapper(tempArr, "asc")));

    tempArr = duplicateArray(denseArray);
    display("Shell Sort (asc):");
    display(JSON.stringify(SortUtility.shellSortWrapper(tempArr, "asc")));

    tempArr = duplicateArray(denseArray);
    display("Quick Sort (asc):");
    display(JSON.stringify(SortUtility.quickSortWrapper(tempArr, "asc")));

    display("---> Демонстрація на розрідженому масиві <---");
    const sparseArray = createSparseArray(100);
    display("Початковий розріджений масив:");
    display(JSON.stringify(sparseArray));

    tempArr = duplicateArray(sparseArray);
    display("Bubble Sort (desc):");
    display(JSON.stringify(SortUtility.bubbleSortWrapper(tempArr, "desc")));

    tempArr = duplicateArray(sparseArray);
    display("Selection Sort (desc):");
    display(JSON.stringify(SortUtility.selectionSortWrapper(tempArr, "desc")));

    tempArr = duplicateArray(sparseArray);
    display("Insertion Sort (desc):");
    display(JSON.stringify(SortUtility.insertionSortWrapper(tempArr, "desc")));

    tempArr = duplicateArray(sparseArray);
    display("Shell Sort (desc):");
    display(JSON.stringify(SortUtility.shellSortWrapper(tempArr, "desc")));

    tempArr = duplicateArray(sparseArray);
    display("Quick Sort (desc):");
    display(JSON.stringify(SortUtility.quickSortWrapper(tempArr, "desc")));
};
