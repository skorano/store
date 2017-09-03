import Firebase from 'firebase'

let config = {
	apiKey: "AIzaSyAJWur4zxbAOt62sGWm3VP7-7DZLsnGuDU",
	authDomain: "store-store123.firebaseapp.com",
	databaseURL: "https://store-store123.firebaseio.com",
	projectId: "store-store123",
	storageBucket: "store-store123.appspot.com",
	messagingSenderId: "830936672828"
}

const firebaseApp = Firebase.initializeApp(config);

export const db = firebaseApp.database();
export const firebase = firebaseApp;
