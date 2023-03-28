let primaryFont = "50px 'Montserrat'"
let secondaryFont = "30px 'Montserrat'"
let bgColor = "lightsteelblue"

function getTextProduct(product) {
    return {
        textName: product.name.length > 15 ? product.name.slice(0, 12) + '...' : product.name,
        textPrice: '$ ' + product.price.toString(),
        textQuantity: 'C: ' +  product.quantity.toString()
    }
}

function initialConfig(canvas, img){
    canvas.setAttribute('width', img.width)
    canvas.setAttribute('height', img.height)

    let ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0)
    ctx.textBaseline = 'middle'
    ctx.font = primaryFont
    return ctx
}

function insertBgPrimary(ctx, img, textName){
    let textNameWidth = ctx.measureText(textName).width
    ctx.globalCompositeOperation = 'screen'
    ctx.fillStyle = bgColor
    ctx.fillRect(10, img.height - 60, textNameWidth + 10, 50)
}

function insertBgSecond(ctx, textPrice, textQuantity){
    ctx.font = secondaryFont
    let textPriceWidth = ctx.measureText(textPrice).width
    let textQuantityWidth = ctx.measureText(textQuantity).width
    ctx.fillRect(10, 10, Math.max(textPriceWidth, textQuantityWidth) + 10, 65);
}

function insertPrimaryText(ctx, textName, img){
    ctx.font = primaryFont
    ctx.fillText(textName, 10, img.height - 30)
}

function insertSecondaryText(ctx, textPrice, textQuantity){
    ctx.font = secondaryFont
    ctx.fillText(textPrice, 10, 30)
    ctx.fillText(textQuantity, 10, 60)
}

export const useImageWithData = (product) => {
    let canvas = document.createElement('canvas')
    let img = new Image()

    let { textName, textPrice, textQuantity } = getTextProduct(product)

    img.src = product.imageData

    let ctx = initialConfig(canvas, img)

    ctx.save()
    ctx.beginPath()
    
    insertBgPrimary(ctx, img, textName)
    insertBgSecond(ctx, textPrice, textQuantity)
    
    ctx.closePath()
    ctx.restore()

    insertPrimaryText(ctx, textName, img)
    insertSecondaryText(ctx, textPrice, textQuantity)

    return canvas.toDataURL('image/jpeg')
}
