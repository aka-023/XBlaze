    let express = require("express");
    let bodyParser = require("body-parser");
    let mongoose = require("mongoose");
    const bcrypt = require('bcrypt');

    const app = express();

    // app.set('view engine', 'ejs');
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

    app.use(express.static('public'));
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    mongoose.connect('mongodb://localhost:27017/XBlaze');
    let db = mongoose.connection;
    db.on('error', () => console.log("Error in Connecting to Database"));
    db.once('open', () => console.log("Connected to Database"));



    app.post("/signup",(req,res) => {
        let usr_name = req.body.usr_name
        let usr_pass = req.body.usr_pass
        let usr_mail = req.body.usr_mail
        // let usr_dob = req.body.usr_dob
        // let usr_email = req.body.usr_email

        let data={
            "userName":usr_name,
            "password":usr_pass,
            "Email":usr_mail
            // "dob":usr_dob,
            // "email":usr_email
        }
        
        db.collection('users').insertOne(data,(err,collection) => {
            if(err){
                throw err;
            }
            console.log("Record Inserted Succesfully")
            console.log(data);
        })
        return res.redirect('../htmlfiles/home.html')
    })
    

    app.post("/prof",(req,res) => {
    let fullname = req.body.fullname
    let birth = req.body.birth
    let gender = req.body.gender

    let data={
        "fullName":fullname,
        "DOB":birth,
        "Gender":gender
    }
    db.collection('users').insertOne(data,(err,collection) => {
        if(err){
            throw err;
        }
        console.log("Record Inserted Succesfully")
    })
    })

    app.post('/log', async (req, res) => {
        let usr_name = req.body.username;
        let pass = req.body.user_pass;
        console.log(usr_name);
        console.log(pass);
        try {
            const user = await db.collection('users').findOne({ userName: usr_name });
    
            if (user) {
                if (user.password === pass) {
                    console.log("Access Given!");
                    res.redirect(`../htmlfiles/account.html?fullname=${user.usr_name}&birth=${user.DOB}&email=${user.Email}&gender=${user.Gender}`);
                } else {
                    console.log("Invalid Credentials!");
                    res.send("Invalid username or password");
                }
            } else {
                console.log("Invalid Credentials!");
                res.send("Invalid username or password");
            }
        } catch (error) {
            console.error("Error:", error);
            res.status(500).send("Internal Server Error");
        }
    });
    

    let imageSchema = new mongoose.Schema({
        image: String,
        name: String, 
        price: String
    });
    let Image = mongoose.model('Image', imageSchema);

    app.post("/storeImage", (req, res) => {
        let imageData = req.body.imageData;
        let imageName = req.body.imageName;
        let imagePrice = req.body.imagePrice; 

        let data = {
            "image": imageData,
            "name": imageName,
            "price":imagePrice
        };

        Image.create(data)
            .then(image => {
                console.log("Image stored successfully in the database");
                res.redirect('../htmlfiles/showimage.html');
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ message: 'Error storing image in database' });
            });
    });

    app.get("/getAllImages", (req, res) => {
        Image.find({})
            .then(images => {
                res.status(200).json({ images: images });
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ message: 'Error fetching images from database' });
            });
    });
    // Define schema for products
    const productSchema = new mongoose.Schema({
        name: String,
        price: Number,
        size: String,
        quantity: Number,
        image: String
    });
    const Product = mongoose.model('Product', productSchema);

    // Endpoint to add product to database
    app.post("/addToCart", async (req, res) => {
        try {
            const { name, price, size, quantity, image } = req.body;
            const product = new Product({
                name,
                price,
                size,
                quantity,
                image
            });
            await product.save();
            console.log("Product added to cart:", product);
            res.status(200).send("Product added to cart successfully.");
        } catch (error) {
            console.error("Error adding product to cart:", error);
            res.status(500).send("Internal server error.");
        }
    });

    app.get("/Products", async (req, res) => {
        try {
            const products = await Product.find({});
            res.status(200).json({ products });
        } catch (error) {
            console.error("Error fetching product items:", error);
            res.status(500).send("Internal server error.");
        }
    });

    const contactSchema = new mongoose.Schema({
        name: String,
        email: String,
        subject: String,
        message: String
    });
    const Contact = mongoose.model('Contact', contactSchema);
    
    // Endpoint to handle contact form submission
    app.post("/contact", async (req, res) => {
        try {
            const { name, email, subject, message } = req.body;
            const contact = new Contact({
                name,
                email,
                subject,
                message
            });
            await contact.save();
            console.log("Contact details saved to database:", contact);
            res.redirect('/'); // Redirect to home page after form submission
        } catch (error) {
            console.error("Error saving contact details to database:", error);
            res.status(500).send("Internal server error.");
        }
    });


    app.get("/", (req, res) => {
        res.set({
            "Allow-acces-Allow-Origin": '*'
        })
        return res.redirect('../htmlfiles/signup.html');
    }).listen(3000);

    console.log("Listening on port 3000");