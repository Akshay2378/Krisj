module.exports = {
    getHomePage: (req, res) => {
        let query = "SELECT * FROM `person` ORDER BY phno ASC";

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('index.ejs', {
                title: "Welcome to Data | View Players",
                person: result
            });
        });
    },
};
