import { Wallet } from 'becash'

window.addEventListener('load', async () => {
    const wallet = await Wallet.generateOrLoad()
    console.log('address', wallet.offlineGenesisAddress())
    const requestArea = document.getElementById('request')! as HTMLTextAreaElement
    const responseArea = document.getElementById('response')! as HTMLTextAreaElement
    const pay = document.getElementById('pay')! as HTMLTextAreaElement

    const sweepAddressField = document.getElementById('sweepAddress')! as HTMLInputElement
    const sweepButton = document.getElementById('sweep')! as HTMLButtonElement

    pay.addEventListener('click', () => {
        const response = wallet.payOfflineJson(requestArea.value)
        responseArea.value = response.encode()
        wallet.saveToStorage()
    })

    sweepButton.addEventListener('click', async () => {
        const response = await wallet.sweepToOnline(sweepAddressField.value, 1000)
        console.log(response)
    })
})
