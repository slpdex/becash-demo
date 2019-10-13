import { Wallet } from 'becash'

window.addEventListener('load', async () => {
    const wallet = await Wallet.generateOrLoad()
    const genesisAddressField = document.getElementById('genesisAddress')! as HTMLInputElement
    const nukeButton = document.getElementById('nuke')! as HTMLButtonElement
    const requestArea = document.getElementById('request')! as HTMLTextAreaElement
    const responseArea = document.getElementById('response')! as HTMLTextAreaElement
    const pay = document.getElementById('pay')! as HTMLTextAreaElement

    const sweepAddressField = document.getElementById('sweepAddress')! as HTMLInputElement
    const sweepButton = document.getElementById('sweep')! as HTMLButtonElement

    genesisAddressField.value = wallet.offlineGenesisAddress()

    pay.addEventListener('click', () => {
        const response = wallet.payOfflineJson(requestArea.value)
        responseArea.value = response.encode()
        wallet.saveToStorage()
    })

    sweepButton.addEventListener('click', async () => {
        const response = await wallet.sweepToOnline(sweepAddressField.value, 1000)
        console.log(response)
    })

    nukeButton.addEventListener('click', () => {
        if (confirm('really nuke your wallet?')) {
            localStorage.removeItem('be.cash/secret')
            localStorage.removeItem('be.cash/nonce')
            location.reload()
        }
    })
})
