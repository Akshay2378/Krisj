const fs = require('fs');

module.exports = {
    addPersonPage: (req, res) => {
        res.render('addPerson.ejs', {
            title: "Welcome to Data | Add a new person",
        });
    },
    addPerson: (req, res) => {
      console.log(req.body);
        if (!req.params) {
//          console.log("q"+req[0]);
            return res.status(400).send("No files were uploaded.");
        }

        let message = '';
        let name = req.body.name;
        let age = req.body.age;
        let gender = req.body.gender;
        let phno = req.body.phno;


        let nameQuery = "SELECT * FROM `person` WHERE phno = '" + phno + "'";

        db.query(nameQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Person already exists';
                res.render('addPerson.ejs', {
                    message,
                    title: "Welcome to Data | Add a new person"
                });
            } else {
                // check the filetype before uploading it
/*                if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
                    // upload the file to the /public/assets/img directory
                    uploadedFile.mv(`public/assets/img/${image_name}`, (err ) => {
                        if (err) {
                            return res.status(500).send(err);
                        } */
                        // send the player's details to the database
                        let query = "INSERT INTO `person` (name, age, gender, phno) VALUES ('" + name + "', '" + age + "', '" + gender + "', '" + phno + "')";
                        db.query(query, (err, result) => {
                          /*  if (err) {
                                return res.status(500).send(err);
                            } */
                            res.redirect('/');
                        });
                    //    });
                  //  }
                    /* else {
                    message = "Invalid File format. Only 'gif', 'jpeg' and 'png' images are allowed."; */
/*                    res.render('addPerson.ejs', {
                        message,
                        title: "Welcome to human | Add a new player"
                      }); */
                                  //    }
                                  }
                              });
                          },
      editPersonPage: (req, res) => {
        let personPno = req.params.phno;
        let query = "SELECT * FROM `person` WHERE phno = '" + personPno + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('editPerson.ejs', {
                title:'Edit  Person',
                person: result[0]
                ,message: ''
            });
        });
    },
    editPerson: (req, res) => {
        let personPno = req.params.phno;
        let name = req.body.name;
        let age = req.body.age;
        let gender = req.body.gender;
        let phno = req.body.phno;

        let query = "UPDATE `person` SET `name` = '" + name + "', `age` = '" + age + "', `gender` = '" + gender + "', `phno` = '" + phno + "' WHERE `person`.`phno` = '" + personPno + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    deletePerson: (req, res) => {
        let personPno = req.params.phno;
        let deleteUserQuery = 'DELETE FROM person WHERE phno = "' + personPno + '"';

                db.query(deleteUserQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                });
    },
};
