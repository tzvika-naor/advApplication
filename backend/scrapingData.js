const axios = require('axios');
const cheerio = require('cheerio');

const page_url = 'https://gadgets.ndtv.com/mobiles/smartphones'

async function getMobiles ()
{
    const { data } = await axios.get(page_url);
    const $ = cheerio.load(data);
    const table = $('#allplist');
    console.log(table)
    const models = []
    const imageUrl = []
    const display = []
    const processor = []
    const frontCamera = []
    const rearCamera = []
    const batteryCapacity = []
    const price = []
    arr=[]

    // const blabla = $('#sectionContent > div.SearchResults > div.SearchResultsMain');
    // console.log(blabla)
    table.find('div > div._lpdscn > h3 > a').each((i, element) =>
    {

        const model = $(element).text()
        models.push(model)

    })
  table.find('div > div._lpimg > a._lpimga > img').each((i, element) =>
    {
        const image = $(element).attr('src')
        imageUrl.push(image)

    })
    table.find(' tbody > tr:nth-child(1) > td._vltxt').each((i, element) =>
    {
        const screenSize = $(element).text()
        display.push(screenSize)

    })

    table.find('tbody > tr:nth-child(2) > td._vltxt').each((i, element) =>
    {
        const cpu = $(element).text()
        processor.push(cpu)

    })

    table.find('tbody > tr:nth-child(3) > td._vltxt').each((i, element) =>
    {
        const front_camera = $(element).text()
        frontCamera.push(front_camera)

    })
    table.find('tbody > tr:nth-child(4) > td._vltxt').each((i, element) =>
    {
        const rear_camera = $(element).text()
        rearCamera.push(rear_camera)

    })
    table.find('tbody > tr:nth-child(5) > td._vltxt').each((i, element) =>
    {
        const battery_capacity = $(element).text()
        batteryCapacity.push(battery_capacity)

    })
    table.find(' div._lpdscn > div > div._lrtngbuy._flx > div > a._lprc > span:nth-child(1)').each((i, element) =>
    {
        const priceinRupee = $(element).text()
        price.push(priceinRupee)
    })
    models.forEach((val,i)=> {
        var obj = {}
        var temp = val.split(' ');
        obj.models = val;
        obj.image = imageUrl[i];
        obj.display = display[i];
        obj.processor = processor[i]
        obj.frontCamera = frontCamera[i];
        obj.rearCamera = rearCamera[i];
        obj.batteryCapacity = batteryCapacity[i];
        // obj.price = price[i];
        obj.brand = temp[0];
        arr.push(obj)
    })


}
module.exports = getMobiles()

