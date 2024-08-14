//your JS code here. If required.
function getRandomTime(min, max) {
    return Math.random() * (max - min) + min;
}

// Function to create a promise that resolves after a random time between 1 and 3 seconds
function createPromise(index) {
    const time = getRandomTime(1, 3).toFixed(3); // Random time in seconds with 3 decimal places
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ promise: `Promise ${index + 1}`, time: time });
        }, time * 1000); // Convert seconds to milliseconds
    });
}

// Create 3 promises
const promises = [createPromise(0), createPromise(1), createPromise(2)];

// Store the start time
const startTime = performance.now();

// Add a row indicating loading state
const table = document.getElementById('resultTable');

// Wait for all promises to resolve
Promise.all(promises).then((results) => {
    // Remove the loading row
    table.innerHTML = '';

    // Populate the table with results
    let totalTime = 0;
    results.forEach((result, index) => {
        totalTime += parseFloat(result.time);
        const row = table.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        cell1.textContent = result.promise;
        cell2.textContent = `${result.time} seconds`;
    });

    // Calculate the total time taken
    const endTime = (performance.now() - startTime) / 1000; // Convert ms to seconds
    const row = table.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    cell1.textContent = 'Total';
    cell2.textContent = `${endTime.toFixed(3)} seconds`;
});
