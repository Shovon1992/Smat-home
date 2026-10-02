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

  if (hour === 0) {
    // 5:30 AM IST
    switchValue = true;
  } else if (hour === 12) {
    // 5:30 PM IST
    switchValue = false;
  } else {
    throw new Error(`Unexpected execution time: ${hour}:00 UTC`);
  }

  await admin
    .database()
    .ref("/Switch1")
    .set(switchValue);

  console.log(`Switch1 changed to: ${switchValue}`);
}

updateSwitch()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Firebase update failed:", error);
    process.exit(1);
  });
