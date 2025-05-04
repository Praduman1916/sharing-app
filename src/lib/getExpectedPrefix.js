const getExpectedPrefix = (platform) => {
    switch (platform.toLowerCase()) {
        case 'github':
            return 'https://github.com/';
        case 'youtube':
            return 'https://www.youtube.com/';
        case 'linkedin':
            return 'https://www.linkedin.com/';
        case 'frontend mentor':
            return 'https://www.frontendmentor.io/';
        case 'facebook':
            return 'https://www.facebook.com/';
        default:
            return 'https://';
    }
};


module.exports = {
    getExpectedPrefix
}