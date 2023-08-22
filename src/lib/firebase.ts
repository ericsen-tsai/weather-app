import { cert } from 'firebase-admin/app'
import { initFirestore } from '@auth/firebase-adapter'

const firestore = initFirestore({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID as string,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL as string,
    privateKey: (process.env.FIREBASE_PRIVATE_KEY as string).replace(/\\n/g, '\n'),
  }),
})

// eslint-disable-next-line import/prefer-default-export
export { firestore }
