const admin = require("firebase-admin");

async function main() {
  if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
    throw new Error("FIREBASE_SERVICE_ACCOUNT secret is missing.");
  }

  const value = process.argv[2];

  if (value !== "true" && value !== "false") {
    throw new Error("Value must be true or false.");
  }

  const serviceAccount = JSON.parse(
    process.env.FIREBASE_SERVICE_ACCOUNT
  );

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:
      "https://my-home-3608f-default-rtdb.firebaseio.com"
  });

  const switchValue = value === "true";

  await admin
    .database()
    .ref("/Switch1")
    .set(switchValue);

  console.log(
    `Firebase /Switch1 = ${switchValue}`
  );

  console.log(
    switchValue
      ? "Physical switch: OFF"
      : "Physical switch: ON"
  );

  await admin.app().delete();
}

main().catch((error) => {
  console.error("Firebase update failed:");
  console.error(error);
  process.exit(1);
});
