(() => {
    const domContent = document.querySelectorAll(".a-offscreen");
    let sum = 0;
    for (const element of domContent) {
        if (element.innerText.includes('$')) {
            const converted = Number(element.innerText.replace(/[^0-9.-]+/g,""));
            sum += converted;
        }
    }
    
    return averagePrice = sum / domContent.length;
})();