const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //YOUR USER ID
            author: '613acdfff632d722e1ee450a',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dytlybojl/image/upload/v1633967695/YelpCamp/chris-holder-uY2UIyO5o5c-unsplash_j7kifc.jpg',
                    filename: 'YelpCamp/chris-holder-uY2UIyO5o5c-unsplash_j7kifc'
                },
                {
                    url: 'https://res.cloudinary.com/dytlybojl/image/upload/v1633967694/YelpCamp/matt-whitacre-F4GGnyJ8aiI-unsplash_wd7ycc.jpg',
                    filename: 'YelpCamp/matt-whitacre-F4GGnyJ8aiI-unsplash_wd7ycc.jpg'
                },
                {
                    url: 'https://res.cloudinary.com/dytlybojl/image/upload/v1633967694/YelpCamp/glen-jackson-mzZVGFfMOkA-unsplash_vbf78b.jpg',
                    filename: 'YelpCamp/glen-jackson-mzZVGFfMOkA-unsplash_vbf78b.jpg'
                },
                {
                    url: 'https://res.cloudinary.com/dytlybojl/image/upload/v1633967693/YelpCamp/scott-goodwill-y8Ngwq34_Ak-unsplash_dhxgvm.jpg',
                    filename: 'YelpCamp/scott-goodwill-y8Ngwq34_Ak-unsplash_dhxgvm.jpg'
                },
                {
                    url: 'https://res.cloudinary.com/dytlybojl/image/upload/v1633967693/YelpCamp/kilarov-zaneit-Hxs6EAdI2Q8-unsplash_f5lhjw.jpg',
                    filename: 'YelpCamp/kilarov-zaneit-Hxs6EAdI2Q8-unsplash_f5lhjw.jpg'
                },
                {
                    url: 'https://res.cloudinary.com/dytlybojl/image/upload/v1633967690/YelpCamp/tegan-mierle-fDostElVhN8-unsplash_gnitqo.jpg',
                    filename: 'YelpCamp/tegan-mierle-fDostElVhN8-unsplash_gnitqo.jpg'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})