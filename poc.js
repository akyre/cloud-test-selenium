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
        posts = await articles.findElements(By.className("storylink"));
        authors = await articles.findElements(By.className("hnuser"));
    } finally {
        posts = await Promise.all(posts.map(post => post.getText()));
        writeDataAs("posts.json", JSON.stringify(posts, null, '\t'));
        authors = await Promise.all(authors.map(author => author.getText()));
        writeDataAs("authors.json", JSON.stringify(authors, null, '\t'));
        await driver.quit();
    }
})();
