## (Firebase) auth guide app

### Simulating .env file in nodejs with env.js
This goes inside the env.js file, and imported into base.js:
````
const env = {
    APIKEY: "apikey-here",
    AUTHDOMAIN: "authdomain-here",
    PROJECTID: "projectid-here"
};

export default env;
````

### Firestore database rules

Adding a reference here in the readme instead of always having to go to firebase to get this. Copy and paste this and modify as needed in subsequent projects:

````
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    //match /{document=**} {
      //allow read, write: if
          //request.time < timestamp.date(2021, 11, 30);
    //}
    
    //match logged in user doc in users collection: allow the user to create if logged in, allow the user to read only his/her own data
    match /users/{userId} {
    	allow create: if request.auth.uid != null;
      allow read: if request.auth.uid == userId;
    }
    
    //match docs in the guides collection, and allow access if user exists
    match /guides/{guideId} {
    	allow read, write: if request.auth.uid != null;
    }
  }
}
````

Rules for guides change so that only admins can write to guides in [tutorial 21 - Firestore rules for claims](https://www.youtube.com/watch?v=C87Un2rIm2g&list=PL4cUxeGkcC9jUPIes_B8vRjn1_GaplOPQ&index=21). Change guide rules to:

````
//match docs in the guides collection, and allow access if user exists
match /guides/{guideId} {
  allow read: if request.auth.uid != null;
	allow write: if request.auth.token.admin == true;
}
````

In the end, I changed the rules for guides so that everyone (user or not) can read the collapsible lists: 

````
//match docs in the guides collection. Allow read access to anyone, but write access to admin only
match /guides/{guideId} {
  allow read,
	allow write: if request.auth.token.admin == true;
}
````

### Custom claims and cloud functions

Commands from [Tutorial #17 - Intro to custom claims](https://www.youtube.com/watch?v=SSiLsIkPQWs&list=PL4cUxeGkcC9jUPIes_B8vRjn1_GaplOPQ&index=17) to be able to use firebase cloud functions:

Install firebase tools if you haven't:
````
npm i -g firebase-tools
````

Login to firebase accout if you haven't:
````
firebase login
````

Install firebase cloud functions (folder and files) in your project:
````
firebase init functions
````

### Using cloud functions

Info below is for [tutorial #18 - cloud function/adding claims](https://www.youtube.com/watch?v=4wa3CMK4E2Y&list=PL4cUxeGkcC9jUPIes_B8vRjn1_GaplOPQ&index=18).

Cloud functions is no longer available on firebase free (spark) plan. You need to upgrade to blazer plan to be able to deploy to cloud function.

Add the `addAdminRole` function and content to the functions/index.js file. Next, deploy code in the functions folder to firebase:
````
firebase deploy --only functions
````
Note: After successful deploy, click on 'functions' tab on firebase to see the addAdminRole is present there.

### Acessing and calling cloud functions in your app with Firebase Modular Web SDK v. 9.0

Resources: [firebase doc](https://firebase.google.com/docs/functions/callable#web-version-9_2) and this [stackoverflow answer](https://stackoverflow.com/a/63255784/15012852).

Note: don't forget to always deploy your functions to firebase when ever you make a change to the firebase functions inside the functions folder.

<!--
 // modular firebase 9 way of catching error when onSnapshot is still fired, in the case where user is still logged out
 // Resource: https://pretagteam.com/question/how-to-use-a-catch-in-firebase-onsnapshot
-->