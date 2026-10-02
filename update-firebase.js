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

  // Scheduled IST times:
  // 06:00 -> true
  // 09:00 -> false
  // 12:00 -> true
  // 15:00 -> false
  // 18:00 -> true
  // 21:00 -> false

  const switchValue = [0, 6, 12].includes(hour);

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
