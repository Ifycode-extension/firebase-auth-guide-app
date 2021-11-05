const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();

//Create a function that will add admin role to a specific user
exports.addAdminRole = functions.https.onCall((data, context) => {

    //check request is made by admin only
    if (context.auth.token.admin !== true) {
        return { error: 'only admins can add other admins, smiling emoji'};
    }

    //get user and add custom claim (of admin)
    return admin.auth().getUserByEmail(data.email).then(user => {
        return admin.auth().setCustomUserClaims(user.uid, {
            admin: true
        });
    }).then(() => {
        // return a response to the user with the admin claim on the frontend
        return {
            message: `Success! ${data.email} has been made an admin`
        }
    }).catch(err => {
        return err;
    });
});
