const sendMessage = async (req, res, next) => {
    res.send('Send Message');
}

const getMessage = async (req, res, next) => {
    res.send('Get Message');
};

module.exports = { sendMessage, getMessage };