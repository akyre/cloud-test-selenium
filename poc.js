const {Builder, By} = require("selenium-webdriver");
const fs = require("fs");
 
function writeDataAs(name, data) {
    fs.writeFile(name, data, (err) => {
        if (err) throw err;
        console.log(name + " successfully saved.")
    });
}

(async function getArticles() {
    let driver = await new Builder().forBrowser("firefox").build();
    try {
        await driver.get("https://news.ycombinator.com");
        articles = await driver.findElement(By.className("itemlist"));
        titles = await articles.findElements(By.className("storylink"));
        authors = await articles.findElements(By.className("hnuser"));
    } finally {
        titles = await Promise.all(titles.map(title => title.getText()));
        writeDataAs("titles.json", JSON.stringify(titles, null, '\t'));
        authors = await Promise.all(authors.map(author => author.getText()));
        writeDataAs("authors.json", JSON.stringify(authors, null, '\t'));
        await driver.quit();
    }
})();
