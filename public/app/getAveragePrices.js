(() => {
    const domContent = document.querySelectorAll(".a-offscreen");
    const searchTerm = document.title.replace('Amazon.com : ','');
    let sum = 0;
    for (const element of domContent) {
        if (element.innerText.includes('$')) {
            const converted = Number(element.innerText.replace(/[^0-9.-]+/g,""));
            sum += converted;
        }
    }

    return { searchTerm, averagePrice: sum / domContent.length }
})();