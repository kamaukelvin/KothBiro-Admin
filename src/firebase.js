import * as firebase from 'firebase';
import 'firebase/database';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
	apiKey: 'AIzaSyAisgTq6vsPgBCMfEp6ox3USyIoHETb9jc',
	authDomain: 'kothbiro-35a65.firebaseapp.com',
	databaseURL: 'https://kothbiro-35a65-default-rtdb.firebaseio.com',
	projectId: 'kothbiro-35a65',
	storageBucket: 'kothbiro-35a65.appspot.com',
	messagingSenderId: '630078760923',
	appId: '1:630078760923:web:2ef685a243c009eed9a9fe',
	measurementId: 'G-KSHL3NZR5T',
};

firebase.initializeApp(config);

export default firebase.database();
