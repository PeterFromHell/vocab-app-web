import { FieldValue } from "firebase/firestore"

interface List {
    name: string
    createdAt: FieldValue
    stars: number
    user: {
        _id: string
        name: string
        avatar: string
    }
}

interface Vocab {
    english: string!
    chinese: string!
    partOfSpeech: string!
}