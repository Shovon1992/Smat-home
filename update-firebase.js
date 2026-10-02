const admin = require("firebase-admin");

const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://my-home-3608f-default-rtdb.firebaseio.com"
});

async function updateSwitch() {
  const hour = new Date().getUTCHours();

  let switchValue;

  if ([0, 6, 12].includes(hour)) {
    switchValue = true;
  } else {
    switchValue = false;
  }

  await admin
    .database()
    .ref("/Switch1")
    .set(switchValue);

  console.log(`Switch1 = ${switchValue}`);
}

updateSwitch()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Firebase update failed:", error);
    process.exit(1);
  });
