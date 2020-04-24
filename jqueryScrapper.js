const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  // const browser = await puppeteer.launch();
	const browser = await puppeteer.launch({headless: false}); // default is true
  const page = await browser.newPage();
  await page.goto('https://ahmed-badawy.com/cv/', {waitUntil: 'networkidle2'});

  await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'});
  
  
  const title = await page.evaluate(() => {
    const $ = window.$; //otherwise the transpiler will rename it and won't work
    console.log($('p').text());
    return $('h1').text();
  });
  console.log(title);


  const texts = await page.evaluate(() => {
    const $ = window.$; 
    let str = "";
    $("p").each((i,p)=>str+=($(p).text()+"\n"));
    return str;
  });
  printInFile('docs/texts.txt',texts);


  const headers = await page.evaluate(() => {
    const $ = window.$; 
    let str = "";
    $("h3").each((i,p)=>str+=($(p).text()+"\n"));
    return str;
  });
  printInFile('docs/headers.txt',headers);


  await page.close();
  await browser.close();
})();


function printInFile(file,text){
    fs.writeFile(file, text, function (err) {
        if (err) return console.log(err);
        console.log('texts saved...');
      });
}