function parser() {
    const input = `<a href="http://example.org/click?param1=value1&param2=value2">
    <img src="http://example.com/image?param1=value1&param2=value3">
    </a>
    `;
    // const input = `<a href="http://example.org/click?cs_email={{Email}}&cs_stripeid=1245&cs_offset=0&esp=sendgrid">
    // <img src="http://example.com/image?cs_email={{Email}}&cs_stripeid=1245&esp=sendgrid">
    // </a>
    // `;
    // const input = `<a href="http://example.org/click?cs_email={{Email}}&cs_stripeid=1245&cs_offset=0&esp=sendgrid">
    // <img src="http://eXample.org/image?cs_email={{email}}&cs_stripeid=1247&cs_offset=0&esp=sendgrid">
    // </a>
    // `;
    // const input = `<a href="http://example.org/click?cs_email={{Email}}&cs_stripeid=1245&cs_offset=0&esp=sendgrid">
    // <img src="http://example.org/image?cs_email={{Email}}&cs_stripeid=1245&cs_offset=0&esp=sendgrid#first_tab">
    // </a>
    // `;

    //extract URLs and store in variables
    let URLs = input.match(/(https?:\/\/[^\"]+)/g);
    let clickURL = URLs[0];
    let imageURL = URLs[1];
    console.log(clickURL);
    console.log(imageURL);
    //check if schemes are identical
    let clickProtocol = (new URL(clickURL)).protocol;
    let imageProtocol = (new URL(imageURL)).protocol;
    // console.log(clickProtocol);
    // console.log(imageProtocol);
    if (clickProtocol == imageProtocol) {
        console.log('Scheme: YES');
    } else {
        console.log('Scheme: NO');
    };
    //check if hostnames are identical
    let clickHostname = (new URL(clickURL)).hostname;
    let imageHostname = (new URL(imageURL)).hostname;
    // console.log(clickHostname);
    // console.log(imageHostname);
    if (clickHostname == imageHostname) {
        console.log('Host: YES');
    } else {
        console.log('Host: NO');
    };
    //check if the paths correct
    let clickPathname = (new URL(clickURL)).pathname;
    let imagePathname = (new URL(imageURL)).pathname;
    // console.log(clickPathname);
    // console.log(imagePathname);
    if (clickPathname.match(/click/) && imagePathname.match(/image/)) {
        console.log('Path: YES');
    } else {
        console.log('Path: NO');
    };
    //check if query parameters are identical
    let clickQuery = (new URL(clickURL)).search;
    let imageQuery = (new URL(imageURL)).search;
    // console.log(clickQuery);
    // console.log(imageQuery);
    if (clickQuery === imageQuery) {
        console.log('Query: YES');
    } else {
        console.log('Query: NO');
        let clickParams = clickQuery.split('&');
        let imageParams = imageQuery.split('&');
        // console.log(clickParams);
        // console.log(imageParams);
        //check which URL length is longer to use as benchmark
        if (clickParams.length >= imageParams.length) {
            for (var i = 0; i < clickParams.length; i++) {
                if (clickParams[i] === imageParams[i]) {
                } else {
                    let [clickKey, clickValue] = clickParams[i].split('=');
                    let [imageKey, imageValue] = imageParams[i].split('=');
                    console.log('Click URL: ' + '(' + [clickKey, clickValue] + ')');
                    console.log('Image URL: ' + '(' + [imageKey, imageValue] + ')');
                }
            }
        } else {
            for (var i = 0; i < imageParams.length; i++) {
                if (imageParams[i] === clickParams[i]) {
                } else {
                    let [imageKey, imageValue] = imageParams[i].split('=');
                    let [clickKey, clickValue] = clickParams[i].split('=');
                    console.log('Click URL: ' + '(' + [clickKey, clickValue] + ')');
                    console.log('Image URL: ' + '(' + [imageKey, imageValue] + ')');
                }
            }
        };

    };
}


$(parser);
