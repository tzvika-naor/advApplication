const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const page_url = 'https://gadgets.ndtv.com/mobiles/smartphones'
const Smartphone = require('./models/smartphone');

async function getMobiles () {
    let allData = {};
    const { data } = await axios.get(page_url);
    const $ = cheerio.load(data);
    const table = $('#allplist');
    const phoneModels = []
    const imageUrl = []
    const display = []
    const processor = []
    const frontCamera = []
    const rearCamera = []
    const batteryCapacity = []
    const price = []
    arr = []

    table.find('div > div._lpdscn > h3 > a').each((i, element) => {

        const phoneModel = $(element).text()
        phoneModels.push(phoneModel)

    })
    table.find('div > div._lpimg > a._lpimga > img').each((i, element) => {
        const image = $(element).attr('src')
        imageUrl.push(image)

    })
    table.find(' tbody > tr:nth-child(1) > td._vltxt').each((i, element) => {
        const screenSize = $(element).text()
        display.push(screenSize)

    })

    table.find('tbody > tr:nth-child(2) > td._vltxt').each((i, element) => {
        const cpu = $(element).text()
        processor.push(cpu)

    })

    table.find('tbody > tr:nth-child(3) > td._vltxt').each((i, element) => {
        const front_camera = $(element).text()
        frontCamera.push(front_camera)

    })
    table.find('tbody > tr:nth-child(4) > td._vltxt').each((i, element) => {
        const rear_camera = $(element).text()
        rearCamera.push(rear_camera)

    })
    table.find('tbody > tr:nth-child(5) > td._vltxt').each((i, element) => {
        const battery_capacity = $(element).text()
        batteryCapacity.push(battery_capacity)

    })
    table.find(' div._lpdscn > div > div._lrtngbuy._flx > div > a._lprc > span:nth-child(1)').each((i, element) => {
        const priceinRupee = $(element).text()
        price.push(priceinRupee)
    })
    phoneModels.forEach((val, i) => {
        var obj = {}
        var temp = val.split(' ');
        obj.phoneModel = val;
        obj.image = imageUrl[i];
        if (obj.image === "https://gadgets.ndtv.com/static/mobile/images/spacer.png")
            obj.image = "https://assets.gadgets360cdn.com/content/assets/icons/phone_icon.png?output-quality=80";
        obj.display = display[i];
        obj.processor = processor[i]
        obj.frontCamera = frontCamera[i];
        obj.rearCamera = rearCamera[i];
        obj.batteryCapacity = batteryCapacity[i];

        var indexEnd = (price[i]).length
        obj.price = Math.floor((price[i].substr(2, indexEnd)).replace(',', '') / 73.1411);
        obj.brand = temp[0];
        arr.push(obj)
    },
        getData(arr)
    )
    function getData (data) {
        allData = data;
    }
    //creating a json file / if needed
    //    var fd = fs.writeFile(__dirname + '/smartphones.json', JSON.stringify(allData), function (err) {
    //         if (err) {
    //             return console.log(err);
    //         }
    //         console.log("The file was saved!");
    //     })

    allData.map(smartphone => {
        const smartPhones = new Smartphone({
            phoneModel: smartphone.phoneModel,
            brand: smartphone.brand,
            display: smartphone.display,
            processor: smartphone.processor,
            frontCamera: smartphone.frontCamera,
            rearCamera: smartphone.rearCamera,
            batteryCapacity: smartphone.batteryCapacity,
            price: smartphone.price,
            image: smartphone.image
        });
        smartPhones.save();
    })
}
module.exports = getMobiles();

