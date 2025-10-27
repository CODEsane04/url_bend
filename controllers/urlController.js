const { nanoid } = require('nanoid');
const URL = require('../models/urlModel');

//controller to generate new short url

async function handleGenerateNewShortUrl(req, res) {
    console.log("recieved a post request");
    
    const userId = req.user._id;
    const long_url = req.body.long_url;

    if (!long_url) {
        return res.status(400).json({message: "no long url reecieved"});
    }

    console.log("successfully recieved the long_url");
    
    const UID = nanoid(6);
    const now = Date.now();

    try {

        const short_url = `http://localhost:8000/${UID}`;

        await URL.create({
            shortId: UID,
            shortUrl: short_url,
            redirectUrl: long_url,
            visitHistory: [{ timestamp: now }], 
            createdBy: userId,
        });

        console.log("saved the entry");
        
        const short_url_doc = await URL.findOne({shortId:UID});

        console.log("succesfully sent the url_doc", short_url_doc);
        
        return res.status(201).json(short_url_doc);

    } catch (error) {
        return res.status(500).json({message: "failed to shorten the url"});
    }
}

//controller to redirect to the main url via short url

async function handleGoToRedirectedUrl(req, res) {
    console.log("recieved a get request");
    
    const UID = req.params.id;

    if (!UID) {
        return res.status(400).json({message: "no valid ID recieved"});
    }

    console.log("succesfuly got the UID from url", UID);

    try {

        const req_url_data = await URL.findOne({shortId: UID});

        if (!req_url_data) {
            return res.status(500).json({message: "no short url found"});
        }

        req_url_data.visitHistory.push({ timestamp: Date.now() });

        await req_url_data.save(); 

        const redirect_link = req_url_data.redirectUrl;

        return res.status(302).redirect(redirect_link);
    } catch (error) {
        return res.status(500).json({message: "failed to redirect"});
    }
}

//controller to load links related to the logged in user

async function handleLoadAllLinks(req, res) {
    console.log("recieved a request to load all urls");

    const userId = req.user._id;

    try {
        const allUrls = await URL.find({createdBy: userId})
        return res.status(200).json(allUrls);
    } catch (error) {
        return res.status(500).json({message: "failed to load all urls"})
    }
}

module.exports = {
    handleGenerateNewShortUrl,
    handleGoToRedirectedUrl,
    handleLoadAllLinks,
}