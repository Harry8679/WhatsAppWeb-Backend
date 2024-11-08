const searchUsers = async (req, res, next) => {
    try {
        res.send(req.query);
    } catch (error) {}
}

module.exports = { searchUsers };