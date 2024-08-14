document.addEventListener('DOMContentLoaded', () => {
    const getRandomTime = (min, max) => Math.random() * (max - min) + min;

    const createPromise = (index) => {
        const time = getRandomTime(1, 3).toFixed(3);
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ promise: `Promise ${index + 1}`, time: time });
            }, time * 1000);
        });
    };

    const promises = [createPromise(0), createPromise(1), createPromise(2)];
    const startTime = performance.now();
    const table = document.getElementById('resultTable');

    Promise.all(promises)
        .then((results) => {
            table.innerHTML = '';
            let totalTime = 0;
            results.forEach((result) => {
                totalTime += parseFloat(result.time);
                const row = table.insertRow();
                const cell1 = row.insertCell(0);
                const cell2 = row.insertCell(1);
                cell1.textContent = result.promise;
                cell2.textContent = `${result.time} seconds`;
            });

            const endTime = (performance.now() - startTime) / 1000;
            const row = table.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            cell1.textContent = 'Total';
            cell2.textContent = `${endTime.toFixed(3)} seconds`;
        })
        .catch((error) => {
            console.error('An error occurred:', error);
        });
});
