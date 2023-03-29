let UUID = null
let qrCodeSection = document.getElementById("section")
let listAlunos = document.getElementById("table-students")


const ngrokLink = window.prompt("ngrok link", "link")

async function run(){
    await createQrCode()
    while (true){
        const flag = await verifyIfValidate()
        if(!flag){
            await createQrCode()
        }
        await sleep(500)   
    }
}


function addStudant(name, ra, time){
    const newElement = 
    `
    <tr>
        <td class="table-name">${name}</td>
        <td class="table-ra">${ra}</td>
        <td class="table-hora">${time}</td>
    </tr>
    `
    listAlunos.innerHTML = newElement + listAlunos.innerHTML
}



async function createQrCode(){
    const response = await fetch(ngrokLink, {mode:"cors", method:"GET"})
    const json_response = await response.json()
    UUID = json_response.uuid
    const urlToCall = `${ngrokLink}/assign/${UUID}`
    qrCodeSection.innerHTML = `<p>Chamada</p>`
    qrCodeSection.innerHTML += `<img src="https://api.qrserver.com/v1/create-qr-code/?data=${urlToCall}&amp;size=300x300" alt="${UUID}" title="${UUID}" />`
    qrCodeSection.innerHTML += `<a href="${urlToCall}">Link</a>`
}


async function verifyIfValidate(){
    const response = await fetch(`${ngrokLink}/validate/${UUID}`,{method:"GET", mode:"cors"})
    if (response.status == 200){
        return true
    }else{
        const response_json = await response.json()
        addStudant(response_json.name, response_json.ra, response_json.time)
        return false
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


run()

