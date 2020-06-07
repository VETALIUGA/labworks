// Your web app's Firebase configuration
let firebaseConfig = {
    apiKey: "AIzaSyAH9k3MrmAy2kbI-II-brFVlYw9Iz1n0T8",
    authDomain: "maydaniuklabs.firebaseapp.com",
    databaseURL: "https://maydaniuklabs.firebaseio.com",
    projectId: "maydaniuklabs",
    storageBucket: "maydaniuklabs.appspot.com",
    messagingSenderId: "612807208997",
    appId: "1:612807208997:web:e8836c3bbbf04b94cdcfcc"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let form = document.querySelector("#profileForm");
let object = {
    mail: '',
    surname: '',
    sex: '',
    subscribe: false
};
let itemArr = [
    'date',
    'surname',
    'mail',
    'sex',
    'subscribe'
]
let db = firebase.firestore();
let gridContainer = document.querySelector('.user-list__grid');
document.onload = getUsers();
form.addEventListener('submit', submitForm);
function submitForm(e) {
    e.preventDefault();
    getUsers();
    for (let i = 0; i < e.target.length; i++) {
        const curValue = e.target[i];
        if (curValue.type === 'radio') {
            curValue.checked ?
                object[curValue.name] = curValue.value
                :
                ''
        } else if(curValue.type === 'checkbox') {
            curValue.checked ?
                object[curValue.name] = 'subscribed'
                :
                object[curValue.name] = 'not subscribed'
        } else {
            object[curValue.name] = curValue.value;
        }
    }
    db.collection("users").doc(object.surname).set({
        date: new Date(),
        mail: object.mail,
        surname: object.surname,
        sex: object.sex,
        subscribe: object.subscribe,
    }).then(function () {
        console.log("Document successfully written!");
    }).catch(function (error) {
        console.error("Error writing document: ", error);
    });
}

function getUsers() {
    db.collection("users").get().then((querySnapshot) => {
        gridContainer.innerHTML = "";
        querySnapshot.forEach((doc) => {
            const gridItem = document.createElement('div');
            gridItem.className = 'user-list__grid-item';
            itemInfo = {
                ...doc.data()
            };
            itemArr.map((item) => {                
                const subItem = document.createElement('div');
                subItem.className = 'user-list__grid-subitem';
                if (item == 'date') {
                    subItem.innerText = itemInfo[item].toDate().toDateString();
                } else {
                    subItem.innerText = itemInfo[item];
                }
                gridItem.appendChild(subItem);
            })
            console.log(itemInfo);
            // for (const prop in itemInfo) {
            //     const subItem = document.createElement('div');
            //     subItem.className = 'user-list__grid-subitem';
            //     if (itemInfo[prop].toDate) {
            //         subItem.innerText = itemInfo[prop].toDate().toDateString();
            //     } else {
            //         subItem.innerText = itemInfo[prop];
            //     }
            //     gridItem.appendChild(subItem);
            // }
            gridContainer.appendChild(gridItem);
        });
    });
}