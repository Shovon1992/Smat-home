const admin = require("firebase-admin");

async function main() {
  // Check Firebase secret
  if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
    throw new Error(
      "FIREBASE_SERVICE_ACCOUNT GitHub Secret is missing."
    );
  }

  // Get value from command line
  const value = process.argv[2];

  if (value !== "true" && value !== "false") {
    throw new Error(
      `Invalid value: ${value}. Expected true or false.`
    );
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
    `SUCCESS: /Switch1 changed to ${switchValue}`
  );

  await admin.app().delete();
}

main().catch((error) => {
  console.error("ERROR:");
  console.error(error);
  process.exit(1);
});
