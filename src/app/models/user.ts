export class DatabaseUser {
    displayName: string
    photoURL: string
    email: string
    phoneNumber: string
    uploadList: {
        uid: boolean
    }
}

/**
 * Is is a mocked structure of firebase.User
 * We will not import firebase at all places and only in providers
 */

export class FirebaseAuthUser{
    uid: string
    displayName: string
    photoURL: string
    email: string
}