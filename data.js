let u;
async function getData() {
    try {
        const data = await fetch(`./jsonData.json`)
        u = await data.json()
        return u
    }
    catch {
        alert(`Data Nu Poate Fi Accesata`)
    }
}

export { getData, u }
