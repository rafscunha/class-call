


let UUID = null
let qrCodeSection = document.getElementById("section")



async function run(){
    await createQrCode()
    while (true){
        console.log(".")
        const flag = await verifyIfValidate()
        console.log(flag)
        if(!flag){
            console.log("qrcode") 
            await createQrCode()
        }
        await sleep(400)
        
    }
}

async function createQrCode(){
    const urlBase = 'http://localhost:3000/'
    const response = await fetch(urlBase, {mode:"cors", method:"GET"})
    const json_response = await response.json()
    UUID = json_response.uuid
    const urlToCall = `http://localhost:3000/assign/${UUID}`
    qrCodeSection.innerHTML = `<p>Chamada</p>`
    qrCodeSection.innerHTML += `<img src="https://api.qrserver.com/v1/create-qr-code/?data=${urlToCall}&amp;size=200x200" alt="${UUID}" title="${UUID}" />`
    qrCodeSection.innerHTML += `<a href="${urlToCall}">Link</a>`
}


async function verifyIfValidate(){
    console.log("validate")
    const urlBase = 'http://localhost:3000/'
    const response = await fetch(`${urlBase}${UUID}`,{method:"HEAD", mode:"cors"})
    return response.status == 200
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


run()

