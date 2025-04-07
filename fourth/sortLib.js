const SortUtility = {
    hasSparseElements: (array) => array.some((element) => element === undefined),

    comparator: (a, b, order) => (order === "asc" ? a > b : a < b),

    bubbleSort: (array, order) => {
        let compareCount = 0,
            swapCount = 0,
            len = array.length;
        for (let i = 0; i < len - 1; i++) {
            for (let j = 0; j < len - i - 1; j++) {
                compareCount++;
                if (SortUtility.comparator(array[j], array[j + 1], order)) {
                    const temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                    swapCount++;
                }
            }
        }
        console.log(`Bubble Sort: Порівнянь = ${compareCount}, обмінів = ${swapCount}`);
        return array;
    },

    selectionSort: (array, order) => {
        let compareCount = 0,
            swapCount = 0,
            len = array.length;
        for (let i = 0; i < len - 1; i++) {
            let selectedIdx = i;
            for (let j = i + 1; j < len; j++) {
                compareCount++;
                if (SortUtility.comparator(array[selectedIdx], array[j], order)) {
                    selectedIdx = j;
                }
            }
            if (selectedIdx !== i) {
                const temp = array[i];
                array[i] = array[selectedIdx];
                array[selectedIdx] = temp;
                swapCount++;
            }
        }
        console.log(`Selection Sort: Порівнянь = ${compareCount}, обмінів = ${swapCount}`);
        return array;
    },

    insertionSort: (array, order) => {
        let compareCount = 0,
            moveCount = 0,
            len = array.length;
        for (let i = 1; i < len; i++) {
            const key = array[i];
            let j = i - 1;
            while (j >= 0) {
                compareCount++;
                if (SortUtility.comparator(array[j], key, order)) {
                    array[j + 1] = array[j];
                    moveCount++;
                    j--;
                } else {
                    break;
                }
            }
            array[j + 1] = key;
        }
        console.log(`Insertion Sort: Порівнянь = ${compareCount}, переміщень = ${moveCount}`);
        return array;
    },

    shellSort: (array, order) => {
        let compareCount = 0,
            moveCount = 0,
            len = array.length,
            gap = Math.floor(len / 2);
        while (gap > 0) {
            for (let i = gap; i < len; i++) {
                const temp = array[i];
                let j = i;
                while (j >= gap) {
                    compareCount++;
                    if (SortUtility.comparator(array[j - gap], temp, order)) {
                        array[j] = array[j - gap];
                        moveCount++;
                        j -= gap;
                    } else {
                        break;
                    }
                }
                array[j] = temp;
            }
            gap = Math.floor(gap / 2);
        }
        console.log(`Shell Sort: Порівнянь = ${compareCount}, переміщень = ${moveCount}`);
        return array;
    },

    quickSort: (array, order) => {
        let compareCount = 0,
            swapCount = 0;

        const _quickSort = (items, left, right) => {
            if (left < right) {
                const pivotIndex = partition(items, left, right);
                _quickSort(items, left, pivotIndex - 1);
                _quickSort(items, pivotIndex + 1, right);
            }
        };

        const partition = (items, left, right) => {
            const pivot = items[right];
            let i = left - 1;
            for (let j = left; j < right; j++) {
                compareCount++;
                if (!SortUtility.comparator(items[j], pivot, order)) {
                    i++;
                    const temp = items[i];
                    items[i] = items[j];
                    items[j] = temp;
                    swapCount++;
                }
            }
            const temp = items[i + 1];
            items[i + 1] = items[right];
            items[right] = temp;
            swapCount++;
            return i + 1;
        };

        _quickSort(array, 0, array.length - 1);
        console.log(`Quick Sort: Порівнянь = ${compareCount}, обмінів = ${swapCount}`);
        return array;
    },

    sortWithValidation: (sortFn, array, order) => {
        if (SortUtility.hasSparseElements(array)) {
            console.log("Увага: масив містить undefined елементи. Сортування виконується для визначених значень, а undefined переміщуються в кінець.");
            const definedElements = array.filter((el) => el !== undefined);
            const sortedDefined = sortFn(definedElements, order);
            const undefinedCount = array.length - definedElements.length;
            for (let i = 0; i < undefinedCount; i++) {
                sortedDefined.push(undefined);
            }
            for (let i = 0; i < array.length; i++) {
                array[i] = sortedDefined[i];
            }
            return array;
        } else {
            return sortFn(array, order);
        }
    },

    bubbleSortWrapper: (array, order) => SortUtility.sortWithValidation(SortUtility.bubbleSort, array, order),
    selectionSortWrapper: (array, order) => SortUtility.sortWithValidation(SortUtility.selectionSort, array, order),
    insertionSortWrapper: (array, order) => SortUtility.sortWithValidation(SortUtility.insertionSort, array, order),
    shellSortWrapper: (array, order) => SortUtility.sortWithValidation(SortUtility.shellSort, array, order),
    quickSortWrapper: (array, order) => SortUtility.sortWithValidation(SortUtility.quickSort, array, order)
};
