import { Merchant, PaymentRequest, PaymentResponse } from 'becash'


window.addEventListener('load', async () => {
    const merchantAddressField = document.getElementById('merchantAddress')! as HTMLInputElement
    const setMerchantAddress = document.getElementById('setMerchantAddress')! as HTMLButtonElement
    const amountBCH = document.getElementById('amountBCH')! as HTMLInputElement
    const makeRequest = document.getElementById('makeRequest')! as HTMLButtonElement
    const requestArea = document.getElementById('request')! as HTMLTextAreaElement
    const redeem = document.getElementById('redeem')! as HTMLButtonElement
    const responseArea = document.getElementById('response')! as HTMLTextAreaElement

    const merchantAddress = localStorage.getItem('be.cash/merchantAddress')
    let merchant: Merchant | undefined = undefined
    if (merchantAddress !== null) {
        merchant = await Merchant.fromMerchantAddress(merchantAddress)
        merchantAddressField.value = merchantAddress
    }

    const currentRequestJson = localStorage.getItem('be.cash/currentRequest')
    let currentRequest: PaymentRequest | undefined = undefined
    if (currentRequestJson !== null) {
        currentRequest = PaymentRequest.decode(currentRequestJson)
        requestArea.value = currentRequest.paymentRequestJson()
    }

    setMerchantAddress.addEventListener('click', async () => {
        merchant = await Merchant.fromMerchantAddress(merchantAddressField.value)
        localStorage.setItem('be.cash/merchantAddress', merchantAddressField.value)
    })

    makeRequest.addEventListener('click', () => {
        if (merchant === undefined)
            throw "Undefined merchant address"
        currentRequest = merchant.makePaymentRequest(+amountBCH.value)
        requestArea.value = currentRequest.paymentRequestJson()
        localStorage.setItem('be.cash/currentRequest', currentRequest.encode())
    })

    redeem.addEventListener('click', async () => {
        if (currentRequest === undefined) return
        const response = PaymentResponse.decode(responseArea.value)
        const result = await currentRequest.redeemResponse(response, 1000)
        console.log(result)
    })
})
