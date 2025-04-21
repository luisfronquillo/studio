import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // Your Firebase project configuration here
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
```

**Before using this code:**

1.  **Replace the placeholder values** in `firebaseConfig` with your actual Firebase project credentials. You can find these in your Firebase project settings.
2.  **Install the Firebase JavaScript SDK v10:** If you haven't already, install it using npm or yarn:

    
```bash
npm install firebase
    # or
    yarn add firebase
```

**To use the Firestore instance:**

In other files, import `db` and use it to interact with Firestore:

```typescript
import { db } from "./your-firestore-file"; // Replace with the actual path
import { collection, getDocs } from "firebase/firestore";

async function getDocuments() {
  const querySnapshot = await getDocs(collection(db, "your_collection_name"));
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });
}

getDocuments();