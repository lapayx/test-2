export function loadData() {
    return new Promise((resolve, reject) => {
        fetch("http://localhost:5400/api/user")
            .then((data) => data.json())
            .then((data) => resolve(data));
    });
}

export function saveBatch(data) {
    return new Promise((resolve, reject) => {
        fetch("http://localhost:5400/api/user/batchChnage", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        }).then((e) => {
            if (e.ok) {
                resolve();
            } else {
                reject();
            }
        });
    });
}
