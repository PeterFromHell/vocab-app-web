import { FieldValue } from "firebase/firestore"

interface List {
    name: string
    createdAt: FieldValue
    user: {
        _id: string
        name: string
        avatar: string
    }
}